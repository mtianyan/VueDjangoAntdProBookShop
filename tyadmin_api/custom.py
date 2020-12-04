from copy import deepcopy
from django.core.exceptions import ValidationError as DjangoValidationError
from django.conf import settings
from django.core.files.images import ImageFile
from django.db import models
from django.db.models import QuerySet, ManyToManyRel
from django.db.models.fields.files import ImageFieldFile, FieldFile
from django.http import JsonResponse
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, mixins, status
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter
from rest_framework.generics import GenericAPIView, get_object_or_404
from rest_framework.response import Response
from rest_framework.settings import api_settings
from rest_framework.viewsets import ViewSetMixin

from tyadmin_api.ty_settings import MAX_LIST_DISPLAY_COUNT
from tyadmin_api.utils import log_save
from tyadmin_api.pagination import CustomPageNumberPagination
from django_filters import rest_framework as filters, RangeFilter
from django_filters.fields import DateRangeField
from django_filters.widgets import RangeWidget
from rest_framework.exceptions import ValidationError
from rest_framework.views import exception_handler, APIView
from rest_framework.authentication import SessionAuthentication, BasicAuthentication


def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)
    if isinstance(exc, ValidationError):
        response.data = {"fields_errors": response.data}
    else:
        response.data = {"none_fields_errors": response.data}
    return response


class GenericViewSet(ViewSetMixin, GenericAPIView):
    """
    The GenericViewSet class does not provide any actions by default,
    but does include the base set of generic view behavior, such as
    the `get_object` and `get_queryset` methods.
    """
    pass


class MtyModelViewSet(mixins.CreateModelMixin,
                      mixins.RetrieveModelMixin,
                      mixins.UpdateModelMixin,
                      mixins.DestroyModelMixin,
                      mixins.ListModelMixin,
                      GenericViewSet):
    pass


class CsrfExemptSessionAuthentication(SessionAuthentication):

    def enforce_csrf(self, request):
        return


class MtyCustomExecView(APIView):
    authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)

    def get_exception_handler(self):
        return custom_exception_handler


class XadminViewSet(MtyModelViewSet):
    pagination_class = CustomPageNumberPagination
    authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)
    filter_backends = (DjangoFilterBackend, SearchFilter)

    def get_exception_handler(self):
        return custom_exception_handler

    def list(self, request, *args, **kwargs):
        api_settings.DATETIME_FORMAT = '%Y-%m-%d %H:%M:%S'
        if "all" in request.query_params and len(request.query_params.keys()) == 1:
            self.pagination_class = None
        return super().list(request, args, kwargs)

    def create(self, request, *args, **kwargs):
        try:
            # data = deepcopy(request.data)
            # del_dict = {}
            self_serializer_class = self.get_serializer_class()
            serializer = self_serializer_class(data=request.data)
            serializer.is_valid(raise_exception=True)
            # for key, value in del_dict.items():
            #     serializer.validated_data[key] = value
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            ret = Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
            log_save(user=request.user.username, request=self.request, flag="新增",
                     message=f'{self.serializer_class.Meta.model._meta.verbose_name}: {ret.data.__str__()}被新增',
                     log_type=self.serializer_class.Meta.model._meta.model_name)
            return ret
        except DjangoValidationError as e:
            raise ValidationError(e.error_dict)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        data = deepcopy(request.data)
        del_dict = {}
        for key, value in request.data.items():
            if isinstance(getattr(instance, key), ImageFieldFile) and isinstance(value, str):
                print(value)
                print(self.request.META['HTTP_HOST'] + settings.MEDIA_URL)
                pure_value = value.replace("http://" + self.request.META['HTTP_HOST'] + settings.MEDIA_URL, "")
                print(pure_value)
                del_dict[key] = pure_value
                del data[key]
            elif isinstance(getattr(instance, key), FieldFile) and isinstance(value, str):
                print(value)
                print(self.request.META['HTTP_HOST'] + settings.MEDIA_URL)
                pure_value = value.replace("http://" + self.request.META['HTTP_HOST'] + settings.MEDIA_URL, "")
                print(pure_value)
                del_dict[key] = pure_value
                del data[key]
        serializer = self.get_serializer(instance, data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        for key, value in del_dict.items():
            serializer.validated_data[key] = value
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        ret = Response(serializer.data)
        log_save(user=request.user.username, request=self.request, flag="更新",
                 message=f'{self.serializer_class.Meta.model._meta.verbose_name}: {ret.data.__str__()}被更新',
                 log_type=self.serializer_class.Meta.model._meta.model_name)
        return ret

    def destroy(self, request, *args, **kwargs):
        # return Response({
        #     "演示模式"
        # },status=status.HTTP_403_FORBIDDEN)
        ids = kwargs["pk"].split(",")
        names = []
        for one in self.serializer_class.Meta.model.objects.filter(id__in=ids):
            names.append(one.__str__())
        self.serializer_class.Meta.model.objects.filter(pk__in=ids).delete()
        log_save(user=request.user.username, request=self.request, flag="删除",
                 message=f'{self.serializer_class.Meta.model._meta.verbose_name}: {"".join(names)}被删除',
                 log_type=self.serializer_class.Meta.model._meta.model_name)
        return Response({
            "code": 200
        })

    @action(methods=['get'], detail=False, url_path="verbose_name/?")
    def verbose_name(self, request, pk=None):
        field_list = self.serializer_class.Meta.model._meta.get_fields()
        ret = {}
        for one_field in field_list:
            key = one_field.name
            if "verbose_name" in dir(one_field):
                value = one_field.verbose_name
            else:
                value = key
            ret[key] = value
        return JsonResponse(ret)

    @action(methods=['get'], detail=False, url_path="list_display/?")
    def list_display(self, request, pk=None):
        field_list = self.serializer_class.Meta.model._meta.get_fields()
        ret = {}
        count = MAX_LIST_DISPLAY_COUNT
        for one_field in field_list:
            if count < 0 or one_field.__class__.__name__ in ["OneToOneRel", "ManyToOneRel", "DateTimeField", "AutoField"]:
                key = one_field.name
                if "verbose_name" in dir(one_field):
                    if key == "avatar" or "头像" in one_field.verbose_name:
                        pass
                    else:
                        ret[key] = {
                            "show": False
                        }
            else:
                print(one_field.name)
                count -= 1
        return JsonResponse(ret)

    @action(methods=['get'], detail=False, url_path="list_display/?")
    def list_display(self, request, pk=None):
        field_list = self.serializer_class.Meta.model._meta.get_fields()
        ret = {}
        count = MAX_LIST_DISPLAY_COUNT
        for one_field in field_list:
            if count < 0 or one_field.__class__.__name__ in ["OneToOneRel", "ManyToOneRel", "DateTimeField", "AutoField"]:
                key = one_field.name
                if "verbose_name" in dir(one_field):
                    if key == "avatar" or "头像" in one_field.verbose_name:
                        pass
                    else:
                        ret[key] = {
                            "show": False
                        }
            else:
                print(one_field.name)
                count -= 1
        return JsonResponse(ret)

    @action(methods=['get'], detail=False, url_path="display_order/?")
    def display_order(self, request, pk=None):
        from django.contrib import admin
        admin_order = []
        admin_include_flag = False
        for model, model_admin in admin.site._registry.items():
            if model == self.serializer_class.Meta.model:
                admin_include_flag = True
                if model_admin.fieldsets:
                    for one in model_admin.fieldsets:
                        admin_order += one[1]["fields"]
                else:
                    admin_include_flag = False
        if not admin_include_flag:
            field_list = self.serializer_class.Meta.model._meta.get_fields()
            admin_order = [one.name for one in field_list]

        field_list = self.serializer_class.Meta.model._meta.get_fields()
        table_order = [one.name for one in field_list]
        return JsonResponse({
            'form_order': admin_order,
            'table_order': table_order,  # TODO list_display影响
        })


class DateRangeWidget(RangeWidget):
    suffixes = ['start', 'end']


class MyDateRangeField(DateRangeField):
    widget = DateRangeWidget


class DateFromToRangeFilter(RangeFilter):
    field_class = MyDateRangeField


class GenericAPIView(MtyCustomExecView):
    """
    Base class for all other generic views.
    """
    # You'll need to either set these attributes,
    # or override `get_queryset()`/`get_serializer_class()`.
    # If you are overriding a view method, it is important that you call
    # `get_queryset()` instead of accessing the `queryset` property directly,
    # as `queryset` will get evaluated only once, and those results are cached
    # for all subsequent requests.
    queryset = None
    serializer_class = None

    # If you want to use object lookups other than pk, set 'lookup_field'.
    # For more complex lookup requirements override `get_object()`.
    lookup_field = 'pk'
    lookup_url_kwarg = None

    # The filter backend classes to use for queryset filtering
    filter_backends = api_settings.DEFAULT_FILTER_BACKENDS

    # The style to use for queryset pagination.
    pagination_class = api_settings.DEFAULT_PAGINATION_CLASS

    def get_queryset(self):
        """
        Get the list of items for this view.
        This must be an iterable, and may be a queryset.
        Defaults to using `self.queryset`.

        This method should always be used rather than accessing `self.queryset`
        directly, as `self.queryset` gets evaluated only once, and those results
        are cached for all subsequent requests.

        You may want to override this if you need to provide different
        querysets depending on the incoming request.

        (Eg. return a list of items that is specific to the user)
        """
        assert self.queryset is not None, (
                "'%s' should either include a `queryset` attribute, "
                "or override the `get_queryset()` method."
                % self.__class__.__name__
        )

        queryset = self.queryset
        if isinstance(queryset, QuerySet):
            # Ensure queryset is re-evaluated on each request.
            queryset = queryset.all()
        return queryset

    def get_object(self):
        """
        Returns the object the view is displaying.

        You may want to override this if you need to provide non-standard
        queryset lookups.  Eg if objects are referenced using multiple
        keyword arguments in the url conf.
        """
        queryset = self.filter_queryset(self.get_queryset())

        # Perform the lookup filtering.
        lookup_url_kwarg = self.lookup_url_kwarg or self.lookup_field

        assert lookup_url_kwarg in self.kwargs, (
                'Expected view %s to be called with a URL keyword argument '
                'named "%s". Fix your URL conf, or set the `.lookup_field` '
                'attribute on the view correctly.' %
                (self.__class__.__name__, lookup_url_kwarg)
        )

        filter_kwargs = {self.lookup_field: self.kwargs[lookup_url_kwarg]}
        obj = get_object_or_404(queryset, **filter_kwargs)

        # May raise a permission denied
        self.check_object_permissions(self.request, obj)

        return obj

    def get_serializer(self, *args, **kwargs):
        """
        Return the serializer instance that should be used for validating and
        deserializing input, and for serializing output.
        """
        serializer_class = self.get_serializer_class()
        kwargs['context'] = self.get_serializer_context()
        return serializer_class(*args, **kwargs)

    def get_serializer_class(self):
        """
        Return the class to use for the serializer.
        Defaults to using `self.serializer_class`.

        You may want to override this if you need to provide different
        serializations depending on the incoming request.

        (Eg. admins get full serialization, others get basic serialization)
        """
        assert self.serializer_class is not None, (
                "'%s' should either include a `serializer_class` attribute, "
                "or override the `get_serializer_class()` method."
                % self.__class__.__name__
        )

        return self.serializer_class

    def get_serializer_context(self):
        """
        Extra context provided to the serializer class.
        """
        return {
            'request': self.request,
            'format': self.format_kwarg,
            'view': self
        }

    def filter_queryset(self, queryset):
        """
        Given a queryset, filter it with whichever filter backend is in use.

        You are unlikely to want to override this method, although you may need
        to call it either from a list view, or from a custom `get_object`
        method if you want to apply the configured filtering backend to the
        default queryset.
        """
        for backend in list(self.filter_backends):
            queryset = backend().filter_queryset(self.request, queryset, self)
        return queryset

    @property
    def paginator(self):
        """
        The paginator instance associated with the view, or `None`.
        """
        if not hasattr(self, '_paginator'):
            if self.pagination_class is None:
                self._paginator = None
            else:
                self._paginator = self.pagination_class()
        return self._paginator

    def paginate_queryset(self, queryset):
        """
        Return a single page of results, or `None` if pagination is disabled.
        """
        if self.paginator is None:
            return None
        return self.paginator.paginate_queryset(queryset, self.request, view=self)

    def get_paginated_response(self, data):
        """
        Return a paginated style `Response` object for the given output data.
        """
        assert self.paginator is not None
        return self.paginator.get_paginated_response(data)

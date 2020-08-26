from django_filters import rest_framework as filters
from xadmin_api.custom import DateFromToRangeFilter
from xadmin_api.models import TyAdminSysLog, TyAdminEmailVerifyRecord


class TyAdminSysLogFilter(filters.FilterSet):
    action_time = DateFromToRangeFilter(field_name="action_time")

    class Meta:
        model = TyAdminSysLog
        exclude = []


class TyAdminEmailVerifyRecordFilter(filters.FilterSet):
    send_time = DateFromToRangeFilter(field_name="send_time")

    class Meta:
        model = TyAdminEmailVerifyRecord
        exclude = []

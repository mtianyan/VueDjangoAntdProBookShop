import os

from django.db.models import DateTimeField, ForeignKey, BooleanField, IntegerField, CharField, ImageField, TextField

from xadmin_api_cli.utils import init_django_env


def gen_view(project_name_settings):
    init_django_env(project_name_settings)
    import django
    model_list = []
    app_name = "xadmin_api"
    model_search_dict = {}
    app_model_import_dict = {}
    sys_label = ['admin', 'auth', 'contenttypes', 'sessions', 'captcha', 'xadmin', 'xadmin_api', 'authtoken', 'social_django']
    for one in django.apps.apps.get_models():

        model_name = one._meta.model.__name__
        model_ver_name = one._meta.verbose_name
        app_label = one._meta.app_label
        if app_label not in sys_label:
            try:
                app_model_import_dict[app_label].append(model_name)
            except KeyError:
                app_model_import_dict[app_label] = [model_name]
            search_list = []
            model_list.append(model_name)
            for filed in one.objects.model._meta.fields:
                name = filed.name
                ver_name = filed.verbose_name
                if isinstance(filed, CharField):
                    search_list.append('"' + name + '"')
                elif isinstance(filed, CharField):
                    search_list.append('"' + name + '"')
            model_search_dict[model_name] = search_list
    serializers_list = [one + "Serializer" for one in model_list]
    filters_list = [one + "Filter" for one in model_list]
    viewset_txt = f"""
    from rest_framework import viewsets
    from xadmin_api.custom import XadminViewSet
    $model_import占位$
    from {app_name}.auto_serializers import {", ".join(serializers_list)}
    from {app_name}.auto_filters import {", ".join(filters_list)}
    """
    model_import_rows = []
    print(app_model_import_dict)
    for app, m_list in app_model_import_dict.items():
        txt = f'from {app}.models import {", ".join(m_list)}\n'
        model_import_rows.append(txt)
    viewset_txt = viewset_txt.replace("$model_import占位$", "".join(model_import_rows))
    for model_name in model_list:
        viewset_txt += f"""
    
    class {model_name}ViewSet(XadminViewSet):
            serializer_class = {model_name}Serializer
            queryset = {model_name}.objects.all()
            filter_class = {model_name}Filter
            search_fields = [{",".join(model_search_dict[model_name])}]
        """
    if os.path.exists('../xadmin_api/auto_views.py'):
        print("已存在views跳过")
    else:
        with open('../xadmin_api/auto_views.py', 'w') as fw:
            fw.write(viewset_txt)


if __name__ == '__main__':
    name = input("请输入项目settings位置:")
    gen_view(name)

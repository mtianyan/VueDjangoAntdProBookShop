import os

from xadmin_api_cli.utils import init_django_env, get_lower_case_name


def gen_url(project_name_settings):
    init_django_env(project_name_settings)
    import django
    model_list = []
    model_fk_dict = {}
    app_model_import_dict = {}
    sys_label = ['admin', 'auth', 'contenttypes', 'sessions', 'captcha', 'xadmin', 'xadmin_api', 'authtoken', 'social_django']
    for one in django.apps.apps.get_models():
        columns = []
        model_name = one._meta.model.__name__
        model_ver_name = one._meta.verbose_name
        app_label = one._meta.app_label
        if app_label not in sys_label:
            model_list.append(model_name)

    url_txt = f"""from xadmin_api import auto_views
from django.urls import re_path, include, path
from rest_framework.routers import DefaultRouter
    
router = DefaultRouter(trailing_slash=False)
    """

    for model_name in model_list:
        url_txt += f"""
router.register('{get_lower_case_name(model_name)}/?', auto_views.{model_name}ViewSet)
    """

    url_txt += """
urlpatterns = [
        re_path('^', include(router.urls)),
    ]
    """

    if os.path.exists('../xadmin_api/auto_url.py'):
        print("已存在urls跳过")
    else:
        with open('../xadmin_api/auto_url.py', 'w') as fw:
            fw.write(url_txt)


if __name__ == '__main__':
    name = input("请输入项目settings位置:")
    gen_url(name)

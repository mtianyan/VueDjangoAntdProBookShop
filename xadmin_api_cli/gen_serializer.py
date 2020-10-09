import os
from xadmin_api_cli.contants import MAIN_DISPLAY
from xadmin_api_cli.utils import init_django_env
#  获取当前文件的路径，以及路径的父级文件夹名
from django.db.models import DateTimeField, ForeignKey, BooleanField, IntegerField, CharField, ImageField


def gen_serializer(project_name_settings):
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
            fk_field_list = []
            try:
                app_model_import_dict[app_label].append(model_name)
            except KeyError:
                app_model_import_dict[app_label] = [model_name]
            for filed in one.objects.model._meta.fields:
                name = filed.name
                ver_name = filed.verbose_name
                if isinstance(filed, ForeignKey):
                    help_text = filed.help_text.replace(MAIN_DISPLAY + "__", "")
                    fk_field_list.append(name + "$分割$" + help_text)
            model_fk_dict[model_name] = fk_field_list
            model_list.append(model_name)
    # status_text = serializers.CharField(source="status.text", read_only=True)
    print(model_fk_dict)
    app_name = "xadmin_api"
    serializers_txt = f"""
from rest_framework import serializers
$model_import占位$
    """
    model_import_rows = []
    for app, m_list in app_model_import_dict.items():
        txt = f'from {app}.models import {", ".join(m_list)}\n'
        model_import_rows.append(txt)
    serializers_txt = serializers_txt.replace("$model_import占位$", "".join(model_import_rows))

    print(model_fk_dict)
    for model, fk_field_l in model_fk_dict.items():
        fk_display_p = []
        for one_fk in fk_field_l:
            fk_name, fk_text = one_fk.split("$分割$")
            fk_one_line = f'{fk_name}_text = serializers.CharField(source="{fk_name}.{fk_text}", read_only=True)\n'
            fk_display_p.append(fk_one_line)
        serializers_txt += f"""

class {model}Serializer(serializers.ModelSerializer):
    {"    ".join(fk_display_p)}
    class Meta:
        model = {model}
        fields = "__all__"
        """
    #
    if os.path.exists('../xadmin_api/auto_serializers.py'):
        print("已存在serializers跳过")
    else:
        with open('../xadmin_api/auto_serializers.py', 'w') as fw:
            fw.write(serializers_txt)


if __name__ == '__main__':
    name = input("请输入项目settings位置:")
    gen_serializer(name)

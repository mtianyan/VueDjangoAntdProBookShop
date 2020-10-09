import os

from django.db.models import DateTimeField, ForeignKey, ImageField, FileField

from xadmin_api_cli.contants import MAIN_DISPLAY
from xadmin_api_cli.utils import init_django_env


def gen_filter(project_name_settings):
    init_django_env(project_name_settings)
    import django

    model_list = []
    model_pic_dict = {}
    model_fk_dict = {}
    model_date_dict = {}
    app_model_import_dict = {}
    sys_label = ['admin', 'auth', 'contenttypes', 'sessions', 'captcha', 'xadmin', 'xadmin_api', 'authtoken', 'social_django']
    for one in django.apps.apps.get_models():
        columns = []
        model_name = one._meta.model.__name__
        model_ver_name = one._meta.verbose_name
        app_label = one._meta.app_label
        if app_label not in sys_label:
            try:
                app_model_import_dict[app_label].append(model_name)
            except KeyError:
                app_model_import_dict[app_label] = [model_name]
            img_field_list = []
            fk_field_list = []
            date_field_list = []
            for filed in one.objects.model._meta.fields:
                name = filed.name
                ver_name = filed.verbose_name
                if isinstance(filed, ImageField):
                    img_field_list.append('"' + name + '"')
                if isinstance(filed, FileField):
                    img_field_list.append('"' + name + '"')
                if isinstance(filed, ForeignKey):
                    help_text = filed.help_text.replace(MAIN_DISPLAY + "__", "")
                    fk_field_list.append(name + "$分割$" + help_text)
                if isinstance(filed, DateTimeField):
                    date_field_list.append(name)
            model_pic_dict[model_name] = img_field_list
            model_fk_dict[model_name] = fk_field_list
            model_date_dict[model_name] = date_field_list
            model_list.append(model_name)
    app_name = "xadmin_api"
    filters_txt = f"""
from django_filters import rest_framework as filters
from xadmin_api.custom import DateFromToRangeFilter
$model_import占位$
        """
    model_import_rows = []
    for app, m_list in app_model_import_dict.items():
        txt = f'from {app}.models import {", ".join(m_list)}\n'
        model_import_rows.append(txt)
    filters_txt = filters_txt.replace("$model_import占位$", "".join(model_import_rows))
    for (model, img_field_l), (model_2, fk_field_l), (model_3, date_field_l) in zip(model_pic_dict.items(), model_fk_dict.items(),
                                                                                    model_date_dict.items()):
        fk_display_p = []
        for one_fk in fk_field_l:
            fk_name, fk_text = one_fk.split("$分割$")
            fk_one_line = f'    {fk_name}_text = filters.CharFilter(field_name="{fk_name}")\n'
            fk_display_p.append(fk_one_line)
        date_range_p = []
        for one_date in date_field_l:
            date_one_line = f'    {one_date} = DateFromToRangeFilter(field_name="{one_date}")\n'
            date_range_p.append(date_one_line)
        filters_txt += f"""

class {model}Filter(filters.FilterSet):
{"".join(fk_display_p)}{"".join(date_range_p)}
    class Meta:
        model = {model}
        exclude = [{",".join(img_field_l)}]
    """

    if os.path.exists('../xadmin_api/auto_filters.py'):
        print("已存在filters.py跳过")
    else:
        with open('../xadmin_api/auto_filters.py', 'w') as fw:
            fw.write(filters_txt)


if __name__ == '__main__':
    name = input("请输入项目settings位置:")
    gen_filter(name)

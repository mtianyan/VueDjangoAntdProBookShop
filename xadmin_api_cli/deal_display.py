from xadmin_api_cli.utils import init_django_env


def gen_table_display(project_name_settings, list_display, focus_model):
    init_django_env(project_name_settings)
    import django

    for one in django.apps.apps.get_models():
        if one._meta.model.__name__ == focus_model:
            print("{")
            for filed in one.objects.model._meta.fields:
                if filed.name in list_display:
                    pass
                else:
                    print("""%s: {
          show: false,
        },""" % (filed.name))
            print("}")


if __name__ == '__main__':
    list_display_value = ['code', 'name', 'acl_module', 'url', 'type', 'status', 'remark']
    model_name = "SysAcl"
    settings_name = input("请输入项目settings位置:")
    gen_table_display(list_display_value, settings_name, model_name)

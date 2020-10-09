from xadmin_api_cli.utils import init_django_env


def migration_from_xadmin(project_name_settings):
    init_django_env(project_name_settings)
    import xadmin
    for one, item in xadmin.site._registry.items():
        print(one._meta.object_name)
        print(item.list_display)
        print(item.list_filter)
        print(item.search_fields)


if __name__ == '__main__':
    # TODO 提供xadmin迁移到TyAdmin的工具
    name = input("请输入项目settings位置:")
    migration_from_xadmin(name)

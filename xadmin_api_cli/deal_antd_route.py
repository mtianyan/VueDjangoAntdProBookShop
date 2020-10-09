from xadmin_api_cli.utils import get_lower_case_name, init_django_env


def gen_route(project_name_settings):
    init_django_env(project_name_settings)
    import django
    path_list = []
    sys_label = ['admin', 'auth', 'contenttypes', 'sessions', 'captcha', 'xadmin', 'xadmin_api', 'authtoken', 'social_django']
    for one in django.apps.apps.get_models():
        if one._meta.app_label not in sys_label:
            url = "/xadmin/" + get_lower_case_name(one._meta.model.__name__)
            one = "{" + f"""
                      name: '{one._meta.verbose_name}',
                      icon: 'smile',
                      path: '{url}',
                      component: './AutoGenPage/{one._meta.model.__name__}List',
                   """ + "}"
            # print(one)
            path_list.append(one)
    with open('../xadmin_api/menu.json', 'w') as fw:
        fw.write("["+",".join(path_list)+"]")


if __name__ == '__main__':
    name = input("请输入项目settings位置:")
    gen_route(name)

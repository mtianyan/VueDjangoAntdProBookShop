from xadmin_api_cli.gen_filter import gen_filter
from xadmin_api_cli.gen_serializer import gen_serializer
from xadmin_api_cli.gen_url import gen_url
from xadmin_api_cli.gen_view import gen_view


def gen_all(project_name_settings):
    gen_url(project_name_settings)
    print("*" * 20, "已自动生成urls", "*" * 20)
    gen_view(project_name_settings)
    print("*" * 20, "已自动生成views", "*" * 20)
    gen_serializer(project_name_settings)
    print("*" * 20, "已自动生成serializers", "*" * 20)
    gen_filter(project_name_settings)
    print("*" * 20, "已自动生成filters", "*" * 20)


if __name__ == '__main__':
    name = input("请输入项目settings名称:")
    gen_all(name)

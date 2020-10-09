import os
import sys

import django


def init_django_env(project_name_settings):
    pwd = os.path.dirname(os.path.realpath(__file__))
    print(pwd)
    # 将项目目录加入setting
    sys.path.append(pwd)
    # manage.py中
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", f"{project_name_settings}")

    django.setup()


def get_lower_case_name(text):
    lst = []
    for index, char in enumerate(text):
        if char.isupper() and index != 0:
            lst.append("_")
        lst.append(char)

    return "".join(lst).lower()

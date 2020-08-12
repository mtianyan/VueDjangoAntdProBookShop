import os
import re
from pathlib import Path


def get_lower_case_name(text):
    lst = []
    for index, char in enumerate(text):
        if char.isupper() and index != 0:
            lst.append("_")
        lst.append(char)

    return "".join(lst).lower()


# 独立使用django的model
import sys
import os

#  获取当前文件的路径，以及路径的父级文件夹名
from django.db.models import DateTimeField

pwd = os.path.dirname(os.path.realpath(__file__))
print(pwd)
# 将项目目录加入setting
sys.path.append(pwd)
# manage.py中
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "VueDjangoFrameWorkShop.settings")

import django

django.setup()
import django.apps


app_path_list = []
app_map = {
}
for one in django.apps.apps.get_app_configs():
    if one.label in ["goods", "trade", "user_operation", "users"]:
    # if one.label in ["goods"]:
        model_list = []
        for model_key, model_item in one.models.items():
            model_list.append(model_item._meta.object_name)
        app_map[one.label] = model_list
        app_path_list.append(one.path)

print(app_map)
print(app_path_list)

for (app_name, model_list), app_path in zip(app_map.items(), app_path_list):
    serializers_txt = f"""from rest_framework import serializers

from {app_name}.models import {", ".join(model_list)}
"""
    for model in model_list:
        serializers_txt += f"""

class {model}Serializer(serializers.ModelSerializer):
    class Meta:
        model = {model}
        fields = "__all__"
"""
    write_path = os.path.join(app_path, 'xadmin_serializers.py')
    if os.path.exists(write_path):
        print("已存在serializers跳过")
    else:
        with open(write_path, 'w') as fw:
            fw.write(serializers_txt)

    serializers_list = [one + "Serializer" for one in model_list]
    viewset_txt = f"""from rest_framework import viewsets
    
from {app_name}.models import {", ".join(model_list)}
from {app_name}.xadmin_serializers import {", ".join(serializers_list)}
    """

    for model_name in model_list:
        viewset_txt += f"""

class {model_name}ViewSet(viewsets.ModelViewSet):
    serializer_class = {model_name}Serializer
    queryset = {model_name}.objects.all()
"""
    write_view_path = os.path.join(app_path, 'xadmin_api_views.py')
    if os.path.exists(write_view_path):
        print("已存在views跳过")
    else:
        with open(write_view_path, 'w') as fw:
            fw.write(viewset_txt)

    url_txt = f"""from {app_name} import xadmin_api_views
from django.urls import re_path, include, path
from rest_framework.routers import DefaultRouter
    
router = DefaultRouter(trailing_slash=False)
"""
    for model_name in model_list:
        url_txt += f"""
router.register('{get_lower_case_name(model_name)}/?', xadmin_api_views.{model_name}ViewSet)
    """

    url_txt += """
urlpatterns = [
    re_path('^', include(router.urls)),
]"""
    write_url_path = os.path.join(app_path, 'xadmin_api_urls.py')
    if os.path.exists(write_url_path):
        print("已存在urls跳过")
    else:
        with open(write_url_path, 'w') as fw:
            fw.write(url_txt)

# encoding: utf-8
__author__ = 'mtianyan'
__date__ = '2018/3/9 0009 09:29'

from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

from django.contrib.auth import get_user_model

User = get_user_model()


# 参数一接收哪种信号，参数二是接收哪个model的信号
# @receiver(post_save, sender=User)
# def create_auth_token(sender, instance=None, created=False, **kwargs):
#     # 是否新建，因为update的时候也会进行post_save
#     if created:
#         password = instance.password
#         instance.set_password(password)
#         instance.save()

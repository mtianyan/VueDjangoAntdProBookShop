from tyadmin_api_cli.utils import init_django_env

init_django_env("skyoms.settings")
import django
model_list = django.apps.apps.get_models()
for one in model_list:
    print(one.objects.model._meta.object_name)
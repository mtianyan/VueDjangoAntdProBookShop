from django.shortcuts import render

# Create your views here.
from django.views import View

from replace.models import VersionControl

media_path_me = 'http://{0}/root/projects/VueDjangoFrameWorkShop/media/'.format('vueshopstatic.mtianyan.cn')


class IndexView(View):
    def get(self, request):
        # 取出版本控制信息
        version_info = VersionControl.objects.all().order_by('-add_time')[0]
        js_url = media_path_me + str(version_info.file)
        return render(request, 'index.html', {
            'js_url': js_url,
        })

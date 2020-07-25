# encoding: utf-8
from goods.models import Goods

__author__ = 'mtianyan'
__date__ = '2018/2/14 0014 15:15'

from django.views.generic.base import View


class GoodsListView(View):
    def get(self, request):
        """
        通过django的view实现商品列表页
        """
        json_list = []
        goods = Goods.objects.all()[:10]

        # for good in goods:
        #     json_dict = {}
        #     json_dict["name"] = good.name
        #     json_dict["category"] = good.category.name
        #     json_dict["market_price"] = good.market_price
        #     json_dict["add_time"] = good.add_time
        #     json_list.append(json_dict)

        # from django.http import HttpResponse
        # import json
        # return HttpResponse(json.dumps(json_list),content_type="application/json")

        from django.forms.models import model_to_dict
        for good in goods:
            json_dict = model_to_dict(good)
            json_list.append(json_dict)

        import json
        from django.core import serializers
        json_data = serializers.serialize('json', goods)
        json_data = json.loads(json_data)
        from django.http import HttpResponse, JsonResponse
        # jsonResponse做的工作也就是加上了dumps和content_type
        # return HttpResponse(json.dumps(json_data), content_type="application/json")
        # 注释掉loads，下面语句正常
        # return HttpResponse(json_data, content_type="application/json")
        return JsonResponse(json_data, safe=False)

from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from collections import OrderedDict


class CustomPageNumberPagination(PageNumberPagination):
    page_query_param = 'current'
    page_size_query_param = 'pageSize'

    def get_paginated_response(self, data):
        return Response(OrderedDict([
            ('total', self.page.paginator.count),
            ('data', data),
            ('current', self.page.number),
            ('success', True),
            ('pageSize', self.page.paginator.per_page)
        ]))

    def get_results(self, data):
        return data['data']

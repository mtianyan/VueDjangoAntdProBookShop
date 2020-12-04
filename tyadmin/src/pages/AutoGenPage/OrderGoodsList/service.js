import request from 'umi-request';

import { buildFileFormData } from '@/utils/utils'
export async function queryOrderGoods(params) {
  return request('/api/xadmin/v1/order_goods', {
    params,
  });
}
export async function removeOrderGoods(params) {
  return request(`/api/xadmin/v1/order_goods/${params}`, {
    method: 'DELETE',
  });
}
export async function addOrderGoods(params) {
  let fileFieldList = []
  let fileData = buildFileFormData(params, fileFieldList);
  return request('/api/xadmin/v1/order_goods', {
    method: 'POST',
    data: fileData,
  });
}
export async function updateOrderGoods(params, id) {
  let fileFieldList = []
  let fileData = buildFileFormData(params, fileFieldList);
  return request(`/api/xadmin/v1/order_goods/${id}`, {
    method: 'PUT',
    data: fileData,
  });
}
export async function queryOrderGoodsVerboseName(params) {
  return request('/api/xadmin/v1/order_goods/verbose_name', {
    params,
  });
}
export async function queryOrderGoodsListDisplay(params) {
  return request('/api/xadmin/v1/order_goods/list_display', {
    params,
  });
}
export async function queryOrderGoodsDisplayOrder(params) {
  return request('/api/xadmin/v1/order_goods/display_order', {
    params,
  });
}



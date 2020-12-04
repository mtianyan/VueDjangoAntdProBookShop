import request from 'umi-request';

import { buildFileFormData } from '@/utils/utils'
export async function queryOrderInfo(params) {
  return request('/api/xadmin/v1/order_info', {
    params,
  });
}
export async function removeOrderInfo(params) {
  return request(`/api/xadmin/v1/order_info/${params}`, {
    method: 'DELETE',
  });
}
export async function addOrderInfo(params) {
  let fileFieldList = []
  let fileData = buildFileFormData(params, fileFieldList);
  return request('/api/xadmin/v1/order_info', {
    method: 'POST',
    data: fileData,
  });
}
export async function updateOrderInfo(params, id) {
  let fileFieldList = []
  let fileData = buildFileFormData(params, fileFieldList);
  return request(`/api/xadmin/v1/order_info/${id}`, {
    method: 'PUT',
    data: fileData,
  });
}
export async function queryOrderInfoVerboseName(params) {
  return request('/api/xadmin/v1/order_info/verbose_name', {
    params,
  });
}
export async function queryOrderInfoListDisplay(params) {
  return request('/api/xadmin/v1/order_info/list_display', {
    params,
  });
}
export async function queryOrderInfoDisplayOrder(params) {
  return request('/api/xadmin/v1/order_info/display_order', {
    params,
  });
}



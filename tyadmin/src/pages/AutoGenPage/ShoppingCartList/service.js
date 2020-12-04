import request from 'umi-request';

import { buildFileFormData } from '@/utils/utils'
export async function queryShoppingCart(params) {
  return request('/api/xadmin/v1/shopping_cart', {
    params,
  });
}
export async function removeShoppingCart(params) {
  return request(`/api/xadmin/v1/shopping_cart/${params}`, {
    method: 'DELETE',
  });
}
export async function addShoppingCart(params) {
  let fileFieldList = []
  let fileData = buildFileFormData(params, fileFieldList);
  return request('/api/xadmin/v1/shopping_cart', {
    method: 'POST',
    data: fileData,
  });
}
export async function updateShoppingCart(params, id) {
  let fileFieldList = []
  let fileData = buildFileFormData(params, fileFieldList);
  return request(`/api/xadmin/v1/shopping_cart/${id}`, {
    method: 'PUT',
    data: fileData,
  });
}
export async function queryShoppingCartVerboseName(params) {
  return request('/api/xadmin/v1/shopping_cart/verbose_name', {
    params,
  });
}
export async function queryShoppingCartListDisplay(params) {
  return request('/api/xadmin/v1/shopping_cart/list_display', {
    params,
  });
}
export async function queryShoppingCartDisplayOrder(params) {
  return request('/api/xadmin/v1/shopping_cart/display_order', {
    params,
  });
}



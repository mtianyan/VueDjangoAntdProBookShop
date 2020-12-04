import request from 'umi-request';

import { buildFileFormData } from '@/utils/utils'
export async function queryGoodsCategory(params) {
  return request('/api/xadmin/v1/goods_category', {
    params,
  });
}
export async function removeGoodsCategory(params) {
  return request(`/api/xadmin/v1/goods_category/${params}`, {
    method: 'DELETE',
  });
}
export async function addGoodsCategory(params) {
  let fileFieldList = []
  let fileData = buildFileFormData(params, fileFieldList);
  return request('/api/xadmin/v1/goods_category', {
    method: 'POST',
    data: fileData,
  });
}
export async function updateGoodsCategory(params, id) {
  let fileFieldList = []
  let fileData = buildFileFormData(params, fileFieldList);
  return request(`/api/xadmin/v1/goods_category/${id}`, {
    method: 'PUT',
    data: fileData,
  });
}
export async function queryGoodsCategoryVerboseName(params) {
  return request('/api/xadmin/v1/goods_category/verbose_name', {
    params,
  });
}
export async function queryGoodsCategoryListDisplay(params) {
  return request('/api/xadmin/v1/goods_category/list_display', {
    params,
  });
}
export async function queryGoodsCategoryDisplayOrder(params) {
  return request('/api/xadmin/v1/goods_category/display_order', {
    params,
  });
}



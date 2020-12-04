import request from 'umi-request';

import { buildFileFormData } from '@/utils/utils'
export async function queryGoodsCategoryBrand(params) {
  return request('/api/xadmin/v1/goods_category_brand', {
    params,
  });
}
export async function removeGoodsCategoryBrand(params) {
  return request(`/api/xadmin/v1/goods_category_brand/${params}`, {
    method: 'DELETE',
  });
}
export async function addGoodsCategoryBrand(params) {
  let fileFieldList = ["image"]
  let fileData = buildFileFormData(params, fileFieldList);
  return request('/api/xadmin/v1/goods_category_brand', {
    method: 'POST',
    data: fileData,
  });
}
export async function updateGoodsCategoryBrand(params, id) {
  let fileFieldList = ["image"]
  let fileData = buildFileFormData(params, fileFieldList);
  return request(`/api/xadmin/v1/goods_category_brand/${id}`, {
    method: 'PUT',
    data: fileData,
  });
}
export async function queryGoodsCategoryBrandVerboseName(params) {
  return request('/api/xadmin/v1/goods_category_brand/verbose_name', {
    params,
  });
}
export async function queryGoodsCategoryBrandListDisplay(params) {
  return request('/api/xadmin/v1/goods_category_brand/list_display', {
    params,
  });
}
export async function queryGoodsCategoryBrandDisplayOrder(params) {
  return request('/api/xadmin/v1/goods_category_brand/display_order', {
    params,
  });
}



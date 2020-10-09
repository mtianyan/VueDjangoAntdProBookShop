import request from 'umi-request';
import {buildFileFormData} from '@/utils/utils'
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

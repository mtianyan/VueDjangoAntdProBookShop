import request from 'umi-request';
import {buildFileFormData} from '@/utils/utils'
export async function queryGoodsImage(params) {
  return request('/api/xadmin/v1/goods_image', {
    params,
  });
}
export async function removeGoodsImage(params) {
  return request(`/api/xadmin/v1/goods_image/${params}`, {
    method: 'DELETE',
  });
}
export async function addGoodsImage(params) {
  let fileFieldList = ["image"]
  let fileData = buildFileFormData(params, fileFieldList);
  return request('/api/xadmin/v1/goods_image', {
    method: 'POST',
    data: fileData,
  });
}
export async function updateGoodsImage(params, id) {
  let fileFieldList = ["image"]
  let fileData = buildFileFormData(params, fileFieldList);
  return request(`/api/xadmin/v1/goods_image/${id}`, {
    method: 'PUT',
    data: fileData,
  });
}

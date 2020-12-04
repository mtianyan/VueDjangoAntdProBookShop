import request from 'umi-request';

import { buildFileFormData } from '@/utils/utils'
export async function queryIndexAd(params) {
  return request('/api/xadmin/v1/index_ad', {
    params,
  });
}
export async function removeIndexAd(params) {
  return request(`/api/xadmin/v1/index_ad/${params}`, {
    method: 'DELETE',
  });
}
export async function addIndexAd(params) {
  let fileFieldList = []
  let fileData = buildFileFormData(params, fileFieldList);
  return request('/api/xadmin/v1/index_ad', {
    method: 'POST',
    data: fileData,
  });
}
export async function updateIndexAd(params, id) {
  let fileFieldList = []
  let fileData = buildFileFormData(params, fileFieldList);
  return request(`/api/xadmin/v1/index_ad/${id}`, {
    method: 'PUT',
    data: fileData,
  });
}
export async function queryIndexAdVerboseName(params) {
  return request('/api/xadmin/v1/index_ad/verbose_name', {
    params,
  });
}
export async function queryIndexAdListDisplay(params) {
  return request('/api/xadmin/v1/index_ad/list_display', {
    params,
  });
}
export async function queryIndexAdDisplayOrder(params) {
  return request('/api/xadmin/v1/index_ad/display_order', {
    params,
  });
}



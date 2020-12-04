import request from 'umi-request';

import { buildFileFormData } from '@/utils/utils'
export async function queryBanner(params) {
  return request('/api/xadmin/v1/banner', {
    params,
  });
}
export async function removeBanner(params) {
  return request(`/api/xadmin/v1/banner/${params}`, {
    method: 'DELETE',
  });
}
export async function addBanner(params) {
  let fileFieldList = ["image"]
  let fileData = buildFileFormData(params, fileFieldList);
  return request('/api/xadmin/v1/banner', {
    method: 'POST',
    data: fileData,
  });
}
export async function updateBanner(params, id) {
  let fileFieldList = ["image"]
  let fileData = buildFileFormData(params, fileFieldList);
  return request(`/api/xadmin/v1/banner/${id}`, {
    method: 'PUT',
    data: fileData,
  });
}
export async function queryBannerVerboseName(params) {
  return request('/api/xadmin/v1/banner/verbose_name', {
    params,
  });
}
export async function queryBannerListDisplay(params) {
  return request('/api/xadmin/v1/banner/list_display', {
    params,
  });
}
export async function queryBannerDisplayOrder(params) {
  return request('/api/xadmin/v1/banner/display_order', {
    params,
  });
}



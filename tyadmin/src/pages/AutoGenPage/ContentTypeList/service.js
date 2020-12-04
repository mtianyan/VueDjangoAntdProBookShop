import request from 'umi-request';

import { buildFileFormData } from '@/utils/utils'
export async function queryContentType(params) {
  return request('/api/xadmin/v1/content_type', {
    params,
  });
}
export async function removeContentType(params) {
  return request(`/api/xadmin/v1/content_type/${params}`, {
    method: 'DELETE',
  });
}
export async function addContentType(params) {
  let fileFieldList = []
  let fileData = buildFileFormData(params, fileFieldList);
  return request('/api/xadmin/v1/content_type', {
    method: 'POST',
    data: fileData,
  });
}
export async function updateContentType(params, id) {
  let fileFieldList = []
  let fileData = buildFileFormData(params, fileFieldList);
  return request(`/api/xadmin/v1/content_type/${id}`, {
    method: 'PUT',
    data: fileData,
  });
}
export async function queryContentTypeVerboseName(params) {
  return request('/api/xadmin/v1/content_type/verbose_name', {
    params,
  });
}
export async function queryContentTypeListDisplay(params) {
  return request('/api/xadmin/v1/content_type/list_display', {
    params,
  });
}
export async function queryContentTypeDisplayOrder(params) {
  return request('/api/xadmin/v1/content_type/display_order', {
    params,
  });
}



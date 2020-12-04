import request from 'umi-request';

import { buildFileFormData } from '@/utils/utils'
export async function queryPermission(params) {
  return request('/api/xadmin/v1/permission', {
    params,
  });
}
export async function removePermission(params) {
  return request(`/api/xadmin/v1/permission/${params}`, {
    method: 'DELETE',
  });
}
export async function addPermission(params) {
  let fileFieldList = []
  let fileData = buildFileFormData(params, fileFieldList);
  return request('/api/xadmin/v1/permission', {
    method: 'POST',
    data: fileData,
  });
}
export async function updatePermission(params, id) {
  let fileFieldList = []
  let fileData = buildFileFormData(params, fileFieldList);
  return request(`/api/xadmin/v1/permission/${id}`, {
    method: 'PUT',
    data: fileData,
  });
}
export async function queryPermissionVerboseName(params) {
  return request('/api/xadmin/v1/permission/verbose_name', {
    params,
  });
}
export async function queryPermissionListDisplay(params) {
  return request('/api/xadmin/v1/permission/list_display', {
    params,
  });
}
export async function queryPermissionDisplayOrder(params) {
  return request('/api/xadmin/v1/permission/display_order', {
    params,
  });
}



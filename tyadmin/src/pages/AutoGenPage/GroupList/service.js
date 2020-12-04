import request from 'umi-request';

import { buildFileFormData } from '@/utils/utils'
export async function queryGroup(params) {
  return request('/api/xadmin/v1/group', {
    params,
  });
}
export async function removeGroup(params) {
  return request(`/api/xadmin/v1/group/${params}`, {
    method: 'DELETE',
  });
}
export async function addGroup(params) {
  let fileFieldList = []
  let fileData = buildFileFormData(params, fileFieldList);
  return request('/api/xadmin/v1/group', {
    method: 'POST',
    data: fileData,
  });
}
export async function updateGroup(params, id) {
  let fileFieldList = []
  let fileData = buildFileFormData(params, fileFieldList);
  return request(`/api/xadmin/v1/group/${id}`, {
    method: 'PUT',
    data: fileData,
  });
}
export async function queryGroupVerboseName(params) {
  return request('/api/xadmin/v1/group/verbose_name', {
    params,
  });
}
export async function queryGroupListDisplay(params) {
  return request('/api/xadmin/v1/group/list_display', {
    params,
  });
}
export async function queryGroupDisplayOrder(params) {
  return request('/api/xadmin/v1/group/display_order', {
    params,
  });
}



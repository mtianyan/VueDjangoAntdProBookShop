import request from 'umi-request';

import { buildFileFormData } from '@/utils/utils'
export async function queryUserAddress(params) {
  return request('/api/xadmin/v1/user_address', {
    params,
  });
}
export async function removeUserAddress(params) {
  return request(`/api/xadmin/v1/user_address/${params}`, {
    method: 'DELETE',
  });
}
export async function addUserAddress(params) {
  let fileFieldList = []
  let fileData = buildFileFormData(params, fileFieldList);
  return request('/api/xadmin/v1/user_address', {
    method: 'POST',
    data: fileData,
  });
}
export async function updateUserAddress(params, id) {
  let fileFieldList = []
  let fileData = buildFileFormData(params, fileFieldList);
  return request(`/api/xadmin/v1/user_address/${id}`, {
    method: 'PUT',
    data: fileData,
  });
}
export async function queryUserAddressVerboseName(params) {
  return request('/api/xadmin/v1/user_address/verbose_name', {
    params,
  });
}
export async function queryUserAddressListDisplay(params) {
  return request('/api/xadmin/v1/user_address/list_display', {
    params,
  });
}
export async function queryUserAddressDisplayOrder(params) {
  return request('/api/xadmin/v1/user_address/display_order', {
    params,
  });
}



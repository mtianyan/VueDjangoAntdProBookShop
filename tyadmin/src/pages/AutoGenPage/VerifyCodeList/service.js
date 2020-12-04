import request from 'umi-request';

import { buildFileFormData } from '@/utils/utils'
export async function queryVerifyCode(params) {
  return request('/api/xadmin/v1/verify_code', {
    params,
  });
}
export async function removeVerifyCode(params) {
  return request(`/api/xadmin/v1/verify_code/${params}`, {
    method: 'DELETE',
  });
}
export async function addVerifyCode(params) {
  let fileFieldList = []
  let fileData = buildFileFormData(params, fileFieldList);
  return request('/api/xadmin/v1/verify_code', {
    method: 'POST',
    data: fileData,
  });
}
export async function updateVerifyCode(params, id) {
  let fileFieldList = []
  let fileData = buildFileFormData(params, fileFieldList);
  return request(`/api/xadmin/v1/verify_code/${id}`, {
    method: 'PUT',
    data: fileData,
  });
}
export async function queryVerifyCodeVerboseName(params) {
  return request('/api/xadmin/v1/verify_code/verbose_name', {
    params,
  });
}
export async function queryVerifyCodeListDisplay(params) {
  return request('/api/xadmin/v1/verify_code/list_display', {
    params,
  });
}
export async function queryVerifyCodeDisplayOrder(params) {
  return request('/api/xadmin/v1/verify_code/display_order', {
    params,
  });
}

export async function updateUserPassword(params) {
    return request('/api/xadmin/v1/list_change_password', {
     method: 'POST',
     data: { ...params},
});
}


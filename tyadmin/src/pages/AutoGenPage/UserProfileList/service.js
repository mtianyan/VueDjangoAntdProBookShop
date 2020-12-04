import request from 'umi-request';

import { buildFileFormData } from '@/utils/utils'
export async function queryUserProfile(params) {
  return request('/api/xadmin/v1/user_profile', {
    params,
  });
}
export async function removeUserProfile(params) {
  return request(`/api/xadmin/v1/user_profile/${params}`, {
    method: 'DELETE',
  });
}
export async function addUserProfile(params) {
  let fileFieldList = []
  let fileData = buildFileFormData(params, fileFieldList);
  return request('/api/xadmin/v1/user_profile', {
    method: 'POST',
    data: fileData,
  });
}
export async function updateUserProfile(params, id) {
  let fileFieldList = []
  let fileData = buildFileFormData(params, fileFieldList);
  return request(`/api/xadmin/v1/user_profile/${id}`, {
    method: 'PUT',
    data: fileData,
  });
}
export async function queryUserProfileVerboseName(params) {
  return request('/api/xadmin/v1/user_profile/verbose_name', {
    params,
  });
}
export async function queryUserProfileListDisplay(params) {
  return request('/api/xadmin/v1/user_profile/list_display', {
    params,
  });
}
export async function queryUserProfileDisplayOrder(params) {
  return request('/api/xadmin/v1/user_profile/display_order', {
    params,
  });
}

export async function updateUserPassword(params) {
    return request('/api/xadmin/v1/list_change_password', {
     method: 'POST',
     data: { ...params},
});
}


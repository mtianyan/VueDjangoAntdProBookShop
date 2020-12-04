import request from 'umi-request';

import { buildFileFormData } from '@/utils/utils'
export async function queryUserFav(params) {
  return request('/api/xadmin/v1/user_fav', {
    params,
  });
}
export async function removeUserFav(params) {
  return request(`/api/xadmin/v1/user_fav/${params}`, {
    method: 'DELETE',
  });
}
export async function addUserFav(params) {
  let fileFieldList = []
  let fileData = buildFileFormData(params, fileFieldList);
  return request('/api/xadmin/v1/user_fav', {
    method: 'POST',
    data: fileData,
  });
}
export async function updateUserFav(params, id) {
  let fileFieldList = []
  let fileData = buildFileFormData(params, fileFieldList);
  return request(`/api/xadmin/v1/user_fav/${id}`, {
    method: 'PUT',
    data: fileData,
  });
}
export async function queryUserFavVerboseName(params) {
  return request('/api/xadmin/v1/user_fav/verbose_name', {
    params,
  });
}
export async function queryUserFavListDisplay(params) {
  return request('/api/xadmin/v1/user_fav/list_display', {
    params,
  });
}
export async function queryUserFavDisplayOrder(params) {
  return request('/api/xadmin/v1/user_fav/display_order', {
    params,
  });
}



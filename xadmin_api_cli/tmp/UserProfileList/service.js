import request from 'umi-request';

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
  return request('/api/xadmin/v1/user_profile', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}
export async function updateUserProfile(params, id) {
  return request(`/api/xadmin/v1/user_profile/${id}`, {
    method: 'PUT',
    data: { ...params, id},
  });
}

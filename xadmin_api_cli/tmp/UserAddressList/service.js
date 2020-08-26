import request from 'umi-request';

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
  return request('/api/xadmin/v1/user_address', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}
export async function updateUserAddress(params, id) {
  return request(`/api/xadmin/v1/user_address/${id}`, {
    method: 'PUT',
    data: { ...params, id},
  });
}

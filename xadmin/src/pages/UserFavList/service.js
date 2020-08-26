import request from 'umi-request';

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
  return request('/api/xadmin/v1/user_fav', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}
export async function updateUserFav(params, id) {
  return request(`/api/xadmin/v1/user_fav/${id}`, {
    method: 'PUT',
    data: { ...params, id},
  });
}

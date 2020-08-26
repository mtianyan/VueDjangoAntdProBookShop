import request from 'umi-request';

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
  return request('/api/xadmin/v1/verify_code', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}
export async function updateVerifyCode(params, id) {
  return request(`/api/xadmin/v1/verify_code/${id}`, {
    method: 'PUT',
    data: { ...params, id},
  });
}

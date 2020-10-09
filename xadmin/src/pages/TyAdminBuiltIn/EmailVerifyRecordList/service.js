import request from 'umi-request';

export async function queryEmailVerifyRecord(params) {
  return request('/api/xadmin/v1/email_verify_record', {
    params,
  });
}
export async function removeEmailVerifyRecord(params) {
  return request(`/api/xadmin/v1/email_verify_record/${params}`, {
    method: 'DELETE',
  });
}
export async function addEmailVerifyRecord(params) {
  return request('/api/xadmin/v1/email_verify_record', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}
export async function updateEmailVerifyRecord(params, id) {
  return request(`/api/xadmin/v1/email_verify_record/${id}`, {
    method: 'PUT',
    data: { ...params, id},
  });
}

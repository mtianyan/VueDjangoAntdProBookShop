import request from 'umi-request';

export async function queryTyAdminEmailVerifyRecord(params) {
  return request('/api/xadmin/v1/ty_admin_email_verify_record', {
    params,
  });
}
export async function removeTyAdminEmailVerifyRecord(params) {
  return request(`/api/xadmin/v1/ty_admin_email_verify_record/${params}`, {
    method: 'DELETE',
  });
}
export async function addTyAdminEmailVerifyRecord(params) {
  return request('/api/xadmin/v1/ty_admin_email_verify_record', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}
export async function updateTyAdminEmailVerifyRecord(params, id) {
  return request(`/api/xadmin/v1/ty_admin_email_verify_record/${id}`, {
    method: 'PUT',
    data: { ...params, id},
  });
}

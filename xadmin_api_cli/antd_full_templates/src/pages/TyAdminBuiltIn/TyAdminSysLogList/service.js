import request from 'umi-request';

export async function queryTyAdminSysLog(params) {
  return request('/api/xadmin/v1/ty_admin_sys_log', {
    params,
  });
}
export async function removeTyAdminSysLog(params) {
  return request(`/api/xadmin/v1/ty_admin_sys_log/${params}`, {
    method: 'DELETE',
  });
}
export async function addTyAdminSysLog(params) {
  return request('/api/xadmin/v1/ty_admin_sys_log', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}
export async function updateTyAdminSysLog(params, id) {
  return request(`/api/xadmin/v1/ty_admin_sys_log/${id}`, {
    method: 'PUT',
    data: { ...params, id},
  });
}

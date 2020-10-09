import request from 'umi-request';

export async function query$占位模型名$(params) {
  return request('/api/xadmin/v1/$占位path$', {
    params,
  });
}
export async function remove$占位模型名$(params) {
  return request(`/api/xadmin/v1/$占位path$/${params}`, {
    method: 'DELETE',
  });
}
export async function add$占位模型名$(params) {
  return request('/api/xadmin/v1/$占位path$', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}
export async function update$占位模型名$(params, id) {
  return request(`/api/xadmin/v1/$占位path$/${id}`, {
    method: 'PUT',
    data: { ...params, id},
  });
}

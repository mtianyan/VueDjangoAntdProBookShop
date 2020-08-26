import request from 'umi-request';

export async function queryOrderInfo(params) {
  return request('/api/xadmin/v1/order_info', {
    params,
  });
}
export async function removeOrderInfo(params) {
  return request(`/api/xadmin/v1/order_info/${params}`, {
    method: 'DELETE',
  });
}
export async function addOrderInfo(params) {
  return request('/api/xadmin/v1/order_info', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}
export async function updateOrderInfo(params, id) {
  return request(`/api/xadmin/v1/order_info/${id}`, {
    method: 'PUT',
    data: { ...params, id},
  });
}

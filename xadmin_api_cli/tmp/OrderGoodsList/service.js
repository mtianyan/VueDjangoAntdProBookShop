import request from 'umi-request';

export async function queryOrderGoods(params) {
  return request('/api/xadmin/v1/order_goods', {
    params,
  });
}
export async function removeOrderGoods(params) {
  return request(`/api/xadmin/v1/order_goods/${params}`, {
    method: 'DELETE',
  });
}
export async function addOrderGoods(params) {
  return request('/api/xadmin/v1/order_goods', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}
export async function updateOrderGoods(params, id) {
  return request(`/api/xadmin/v1/order_goods/${id}`, {
    method: 'PUT',
    data: { ...params, id},
  });
}

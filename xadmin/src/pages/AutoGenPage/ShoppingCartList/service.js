import request from 'umi-request';

export async function queryShoppingCart(params) {
  return request('/api/xadmin/v1/shopping_cart', {
    params,
  });
}
export async function removeShoppingCart(params) {
  return request(`/api/xadmin/v1/shopping_cart/${params}`, {
    method: 'DELETE',
  });
}
export async function addShoppingCart(params) {
  return request('/api/xadmin/v1/shopping_cart', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}
export async function updateShoppingCart(params, id) {
  return request(`/api/xadmin/v1/shopping_cart/${id}`, {
    method: 'PUT',
    data: { ...params, id},
  });
}

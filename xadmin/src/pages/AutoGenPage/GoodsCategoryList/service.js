import request from 'umi-request';

export async function queryGoodsCategory(params) {
  return request('/api/xadmin/v1/goods_category', {
    params,
  });
}
export async function removeGoodsCategory(params) {
  return request(`/api/xadmin/v1/goods_category/${params}`, {
    method: 'DELETE',
  });
}
export async function addGoodsCategory(params) {
  return request('/api/xadmin/v1/goods_category', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}
export async function updateGoodsCategory(params, id) {
  return request(`/api/xadmin/v1/goods_category/${id}`, {
    method: 'PUT',
    data: { ...params, id},
  });
}

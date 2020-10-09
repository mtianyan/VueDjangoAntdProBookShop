import request from 'umi-request';

export async function queryIndexAd(params) {
  return request('/api/xadmin/v1/index_ad', {
    params,
  });
}
export async function removeIndexAd(params) {
  return request(`/api/xadmin/v1/index_ad/${params}`, {
    method: 'DELETE',
  });
}
export async function addIndexAd(params) {
  return request('/api/xadmin/v1/index_ad', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}
export async function updateIndexAd(params, id) {
  return request(`/api/xadmin/v1/index_ad/${id}`, {
    method: 'PUT',
    data: { ...params, id},
  });
}

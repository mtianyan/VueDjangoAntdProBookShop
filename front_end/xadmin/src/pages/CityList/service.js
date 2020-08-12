import request from 'umi-request';

export async function queryCity(params) {
  return request('/api/v1/city_dict', {
    params,
  });
}
export async function removeCity(params) {
  return request('/api/v1/city_dict', {
    method: 'POST',
    data: { ...params, method: 'delete' },
  });
}
export async function addCity(params) {
  return request('/api/v1/city_dict', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}
export async function updateCity(params) {
  return request('/api/v1/city_dict', {
    method: 'POST',
    data: { ...params, method: 'update' },
  });
}

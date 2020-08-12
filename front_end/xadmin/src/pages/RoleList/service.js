import request from 'umi-request';

export async function queryRule(params) {
  return request('/api/v1/city_dict', {
    params,
  });
}
export async function removeRule(params) {
  return request('/api/v1/city_dict', {
    method: 'POST',
    data: { ...params, method: 'delete' },
  });
}
export async function addRule(params) {
  return request('/api/v1/city_dict', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}
export async function updateRule(params) {
  return request('/api/v1/city_dict', {
    method: 'POST',
    data: { ...params, method: 'update' },
  });
}

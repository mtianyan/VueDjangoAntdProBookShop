import request from 'umi-request';

export async function queryHotSearchWords(params) {
  return request('/api/xadmin/v1/hot_search_words', {
    params,
  });
}
export async function removeHotSearchWords(params) {
  return request(`/api/xadmin/v1/hot_search_words/${params}`, {
    method: 'DELETE',
  });
}
export async function addHotSearchWords(params) {
  return request('/api/xadmin/v1/hot_search_words', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}
export async function updateHotSearchWords(params, id) {
  return request(`/api/xadmin/v1/hot_search_words/${id}`, {
    method: 'PUT',
    data: { ...params, id},
  });
}

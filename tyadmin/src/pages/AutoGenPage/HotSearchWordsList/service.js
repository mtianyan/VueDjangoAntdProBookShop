import request from 'umi-request';

import { buildFileFormData } from '@/utils/utils'
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
  let fileFieldList = []
  let fileData = buildFileFormData(params, fileFieldList);
  return request('/api/xadmin/v1/hot_search_words', {
    method: 'POST',
    data: fileData,
  });
}
export async function updateHotSearchWords(params, id) {
  let fileFieldList = []
  let fileData = buildFileFormData(params, fileFieldList);
  return request(`/api/xadmin/v1/hot_search_words/${id}`, {
    method: 'PUT',
    data: fileData,
  });
}
export async function queryHotSearchWordsVerboseName(params) {
  return request('/api/xadmin/v1/hot_search_words/verbose_name', {
    params,
  });
}
export async function queryHotSearchWordsListDisplay(params) {
  return request('/api/xadmin/v1/hot_search_words/list_display', {
    params,
  });
}
export async function queryHotSearchWordsDisplayOrder(params) {
  return request('/api/xadmin/v1/hot_search_words/display_order', {
    params,
  });
}



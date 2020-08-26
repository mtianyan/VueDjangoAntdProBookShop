import request from '@/utils/request';

export async function query() {
  return request('/api/xadmin/v1/users');
}
export async function queryCurrent() {
  return request('/api/xadmin/v1/currentUser');
}
export async function queryNotices() {
  return request('/api/xadmin/v1/notices');
}

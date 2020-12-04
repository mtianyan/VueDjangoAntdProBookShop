import request from 'umi-request';

export async function changePassword(params) {
  return request('/api/xadmin/v1/change_password', {
    method: 'POST',
    data: { ...params },
  });
}

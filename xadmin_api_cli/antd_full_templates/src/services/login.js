import request from '@/utils/request';

export async function AccountLogin(params) {
  return request('/api/xadmin/v1/login/account', {
    method: 'POST',
    data: params,
  });
}

export async function getEmailCaptcha(email) {
  return request(`/api/xadmin/v1/sendEmailCaptcha?email=${email}`);
}

export async function getCode() {
  return request(
    '/api/xadmin/v1/captcha-generate', {
      method: 'GET',
    },
  );
}

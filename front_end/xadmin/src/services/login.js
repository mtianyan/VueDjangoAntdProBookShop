import request from '@/utils/request';

export async function fakeAccountLogin(params) {
  return request('/api/v1/login/account', {
    method: 'POST',
    data: params,
  });
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/v1/login/captcha?mobile=${mobile}`);
}

export async function getEmailCaptcha(email) {
  return request(`/api/v1/sendEmailCaptcha?email=${email}`);
}
export async function getCode() {
  return request(
    '/api/v1/captcha-generate/', {
      method: 'GET'
    }
  );
}

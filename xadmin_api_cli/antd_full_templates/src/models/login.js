import {stringify} from 'querystring';
import {history} from 'umi';
import {AccountLogin, getEmailCaptcha} from '@/services/login';
import {setAuthority} from '@/utils/authority';
import {getPageQuery} from '@/utils/utils';

const Model = {
  namespace: 'login',
  state: {
    status: undefined,
    errors: {},
  },
  effects: {
    * login({payload}, {call, put}) {
      yield put({
        type: 'clearErrors',
      });
      try {
        const response = yield call(AccountLogin, payload);
        yield put({
          type: 'changeLoginStatus',
          payload: response,
        }); // Login successfully

        if (response.status === 'ok') {
          const urlParams = new URL(window.location.href);
          const params = getPageQuery();
          let {redirect} = params;

          if (redirect) {
            const redirectUrlParams = new URL(redirect);

            if (redirectUrlParams.origin === urlParams.origin) {
              redirect = redirect.substr(urlParams.origin.length);

              if (redirect.match(/^\/.*#/)) {
                redirect = redirect.substr(redirect.indexOf('#') + 1);
              }
            } else {
              window.location.href = '/';
              return;
            }
          }

          history.replace(redirect || '/xadmin');
        }
        return response
      }catch (error){
        console.log(error)
        console.log("error in login")
        return error
      }
    },
    * email({email}, {call, put}) {
      try {
        yield put({
          type: 'clearErrors',
        });
        const res = yield call(getEmailCaptcha, email);
        if (res) {
          return res;
        }
      } catch (errors) {
        yield put({
          type: 'errorsHandle',
          payload: errors.data.fields_errors,
        });
      }


    },
    logout() {
      const {redirect} = getPageQuery(); // Note: There may be security issues, please note

      if (window.location.pathname !== '/xadmin/login' && !redirect) {
        history.replace({
          pathname: '/xadmin/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },
  reducers: {
    errorsHandle(state, {payload}) {
      return {
        ...state,
        errors: payload,
      };
    },
    clearErrors(state, {}) {
      return {
        ...state,
        errors: {},
      };
    },
    changeLoginStatus(state, {payload}) {
      setAuthority(payload.currentAuthority);
      return {...state, status: payload.status, type: payload.type};
    },
  },
};
export default Model;

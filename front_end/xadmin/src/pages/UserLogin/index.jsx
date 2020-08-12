import {createFromIconfontCN, WeiboCircleOutlined} from '@ant-design/icons';
import {Alert, Checkbox} from 'antd';
import React, {useState, useEffect} from 'react';
import {connect, Link} from 'umi';
import LoginForm from './components/Login';
import styles from './style.less';
import {getCode} from '@/services/login';

const {Tab, UserName, Password, Email, Captcha, Submit, PicCaptcha} = LoginForm;

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1873282_onfaq4da0nb.js',
});
const LoginMessage = ({content}) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);



const Login = props => {
  const {userLogin = {}, submitting} = props;
  const {status, type: loginType} = userLogin;
  const [autoLogin, setAutoLogin] = useState(true);
  const [type, setType] = useState('account');
  const [challengeKey, setChallengeKey] = useState('key');
  const [codeImg, setCodeImg] = useState(null);
  const [codeLoading, setCodeLoading] = useState(true);

  useEffect(() => {
    onGetChallenge();
  }, [])
  const onGetChallenge = () => {
    getCode().then((res) => {
      setCodeImg(res && res.image_url);
      setChallengeKey(res && res.key);
      setCodeLoading(false)
    }).catch((err) => {
      console.log(err)
    })
  }
  const handleSubmit = values => {
    const {dispatch} = props;
    dispatch({
      type: 'login/login',
      payload: {...values, type, key:challengeKey},
    });
  };

  return (
    <div className={styles.main}>
      <LoginForm activeKey={type} onTabChange={setType} onSubmit={handleSubmit}>
        <Tab key="account" tab="账户密码登录">
          {status === 'error' && (
            <LoginMessage content="账户或密码或验证码错误" />
          )}

          <UserName
            name="userName"
            placeholder="用户名"
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
            ]}
          />
          <Password
            name="password"
            placeholder="密码"
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          />
          <PicCaptcha
            name="pic_captcha"
            placeholder="验证码"
            onGetPicCaptcha={onGetChallenge}
            codeImg={codeImg}
            codeLoading={codeLoading}
            rules={[
              {
                required: true,
                message: '请输入验证码！',
              },
            ]}
          />
        </Tab>
        <Tab key="email" tab="邮箱验证码登录">
          {status === 'error' && loginType === 'email' && !submitting && (
            <LoginMessage content="验证码错误" />
          )}
          <Email
            name="email"
            placeholder="邮箱"
            rules={[
              {
                required: true,
                message: '请输入邮箱地址！',
              },
              {
                pattern: /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/,
                message: '邮箱地址格式错误！',
              },
            ]}
          />
          <Captcha
            name="captcha"
            placeholder="验证码"
            countDown={120}
            getCaptchaButtonText=""
            getCaptchaSecondText="秒"
            rules={[
              {
                required: true,
                message: '请输入验证码！',
              },
            ]}
          />
        </Tab>
        {/*<div>*/}
        {/*  <Checkbox checked={autoLogin} onChange={e => setAutoLogin(e.target.checked)}>*/}
        {/*    自动登录*/}
        {/*  </Checkbox>*/}
        {/*  <a*/}
        {/*    style={{*/}
        {/*      float: 'right',*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    忘记密码*/}
        {/*  </a>*/}
        {/*</div>*/}
        <Submit loading={submitting}>登录</Submit>
        {/*<div className={styles.other}>*/}
        {/*  其他登录方式*/}
        {/*  /!*<AlipayCircleOutlined className={styles.icon} />*!/*/}
        {/*  /!*<TaobaoCircleOutlined className={styles.icon} />*!/*/}
        {/*  <IconFont type="iconemail" className={styles.icon} />*/}
        {/*  /!*<Link className={styles.register} to="/user/register">*!/*/}
        {/*  /!*  注册账户*!/*/}
        {/*  /!*</Link>*!/*/}
        {/*</div>*/}
      </LoginForm>
    </div>
  );
};

export default connect(({login, loading}) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
  codeLoading: loading.effects['login/getcode'],
}))(Login);

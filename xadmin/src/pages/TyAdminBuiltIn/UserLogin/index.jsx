import {createFromIconfontCN, LockTwoTone, MailTwoTone, UserOutlined} from '@ant-design/icons';
import {Button, Col, Form, Input, message, Row, Spin, Tabs} from 'antd';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {connect} from 'umi';
import styles from './style.less';
import {getCode, getEmailCaptcha} from '@/services/login';
import {fieldErrorHandle} from '@/utils/utils';

const {TabPane} = Tabs;
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1873282_onfaq4da0nb.js',
});


const Login = props => {
  const {userLogin = {}, submitting} = props;
  const [timing, setTiming] = useState(false);
  const {status, type: loginType, errors} = userLogin;
  const [autoLogin, setAutoLogin] = useState(true);
  const [challengeKey, setChallengeKey] = useState('key');
  const [codeImg, setCodeImg] = useState(null);
  const [codeLoading, setCodeLoading] = useState(true);
  const loginAccountFormRef = useRef();
  const loginEmailFormRef = useRef();
  const onGetCaptcha = useCallback(async email => {
    const {onGetEmail} = props;
    const ret = onGetEmail(email);
    console.log('ret');
    console.log(ret);
    setTiming(true);
  }, []);
  useEffect(() => {
    onGetChallenge();
  }, [errors]);
  const onGetChallenge = () => {
    getCode().then((res) => {
      setCodeImg(res && res.image_url);
      setChallengeKey(res && res.key);
      setCodeLoading(false);
    }).catch((err) => {
      console.log(err);
    });
  };
  const onGetEmail = (email) => {
    getEmailCaptcha(email).then((response) => {
      message.success('发送成功，请前往邮箱查看');
    }).catch((err) => {
      fieldErrorHandle(err, loginEmailFormRef);
    });
  };
  const handleAccountSubmit = values => {
    const {dispatch} = props;
    const res = dispatch({
      type: 'login/login',
      payload: {...values, type: "account", key: challengeKey},
    });
    res.then(err => {
      if (err.data && err.data instanceof Object && 'fields_errors' in err.data) {
        fieldErrorHandle(err, loginAccountFormRef);
      }
    });
  };

  const handleEmailSubmit = values => {
    const {dispatch} = props;
    const res = dispatch({
      type: 'login/login',
      payload: {...values, type: "email", key: challengeKey},
    });
    res.then(err => {
      if (err.data && err.data instanceof Object && 'fields_errors' in err.data) {
        fieldErrorHandle(err, loginEmailFormRef);
      }
    });
  };

  return (
    <div className={styles.main}>

      <Tabs defaultActiveKey="account">
        <TabPane key="account" tab="账户密码登录">
          <Form ref={loginAccountFormRef} onFinish={handleAccountSubmit}>
            <Form.Item
              initialValue="mtianyan"
              style={{marginBottom: 24}}
              name="userName"
              placeholder="用户名"
              rules={[
                {
                  required: true,
                  message: '请输入用户名!',
                },
              ]}
            >
              <Input size="large" placeholder='体验账号: mtianyan' prefix={<UserOutlined
                style={{
                  color: '#1890ff',
                }}
                className={styles.prefixIcon}
              />} />
            </Form.Item>
            <Form.Item
              style={{marginBottom: 24}}
              name="password"
              placeholder="密码"
              initialValue="admin2020"
              rules={[
                {
                  required: true,
                  message: '请输入密码！',
                },
              ]}
            >

              <Input.Password size="large" placeholder='体验密码: 123456'
                              prefix={<LockTwoTone className={styles.prefixIcon} />} />
            </Form.Item>
            <Row gutter={8}>
              <Col span={16}>
                <Form.Item name="pic_captcha"
                           placeholder="验证码"
                           rules={[
                             {
                               required: true,
                               message: '请输入验证码！',
                             },
                           ]}>
                  <Input size="large" placeholder='请输入验证码'
                         prefix={<IconFont type="iconyanzhengma" className={styles.prefixIcon} />} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Spin spinning={codeLoading}>
                  <img alt="Captcha"
                       style={{width: '100%', height: 35, marginTop: 2.5, marginLeft: 10}}
                       src={codeImg}
                       onClick={onGetChallenge}
                  />
                </Spin>
              </Col>
            </Row>
            <Form.Item>
              <Button size="large" type="primary" className={styles.submit} htmlType="submit">登录</Button>
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane key="email" tab="邮箱验证码登录">
          <Form ref={loginEmailFormRef} onFinish={handleEmailSubmit}>
            <Form.Item
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
            >
              <Input size="large" placeholder='请输入邮箱' prefix={<MailTwoTone className={styles.prefixIcon} />} />
            </Form.Item>
            <Row gutter={8}>
              <Col span={16}>
                <Form.Item name="captcha"
                           placeholder="验证码"
                           countDown={120}
                           getCaptchaButtonText=""
                           getCaptchaSecondText="秒"
                           rules={[
                             {
                               required: true,
                               message: '请输入邮箱验证码！',
                             },
                           ]}>
                  <Input size="large" placeholder='请输入邮箱验证码'
                         prefix={<IconFont type="iconyanzhengma" className={styles.prefixIcon} />} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Button
                  disabled={timing}
                  className={styles.getCaptcha}
                  size="large"
                  onClick={() => {
                    const value = loginEmailFormRef.current.getFieldValue('email');
                    if (!value) {
                      message.error('请先输入邮箱，再发送');
                    } else {
                      const value_error = loginEmailFormRef.current.getFieldError('email');
                      if (value_error.length !== 0) {
                        message.error('请先修正邮箱，再发送');
                      } else {
                        onGetEmail(value);
                      }
                    }

                  }}
                >
                  {timing ? `${count} 秒` : '获取验证码'}
                </Button>
              </Col>
            </Row>
            <Form.Item>
              <Button size="large" type="primary" className={styles.submit} htmlType="submit">登录</Button>
            </Form.Item>
          </Form>

        </TabPane>
      </Tabs>

    </div>
  );
};

export default connect(({login, loading}) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
  codeLoading: loading.effects['login/getcode'],
}))(Login);

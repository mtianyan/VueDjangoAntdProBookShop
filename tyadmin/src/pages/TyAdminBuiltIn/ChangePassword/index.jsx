import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React from 'react';
import { Button, Card, Form, Input, message } from 'antd';
import { changePassword } from '@/pages/TyAdminBuiltIn/ChangePassword/service';
import { history } from 'umi';
import { stringify } from "querystring";
import { getPageQuery } from '@/utils/utils';

const FormItem = Form.Item;
const tailLayout = {
  wrapperCol: { offset: 5, span: 19 },
};

const ChangePassPage = () => {
  const [form] = Form.useForm();
  const handleChange = (values) => {
    changePassword(values).then(
      (r) => {
        message.success('密码修改成功,请重新登录!');
        if (window.location.pathname !== '/xadmin/login') {
          history.replace({
            pathname: '/xadmin/login',
          });
        }
      },
    ).catch((error) => {
      if ('fields_errors' in error.data) {
        for (let key in error.data.fields_errors) {
          var value = error.data.fields_errors[key];
          form.setFields([
            {
              name: key,
              errors: value,
            },
          ]);
        }
      } else {
        message.error('非字段类型错误');
      }
    });
  };
  return (
    <PageHeaderWrapper>
      <Card title={'修改当前账号密码'}>
        <Form
          form={form}
          onFinish={handleChange}
        >
          <FormItem
            labelCol={{
              span: 5,
            }}
            wrapperCol={{
              span: 10,
            }}
            label="旧密码"
            name="old_password"
            rules={[
              {
                required: true,
                message: '请输入旧密码！',
              },
            ]}
          >
            <Input.Password placeholder="请输入旧密码" type="password" />
          </FormItem>
          <FormItem
            labelCol={{
              span: 5,
            }}
            wrapperCol={{
              span: 10,
            }}
            label="新密码"
            name="new_password"
            rules={[
              {
                required: true,
                message: '请输入新密码！',
              },
            ]}
          >
            <Input.Password placeholder="请输入新密码" type="password" />
          </FormItem>
          <FormItem
            labelCol={{
              span: 5,
            }}
            wrapperCol={{
              span: 10,
            }}
            label="重复新密码"
            name="re_password"
            rules={[
              {
                required: true,
                message: '请再次输入新密码',
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('new_password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('两次密码不匹配');
                },
              }),
            ]}
          >
            <Input.Password placeholder="请再次输入新密码" type="password" />
          </FormItem>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              修改
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </PageHeaderWrapper>
  );
};

export default ChangePassPage;

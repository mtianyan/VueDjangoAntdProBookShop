import React from 'react';
import { Form, Alert, Button, Descriptions, Divider, Statistic, Input } from 'antd';
import { connect } from 'umi';
import styles from './index.less';
import CheckboxLayout from '../../../CheckboxLayout';
const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

const Step2 = props => {
  const [form] = Form.useForm();
  const { data, dispatch, submitting } = props;

  if (!data) {
    return null;
  }

  const { validateFields, getFieldsValue } = form;

  const onPrev = () => {
    if (dispatch) {
      const values = getFieldsValue();
      dispatch({
        type: 'addConfFile/saveStepFormData',
        payload: { ...data, ...values },
      });
      dispatch({
        type: 'addConfFile/saveCurrentStep',
        payload: 'info',
      });
    }
  };

  const onValidateForm = async () => {
    const values = await validateFields();
    // const {conf_file, ...remain_value} = data;
    // const formData = new FormData();
    // console.log(data)
    // console.log("fileList")
    // console.log(data.conf_file.fileList)
    // data.conf_file.fileList.forEach((file) => {
    //   console.log(file)
    //   formData.append('files[]', file);
    // });
    if (dispatch) {
      dispatch({
        type: 'addConfFile/submitStepForm',
        payload: {...data, ...values},
      });
    }
  };

  const { payAccount, receiverAccount, receiverName, amount } = data;
  const plainOptions = ["xx公司: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx","xx公司2: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx","xx公司3: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"]
  const defaultCheckedList = ["xx公司: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"]
  return (
    <Form
      {...formItemLayout}
      form={form}
      layout="horizontal"
      className={styles.stepForm}
      initialValues={{
        password: '123456',
      }}
    >
      <CheckboxLayout colSize={24} plainOptions={plainOptions} defaultCheckedList={defaultCheckedList}></CheckboxLayout>
      <Divider
        style={{
          margin: '40px 0 24px',
        }}
      />
      <Form.Item
        style={{
          marginBottom: 8,
        }}
        wrapperCol={{
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: formItemLayout.wrapperCol.span,
            offset: formItemLayout.labelCol.span,
          },
        }}
      >
        <Button type="primary" onClick={onValidateForm} loading={submitting}>
          提交
        </Button>
        <Button
          onClick={onPrev}
          style={{
            marginLeft: 8,
          }}
        >
          上一步
        </Button>
      </Form.Item>
    </Form>
  );
};

export default connect(({ addConfFile, loading }) => ({
  submitting: loading.effects['addConfFile/submitStepForm'],
  data: addConfFile.step,
}))(Step2);

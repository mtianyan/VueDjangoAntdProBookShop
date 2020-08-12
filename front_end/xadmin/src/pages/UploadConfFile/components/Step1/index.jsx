import React, {useState} from 'react';
import {Button, Divider, Form, Input, message, Select} from 'antd';
import {connect} from 'umi';
import styles from './index.less';
import UploadBasic from  '../UploadBasic'
import UploadAvatar from  '../UploadAvatar'
const {Option} = Select;
const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

const Step1 = props => {
  const [fileList, setFileList] = useState([]);
  const [logoList, setLogoList] = useState([]);
  const {dispatch, data} = props;
  const [form] = Form.useForm();

  if (!data) {
    return null;
  }

  const {validateFields} = form;

  const onValidateForm = async () => {
    const values = await validateFields();
    console.log("validateFields-step1")
    console.log(values)
    console.log("validateFields-step1")

    if (dispatch) {
      dispatch({
        type: 'addConfFile/saveStepFormData',
        payload: values,
      });
      dispatch({
        type: 'addConfFile/saveCurrentStep',
        payload: 'confirm',
      });
    }
  };
  const beforeUpload = (file) =>{
    console.log("beforeUpload")
    return false
  }

  const onConfChange = (info) => {
    if(info.file){
      message.success(`已选择${info.file.name}配置文件`)
    }
  }

  const onLogoChange = (info) => {
    console.log(info)
    if(info.file){
      message.success(`已选择${info.file.name}Logo图片`)
    }
  }

  const beforeLogoUpload = (file) => {
    console.log("beforeLogoUpload")
    console.log("beforeLogoUpload")
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }

    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return false;
  }
  return (
    <>
      <Form
        {...formItemLayout}
        form={form}
        layout="horizontal"
        className={styles.stepForm}
        hideRequiredMark
        initialValues={data}
      >
        <Form.Item
          label="网站名称"
          name="website_name"
          rules={[
            {
              required: true,
              message: '请输入网站名称',
            },
          ]}
        >
          <Input placeholder="请输入网站名" />

        </Form.Item>
        <Form.Item
          label="配置文件"
          name="conf_file"
          rules={[
            {
              required: true,
              message: '请选择配置文件',
            },
          ]}
        >
          <UploadBasic beforeUpload={beforeUpload} onChange={onConfChange}></UploadBasic>
        </Form.Item>
        <Form.Item
          label="Logo图片"
          name="logo_file"
          rules={[
            {
              required: true,
              message: '请选择logo图片',
            },
          ]}
        >
          <UploadAvatar beforeUpload={beforeLogoUpload} onChange={onLogoChange}></UploadAvatar>
        </Form.Item>
        <Form.Item
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
          <Button type="primary" onClick={onValidateForm}>
            下一步
          </Button>
        </Form.Item>
      </Form>
      <Divider
        style={{
          margin: '40px 0 24px',
        }}
      />
    </>
  );
};

export default connect(({addConfFile}) => ({
  data: addConfFile.step,
}))(Step1);

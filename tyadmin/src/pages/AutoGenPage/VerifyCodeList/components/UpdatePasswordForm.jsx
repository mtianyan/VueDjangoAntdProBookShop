import React from 'react';
import { Modal } from 'antd';


const UpdatePasswordForm = props => {

  const { updateModalVisible, onCancel, handleUpdate, userName } = props;

  return (
    <Modal
      destroyOnClose
      title={`修改用户 ${userName} 的密码`}
      visible={updateModalVisible}
      onOk={handleUpdate}
      onCancel={() => onCancel()}
    >
      {props.children}
    </Modal>
  );
};

export default UpdatePasswordForm;

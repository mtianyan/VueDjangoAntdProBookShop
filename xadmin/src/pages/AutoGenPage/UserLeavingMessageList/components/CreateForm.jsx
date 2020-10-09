import React from 'react';
import {Modal} from 'antd';

const CreateForm = props => {
  const {modalVisible, onCancel} = props;
  return (
    <Modal
      destroyOnClose
      title="新建用户留言"
      visible={modalVisible}
      width={600}
      onCancel={() => onCancel()}
      footer={null}
    >
      {props.children}
    </Modal>
  );
};

export default CreateForm;

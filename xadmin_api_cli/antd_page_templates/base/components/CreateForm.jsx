import React from 'react';
import {Modal} from 'antd';

const CreateForm = props => {
  const {modalVisible, onCancel} = props;
  return (
    <Modal
      destroyOnClose
      title="新建$占位模型显示名$"
      visible={modalVisible}
      $宽度占位$
      onCancel={() => onCancel()}
      footer={null}
    >
      {props.children}
    </Modal>
  );
};

export default CreateForm;

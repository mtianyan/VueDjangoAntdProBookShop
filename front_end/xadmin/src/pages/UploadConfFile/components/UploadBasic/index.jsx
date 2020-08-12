import React from 'react';
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import styles from './index.less';

export default (props) => (
  <div className={styles.container}>
    <div id="components-upload-demo-basic">
      <Upload {...props}>
        <Button>
          <UploadOutlined /> 点击上传配置文件
        </Button>
      </Upload>
    </div>
  </div>
);

import React from 'react';
import {Button, Upload} from 'antd';
import {UploadOutlined} from '@ant-design/icons';
import styles from './index.less';

class MyUpload extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    if(this.props.defaultFileList){
      this.setState({
        fileList: this.props.defaultFileList
      })
    }
  }

  state = {
    fileList: [],
  };

  handleChange = info => {
    let fileList = [...info.fileList]; // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new

    fileList = fileList.slice(-1); // 2. Read from response and show file link

    fileList = fileList.map(file => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }

      return file;
    });
    this.props.onChange(info);
    this.setState({
      fileList,
    });
  };

  render() {
    return (
      <Upload onChange={this.handleChange} fileList={this.state.fileList} beforeUpload={()=>false}>
        <Button>
          <UploadOutlined /> 点击上传
        </Button>
      </Upload>
    );
  }
}

export default (props) => (
  <div className={styles.container}>
    <div id="components-upload-demo-fileList">
      <MyUpload {...props} />
    </div>
  </div>
);

import React from 'react';
import {Upload} from 'antd';
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import styles from './index.less';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}


class Avatar extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    loading: false,
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
    if (info.file) {
      getBase64(fileList[0].originFileObj, imageUrl =>
        this.setState({
          fileList,
          imageUrl,
          loading: false,
        }),
      );
    }
  };

  render(props) {
    console.log(this.props);
    console.log('props');
    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    var {imageUrl} = this.state;
    if ('img' in this.props) {
      if (typeof this.props.img == 'string') {
        imageUrl = this.props.img;
      }
    }


    return (
      <Upload
        name="avatar"
        listType="picture-card"
        showUploadList={false}
        beforeUpload={this.props.beforeUpload}
        onChange={this.handleChange}
        fileList={this.state.fileList}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="avatar"
            style={{
              width: '100%',
            }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
    );
  }
}

export default (props) => (
  <div className={styles.container}>
    <div id="components-upload-demo-avatar">
      <Avatar {...props} />
    </div>
  </div>
);

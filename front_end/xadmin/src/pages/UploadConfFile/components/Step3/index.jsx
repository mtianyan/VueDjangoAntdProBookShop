import { Button, Result, Descriptions, Statistic } from 'antd';
import React from 'react';
import { Link, connect } from 'umi';
import styles from './index.less';

const Step3 = props => {
  const { data, dispatch } = props;

  if (!data) {
    return null;
  }

  const { payAccount, receiverAccount, receiverName, amount } = data;

  const onFinish = () => {
    if (dispatch) {
      dispatch({
        type: 'addConfFile/saveCurrentStep',
        payload: 'info',
      });
    }
  };

  const extra = (
    <>
      <Link to="/conf"><Button>查看已上传配置文件</Button></Link>
    </>
  );
  return (
    <Result
      status="success"
      title="上传成功"
      subTitle="请联系超级管理员尽快为你审核配置文件"
      extra={extra}
      className={styles.result}
    >
    </Result>
  );
};

export default connect(({ addConfFile }) => ({
  data: addConfFile.step,
}))(Step3);

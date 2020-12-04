import { EllipsisOutlined } from '@ant-design/icons';
import { Col, Dropdown, Menu, Row } from 'antd';
import React, { Component, Suspense } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { connect } from 'umi';
import PageLoading from './components/PageLoading';
import { getTimeDistance } from './utils/utils';
import styles from './style.less';

const IntroduceRow = React.lazy(() => import('./components/IntroduceRow'));
class Analysis extends Component {

  render() {
    return (
      <GridContent>
        <React.Fragment>
          <Suspense fallback={<PageLoading />}>
            <IntroduceRow loading={false}/>
          </Suspense>
        </React.Fragment>
      </GridContent>
    );
  }
}

export default Analysis;

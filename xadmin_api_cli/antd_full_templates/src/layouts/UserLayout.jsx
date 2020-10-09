import {GithubOutlined, LockTwoTone, MailTwoTone, UserOutlined} from '@ant-design/icons';
import { DefaultFooter, getMenuData, getPageTitle } from '@ant-design/pro-layout';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link, SelectLang, useIntl, connect } from 'umi';
import React from 'react';
import logo from '../assets/logo.svg';
import styles from './UserLayout.less';

const UserLayout = props => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { formatMessage } = useIntl();
  const { breadcrumb } = getMenuData(routes);
  const title = getPageTitle({
    pathname: location.pathname,
    formatMessage,
    breadcrumb,
    ...props,
  });
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>

      <div className={styles.container}>
        <div className={styles.lang}>
          <SelectLang />
        </div>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
                <img alt="logo" className={styles.logo} src={logo} />
                <span className={styles.title}>TyAdmin-在线教育管理后台V2</span>
            </div>
            <div className={styles.desc}>Generate By TyAdmin Cli</div>
          </div>
          {children}
        </div>
        <DefaultFooter
          copyright={`${new Date().getFullYear()} TyAdmin By mtianyan`}
          links={[
            {
              key: 'TyAdmin',
              title: 'TyAdmin',
              href: 'https://pro.ant.design',
              blankTarget: true,
            },
            {
              key: 'github',
              title: <GithubOutlined />,
              href: 'https://github.com/mtianyan',
              blankTarget: true,
            },
            {
              key: 'Ant Design',
              title: 'Ant Design Pro V4',
              href: 'https://ant.design',
              blankTarget: true,
            },
          ]}
        />
      </div>
    </HelmetProvider>
  );
};

export default connect(({ settings }) => ({ ...settings }))(UserLayout);

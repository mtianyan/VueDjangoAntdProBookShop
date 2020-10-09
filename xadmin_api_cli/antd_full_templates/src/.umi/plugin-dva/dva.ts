// @ts-nocheck
import { Component } from 'react';
import { ApplyPluginsType } from 'umi';
import dva from 'dva';
// @ts-ignore
import createLoading from '/Users/mtianyan/tyRepos/Python/OnlineMooc/xadmin/node_modules/dva-loading/dist/index.esm.js';
import { plugin, history } from '../core/umiExports';

let app:any = null;

export function _onCreate(options = {}) {
  const runtimeDva = plugin.applyPlugins({
    key: 'dva',
    type: ApplyPluginsType.modify,
    initialValue: {},
  });
  app = dva({
    history,
    
    ...(runtimeDva.config || {}),
    // @ts-ignore
    ...(typeof window !== 'undefined' && window.g_useSSR ? { initialState: window.g_initialProps } : {}),
    ...(options || {}),
  });
  
  app.use(createLoading());
  
  (runtimeDva.plugins || []).forEach((plugin:any) => {
    app.use(plugin);
  });
  app.model({ namespace: 'global', ...(require('/Users/mtianyan/tyRepos/Python/OnlineMooc/xadmin/src/models/global.js').default) });
app.model({ namespace: 'login', ...(require('/Users/mtianyan/tyRepos/Python/OnlineMooc/xadmin/src/models/login.js').default) });
app.model({ namespace: 'setting', ...(require('/Users/mtianyan/tyRepos/Python/OnlineMooc/xadmin/src/models/setting.js').default) });
app.model({ namespace: 'user', ...(require('/Users/mtianyan/tyRepos/Python/OnlineMooc/xadmin/src/models/user.js').default) });
  return app;
}

export function getApp() {
  return app;
}

export class _DvaContainer extends Component {
  constructor(props: any) {
    super(props);
    // run only in client, avoid override server _onCreate()
    if (typeof window !== 'undefined') {
      _onCreate();
    }
  }

  componentWillUnmount() {
    let app = getApp();
    app._models.forEach((model:any) => {
      app.unmodel(model.namespace);
    });
    app._models = [];
    try {
      // 释放 app，for gc
      // immer 场景 app 是 read-only 的，这里 try catch 一下
      app = null;
    } catch(e) {
      console.error(e);
    }
  }

  render() {
    const app = getApp();
    app.router(() => this.props.children);
    return app.start()();
  }
}

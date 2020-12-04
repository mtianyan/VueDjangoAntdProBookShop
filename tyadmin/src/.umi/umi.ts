// @ts-nocheck
import './core/polyfill';
import '../global.jsx';
import { plugin } from './core/plugin';
import { createHistory } from './core/history';
import { ApplyPluginsType } from '/Users/mtianyan/tyRepos/Python/VueDjangoAntdProBookShop/tyadmin/node_modules/@umijs/runtime';
import { renderClient } from '/Users/mtianyan/tyRepos/Python/VueDjangoAntdProBookShop/tyadmin/node_modules/@umijs/renderer-react/dist/index.js';


require('../global.less');
require('./plugin-locale/locale')._onCreate();

const getClientRender = (args: { hot?: boolean } = {}) => plugin.applyPlugins({
  key: 'render',
  type: ApplyPluginsType.compose,
  initialValue: () => {
    const opts = plugin.applyPlugins({
      key: 'modifyClientRenderOpts',
      type: ApplyPluginsType.modify,
      initialValue: {
        // @ts-ignore
        routes: require('./core/routes').routes,
        plugin,
        history: createHistory(args.hot),
        isServer: process.env.__IS_SERVER,
        dynamicImport: true,
        rootElement: 'root',
      },
    });
    return renderClient(opts);
  },
  args,
});

const clientRender = getClientRender();
export default clientRender();


    window.g_umi = {
      version: '3.2.13',
    };
  

// hot module replacement
// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept('./core/routes', () => {
    getClientRender({ hot: true })();
  });
}

// @ts-nocheck
import React from 'react';
import EventEmitter from 'events';
import { ConfigProvider } from 'antd';

import moment from 'moment';
import 'moment/locale/pt-br';
import 'moment/locale/zh-cn';
import 'moment/locale/zh-tw';
import { RawIntlProvider, getLocale, getDirection , setIntl, getIntl, localeInfo } from './localeExports';

// @ts-ignore
export const event = new EventEmitter();
event.setMaxListeners(5);
export const LANG_CHANGE_EVENT = Symbol('LANG_CHANGE');

export function _onCreate() {
  const locale = getLocale();
  if (moment?.locale) {
    moment.locale(localeInfo[locale]?.momentLocale || '');
  }
  setIntl(locale);
}

export const _LocaleContainer = (props:any) => {
  const [locale, setLocale] = React.useState(() => getLocale());
  const [intl, setContainerIntl] = React.useState(() => getIntl(locale, true));

  const handleLangChange = (locale:string) => {
    if (moment?.locale) {
      moment.locale(localeInfo[locale]?.momentLocale || 'en');
    }
    setLocale(locale);
    setContainerIntl(getIntl(locale));
  };

  React.useLayoutEffect(() => {
    event.on(LANG_CHANGE_EVENT, handleLangChange);
    return () => {
      event.off(LANG_CHANGE_EVENT, handleLangChange);
    };
  }, []);

  const defaultAntdLocale = {
  }
  const direcition = getDirection();
  
  return (
    <ConfigProvider  direction={direcition} locale={localeInfo[locale]?.antd || defaultAntdLocale}>
      <RawIntlProvider value={intl}>{props.children}</RawIntlProvider>
    </ConfigProvider>
  )


  return <RawIntlProvider value={intl}>{props.children}</RawIntlProvider>;
};

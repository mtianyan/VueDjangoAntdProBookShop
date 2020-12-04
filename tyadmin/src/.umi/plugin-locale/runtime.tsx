// @ts-nocheck
import React from 'react';
// @ts-ignore
import { _LocaleContainer } from './locale';
import { getIntl, getLocale } from './localeExports';

export function rootContainer(container: Element) {
  return React.createElement(_LocaleContainer, null, container);
}


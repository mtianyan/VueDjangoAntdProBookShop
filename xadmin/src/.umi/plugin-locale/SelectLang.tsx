// @ts-nocheck
import React from 'react';
import { Menu, Dropdown } from 'antd';
import { ClickParam } from 'antd/es/menu';
import { DropDownProps } from 'antd/es/dropdown';
import { getLocale, getAllLocales, setLocale } from './localeExports';

export interface HeaderDropdownProps extends DropDownProps {
  overlayClassName?: string;
  placement?:
    | 'bottomLeft'
    | 'bottomRight'
    | 'topLeft'
    | 'topCenter'
    | 'topRight'
    | 'bottomCenter';
}

const HeaderDropdown: React.FC<HeaderDropdownProps> = ({
  overlayClassName: cls,
  ...restProps
}) => (
  <Dropdown
    overlayClassName={cls}
    {...restProps}
  />
);

interface LocalData {
    lang: string,
    label?: string,
    icon?: string,
    title?: string,
}

interface SelectLangProps {
  globalIconClassName?: string,
  postLocalesData?: (locales: LocalData[]) => LocalData[],
  onItemClick?: (params:ClickParam) => void,
  className?:string;
}

const transformArrayToObject = (allLangUIConfig:LocalData[])=>{
  return allLangUIConfig.reduce((obj, item) => {
    if(!item.lang){
      return obj;
    }

    return {
      ...obj,
      [item.lang]: item,
    };
  }, {});
}

const defaultLangUConfigMap = {
  'zh-CN': {
    lang: 'zh-CN',
    label: '简体中文',
    icon: '🇨🇳',
    title: '语言'
  },
  'zh-TW': {
    lang: 'zh-TW',
    label: '繁体中文',
    icon: '🇭🇰',
    title: '語言'
  },
  'en-US': {
    lang: 'en-US',
    label: 'English',
    icon: '🇺🇸',
    title: 'Language'
  },
  'pt-BR': {
    lang: 'pt-BR',
    label: 'Português',
    icon: '🇧🇷',
    title: 'Idiomas'
  }
};

export const SelectLang: React.FC<SelectLangProps> = (props) => {
  const { globalIconClassName, postLocalesData, onItemClick, style, ...restProps } = props;
  const selectedLang = getLocale();

  const changeLang = ({ key }: ClickParam): void => setLocale(key);

  const defaultLangUConfig = getAllLocales().map(
    key =>
      defaultLangUConfigMap[key] || {
        lang: key,
        label: key,
        icon: '🌐',
        title: key
      }
  );


  const allLangUIConfig = transformArrayToObject(postLocalesData ?  postLocalesData(defaultLangUConfig): defaultLangUConfig);

 const handleClick = onItemClick
  ? (params: ClickParam) => onItemClick(params)
  : changeLang;

  const menuItemStyle = { minWidth: '160px' }
  const langMenu = (
    <Menu 
      selectedKeys={[selectedLang]} onClick={handleClick}
    >
        <Menu.Item key={'en-US'} style={menuItemStyle}>
          <span role='img' aria-label={allLangUIConfig['en-US']?.label  || 'en-US'}>
            {allLangUIConfig['en-US']?.icon || "🌐"}
          </span>{' '}
          {allLangUIConfig['en-US']?.label || 'en-US'}
        </Menu.Item>
        <Menu.Item key={'pt-BR'} style={menuItemStyle}>
          <span role='img' aria-label={allLangUIConfig['pt-BR']?.label  || 'pt-BR'}>
            {allLangUIConfig['pt-BR']?.icon || "🌐"}
          </span>{' '}
          {allLangUIConfig['pt-BR']?.label || 'pt-BR'}
        </Menu.Item>
        <Menu.Item key={'zh-CN'} style={menuItemStyle}>
          <span role='img' aria-label={allLangUIConfig['zh-CN']?.label  || 'zh-CN'}>
            {allLangUIConfig['zh-CN']?.icon || "🌐"}
          </span>{' '}
          {allLangUIConfig['zh-CN']?.label || 'zh-CN'}
        </Menu.Item>
        <Menu.Item key={'zh-TW'} style={menuItemStyle}>
          <span role='img' aria-label={allLangUIConfig['zh-TW']?.label  || 'zh-TW'}>
            {allLangUIConfig['zh-TW']?.icon || "🌐"}
          </span>{' '}
          {allLangUIConfig['zh-TW']?.label || 'zh-TW'}
        </Menu.Item>
    </Menu>
  );

  const inlineStyle = {
    cursor: 'pointer',
    padding: '12px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize:18,
    verticalAlign: 'middle',
    ...style,
  }

  return (
    <HeaderDropdown overlay={langMenu} placement="bottomRight" {...restProps}>
      <span className={globalIconClassName} style={inlineStyle}>
        <i className="anticon" title={allLangUIConfig[selectedLang]?.title}>
          <svg
            viewBox="0 0 24 24"
            focusable="false"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path
              d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z "
              className="css-c4d79v"
            />
          </svg>
        </i>
      </span>
    </HeaderDropdown>
  );
  return <></>
};

import * as React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import {Badge, Col} from 'antd';
import classNames from 'classnames';
import * as AntdIcons from '@ant-design/icons';
import {ThemeType} from './index';
import Ellipsis from "../Ellipsis";

const allIcons: {
    [key: string]: any;
} = AntdIcons;

export interface CopyableIconProps {
    name: string;
    isNew: boolean;
    theme: ThemeType;
    justCopied: string | null;
    setCurrentIcon: (value: string) => any;
    onCopied: (type: string, text: string) => any;
}

const CopyableIcon: React.SFC<CopyableIconProps> = (props) => {
    const {
        name,
        isNew,
        justCopied,
        onCopied,
        setCurrentIcon,
        theme,
        closeIcon
    } = props;
    const className = classNames({
        copied: justCopied === name,
        [theme]: !!theme,
    });
    return (
        <CopyToClipboard text={`<${name} />`} onCopy={(text: string) => {
            setCurrentIcon(name);
            closeIcon()
        }}>
            <Col xs={12} sm={12} md={12} lg={12} className={className} style={{paddingTop: 1}}>
                {React.createElement(allIcons[name])}
                <Ellipsis length={22} lines={1} style={{ display: 'inline-block',verticalAlign:'middle',fontSize:8, paddingLeft:3, width: "auto"}}>{name}</Ellipsis>
            </Col>
        </CopyToClipboard>
    );
};

export default CopyableIcon;

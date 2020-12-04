import * as React from 'react';
import Icon, * as AntdIcons from '@ant-design/icons';
import {Card, Input, Radio, Row} from 'antd';
import {RadioChangeEvent} from 'antd/es/radio/interface';
import {injectIntl} from 'react-intl';
import debounce from 'lodash/debounce';
import Category from './Category';
import {FilledIcon, OutlinedIcon, TwoToneIcon} from './themeIcons';
import {categories, Categories, CategoriesKeys} from './fields';
// import  Icon from '../icon'
export enum ThemeType {
    Filled = 'Filled',
    Outlined = 'Outlined',
    TwoTone = 'TwoTone',
}

const allIcons: {
    [key: string]: any;
} = AntdIcons;

interface IconDisplayProps {
    intl: any;
}

interface IconDisplayState {
    theme: ThemeType;
    searchKey: string;
}



class IconDisplay extends React.Component<IconDisplayProps, IconDisplayState> {
    static categories: Categories = categories;

    static newIconNames: string[] = [];

    state: IconDisplayState = {
        theme: ThemeType.Outlined,
        searchKey: '',
        showSelect: false,
        currentIcon: 'StepBackwardOutlined',
    };


    constructor(props: IconDisplayProps) {
        super(props);
        this.handleSearchIcon = debounce(this.handleSearchIcon, 300);
    }

    handleChangeTheme = (e: RadioChangeEvent) => {
        this.setState({
            theme: e.target.value as ThemeType,
        });
    };

    handleSearchIcon = (searchKey: string) => {
        this.setState(prevState => ({
            ...prevState,
            searchKey,
        }));
    };

    setCurrentIcon = (iconString) => {
        this.setState({
            currentIcon: iconString
        })
    }

    closeIcon = () => {
        this.setState({
            showSelect: false
        })
    }

    renderCategories() {
        const {searchKey = '', theme} = this.state;

        return Object.keys(categories)
            .map((key: CategoriesKeys) => {
                let iconList = categories[key];
                if (searchKey) {
                    iconList = iconList.filter(iconName =>
                        iconName.toLowerCase().includes(searchKey.toLowerCase()),
                    );
                }

                return {
                    category: key,
                    icons: iconList.map(iconName => iconName + theme).filter(iconName => allIcons[iconName]),
                };
            })
            .filter(({icons}) => !!icons.length)
            .map(({category, icons}) => (
                <Category
                    key={category}
                    title={category as CategoriesKeys}
                    theme={theme}
                    icons={icons}
                    newIcons={IconDisplay.newIconNames}
                    setCurrentIcon={this.setCurrentIcon}
                    currentIcon={this.state.searchKey}
                    closeIcon={this.closeIcon}
                />
            ));
    }

    render() {
        const {
            intl: {messages},
        } = this.props;

        return (
            <>
                <div>
                        <Input
                            size="middle"
                            value={this.state.currentIcon} onClick={e => this.setState({
                            showSelect: !this.state.showSelect,
                            searchKey: '',
                        })} prefix={
                            React.createElement(
                                AntdIcons[this.state.currentIcon],
                                {
                                    style:{ fontSize: '22px'}
                                }
                            )
                        }>
                        </Input>

                    {this.state.showSelect ? <Card>
                        <Row>
                            <Input.Search
                                // value={this.state.currentIcon}
                                placeholder={messages['app.docs.components.icon.search.placeholder']}
                                allowClear
                                onChange={e => {
                                    this.handleSearchIcon(e.currentTarget.value)
                                    this.setState(
                                        {showSelect: true}
                                    )
                                }}
                                autoFocus
                            />
                        </Row>
                        <Row>
                            <Radio.Group
                                value={this.state.theme}
                                onChange={this.handleChangeTheme}
                            >
                                <Radio.Button value={ThemeType.Outlined}>
                                    <Icon component={OutlinedIcon} /> {messages['app.docs.components.icon.outlined']}
                                </Radio.Button>
                                <Radio.Button value={ThemeType.Filled}>
                                    <Icon component={FilledIcon} /> {messages['app.docs.components.icon.filled']}
                                </Radio.Button>
                                <Radio.Button value={ThemeType.TwoTone}>
                                    <Icon component={TwoToneIcon} /> {messages['app.docs.components.icon.two-tone']}
                                </Radio.Button>
                            </Radio.Group>
                        </Row>
                        <Row>
                            {this.renderCategories()}
                        </Row>
                    </Card> : ''}


                </div>

            </>
        );
    }
}

export default injectIntl(IconDisplay);

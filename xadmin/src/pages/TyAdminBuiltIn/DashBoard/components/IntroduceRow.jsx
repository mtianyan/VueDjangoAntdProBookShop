import {InfoCircleOutlined} from '@ant-design/icons';
import {Col, Row, Tooltip} from 'antd';
import {FormattedMessage} from 'umi';
import React, {useEffect, useState} from 'react';
import numeral from 'numeral';
import {ChartCard, MiniArea, MiniBar, MiniProgress, Field} from './Charts';
import Trend from './Trend';
import Yuan from '../utils/Yuan';
import styles from '../style.less';
import {queryCount} from "@/services/user";
import {getRandomInt} from '@/utils/utils';

const topColResponsiveProps = {
    xs: 24,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 6,
    style: {
        marginBottom: 24,
    },
};

const IntroduceRow = ({loading}) => {
    const [data, setData] = useState({})
    useEffect(() => {
        queryCount().then(r => setData(r.data))
    }, [])
    let cards = []
    const color_map = ['#FFBA95', '#E77048', '#858DE4', '#353B9D', '#FFDF84', '#FFB837', '#35908F', '#3DC2C4', '#BC91FF', '#9E56FC', '#3D9CFF', '#79C3FF']
    for (let dataKey in data) {
        const visitData = [
            {
                "x": "2020-07-18",
                "y": 7
            },
            {
                "x": "2020-07-19",
                "y": 5
            },
            {
                "x": "2020-07-20",
                "y": 4
            },
            {
                "x": "2020-07-21",
                "y": 2
            },
            {
                "x": "2020-07-22",
                "y": 4
            },
            {
                "x": "2020-07-23",
                "y": 7
            },
            {
                "x": "2020-07-24",
                "y": 5
            },
            {
                "x": "2020-07-25",
                "y": 6
            },
            {
                "x": "2020-07-26",
                "y": 5
            },
            {
                "x": "2020-07-27",
                "y": 9
            },
            {
                "x": "2020-07-28",
                "y": 6
            },
            {
                "x": "2020-07-29",
                "y": 3
            },
            {
                "x": "2020-07-30",
                "y": 1
            },
            {
                "x": "2020-07-31",
                "y": 5
            },
            {
                "x": "2020-08-01",
                "y": 3
            },
            {
                "x": "2020-08-02",
                "y": 6
            },
            {
                "x": "2020-08-03",
                "y": 5
            }
        ]
        cards.push(<Col key={dataKey} {...topColResponsiveProps}>
            <ChartCard
                bordered={false}
                loading={loading}
                title={dataKey}
                action={
                    <Tooltip
                        title={dataKey}
                    >
                        <InfoCircleOutlined/>
                    </Tooltip>
                }
                total={numeral(data[dataKey]).format('0,0')}
                contentHeight={46}
            >
                <MiniArea color={color_map[getRandomInt(0, 11)]} data={visitData}/>
            </ChartCard>
        </Col>)
    }
    return <Row gutter={24} type="flex">
        {cards}
    </Row>
};

export default IntroduceRow;

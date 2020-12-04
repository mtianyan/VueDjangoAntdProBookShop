import {Input, Tree} from 'antd';
import React from 'react';
import {DownOutlined} from '@ant-design/icons';
import {recursionChange} from '@/utils/utils';
const { Search } = Input;

const x = 3;
const y = 2;
const z = 1;
let gData = [{'title': '首页', 'key': '/xadmin/index', 'icon': 'dashboard', 'component': './DashBoard'}, {
  'title': '课程管理',
  'icon': 'VideoCamera',
  'key': '/xadmin/lessson',
  'children': [{
    'title': '课程方向',
    'icon': 'smile',
    'key': '/xadmin/lessson/label_type',
    'component': './LabelTypeList',
  }, {'title': '课程分类', 'icon': 'smile', 'key': '/xadmin/lessson/label', 'component': './LabelList'}, {
    'title': '课程类型',
    'icon': 'smile',
    'key': '/xadmin/lessson/lesson_type',
    'component': './LessonTypeList',
  }, {'title': '课程本课', 'icon': 'smile', 'key': '/xadmin/lessson/lesson', 'component': './LessonList'}, {
    'title': '课程章节',
    'icon': 'smile',
    'key': '/xadmin/lessson/chapter',
    'component': './ChapterList',
  }, {'title': '章节小节', 'icon': 'smile', 'key': '/xadmin/lessson/term', 'component': './TermList'}, {
    'title': '课程简介',
    'icon': 'smile',
    'key': '/xadmin/lessson/catalog',
    'component': './CatalogList',
  }, {
    'title': '课程评论',
    'icon': 'smile',
    'key': '/xadmin/lessson/comment',
    'component': './CommentList',
  }, {'title': '课程提问', 'icon': 'smile', 'key': '/xadmin/lessson/qa', 'component': './QaList'}, {
    'title': '问题状态',
    'icon': 'smile',
    'key': '/xadmin/lessson/qa_type',
    'component': './QaTypeList',
  }, {
    'title': '课程难度',
    'icon': 'smile',
    'key': '/xadmin/lessson/lesson_hard_type',
    'component': './LessonHardTypeList',
  }, {'title': '课程角标', 'icon': 'smile', 'key': '/xadmin/lessson/lesson_script', 'component': './LessonScriptList'}],
}, {
  'title': '专栏管理',
  'icon': 'book',
  'key': '/xadmin/read',
  'children': [{
    'title': '专栏分类',
    'icon': 'smile',
    'key': '/xadmin/read/read_type',
    'component': './ReadTypeList',
  }, {
    'title': '专栏章节',
    'icon': 'smile',
    'key': '/xadmin/read/read_chapter',
    'component': './ReadChapterList',
  }, {'title': '章节子节', 'icon': 'smile', 'key': '/xadmin/read/read_chapter_item', 'component': './ReadChapterItemList'}],
}, {
  'title': '猿问管理',
  'icon': 'QuestionCircle',
  'key': '/xadmin/qa',
  'children': [{
    'title': '问题列表',
    'icon': 'smile',
    'key': '/xadmin/qa/question',
    'component': './QuestionList',
  }, {
    'title': '关注标签',
    'icon': 'smile',
    'key': '/xadmin/qa/label_follow',
    'component': './LabelFollowList',
  }, {'title': '回答列表', 'icon': 'smile', 'key': '/xadmin/qa/answer', 'component': './AnswerList'}],
}, {
  'title': '手记管理',
  'icon': 'PaperClip',
  'key': '/xadmin/article',
  'children': [{
    'title': '文章列表',
    'icon': 'smile',
    'key': '/xadmin/article/article',
    'component': './ArticleList',
  }, {'title': '文章类型', 'icon': 'smile', 'key': '/xadmin/article/article_type', 'component': './ArticleTypeList'}],
}, {
  'title': '优惠管理',
  'icon': 'MoneyCollect',
  'key': '/xadmin/coupon',
  'children': [{
    'title': '优惠券码',
    'icon': 'smile',
    'key': '/xadmin/coupon/coupon',
    'component': './CouponList',
  }, {
    'title': '优惠状态',
    'icon': 'smile',
    'key': '/xadmin/coupon/coupon_status',
    'component': './CouponStatusList',
  }, {'title': '优惠范围', 'icon': 'smile', 'key': '/xadmin/coupon/coupon_range', 'component': './CouponRangeList'}],
}, {
  'title': '订单管理',
  'icon': 'OrderedList',
  'key': '/xadmin/order',
  'children': [{
    'title': '购物车车',
    'icon': 'smile',
    'key': '/xadmin/order/cart',
    'component': './CartList',
  }, {'title': '订单列表', 'icon': 'smile', 'key': '/xadmin/order/order', 'component': './OrderList'}, {
    'title': '订单子项',
    'icon': 'smile',
    'key': '/xadmin/order/order_item',
    'component': './OrderItemList',
  }, {'title': '订单状态', 'icon': 'smile', 'key': '/xadmin/order/order_status', 'component': './OrderStatusList'}],
}, {
  'title': '充值管理',
  'icon': 'PayCircle',
  'key': '/xadmin/pay',
  'children': [{
    'title': '充值记录',
    'icon': 'smile',
    'key': '/xadmin/pay/recharge',
    'component': './RechargeList',
  }, {
    'title': '充值类型',
    'icon': 'smile',
    'key': '/xadmin/pay/recharge_action',
    'component': './RechargeActionList',
  }, {'title': '充值方式', 'icon': 'smile', 'key': '/xadmin/pay/recharge_pay', 'component': './RechargePayList'}],
}, {
  'title': '用户管理',
  'icon': 'UsergroupAdd',
  'key': '/xadmin/user',
  'children': [{
    'title': '课程讲师',
    'icon': 'smile',
    'key': '/xadmin/user/teacher',
    'component': './TeacherList',
  }, {
    'title': '学生类型',
    'icon': 'smile',
    'key': '/xadmin/user/student_type',
    'component': './StudentTypeList',
  }, {'title': '学生列表', 'icon': 'smile', 'key': '/xadmin/user/student', 'component': './StudentList'}],
}, {
  'title': '积分商城',
  'icon': 'Shop',
  'key': '/xadmin/integral/',
  'children': [{
    'title': '商品类别',
    'icon': 'smile',
    'key': '/xadmin/integral/integral_type',
    'component': './IntegralTypeList',
  }, {'title': '积分商品', 'icon': 'smile', 'key': '/xadmin/integral/integral', 'component': './IntegralList'}],
}, {
  'title': '用户中心',
  'icon': 'user',
  'key': '/xadmin/user_info',
  'children': [{
    'title': '学习课程',
    'icon': 'smile',
    'key': '/xadmin/user_info/user_lesson',
    'component': './UserLessonList',
  }, {
    'title': '用户通知',
    'icon': 'smile',
    'key': '/xadmin/user_info/user_notice',
    'component': './UserNoticeList',
  }, {
    'title': '搜索历史',
    'icon': 'smile',
    'key': '/xadmin/user_info/history',
    'component': './HistoryList',
  }, {
    'title': '用户咨询',
    'icon': 'smile',
    'key': '/xadmin/user_info/consult',
    'component': './ConsultList',
  }, {'title': '购买账单', 'icon': 'smile', 'key': '/xadmin/user_info/bill', 'component': './BillList'}, {
    'title': '地址信息',
    'icon': 'smile',
    'key': '/xadmin/user_info/address',
    'component': './AddressList',
  }, {
    'title': '登录类型',
    'icon': 'smile',
    'key': '/xadmin/user_info/log_type',
    'component': './LogTypeList',
  }, {'title': '登录日志', 'icon': 'smile', 'key': '/xadmin/user_info/log', 'component': './LogList'}],
}, {
  'title': '首页管理',
  'icon': 'setting',
  'key': '/xadmin/home',
  'children': [{
    'title': '首页大图',
    'icon': 'smile',
    'key': '/xadmin/home/slider',
    'component': './SliderList',
  }, {
    'title': '首页菜单',
    'icon': 'smile',
    'key': '/xadmin/home/navigation',
    'component': './NavigationList',
  }, {
    'title': '公共配置',
    'icon': 'smile',
    'key': '/xadmin/home/common_path_config',
    'component': './CommonPathConfigList',
  }, {'title': '首页导航', 'icon': 'smile', 'key': '/xadmin/home/nav', 'component': './NavList'}, {
    'title': '底部配置',
    'icon': 'smile',
    'key': '/xadmin/home/footer',
    'component': './FooterList',
  }],
}, {
  'title': '系统管理',
  'icon': 'setting',
  'key': '/xadmin/sys',
  'children': [{
    'title': '系统日志',
    'icon': 'smile',
    'key': '/xadmin/sys/sys_log',
    'component': './SysLogList',
  }, {'title': '热搜榜单', 'icon': 'smile', 'key': '/xadmin/sys/hot', 'component': './HotList'}, {
    'title': '系统通知',
    'icon': 'smile',
    'key': '/xadmin/sys/notice',
    'component': './NoticeList',
  }, {'title': '系统用户', 'icon': 'smile', 'key': '/xadmin/sys/user', 'component': './UserList'}],
}];
recursionChange(gData, (one) => {
  // one.icon = <DynamicIcon type={one.icon}/>
  console.log('xxone', one);
  // one.icon = <DynamicIcon type={one.icon}/>
});
console.log('gDdata', gData);

class DragTree extends React.Component {
  state = {
    gData,
    searchValue: '',
    expandedKeys: ['0-0', '0-0-0', '0-0-0-0'],
  };

  onDragEnter = info => {
    console.log(info);
    // expandedKeys 需要受控时设置
    // this.setState({
    //   expandedKeys: info.expandedKeys,
    // });
  };

  onDrop = info => {
    console.log(info);
    const dropKey = info.node.props.eventKey;
    const dragKey = info.dragNode.props.eventKey;
    const dropPos = info.node.props.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (data, key, callback) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children, key, callback);
        }
      }
    };
    const data = [...this.state.gData];

    // Find dragObject
    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, item => {
        item.children = item.children || [];
        // where to insert 示例添加到尾部，可以是随意位置
        item.children.push(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0 && // Has children
      info.node.props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, item => {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
      });
    } else {
      let ar;
      let i;
      loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }

    this.setState({
      gData: data,
    });
  };

  render() {
    return (
      <>
        <Search style={{marginBottom: 8}} placeholder="Search" onChange={this.onChange} />
        <Tree
          showIcon
          className="draggable-tree"
          defaultExpandedKeys={this.state.expandedKeys}
          draggable
          blockNode
          switcherIcon={<DownOutlined />}
          onDragEnter={this.onDragEnter}
          onDrop={this.onDrop}
          treeData={this.state.gData}
        />
      </>
    );
  }
}

export default DragTree;

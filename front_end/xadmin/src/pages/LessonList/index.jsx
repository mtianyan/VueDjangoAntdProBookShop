import {DownOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, Divider, Dropdown, Form, Input, Menu, message, Popconfirm, Switch, Tree, TreeSelect} from 'antd';
import React, {useRef, useState} from 'react';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import {addRule, queryRule, removeRule, updateRule} from './service';
import EditOutlined from '@ant-design/icons/lib/icons/EditOutlined';
import DeleteOutlined from '@ant-design/icons/lib/icons/DeleteOutlined';
import UpdateForm from '@/pages/RoleList/components/UpdateForm';
import moment from 'moment';
import {isArray, isEmpty} from '@/utils/utils';

/**
 * 添加节点
 * @param fields
 */


const handleAdd = async fields => {
  const hide = message.loading('正在添加');

  try {
    await addRule({...fields});
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};
/**
 * 更新节点
 * @param fields
 */

const handleUpdate = async fields => {
  const hide = message.loading('正在配置');

  try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();
    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};
/**
 *  删除节点
 * @param selectedRows
 */

const handleRemove = async selectedRows => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;

  try {
    await removeRule({
      key: selectedRows.map(row => row.key),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList = () => {
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [updateFormValues, setUpdateFormValues] = useState({});
  const [tree, setTree] = useState([]);
  const actionRef = useRef();

  // 【启用禁用部门】
  const toggleState = (checked, record) => {
    const { id } = record;
    dispatch({
      type: 'systemDepartment/enable',
      payload: {
        id,
        status: checked,
      },
    });
  };

  const columns = [
{
              title: 'ID',
              dataIndex: 'id',
              rules: [
                {
                  required: true,
                  message: 'ID为必填项',
                },
              ],
            },
{
              title: '课程',
              dataIndex: 'course',
              rules: [
                {
                  required: true,
                  message: '课程为必填项',
                },
              ],
            },
{
              title: '章节名',
              dataIndex: 'name',
              rules: [
                {
                  required: true,
                  message: '章节名为必填项',
                },
              ],
            },
{
          title: '添加时间',
          dataIndex: 'add_time',
          valueType: 'dateTime',
          rules: [
            {
              required: true,
              message: '添加时间为必填项',
            },
          ],
        },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (text, record) => (
        <>

          <EditOutlined title="编辑" className="icon" onClick={async () => {
            handleUpdateModalVisible(true);
            console.log('^^^^' * 30);
            record.create_time = moment(record.create_time);
            record.date_joined = moment(record.date_joined);
            record.last_login = moment(record.last_login);
            record.add_time = moment(record.add_time);
            console.log(record);
            console.log('^^^^' * 30);
            setUpdateFormValues(record);
          }} />
          <Divider type="vertical" />
          <Popconfirm
            title="您确定要删除吗？"
            placement="topRight"
            onConfirm={() => handleDelete(record)}
            okText="确定"
            cancelText="取消"
          >
            <DeleteOutlined title="删除" className="icon" />
          </Popconfirm>
        </>
      ),
    },
]


  const [columnsStateMap, setColumnsStateMap] = useState({
      id: {
        show: false,
      },
      password: {
        show: false,
      },
      last_login: {
        show: false,
      },
      is_superuser: {
        show: false,
      },
      first_name: {
        show: false,
      },
      last_name: {
        show: false,
      },
      is_staff: {
        show: false,
      },
      is_active: {
        show: false,
      },
      user_type: {
        show: false,
      },
      department: {
        show: false,
      },
      nick_name: {
        show: false,
      },
      telephone: {
        show: false,
      },
      date_joined: {
        show: false,
      },
      is_custom: {
        show: false,
      },
      aes_mode: {
        show: false,
      },
      encrypt_mode: {
        show: false,
      },
      is_vip: {
        show: false,
      },
      size: {
        show: false,
      },
      is_black: {
        show: false,
      },
      is_white: {
        show: false,
      },
      bit_value: {
        show: false,
      },
    },
  );

  const formItemLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 8},
  };

  return (
    <PageHeaderWrapper>
      <ProTable
        scroll={{x: true}}
        columnsStateMap={columnsStateMap}
        onColumnsStateChange={(map) => setColumnsStateMap(map)}
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={(action, {selectedRows}) => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新建
          </Button>,
          selectedRows && selectedRows.length > 0 && (
            <Dropdown
              overlay={
                <Menu
                  onClick={async e => {
                    if (e.key === 'remove') {
                      await handleRemove(selectedRows);
                      action.reload();
                    }
                  }}
                  selectedKeys={[]}
                >
                  <Menu.Item key="remove">批量删除</Menu.Item>
                  <Menu.Item key="approval">批量审批</Menu.Item>
                </Menu>
              }
            >
              <Button>
                批量操作 <DownOutlined />
              </Button>
            </Dropdown>
          ),
        ]}
        tableAlertRender={({selectedRowKeys, selectedRows}) => (
          <div>
            已选择{' '}
            <a
              style={{
                fontWeight: 600,
              }}
            >
              {selectedRowKeys.length}
            </a>{' '}
            项&nbsp;&nbsp;
            <span>
              服务调用次数总计 {selectedRows.reduce((pre, item) => pre + item.callNo, 0)} 万
            </span>
          </div>
        )}
        request={(params, sorter, filter) => queryRule({...params, sorter, filter})}
        columns={columns}
        rowSelection={{}}
      />
      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
        <ProTable
          onSubmit={async value => {
            const success = await handleAdd(value);

            if (success) {
              handleModalVisible(false);

              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          search={{
            span: {
              lg: 12,
              md: 12,
              xxl: 12,
              xl: 12,
              sm: 12,
              xs: 24,
            },
          }}
          rowKey="key"
          type="form"
          columns={columns}
          rowSelection={{}}
        />
      </CreateForm>
      <UpdateForm onCancel={() => handleUpdateModalVisible(false)} modalVisible={updateModalVisible}>
        <ProTable

          onSubmit={async value => {
            const success = await handleAdd(value);

            if (success) {
              handleModalVisible(false);

              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          search={{
            span: {
              lg: 12,
              md: 12,
              xxl: 12,
              xl: 12,
              sm: 12,
              xs: 24,
            },
          }}
          rowKey="key"
          type="form"
          form={{initialValues: updateFormValues}}
          columns={columns}
          rowSelection={{}}
        />
      </UpdateForm>
    </PageHeaderWrapper>
  );
};

export default TableList;

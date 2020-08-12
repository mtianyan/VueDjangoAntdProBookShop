import {DownOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, Divider, Dropdown, Menu, Popconfirm} from 'antd';
import React, {useRef, useState} from 'react';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import {queryCity, removeCity, updateCity, addCity} from './service';
import EditOutlined from '@ant-design/icons/lib/icons/EditOutlined';
import DeleteOutlined from '@ant-design/icons/lib/icons/DeleteOutlined';
import UpdateForm from '@/pages/RoleList/components/UpdateForm';

const handleAdd = async fields => {
  const hide = message.loading('正在添加');

  try {
    await addCity({...fields});
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};
const handleUpdate = async (value, current_id) => {
  const hide = message.loading('正在修改');

  try {
    await updateCity(value, current_id);
    hide();
    message.success('修改成功');
    return true;
  } catch (error) {
    hide();
    message.error('修改失败请重试！');
    return false;
  }
};
const handleRemove = async selectedRows => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;

  try {
    const ids = selectedRows.map(row => row.id).join(',');
    await removeCity(ids);
    hide();
    message.success('删除成功');
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
  const actionRef = useRef();

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
      title: '城市',
      dataIndex: 'name',
      rules: [
        {
          required: true,
          message: '城市为必填项',
        },
      ],
    },
    {
      title: '描述',
      dataIndex: 'desc',
      rules: [
        {
          required: true,
          message: '描述为必填项',
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
            setUpdateFormValues(record);
          }} />
          <Divider type="vertical" />
          <Popconfirm
            title="您确定要删除该城市吗？"
            placement="topRight"
            onConfirm={() => (record)}
            okText="确定"
            cancelText="取消"
          >
            <DeleteOutlined title="删除" className="icon" />
          </Popconfirm>
        </>
      ),
    },
  ];

  const [columnsStateMap, setColumnsStateMap] = useState({});

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
          selectedRowKeys.length > 0 ? <div>
            已选择{' '}
            <a
              style={{
                fontWeight: 600,
              }}
            >
              {selectedRowKeys.length}
            </a>{' '}
            项&nbsp;&nbsp;
          </div> : false

        )}
        request={(params, sorter, filter) => queryCity({...params, sorter, filter})}
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
          rowKey="key"
          type="form"
          form={{
            labelCol: {span: 6},
          }}
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

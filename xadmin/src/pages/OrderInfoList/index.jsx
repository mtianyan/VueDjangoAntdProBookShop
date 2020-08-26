import {DownOutlined, PlusOutlined, EditOutlined,DeleteOutlined} from '@ant-design/icons';
import {Button, Divider, Dropdown, Input, Menu, message, Popconfirm, Select, Switch} from 'antd';
import React, {useEffect,useRef, useState} from 'react';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import ProTable from 'mtianyan-pro-table';
import CreateForm from './components/CreateForm';
import {addOrderInfo, queryOrderInfo, removeOrderInfo, updateOrderInfo} from './service';
import UpdateForm from './components/UpdateForm';
import UploadAvatar from '@/components/UploadAvatar';
import {queryUserProfile} from '@/pages/UserProfileList/service';
import moment from 'moment';
const {Option} = Select;
import {BooleanDisplay, dealDateTimeDisplay, dealTime, deepCopy, getObjectClass, getTableColumns, richForm, richTrans, richCol,fileUpload} from '@/utils/utils';
import 'braft-editor/dist/index.css'

const TableList = () => {
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [updateFormValues, setUpdateFormValues] = useState({});
  const actionRef = useRef();
  const addFormRef = useRef();
  const updateFormRef = useRef();

  const handleAdd = async fields => {
  const hide = message.loading('正在添加');

  try {
    await addOrderInfo({...fields});
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
      if ('fields_errors' in error.data) {
        for (let key in error.data.fields_errors) {
          var value = error.data.fields_errors[key];
          addFormRef.current.setFields([
            {
              name: key,
              errors: value,
            },
          ]);
        }
      } else {
        message.error('非字段类型错误');
      }
    hide();
    message.error('添加失败');
    return false;
  }
};

  const handleUpdate = async (value, current_id) => {
  const hide = message.loading('正在修改');

  try {
    await updateOrderInfo(value, current_id);
    hide();
    message.success('修改成功');
    return true;
  } catch (error) {
            if ('fields_errors' in error.data) {
        for (let key in error.data.fields_errors) {
          var value = error.data.fields_errors[key];
          updateFormRef.current.setFields([
            {
              name: key,
              errors: value,
            },
          ]);
        }
      } else {
        message.error('非字段类型错误');
      }
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
    await removeOrderInfo(ids);
    hide();
    message.success('删除成功');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};
  const dateFieldList = ["pay_time","add_time"]
  const base_columns = [{
                              title: 'ID',
                              dataIndex: 'id',
                              hideInForm: true,
                              hideInSearch: true,
                              rules: [
                                {
                                  required: true,
                                  message: 'ID为必填项',
                                },
                              ],
                            },{
                          title: '用户',
                          dataIndex: 'user',
                          backendType: 'foreignKey',
                          rules: [
                            {
                              required: true,
                              message: '用户为必填项',
                            },
                          ],
                                renderFormItem: (item, {value, onChange}) => {
        const children = userForeignKeyList.map((item) => {
          return <Option key={item.id} value={item.id}>{item.username}</Option>;
        });
        return <Select
          placeholder="请选择用户"
          onChange={onChange}
        >
          {children}
        </Select>;
      },
                        },{
                  title: '订单编号',
                  dataIndex: 'order_sn',
                  rules: [
                    {
                      required: true,
                      message: '订单编号为必填项',
                    },
                  ],
                },{
                  title: '随机加密串',
                  dataIndex: 'nonce_str',
                  rules: [
                    {
                      required: true,
                      message: '随机加密串为必填项',
                    },
                  ],
                },{
                  title: '交易号',
                  dataIndex: 'trade_no',
                  rules: [
                    {
                      required: true,
                      message: '交易号为必填项',
                    },
                  ],
                },{
                                       title: '订单状态',
                                       dataIndex: 'pay_status',
                                       rules: [
                                         {
                                           required: true,
                                           message: '订单状态为必填项',
                                         },
                                       ],
                                       valueEnum: {
                                         TRADE_SUCCESS:"成功",TRADE_CLOSED:"超时关闭",WAIT_BUYER_PAY:"交易创建",TRADE_FINISHED:"交易结束",paying:"待支付"
                                        },
                                     },{
                                       title: '支付类型',
                                       dataIndex: 'pay_type',
                                       rules: [
                                         {
                                           required: true,
                                           message: '支付类型为必填项',
                                         },
                                       ],
                                       valueEnum: {
                                         alipay:"支付宝",wechat:"微信"
                                        },
                                     },{
                  title: '订单留言',
                  dataIndex: 'post_script',
                  rules: [
                    {
                      required: true,
                      message: '订单留言为必填项',
                    },
                  ],
                },{
                                  title: '订单金额',
                                  dataIndex: 'order_mount',
                                            valueType: 'digit',
                                  rules: [
                                    {
                                      required: true,
                                      message: '订单金额为必填项',
                                    },
                                  ],
                                },{
          title: '支付时间',
          dataIndex: 'pay_time',
          valueType: 'dateTime',
          
          rules: [
            {
              required: true,
              message: '支付时间为必填项',
            },
          ],
                                   render: (text, record) => {
      return dealDateTimeDisplay(text);
    },
        },{
                  title: '收货地址',
                  dataIndex: 'address',
                  rules: [
                    {
                      required: true,
                      message: '收货地址为必填项',
                    },
                  ],
                },{
                  title: '签收人',
                  dataIndex: 'signer_name',
                  rules: [
                    {
                      required: true,
                      message: '签收人为必填项',
                    },
                  ],
                },{
                  title: '联系电话',
                  dataIndex: 'singer_mobile',
                  rules: [
                    {
                      required: true,
                      message: '联系电话为必填项',
                    },
                  ],
                },{
          title: '添加时间',
          dataIndex: 'add_time',
          valueType: 'dateTime',
          hideInForm: true,
          rules: [
            {
              required: true,
              message: '添加时间为必填项',
            },
          ],
                                   render: (text, record) => {
      return dealDateTimeDisplay(text);
    },
        },    {
                          title: '操作',
                          dataIndex: 'option',
                          valueType: 'option',
                                fixed: 'right',
      width: 100,
                          render: (text, record) => (
                            <>

                              <EditOutlined title="编辑" className="icon" onClick={async () => {
                                record.pay_time = moment(record.pay_time);record.add_time = moment(record.add_time);
                                handleUpdateModalVisible(true);
                                setUpdateFormValues(record);
                              }} />
                              <Divider type="vertical" />
                              <Popconfirm
                                title="您确定要删除订单信息吗？"
                                placement="topRight"
                                onConfirm={() => {
                                  handleRemove([record])
                                  actionRef.current.reloadAndRest();
                                }}
                                okText="确定"
                                cancelText="取消"
                              >
                                <DeleteOutlined title="删除" className="icon" />
                              </Popconfirm>
                            </>
                          ),
                        },];

  let cp = deepCopy(base_columns);
  const table_columns = getTableColumns(cp);

  const update_columns = [...base_columns];

  const create_columns = [...base_columns];

  const [columnsStateMap, setColumnsStateMap] = useState({});

  const [paramState, setParamState] = useState({});

  const [userForeignKeyList, setUserForeignKeyList] = useState([]);
  useEffect(() => {
    queryUserProfile().then(value => {
      setUserForeignKeyList(value.data);
    });
  }, []);


    
  return (
    <PageHeaderWrapper>
      <ProTable
           beforeSearchSubmit={(params => {
                         dealTime(params, dateFieldList);
          return params;
        })}
        params={paramState}
        scroll={{x: '100%'}}
        columnsStateMap={columnsStateMap}
        onColumnsStateChange={(map) => setColumnsStateMap(map)}
        headerTitle="订单信息表格"
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={(action, {selectedRows}) => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新建
          </Button>,
          <Input.Search style={{marginRight: 20}} placeholder="搜索订单信息 " onSearch={value => {
            setParamState({
              search: value,
            });
            actionRef.current.reload();
          }} />,
          selectedRows && selectedRows.length > 0 && (
            <Dropdown
              overlay={
                <Menu
                  onClick={async e => {
                    if (e.key === 'remove') {
                      await handleRemove(selectedRows);
                      actionRef.current.reloadAndRest();
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
        request={(params, sorter, filter) => queryOrderInfo({...params, sorter, filter})}
        columns={table_columns}
        rowSelection={{}}
      />
      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
        <ProTable
                     formRef={addFormRef}
          onSubmit={async value => {
                          richTrans(value);
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
          form={
            {
              labelCol: {span: 6},
              labelAlign: 'left',
            }}
          columns={create_columns}
          rowSelection={{}}
        />
      </CreateForm>
      <UpdateForm onCancel={() => handleUpdateModalVisible(false)} modalVisible={updateModalVisible}>
        <ProTable
          formRef={updateFormRef}
          onSubmit={async value => {
                          richTrans(value);
            const success = await handleUpdate(value, updateFormValues.id);

            if (success) {
              handleUpdateModalVisible(false);

              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="key"
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
          type="form"
          form={{
            initialValues: updateFormValues, labelCol: {span: 6},
            labelAlign: 'left',
          }}
          columns={update_columns}
          rowSelection={{}}
        />
      </UpdateForm>
    </PageHeaderWrapper>
  );
};

export default TableList;

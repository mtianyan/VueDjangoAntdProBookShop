import { DeleteOutlined, DownOutlined, EditOutlined, PlusOutlined, ExportOutlined } from '@ant-design/icons';
import { notification, Button, Col, Descriptions, Divider, Dropdown, Form, Input, Menu, message, Popconfirm, Popover, Row, Select, Tag, Transfer, Switch } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import KeyOutlined from '@ant-design/icons/lib/icons/KeyOutlined';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from 'mtianyan-pro-table';
import CreateForm from './components/CreateForm';
import { addOrderInfo, queryOrderInfo, removeOrderInfo, updateOrderInfo, queryOrderInfoVerboseName, queryOrderInfoListDisplay, queryOrderInfoDisplayOrder} from './service';
import UpdateForm from './components/UpdateForm';
import UploadAvatar from '@/components/UploadAvatar';
import {queryUserProfile, queryUserProfileVerboseName} from '@/pages/AutoGenPage/UserProfileList/service';

import moment from 'moment';
const { Option } = Select;
import { BooleanFormItem, dealManyToManyFieldTags, fileUpload, twoColumns, richForm, richCol, dealPureSelectField, orderForm, exportExcelCurrent, exportExcelAll, getUpdateColumns, dealRemoveError, dealError, BooleanDisplay, dealDateTimeDisplay, dealManyToManyField, dealTime, deepCopy, fieldErrorHandle, getTableColumns, renderManyToMany, richTrans, dealForeignKeyField, renderForeignKey, fieldsLevelErrorHandle } from '@/utils/utils';
import 'braft-editor/dist/index.css'
const FormItem = Form.Item;
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
      await addOrderInfo({ ...fields });
      hide();
      message.success('添加成功');
      return true;
    } catch (error) {
      return dealError(error, addFormRef, hide, "添加");
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
      return dealError(error, updateFormRef, hide, "修改");
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
      hide()
      return dealRemoveError(error, "删除");
    }
  };
 
  const dateFieldList = ["pay_time","add_time"]
  const base_columns = [{
                             title: 'id',
                             
        hideInForm: true,
        hideInSearch: true,
        
                             
                             dataIndex: 'id',
                             valueType: 'digit',
                             rules: [
                                     
                             ],
                             
                             
                        },
                      {
                             title: '用户',
                             
                             
                             dataIndex: 'user',
                             
                             rules: [
                                     {
                      required: true,
                      message: '用户为必填项',
                     },
                             ],
                             
                        renderFormItem: (item, {value, onChange}) => {
                                          return dealForeignKeyField(item, value, onChange, userForeignKeyList);
                                  },
                        render: (text, record) => {
                              return renderForeignKey(text, userVerboseNameMap);
                            },
                             
                        },
                      {
                             title: '订单编号',
                             
                             
                             dataIndex: 'order_sn',
                             
                             rules: [
                                     
                             ],
                             
                             
                        },
                      {
                             title: '随机加密串',
                             
                             
                             dataIndex: 'nonce_str',
                             
                             rules: [
                                     
                             ],
                             
                             
                        },
                      {
                             title: '交易号',
                             
                             
                             dataIndex: 'trade_no',
                             
                             rules: [
                                     
                             ],
                             
                             
                        },
                      {
                             title: '订单状态',
                             
                             initialValue: "paying",
                             dataIndex: 'pay_status',
                             
                             rules: [
                                     
                             ],
                             
                             valueEnum:{"TRADE_SUCCESS":"成功","TRADE_CLOSED":"超时关闭","WAIT_BUYER_PAY":"交易创建","TRADE_FINISHED":"交易结束","paying":"待支付"}
                        },
                      {
                             title: '支付类型',
                             
                             initialValue: "alipay",
                             dataIndex: 'pay_type',
                             
                             rules: [
                                     
                             ],
                             
                             valueEnum:{"alipay":"支付宝","wechat":"微信"}
                        },
                      {
                             title: '订单留言',
                             
                             
                             dataIndex: 'post_script',
                             
                             rules: [
                                     {
                      required: true,
                      message: '订单留言为必填项',
                     },
                             ],
                             
                             
                        },
                      {
                             title: '订单金额',
                             
                             initialValue: "0.0",
                             dataIndex: 'order_mount',
                             
                             rules: [
                                     
                             ],
                             
                             
                        },
                      {
                             title: '支付时间',
                             
                             
                             dataIndex: 'pay_time',
                             valueType: 'dateTime',
                             rules: [
                                     
                             ],
                             
                             
                        },
                      {
                             title: '收货地址',
                             
                             initialValue: "",
                             dataIndex: 'address',
                             
                             rules: [
                                     
                             ],
                             
                             
                        },
                      {
                             title: '签收人',
                             
                             initialValue: "",
                             dataIndex: 'signer_name',
                             
                             rules: [
                                     
                             ],
                             
                             
                        },
                      {
                             title: '联系电话',
                             
                             
                             dataIndex: 'singer_mobile',
                             
                             rules: [
                                     {
                      required: true,
                      message: '联系电话为必填项',
                     },
                             ],
                             
                             
                        },
                      {
                             title: '添加时间',
                             
            hideInForm: true,
            
                             
                             dataIndex: 'add_time',
                             valueType: 'dateTime',
                             rules: [
                                     
                             ],
                             
                             
                        },
                          {
                              title: '操作',
                              dataIndex: 'option',
                              valueType: 'option',
                                    fixed: 'right',
          width: 100,
                              render: (text, record) => (
                                <>

                                  <EditOutlined title="编辑" className="icon" onClick={async () => {
                                   record.pay_time = record.pay_time === null ? record.pay_time : moment(record.pay_time);record.add_time = record.add_time === null ? record.add_time : moment(record.add_time);
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

  const [formOrder, setFormOrder] = useState([]);

  useEffect(() => {
    queryOrderInfoDisplayOrder().then(r => {
      setFormOrder(r.form_order)
    })
  }, [])
  const table_columns = getTableColumns(cp);

  let order_cp = deepCopy(base_columns);
  const form_ordered = orderForm(formOrder, order_cp);

  const create_columns = [...form_ordered];
  const update_cp = deepCopy(form_ordered)
  const update_columns = getUpdateColumns(update_cp);

  const [columnsStateMap, setColumnsStateMap] = useState({});

  const [paramState, setParamState] = useState({});

  useEffect(() => {
    queryOrderInfoListDisplay().then(value => {
      setColumnsStateMap(value)
    })
  }, [])


   
                                const [userForeignKeyList, setUserForeignKeyList] = useState([]);
                                useEffect(() => {
                                queryUserProfile({all: 1}).then(value => {
                                     setUserForeignKeyList(value);
                                });
                                }, []);
                                const [userVerboseNameMap, setUserVerboseNameMap] = useState([]);
                                useEffect(() => {
                                queryUserProfileVerboseName().then(value => {
                                    setUserVerboseNameMap(value);
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
        scroll={{ x: '100%' }}
        columnsStateMap={columnsStateMap}
        onColumnsStateChange={(map) => setColumnsStateMap(map)}
        headerTitle="订单信息表格"
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={(action, { selectedRows }) => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新建
          </Button>,
          <Button type="primary" onClick={() => exportExcelAll(paramState, queryOrderInfo, table_columns, '订单信息-All')}>
            <ExportOutlined /> 导出全部
          </Button>,
          <Input.Search style={{ marginRight: 20 }} placeholder="搜索订单信息" onSearch={value => {
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
                    else if (e.key === 'export_current') {
                      exportExcelCurrent(selectedRows, table_columns, '订单信息-select')
                    }
                  }}
                  selectedKeys={[]}
                >
                  <Menu.Item key="remove">批量删除</Menu.Item>
                  <Menu.Item key="export_current">导出已选</Menu.Item>
                </Menu>
              }
            >
              <Button>
                批量操作 <DownOutlined />
              </Button>
            </Dropdown>
          ),
        ]}
        tableAlertRender={({ selectedRowKeys, selectedRows }) => (
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
        request={(params, sorter, filter) => queryOrderInfo({ ...params, sorter, filter })}
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
          search={twoColumns}
          form={
            {
              labelCol: { span: 6 },
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
          search={twoColumns}
          type="form"
          form={{
            initialValues: updateFormValues, labelCol: { span: 6 },
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

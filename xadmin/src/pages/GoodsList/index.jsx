import {DeleteOutlined, DownOutlined, EditOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, Divider, Dropdown, Input, Menu, message, Popconfirm, Select, Switch} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import ProTable from 'mtianyan-pro-table';
import CreateForm from './components/CreateForm';
import {addGoods, queryGoods, removeGoods, updateGoods} from './service';
import UpdateForm from './components/UpdateForm';
import UploadAvatar from '@/components/UploadAvatar';
import {queryGoodsCategory} from '@/pages/GoodsCategoryList/service';
import moment from 'moment';
import {
  BooleanDisplay,
  dealDateTimeDisplay,
  dealTime,
  deepCopy,
  getTableColumns,
  richCol,
  richForm,
  richTrans,
} from '@/utils/utils';
import 'braft-editor/dist/index.css';

const {Option} = Select;

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
      await addGoods({...fields});
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
      await updateGoods(value, current_id);
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
      await removeGoods(ids);
      hide();
      message.success('删除成功');
      return true;
    } catch (error) {
      hide();
      message.error('删除失败，请重试');
      return false;
    }
  };
  const dateFieldList = ['add_time'];
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
  }, {
    title: '商品类目',
    dataIndex: 'category',
    backendType: 'foreignKey',
    rules: [
      {
        required: true,
        message: '商品类目为必填项',
      },
    ],
    renderFormItem: (item, {value, onChange}) => {
      const children = categoryForeignKeyList.map((item) => {
        return <Option key={item.id} value={item.id}>{item.name}</Option>;
      });
      return <Select
        placeholder="请选择商品类目"
        onChange={onChange}
      >
        {children}
      </Select>;
    },
  }, {
    title: '商品唯一货号',
    dataIndex: 'goods_sn',
    rules: [
      {
        required: true,
        message: '商品唯一货号为必填项',
      },
    ],
  }, {
    title: '商品名',
    dataIndex: 'name',
    rules: [
      {
        required: true,
        message: '商品名为必填项',
      },
    ],
  }, {
    title: '点击数',
    dataIndex: 'click_num',
    valueType: 'digit',
    rules: [
      {
        required: true,
        message: '点击数为必填项',
      },
    ],
  }, {
    title: '商品销售量',
    dataIndex: 'sold_num',
    valueType: 'digit',
    rules: [
      {
        required: true,
        message: '商品销售量为必填项',
      },
    ],
  }, {
    title: '收藏数',
    dataIndex: 'fav_num',
    valueType: 'digit',
    rules: [
      {
        required: true,
        message: '收藏数为必填项',
      },
    ],
  }, {
    title: '库存数',
    dataIndex: 'goods_num',
    valueType: 'digit',
    rules: [
      {
        required: true,
        message: '库存数为必填项',
      },
    ],
  }, {
    title: '市场价格',
    dataIndex: 'market_price',
    valueType: 'digit',
    rules: [
      {
        required: true,
        message: '市场价格为必填项',
      },
    ],
  }, {
    title: '本店价格',
    dataIndex: 'shop_price',
    valueType: 'digit',
    rules: [
      {
        required: true,
        message: '本店价格为必填项',
      },
    ],
  }, {
    title: '商品简短描述',
    dataIndex: 'goods_brief',
    valueType: 'textarea',
    ellipsis: true,
    rules: [
      {
        required: true,
        message: '商品简短描述为必填项',
      },
    ],
  }, {
    title: '内容',
    dataIndex: 'goods_desc',
    customCol: richCol,
    ellipsis: true,
    hideInSearch: true,
    rules: [
      {
        required: true,
        message: '内容为必填项',
      },
    ],
    renderFormItem: (_, {type, defaultRender, ...rest}, form) => {
      return richForm(form, rest.id);
    },
  }, {
    title: '是否承担运费',
    dataIndex: 'ship_free',
    rules: [
      {
        required: true,
        message: '是否承担运费为必填项',
      },
    ],
    render: (text, record) => {
      return BooleanDisplay(text);
    },
    renderFormItem: (_, {type, defaultRender, ...rest}, form) => {
      const is_value = form.getFieldValue('ship_free');
      if (type === 'form' && !is_value) {
        form.setFieldsValue({'ship_free': false});
      }
      return <Switch checked={is_value} onClick={(checked) => {
        form.setFieldsValue({'ship_free': checked});
      }} />;
    },
  }, {
    title: '封面图',
    dataIndex: 'goods_front_image',
    render: (text, record) => {
      return <img src={text} width="80px" alt="" />;
    },
    hideInSearch: true,
    rules: [
      {
        required: true,
        message: '封面图为必填项',
      },
    ],
    renderFormItem: (_, {type, defaultRender, ...rest}, form) => {
      const imageUrl = form.getFieldValue('goods_front_image');
      return <UploadAvatar img={imageUrl} />;
    },
  }, {
    title: '是否新品',
    dataIndex: 'is_new',
    rules: [
      {
        required: true,
        message: '是否新品为必填项',
      },
    ],
    render: (text, record) => {
      return BooleanDisplay(text);
    },
    renderFormItem: (_, {type, defaultRender, ...rest}, form) => {
      const is_value = form.getFieldValue('is_new');
      if (type === 'form' && !is_value) {
        form.setFieldsValue({'is_new': false});
      }
      return <Switch checked={is_value} onClick={(checked) => {
        form.setFieldsValue({'is_new': checked});
      }} />;
    },
  }, {
    title: '是否热销',
    dataIndex: 'is_hot',
    rules: [
      {
        required: true,
        message: '是否热销为必填项',
      },
    ],
    render: (text, record) => {
      return BooleanDisplay(text);
    },
    renderFormItem: (_, {type, defaultRender, ...rest}, form) => {
      const is_value = form.getFieldValue('is_hot');
      if (type === 'form' && !is_value) {
        form.setFieldsValue({'is_hot': false});
      }
      return <Switch checked={is_value} onClick={(checked) => {
        form.setFieldsValue({'is_hot': checked});
      }} />;
    },
  }, {
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
  }, {
    title: '操作',
    dataIndex: 'option',
    valueType: 'option',
    fixed: 'right',
    width: 100,
    render: (text, record) => (
      <>

        <EditOutlined title="编辑" className="icon" onClick={async () => {
          record.add_time = moment(record.add_time);
          handleUpdateModalVisible(true);
          setUpdateFormValues(record);
        }} />
        <Divider type="vertical" />
        <Popconfirm
          title="您确定要删除商品信息吗？"
          placement="topRight"
          onConfirm={() => {
            handleRemove([record]);
            actionRef.current.reloadAndRest();
          }}
          okText="确定"
          cancelText="取消"
        >
          <DeleteOutlined title="删除" className="icon" />
        </Popconfirm>
      </>
    ),
  }];

  let cp = deepCopy(base_columns);
  const table_columns = getTableColumns(cp);

  const update_columns = [...base_columns];

  const create_columns = [...base_columns];

  const [columnsStateMap, setColumnsStateMap] = useState({});

  const [paramState, setParamState] = useState({});

  const [categoryForeignKeyList, setCategoryForeignKeyList] = useState([]);
  useEffect(() => {
    queryGoodsCategory().then(value => {
      setCategoryForeignKeyList(value.data);
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
        headerTitle="商品信息表格"
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={(action, {selectedRows}) => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新建
          </Button>,
          <Input.Search style={{marginRight: 20}} placeholder="搜索商品信息 " onSearch={value => {
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
        request={(params, sorter, filter) => queryGoods({...params, sorter, filter})}
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

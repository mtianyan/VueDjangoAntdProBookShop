# 独立使用django的model
import sys
import os

#  获取当前文件的路径，以及路径的父级文件夹名
from django.db.models import DateTimeField

pwd = os.path.dirname(os.path.realpath(__file__))
print(pwd)
# 将项目目录加入setting
sys.path.append(pwd)
# manage.py中
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "VueDjangoFrameWorkShop.settings")

import django

django.setup()
import django.apps

focus_model = "Banner"
for one in django.apps.apps.get_models():
    if one._meta.model.__name__ == focus_model:
        print("&&&&" * 20)
        print("[")
        for filed in one.objects.model._meta.fields:
            name = filed.name
            ver_name = filed.verbose_name
            if isinstance(filed, DateTimeField):
                base = """{
          title: '%s',
          dataIndex: '%s',
          valueType: 'dateTime',
          rules: [
            {
              required: true,
              message: '%s为必填项',
            },
          ],
        },""" % (ver_name, name, ver_name)
            else:
                base = """{
              title: '%s',
              dataIndex: '%s',
              rules: [
                {
                  required: true,
                  message: '%s为必填项',
                },
              ],
            },""" % (ver_name, name, ver_name)
            print(base)
        print("""       {
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
    },""")
        print("]")
        print("&&&&" * 20)

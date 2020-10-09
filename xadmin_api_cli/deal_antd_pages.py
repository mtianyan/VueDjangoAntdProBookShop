import os

from django.contrib.auth import get_user_model
from django.db.models import ForeignKey, CharField, DateTimeField, DateField, BooleanField, IntegerField, FloatField, FileField, ImageField
from xadmin_api_cli.contants import MAIN_DISPLAY, MAIN_AVATAR, MAIN_PIC
from xadmin_api_cli.fileds import richTextField, SImageField
from xadmin_api_cli.utils import init_django_env, get_lower_case_name


def gen_antd_pages(project_name_settings, focus_model=None, template_type="base"):
    init_django_env(project_name_settings)
    import django
    sys_label = ['admin', 'auth', 'contenttypes', 'sessions', 'captcha', 'xadmin', 'xadmin_api', 'authtoken', 'social_django']
    # focus_model = "CourseResource"
    model_pic_dict = {}
    model_date_dict = {}
    user = get_user_model()
    for one in django.apps.apps.get_models():
        columns = []
        model_name = one._meta.model.__name__
        model_ver_name = one._meta.verbose_name
        if focus_model and model_name != focus_model:
            continue
        if one._meta.app_label not in sys_label:
            img_field_list = []
            date_row_list = []
            model_add_item_list = []
            model_many_to_many_list = []
            model_import_item_list = []
            date_field_list = []
            fileds_num = len(one.objects.model._meta.fields)

            for filed in one.objects.model._meta.fields:
                name = filed.name
                ver_name = filed.verbose_name
                if isinstance(filed, ForeignKey):
                    rela_model = filed.related_model._meta.object_name
                    help_text = filed.help_text.replace(MAIN_DISPLAY + "__", "")
                    one_c = """{
                              title: '%s',
                              dataIndex: '%s',
                              backendType: 'foreignKey',
                              rules: [
                                {
                                  required: true,
                                  message: '%s为必填项',
                                },
                              ],
                                    renderFormItem: (item, {value, onChange}) => {
            const children = $模型名字$ForeignKeyList.map((item) => {
              return <Option key={item.id} value={item.id}>{item.$外键显示字段$}</Option>;
            });
            return <Select
              placeholder="请选择$模型显示名字$"
              onChange={onChange}
            >
              {children}
            </Select>;
          },
                            },""" % (ver_name, name, ver_name)
                    one_c = one_c.replace("$模型名字$", name)
                    one_c = one_c.replace("$外键显示字段$", help_text)
                    one_c = one_c.replace("$模型显示名字$", filed.verbose_name)
                    model_add_item = """const [$模型名字$ForeignKeyList, set$模型名字首字母大写$ForeignKeyList] = useState([]);
      useEffect(() => {
        query$关联Model$().then(value => {
          set$模型名字首字母大写$ForeignKeyList(value.data);
        });
      }, []);""".replace("$模型名字$", name).replace("$模型名字首字母大写$", name[0].upper() + name[1:]).replace("$关联Model$", rela_model)
                    model_add_item_list.append(model_add_item)
                    model_import_item = """import {query$关联Model$} from '@/pages/AutoGenPage//$关联Model$List/service';""".replace("$关联Model$",
                                                                                                                                 rela_model)
                    model_import_item_list.append(model_import_item)
                elif isinstance(filed, CharField):
                    if filed.choices:
                        filed_choices_list = []
                        for filed_one in filed.choices:
                            one_line = f'{filed_one[0]}:"{filed_one[1]}"'
                            filed_choices_list.append(one_line)
                        one_c = """{
                                           title: '%s',
                                           dataIndex: '%s',
                                           rules: [
                                             {
                                               required: true,
                                               message: '%s为必填项',
                                             },
                                           ],
                                           valueEnum: {
                                             $valueEnum$
                                            },
                                         },""" % (ver_name, name, ver_name)
                        one_c = one_c.replace("$valueEnum$", ",".join(filed_choices_list))
                    elif name == "password":
                        one_c = """{
                                          title: '%s',
                                          dataIndex: '%s',
                                          hideInTable: true,
                                                                        hideInForm: true,
                                  hideInSearch: true,
                                          rules: [
                                            {
                                              required: true,
                                              message: '%s为必填项',
                                            },
                                          ],
                                        },""" % (ver_name, name, ver_name)
                    else:
                        one_c = """{
                      title: '%s',
                      dataIndex: '%s',
                      rules: [
                        {
                          required: true,
                          message: '%s为必填项',
                        },
                      ],
                    },""" % (ver_name, name, ver_name)
                elif name == "id":
                    one_c = """{
                                  title: '%s',
                                  dataIndex: '%s',
                                  hideInForm: true,
                                  hideInSearch: true,
                                  rules: [
                                    {
                                      required: true,
                                      message: '%s为必填项',
                                    },
                                  ],
                                },""" % (ver_name, name, ver_name)
                elif isinstance(filed, DateTimeField):
                    print(filed.default)
                    hideInform = None
                    if filed.default != django.db.models.NOT_PROVIDED or filed.auto_now == True:
                        hideInform = True
                    one_c = """{
              title: '%s',
              dataIndex: '%s',
              valueType: 'dateTime',
              $隐藏form$
              rules: [
                {
                  required: true,
                  message: '%s为必填项',
                },
              ],
                                       render: (text, record) => {
          return dealDateTimeDisplay(text);
        },
            },""" % (ver_name, name, ver_name)
                    if hideInform:
                        one_c = one_c.replace("$隐藏form$", "hideInForm: true,")
                    else:
                        one_c = one_c.replace("$隐藏form$", "")
                    date_field_list.append('"' + name + '"')
                    date_row_list.append(f'record.{name} = moment(record.{name});')
                elif isinstance(filed, DateField):
                    if filed.auto_now == True:
                        pass
                    one_c = """{
                         title: '%s',
                         dataIndex: '%s',
                         valueType: 'date',
                         rules: [
                           {
                             required: true,
                             message: '%s为必填项',
                           },
                         ],
                       },""" % (ver_name, name, ver_name)
                    date_field_list.append('"' + name + '"')
                    date_row_list.append(f'record.{name} = moment(record.{name});')
                elif isinstance(filed, BooleanField):
                    one_c = """{
                                  title: '%s',
                                  dataIndex: '%s',
                                  rules: [
                                    {
                                      required: true,
                                      message: '%s为必填项',
                                    },
                                  ],
                                      render: (text, record) => {
          return BooleanDisplay(text);
        },
                                      renderFormItem: (_, {type, defaultRender, ...rest}, form) => {
          const is_value = form.getFieldValue('%s');
          if (type === "form" && !is_value) {
            form.setFieldsValue({'%s': false});
          }
          return <Switch checked={is_value} onClick={(checked) => {
            form.setFieldsValue({'%s': checked});
          }} />;
        },
                                },""" % (ver_name, name, ver_name, name, name, name)
                elif isinstance(filed, IntegerField) or isinstance(filed, FloatField):
                    if filed.choices:
                        filed_choices_list = []
                        for filed_one in filed.choices:
                            one_line = f'{filed_one[0]}:"{filed_one[1]}"'
                            filed_choices_list.append(one_line)
                            one_c = """{
                                          title: '%s',
                                          dataIndex: '%s',
                                          rules: [
                                            {
                                              required: true,
                                              message: '%s为必填项',
                                            },
                                          ],
                                           valueEnum: {
                                                     $valueEnum$
                                                    },
                                        },""" % (ver_name, name, ver_name)
                            one_c = one_c.replace("$valueEnum$", ",".join(filed_choices_list))
                    else:
                        one_c = """{
                                      title: '%s',
                                      dataIndex: '%s',
                                                valueType: 'digit',
                                      rules: [
                                        {
                                          required: true,
                                          message: '%s为必填项',
                                        },
                                      ],
                                    },""" % (ver_name, name, ver_name)
                elif isinstance(filed, ImageField) or isinstance(filed, SImageField):
                    img_field_list.append('"' + name + '"')
                    help_text = filed.help_text

                    if help_text == MAIN_AVATAR:
                        one_c = """{
                            title: '%s',
                            dataIndex: '%s',
                     valueType: 'avatar',
                                   hideInSearch: true,
                            rules: [
                              {
                                required: true,
                                message: '%s为必填项',
                              },
                            ],
                            renderFormItem: (_, {type, defaultRender, ...rest}, form) => {
          const imageUrl = form.getFieldValue('%s');
          return <UploadAvatar img={imageUrl}/>
        },
                          },""" % (ver_name, name, ver_name, name)
                    elif help_text == MAIN_PIC:
                        one_c = """{
                            title: '%s',
                            dataIndex: '%s',
                                          render: (text, record) => {
                      return <img src={text} width="80px" alt=""/>
                    },
                                  hideInSearch: true,
                            rules: [
                              {
                                required: true,
                                message: '%s为必填项',
                              },
                            ],
                             renderFormItem: (_, {type, defaultRender, ...rest}, form) => {
          const imageUrl = form.getFieldValue('%s');
          return <UploadAvatar img={imageUrl}/>
        },
                          },""" % (ver_name, name, ver_name, name)
                elif isinstance(filed, FileField):
                    img_field_list.append('"' + name + '"')
                    one_c = """{
                                                            title: '%s',
                                                            dataIndex: '%s',
                                                                   hideInSearch: true,
                                                            rules: [
                                                              {
                                                                required: true,
                                                                message: '%s为必填项',
                                                              },
                                                            ],
                                                                render: (text, record) => {
                          return <a download={text.split('/').slice(-1)} href={text}>{text.split('/').slice(-1)}</a>;
                        },    renderFormItem: (_, {type, defaultRender, ...rest}, form) => {
                          const downloadUrl = form.getFieldValue('download');
                          return fileUpload(downloadUrl);
                        },
    
                                                          },""" % (ver_name, name, ver_name)
                elif filed.__class__.__name__ == "TextField":
                    one_c = """{
                                  title: '%s',
                                  dataIndex: '%s',
                                valueType: 'textarea',
                                 ellipsis: true,
                                  rules: [
                                    {
                                      required: true,
                                      message: '%s为必填项',
                                    },
                                  ],
                                },""" % (ver_name, name, ver_name)
                elif filed.__class__.__name__ == "UEditorField" or isinstance(filed, richTextField):
                    one_c = """{
                                  title: '%s',
                                  dataIndex: '%s',
                                      customCol:richCol,
                                      ellipsis: true,
                                                                    hideInSearch: true,
                                  rules: [
                                    {
                                      required: true,
                                      message: '%s为必填项',
                                    },
                                  ],
                                      renderFormItem: (_, {type, defaultRender, ...rest}, form) => {
          return richForm(form, rest.id);
        },
                                },""" % (ver_name, name, ver_name)
                else:
                    print(filed.__class__.__name__)
                    one_c = """{
                  title: '%s',
                  dataIndex: '%s',
                  rules: [
                    {
                      required: true,
                      message: '%s为必填项',
                    },
                  ],
                },""" % (ver_name, name, ver_name)
                model_pic_dict[model_name] = img_field_list
                model_date_dict[model_name] = date_field_list
                columns.append(one_c)

            for filed in one.objects.model._meta.many_to_many:
                black_many_to_many = ["groups", "permissions", "user_permissions"]
                if one._meta.model == user and filed.name in black_many_to_many:
                    continue
                else:
                    name = filed.name
                    ver_name = filed.verbose_name
                    rela_model = filed.related_model._meta.object_name
                    help_text = filed.help_text.replace(MAIN_DISPLAY + "__", "")
                    one_c = """{
                      title: '%s',
                      dataIndex: '%s',
                      rules: [
                        {
                          required: true,
                          message: '%s为必填项',
                        },
                      ],
                      renderFormItem: (item, {value, onChange}) => {
              const children = %sManyToManyList.map(item => {
                return (
                  <Option key={item.id} value={item.id}>
                    {item.%s}
                  </Option>
                );
              });
              return (
                <Select mode="multiple" placeholder="请选择%s" onChange={onChange}>
                  {children}
                </Select>
              );
            },
                render: (text, record) => {
              const color_arr = [
                'green',
                'cyan',
                'blue',
                'geekblue',
                'purple',
                'magenta',
                'red',
                'volcano',
                'orange',
                'gold',
                'lime',
              ];
              const child = [];
              text.forEach((value, index, arr) => {
                child.push(<Tag color={color_arr[value $百分$ 10]}>{%sManyToManyMap[value]}</Tag>);
              });
              return <Space>{child}</Space>;
            },
                    },""" % (ver_name, name, ver_name, name, help_text, ver_name, name)
                    one_c = one_c.replace("$百分$", "%")
                    model_many_to_many_item = """const [$模型名字$ManyToManyList, set$模型名字首字母大写$ManyToManyList] = useState([]);
                      const [$模型名字$ManyToManyMap, set$模型名字首字母大写$ManyToManyMap] = useState([]);
                    useEffect(() => {
                      query$关联Model$().then(value => {
                        set$模型名字首字母大写$ManyToManyList(value.data);
                        let get$模型名字首字母大写$ManyToManyMap = {};
              for (let index in value.data) {
                let item = value.data[index];
                get$模型名字首字母大写$ManyToManyMap[item.id.toString()] = item.$关联字段$;
              }
              set$模型名字首字母大写$ManyToManyMap(get$模型名字首字母大写$ManyToManyMap);
                      });
                    }, []);""".replace("$模型名字$", name).replace("$模型名字首字母大写$", name[0].upper() + name[1:]) \
                        .replace("$关联Model$", rela_model).replace("$关联字段$", help_text)
                    model_many_to_many_list.append(model_many_to_many_item)
                    model_import_item = """import {query$关联Model$} from '@/pages/AutoGenPage//$关联Model$List/service';""".replace("$关联Model$",
                                                                                                                                 rela_model)
                    model_import_item_list.append(model_import_item)
                    columns.append(one_c)
            opera = """    {
                              title: '操作',
                              dataIndex: 'option',
                              valueType: 'option',
                                    fixed: 'right',
          width: 100,
                              render: (text, record) => (
                                <>
    
                                  <EditOutlined title="编辑" className="icon" onClick={async () => {
                                    $时间处理占位$
                                    handleUpdateModalVisible(true);
                                    setUpdateFormValues(record);
                                  }} />
                                  <Divider type="vertical" />
                                  <Popconfirm
                                    title="您确定要删除$模型名字$吗？"
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
                            },""".replace("$模型名字$", model_ver_name)
            opera = opera.replace("$时间处理占位$", "".join(date_row_list))
            columns.append(opera)
            dest_path = f'./antd_page_templates/{template_type}'
            with open(f'{dest_path}/index.jsx') as fr:

                content = fr.read()
                if fileds_num > 8:
                    new_content = content.replace("$两列布局占位$", """          search={{
                                span: {
                                  lg: 12,
                                  md: 12,
                                  xxl: 12,
                                  xl: 12,
                                  sm: 12,
                                  xs: 24,
                                },
                              }}""")
                else:
                    new_content = content.replace("$两列布局占位$", "")
                new_content = new_content.replace("$占位列数据$", "".join(columns))
                new_content = new_content.replace("$占位模型名$", model_name)
                new_content = new_content.replace("$占位模型显示名$", str(model_ver_name))
                new_content = new_content.replace("$外键占位$", "".join(model_add_item_list))
                new_content = new_content.replace("$多对多占位$", "".join(model_many_to_many_list))
                new_content = new_content.replace("$import占位$", "".join(model_import_item_list))
                new_content = new_content.replace("$时间占位$", ",".join(model_date_dict[model_name]))

            if len(model_pic_dict[model_name]) > 0:
                with open(f'{dest_path}/service_img.js') as fr:
                    content = fr.read()
                    new_services = content.replace("$占位path$", get_lower_case_name(model_name))
                    new_services = new_services.replace("$占位模型名$", model_name)
                    new_services = new_services.replace("$图片字段列表$", ",".join(model_pic_dict[model_name]))
            else:
                with open(f'{dest_path}/service.js') as fr:
                    content = fr.read()
                    new_services = content.replace("$占位path$", get_lower_case_name(model_name))
                    new_services = new_services.replace("$占位模型名$", model_name)
            with open(f'{dest_path}/components/CreateForm.jsx') as fr:
                create_form = fr.read()
                create_form = create_form.replace("$占位模型显示名$", str(model_ver_name))
                if fileds_num > 8:
                    create_form = create_form.replace("$宽度占位$", 'width={1200}')
                else:
                    create_form = create_form.replace("$宽度占位$", "width={600}")
            with open(f'{dest_path}/components/UpdateForm.jsx') as fr:
                update_form = fr.read()
                update_form = update_form.replace("$占位模型显示名$", str(model_ver_name))
                if fileds_num > 8:
                    update_form = update_form.replace("$宽度占位$", 'width={1200}')
                else:
                    update_form = update_form.replace("$宽度占位$", "width={600}")
            target_path = '../xadmin/src/pages/AutoGenPage'
            cur_path = f'{target_path}/{model_name}List'
            if not os.path.exists(cur_path):
                os.mkdir(cur_path)
            cur_path_co = f'{target_path}/{model_name}List/components'
            if not os.path.exists(cur_path_co):
                os.mkdir(cur_path_co)
            with open(f'{target_path}/{model_name}List/index.jsx', 'w') as fw:
                fw.write(new_content)
            with open(f'{target_path}/{model_name}List/service.js', 'w') as fw:
                fw.write(new_services)
            with open(f'{target_path}/{model_name}List/components/CreateForm.jsx', 'w') as fw:
                fw.write(create_form)
            with open(f'{target_path}/{model_name}List/components/UpdateForm.jsx', 'w') as fw:
                fw.write(update_form)


if __name__ == '__main__':
    settings_name = input("请输入项目settings位置:")
    gen_antd_pages(settings_name)

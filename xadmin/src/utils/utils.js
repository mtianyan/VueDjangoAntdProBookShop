import {parse} from 'querystring';
import pathRegexp from 'path-to-regexp';
import React from 'react';
import UploadFileList from '@/components/UploadFileList';
import {Switch, Upload} from 'antd';
import {richEditUpload} from '@/services/editor';
import {ContentUtils} from 'braft-utils';
import BraftEditor from 'braft-editor';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
export const isUrl = path => reg.test(path);
export const isAntDesignPro = () => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }

  return window.location.hostname === 'preview.pro.ant.design';
}; // 给官方演示站点用，用于关闭真实开发环境不需要使用的特性

export const isAntDesignProOrDev = () => {
  const {NODE_ENV} = process.env;

  if (NODE_ENV === 'development') {
    return true;
  }

  return isAntDesignPro();
};
export const getPageQuery = () => parse(window.location.href.split('?')[1]);
/**
 * props.route.routes
 * @param router [{}]
 * @param pathname string
 */

export const getAuthorityFromRouter = (router = [], pathname) => {
  const authority = router.find(
    ({routes, path = '/', target = '_self'}) =>
      (path && target !== '_blank' && pathRegexp(path).exec(pathname)) ||
      (routes && getAuthorityFromRouter(routes, pathname)),
  );
  if (authority) return authority;
  return undefined;
};
export const getRouteAuthority = (path, routeData) => {
  let authorities;
  routeData.forEach(route => {
    // match prefix
    if (pathRegexp(`${route.path}/(.*)`).test(`${path}/`)) {
      if (route.authority) {
        authorities = route.authority;
      } // exact match

      if (route.path === path) {
        authorities = route.authority || authorities;
      } // get children authority recursively

      if (route.routes) {
        authorities = getRouteAuthority(path, route.routes) || authorities;
      }
    }
  });
  return authorities;
};

export const deepCopy = (target) => {
  let copyed_objs = [];//此数组解决了循环引用和相同引用的问题，它存放已经递归到的目标对象
  function _deepCopy(target) {
    if ((typeof target !== 'object') || !target) {
      return target;
    }
    for (let i = 0; i < copyed_objs.length; i++) {
      if (copyed_objs[i].target === target) {
        return copyed_objs[i].copyTarget;
      }
    }
    let obj = {};
    if (Array.isArray(target)) {
      obj = [];//处理target是数组的情况
    }
    copyed_objs.push({target: target, copyTarget: obj});
    Object.keys(target).forEach(key => {
      if (obj[key]) {
        return;
      }
      obj[key] = _deepCopy(target[key]);
    });
    return obj;
  }

  return _deepCopy(target);
};

export const buildFileFormData = (params, fileFieldList) => {
  let fileData = new FormData();
  console.log(params);
  for (let index in fileFieldList) {
    let fileField = fileFieldList[index];
    console.log(fileField);
    console.log('fileField');
    if (typeof params[fileField] === 'string') {
      fileData.append(fileField, params[fileField]);
    } else {
      if (params[fileField].file.originFileObj !== undefined) {
        fileData.append(fileField, params[fileField].file.originFileObj);
      } else {
        // 处理avatar和file兼容
        fileData.append(fileField, params[fileField].fileList[0].originFileObj);
      }
    }
  }
  for (let key in params) {
    if (fileFieldList.includes(key)) {
      delete params[key];
    }
  }
  for (let key in params) {
    fileData.append(key, params[key]);
  }
  console.log(fileData);
  return fileData;
};

// TODO 获取富文本上传的文件对象

export const buildRichEditorFormData = (params) => {
  let fileData = new FormData();
  for (let key in params) {
    fileData.append(key, params[key].file.originFileObj);
  }
};

export const dealTime = (params, dateFieldList) => {
  for (let key in params) {
    if (dateFieldList.includes(key)) {
      params[key + '_start'] = params[key][0];
      params[key + '_end'] = params[key][1];
      delete params[key];
    }
  }
};

export const getTableColumns = (cp) => {
  return cp.map((one) => {
    if ('backendType' in one) {
      if (one.backendType === 'foreignKey') {
        one.dataIndex = one.dataIndex + '_text';
      }
    }
    if (one.valueType === 'dateTime') {
      one.valueType = 'dateRange';
    }
    delete one.initialValue;
    return one;
  });
};

export const getUpdateColumns = (cp) => {
  return cp.map((one) => {
    if (one.valueType === 'dateTime' && one.hideInForm === true) {
      delete one.hideInForm;
    }
    return one;
  });
};


export const fieldErrorHandle = (err, formRef) => {
  for (let key in err.data.fields_errors) {
    var value = err.data.fields_errors[key];
    formRef.current.setFields([
      {
        name: key,
        errors: value,
      },
    ]);
  }
};

export const download = (data, strFileName, strMimeType) => {

  var self = window, // this script is only for browsers anyway...
    u = 'application/octet-stream', // this default mime also triggers iframe downloads
    m = strMimeType || u,
    x = data,
    D = document,
    a = D.createElement('a'),
    z = function (a) {
      return String(a);
    },


    B = self.Blob || self.MozBlob || self.WebKitBlob || z,
    BB = self.MSBlobBuilder || self.WebKitBlobBuilder || self.BlobBuilder,
    fn = strFileName || 'download',
    blob,
    b,
    ua,
    fr;

  //if(typeof B.bind === 'function' ){ B=B.bind(self); }

  if (String(this) === 'true') { //reverse arguments, allowing download.bind(true, "text/xml", "export.xml") to act as a callback
    x = [x, m];
    m = x[0];
    x = x[1];
  }


  //go ahead and download dataURLs right away
  if (String(x).match(/^data\:[\w+\-]+\/[\w+\-]+[,;]/)) {
    return navigator.msSaveBlob ?  // IE10 can't do a[download], only Blobs:
      navigator.msSaveBlob(d2b(x), fn) :
      saver(x); // everyone else can save dataURLs un-processed
  }//end if dataURL passed?

  try {

    blob = x instanceof B ?
      x :
      new B([x], {type: m});
  } catch (y) {
    if (BB) {
      b = new BB();
      b.append([x]);
      blob = b.getBlob(m); // the blob
    }

  }


  function d2b(u) {
    var p = u.split(/[:;,]/),
      t = p[1],
      dec = p[2] == 'base64' ? atob : decodeURIComponent,
      bin = dec(p.pop()),
      mx = bin.length,
      i = 0,
      uia = new Uint8Array(mx);

    for (i; i < mx; ++i) uia[i] = bin.charCodeAt(i);

    return new B([uia], {type: t});
  }

  function saver(url, winMode) {


    if ('download' in a) { //html5 A[download]
      a.href = url;
      a.setAttribute('download', fn);
      a.innerHTML = 'downloading...';
      D.body.appendChild(a);
      setTimeout(function () {
        a.click();
        D.body.removeChild(a);
        if (winMode === true) {
          setTimeout(function () {
            self.URL.revokeObjectURL(a.href);
          }, 250);
        }
      }, 66);
      return true;
    }

    //do iframe dataURL download (old ch+FF):
    var f = D.createElement('iframe');
    D.body.appendChild(f);
    if (!winMode) { // force a mime that will download:
      url = 'data:' + url.replace(/^data:([\w\/\-\+]+)/, u);
    }


    f.src = url;
    setTimeout(function () {
      D.body.removeChild(f);
    }, 333);

  }//end saver


  if (navigator.msSaveBlob) { // IE10+ : (has Blob, but not a[download] or URL)
    return navigator.msSaveBlob(blob, fn);
  }

  if (self.URL) { // simple fast and modern way using Blob and URL:
    saver(self.URL.createObjectURL(blob), true);
  } else {
    // handle non-Blob()+non-URL browsers:
    if (typeof blob === 'string' || blob.constructor === z) {
      try {
        return saver('data:' + m + ';base64,' + self.btoa(blob));
      } catch (y) {
        return saver('data:' + m + ',' + encodeURIComponent(blob));
      }
    }

    // Blob but not URL:
    fr = new FileReader();
    fr.onload = function (e) {
      saver(this.result);
    };
    fr.readAsDataURL(blob);
  }
  return true;
};

export const dealDateTimeDisplay = (text) => {
  if (typeof text === 'string') {
    return <span>{text}</span>;
  } else {
    return <span>{text.format('YYYY-MM-DD HH:mm:ss')}</span>;
  }
};

export const fileUpload = (downloadUrl) => {
  if (typeof downloadUrl == 'string') {
    const download = [{
      uid: downloadUrl,
      name: downloadUrl.split('/').slice(-1),
      status: 'done',
      url: downloadUrl,
    }];
    return <UploadFileList defaultFileList={download} />;
  } else {
    return <UploadFileList />;
  }
};


export const getObjectClass = (obj) => {
  if (obj && obj.constructor && obj.constructor.toString) {
    var arr = obj.constructor.toString().match(
      /function\s*(\w+)/);

    if (arr && arr.length == 2) {
      return arr[1];
    }
  }

  return undefined;
};

export const richCol = {
  lg: 24,
  md: 24,
  xxl: 24,
  xl: 24,
  sm: 24,
  xs: 24,
  labelCol: {
    span: 3,
  },
};

export const richForm = (form, fieldName) => {
  const detail = form.getFieldValue(fieldName);
  const controls = ['bold', 'italic', 'underline', 'text-color', 'separator', 'link', 'separator', 'media'];
  const extendControls = [
    {
      key: 'antd-uploader',
      type: 'component',
      component: (
        <Upload
          accept="image/*"
          showUploadList={false}
          customRequest={({
                            action,
                            data,
                            file,
                            filename,
                            headers,
                            onError,
                            onProgress,
                            onSuccess,
                            withCredentials,
                          }) => {


            if (!file) {
              return false;
            } else {
              const formData = new FormData();
              if (data) {
                Object.keys(data).forEach(key => {
                  formData.append(key, data[key]);
                });
              }
              formData.append(filename, file);

              richEditUpload(formData).then(r => {
                  let content = form.getFieldValue(fieldName);
                  if (typeof content === 'string') {
                    // 点了编辑刚进来.没有onChange
                    form.setFieldsValue({
                      [fieldName]: ContentUtils.insertMedias(BraftEditor.createEditorState(form.getFieldValue(fieldName)), [{
                        type: 'IMAGE',
                        url: r.image_url,
                      }]),
                    });
                  } else {
                    // 进来onChange了
                    form.setFieldsValue({
                      [fieldName]: ContentUtils.insertMedias(form.getFieldValue(fieldName), [{
                        type: 'IMAGE',
                        url: r.image_url,
                      }]),
                    });
                  }

                },
              );
            }


          }}
          onChange={(info => {
            const reader = new FileReader();
            reader.readAsDataURL(info.file.originFileObj);
          })}
        >
          {/* 这里的按钮最好加上type="button"，以避免在表单容器中触发表单提交，用Antd的Button组件则无需如此 */}
          <button type="button" className="control-item button upload-button" data-title="插入图片">
            插入图片
          </button>
        </Upload>
      ),
    },
  ];
  return <BraftEditor
    key={fieldName}
    onChange={(value) => form.setFieldsValue({[fieldName]: value})}
    defaultValue={BraftEditor.createEditorState(detail)}
    className="my-editor"
    controls={controls}
    extendControls={extendControls}
    placeholder="请输入正文内容"
  />;
};


export const richTrans = (value) => {
  for (let key in value) {
    if (getObjectClass(value[key]) === 'EditorState' || getObjectClass(value[key]) === 'e') {
      value[key] = value[key].toHTML();
    }
  }
};


export const BooleanDisplay = (text) => {
  return <Switch disabled checked={text} />;
};

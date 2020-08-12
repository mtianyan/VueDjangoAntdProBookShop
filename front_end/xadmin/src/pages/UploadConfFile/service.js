import request from 'umi-request';

export async function SubmitForm(params) {
  console.log("SubmitForm")
  console.log(params)
  console.log("SubmitForm")
  let filedata = new FormData();
  filedata.append('conf_file', params.conf_file.fileList[0].originFileObj)
  filedata.append('logo_file', params.logo_file.fileList[0].originFileObj)
  for (let key in params) {
    if(!key.endsWith("_file") && params[key]){
      filedata.append(key,params[key])
    }
  }

  return request('/auth/avl_auth/upload_conf', {
    method: 'POST',
    data: filedata,
  });
}

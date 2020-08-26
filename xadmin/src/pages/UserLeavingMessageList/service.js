import request from 'umi-request';
import {buildFileFormData} from '@/utils/utils'
export async function queryUserLeavingMessage(params) {
  return request('/api/xadmin/v1/user_leaving_message', {
    params,
  });
}
export async function removeUserLeavingMessage(params) {
  return request(`/api/xadmin/v1/user_leaving_message/${params}`, {
    method: 'DELETE',
  });
}
export async function addUserLeavingMessage(params) {
  let fileFieldList = ["file"]
  let fileData = buildFileFormData(params, fileFieldList);
  return request('/api/xadmin/v1/user_leaving_message', {
    method: 'POST',
    data: fileData,
  });
}
export async function updateUserLeavingMessage(params, id) {
  let fileFieldList = ["file"]
  let fileData = buildFileFormData(params, fileFieldList);
  return request(`/api/xadmin/v1/user_leaving_message/${id}`, {
    method: 'PUT',
    data: fileData,
  });
}

import request from 'umi-request';
import {buildFileFormData} from '@/utils/utils'
export async function queryVersionControl(params) {
  return request('/api/xadmin/v1/version_control', {
    params,
  });
}
export async function removeVersionControl(params) {
  return request(`/api/xadmin/v1/version_control/${params}`, {
    method: 'DELETE',
  });
}
export async function addVersionControl(params) {
  let fileFieldList = ["file"]
  let fileData = buildFileFormData(params, fileFieldList);
  return request('/api/xadmin/v1/version_control', {
    method: 'POST',
    data: fileData,
  });
}
export async function updateVersionControl(params, id) {
  let fileFieldList = ["file"]
  let fileData = buildFileFormData(params, fileFieldList);
  return request(`/api/xadmin/v1/version_control/${id}`, {
    method: 'PUT',
    data: fileData,
  });
}

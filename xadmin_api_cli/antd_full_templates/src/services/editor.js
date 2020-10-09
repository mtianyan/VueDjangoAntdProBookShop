import request from '@/utils/request';
import {buildFileFormData, buildRichEditorFormData} from '@/utils/utils';

export async function richEditUpload(params) {
  return request('/api/xadmin/v1/upload', {
    method: 'POST',
    data: params,
  });
}

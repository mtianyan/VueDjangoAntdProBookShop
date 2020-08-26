import request from 'umi-request';

export async function fakeChartData() {
  return request('/api/xadmin/v1/fake_chart_data');
}

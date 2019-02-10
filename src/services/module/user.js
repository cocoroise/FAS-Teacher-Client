import { stringify, request, host } from '../config';

// 获取教师信息 GET
export async function getInfo(params) {
  return request(`${host}/api/teacher?${stringify(params)}`);
}
// 更新教师信息 PATCH
export async function updateInfo(params) {
  return request(`${host}/api/teacher?`, { method: 'PATCH', body: params });
}


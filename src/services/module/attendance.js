import { stringify, request, host } from '../config';

// 获取总体的考勤信息
export async function getAttenInfo(params) {
  return request(`${host}/api/user?${stringify(params)}`);
}

// 写入一条考记录
export async function addAttenInfo(params) {
  return request(`${host}/api/user?${stringify(params)}`);
}

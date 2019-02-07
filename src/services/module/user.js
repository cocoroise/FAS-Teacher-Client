import { Toast } from 'antd-mobile';
import { stringify, request, host } from '../config';

// 获取教师密码
async function getCustomPwd(params) {
  return request(`${host}/api/user?${stringify(params)}`);
}
// 获取教师信息 GET
export async function getInfo(params) {
  return request(`${host}/api/teacher?${stringify(params)}`);
}
// 更新教师信息 PATCH
export async function updateInfo(params) {
  return request(`${host}/api/teacher?`, { method: 'PATCH', body: params });
}
// 注册教师用户 POST
export async function userRegister(params) {
  return request(`${host}/api/teacher`, { method: 'POST', body: params });
}
// 教师登录
export async function userLogin(params) {
  const { id, pwd } = params;
  try {
    const { data } = await getInfo({ id });
    const { uid } = data[0];
    const { data: customData } = await getCustomPwd({ user_id: uid });
    const { password: custompwd } = customData[0];
    if (pwd !== custompwd) {
      throw new Error('password error');
    }
    return true;
  } catch (e) {
    Toast.fail('login fail...');
  }
  return true;
}

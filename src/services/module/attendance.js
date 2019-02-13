import { stringify, request, host } from '../config';

// GET教师名下的课程，课室，班级和时间 传teacher_id
export async function getAttendanceOfTeacher(params) {
  return request(`${host}/api/attendanceOfteacher?${stringify(params)}`);
}
// GET教师考勤数据 折线图 传teacher_id,course_id,class_id
export async function lineChartDataOfTeacher(params) {
  return request(`${host}/api/lineChartDataOfTeacher?${stringify(params)}`);
}
// GET总体的考勤信息
export async function getAttenInfo(params) {
  return request(`${host}/api/attendance?${stringify(params)}`);
}
// POST一条考记录
export async function addAttenInfo(params) {
  return request(`${host}/api/attendance`, { method: 'POST', body: params });
}

import { stringify, request, host } from '../config';

// GET教师名下的课程，课室，班级和时间 传teacher_id
export async function getAttendanceOfTeacher(params) {
  return request(`${host}/api/attendanceOfteacher?${stringify(params)}`);
}
// GET教师考勤数据 echart 折线图 传teacher_id,course_id
export async function lineChartOfTeacher(params) {
  return request(`${host}/api/lineChartOfTeacher?${stringify(params)}`);
}
// GET学生考勤图 传attendance_id 返回所有需要考勤的学生信息
export async function getStuAttendanceList(params) {
  return request(`${host}/api/getStuAttendanceList?${stringify(params)}`);
}
// GET总体的考勤信息 传attendance_id
export async function getAttenInfo(params) {
  return request(`${host}/api/attendance?${stringify(params)}`);
}
// POST一条考勤记录
export async function addAttenInfo(params) {
  return request(`${host}/api/attendance`, { method: 'POST', body: params });
}
// PATCH一条考勤记录
export async function updateAttenInfo(params) {
  return request(`${host}/api/attendance`, { method: 'PATCH', body: params });
}

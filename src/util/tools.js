// 对象数组去重
function unique(arr) {
  const unique = {};
  arr.forEach(item => {
    unique[JSON.stringify(item)] = item; // 键名不会重复
  });
  arr = Object.keys(unique).map(u => {
    return JSON.parse(u);
  });
  return arr;
}
// 格式化datePicker的时间为日期
function formatDate(date) {
  const pad = n => (n < 10 ? `0${n}` : n);
  const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  const timeStr = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
  return `${dateStr} ${timeStr}`;
}
export { unique, formatDate };

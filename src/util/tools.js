// 对象数组去重
function unique(arr) {
  const unique = {};
  arr.forEach(item => {
    unique[JSON.stringify(item)] = item; // 键名不会重复
  });
  arr = Object.keys(unique).map(u => JSON.parse(u));
  return arr;
}
// 格式化datePicker的时间为日期
function formatDate(date) {
  const pad = n => (n < 10 ? `0${n}` : n);
  const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  const timeStr = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
  return `${dateStr} ${timeStr}`;
}

/*
  * t为一个时间格式字符串，如'Y-M-D-W H:Mi:S'=>'2017-06-03-星期六 22:06:50'
  * 可以定义任何分隔符和关键字的格式，关键字为Y：年，M:月，D:日,W:星期几，H:时，Mi:分,S:秒，Ms:毫秒
  * 也可单个获取定义，如'///H://S&&'=>'///22://50&&';
*/
// 补零函数
function zerofill(time) {
  return time < 10 ? `0${time}` : time;
}
function getDate(t) {
  const reg = /[^a-zA-Z0-9]/gi; // 匹配分隔符
  const tArr = t.split(reg); // 通过分隔符分割为数组
  for (let a = 0; a < tArr.length; a += 1) {
    if (!tArr[a]) {
      tArr.splice(a, 1);
      a -= 1;
    }
  }
  const date = new Date();
  const time = []; // 存放对应时间
  const timeRep = {
    Y() {
      return date.getFullYear();
    },
    M() {
      return zerofill(date.getMonth() + 1);
    },
    D() {
      return zerofill(date.getDate());
    },
    W() {
      const w = date.getDay();
      let week = '';
      switch (w) {
        case 0:
          week = '星期日';
          break;
        case 1:
          week = '星期一';
          break;
        case 2:
          week = '星期二';
          break;
        case 3:
          week = '星期三';
          break;
        case 4:
          week = '星期四';
          break;
        case 5:
          week = '星期五';
          break;
        case 6:
          week = '星期六';
          break;
        default:
          week = '星期一';
          break;
      }
      return week;
    },
    H() {
      return zerofill(date.getHours());
    },
    Mi() {
      return zerofill(date.getMinutes());
    },
    S() {
      return zerofill(date.getSeconds());
    },
    Ms() {
      return date.getMilliseconds();
    },
  };
  for (let i = 0; i < tArr.length; i += 1) {
    for (const j in timeRep) {
      if (tArr[i] == j) {
        time.push(timeRep[j]()); // push对应时间
        break;
      }
    }
  }
  let str = ''; // 中转字符串
  let returnStr = t; // 要返回的时间字符串
  for (let k = 0; k < tArr.length; k+=1) {
    str = returnStr.replace(tArr[k], time[k]);
    returnStr = str;
  }
  return returnStr;
}

// 两个时间差 返回Int类型的分钟
function timeDiff(a, b) {
  let [aHour, aMin] = a.split(':');
  let [bHour, bMin] = b.split(':');
  if (aHour < bHour) {
    [aHour, bHour] = [bHour, aHour];
    [aMin, bMin] = [bMin, aMin];
  }
  const Hour = Math.abs(aHour - bHour);
  const Min = aMin - bMin;
  return Hour * 60 + Min;
}

const pick = (obj, keys) => {
  const r = {};
  keys.forEach(key => {
    r[key] = obj[key];
  });
  return r;
};
export { unique, formatDate, pick, getDate, timeDiff };

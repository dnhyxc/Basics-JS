// 将时间转成时分秒的格式
const timeToMinute = (time) => {
  let t;
  if (time > -1) {
    const hour = Math.floor(time / 3600);
    const min = Math.floor(time / 60) % 60;
    const sec = time % 60;
    if (hour < 10) {
      t = '0' + hour + ':';
    } else {
      t = hour + ':';
    }
    if (min < 10) { t += '0'; }
    t += min + ':';
    if (sec < 10) { t += '0'; }
    t += sec.toFixed(2);
  }
  t = t.substring(0, t.length - 3);
  return t;
};

const res = timeToMinute(320);
console.log(res);
console.log('>>>>((手动分割线))>>>>>>>>>>>>>>>>>>>');


// 将时间转成：天/时/分/秒
function secondsFormat(s) {
  var day = Math.floor(s / (24 * 3600)); // Math.floor()向下取整 
  var hour = Math.floor((s - day * 24 * 3600) / 3600);
  var minute = Math.floor((s - day * 24 * 3600 - hour * 3600) / 60);
  var second = s - day * 24 * 3600 - hour * 3600 - minute * 60;
  return day + "天" + hour + "时" + minute + "分" + second + "秒";
}
console.log(secondsFormat(5555555)) // 64天7时12分35秒
console.log(secondsFormat(1234))  // 0天0时20分34秒
console.log('>>>>((手动分割线))>>>>>>>>>>>>>>>>>>>');


// 时间戳转时间  年/月/日 时:分:秒
function getHMS(timestamp) {
  var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '/';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
  var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';

  var h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':';
  var m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()) + ':';
  var s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
  return Y + M + D + h + m + s;
}

const HMS = getHMS(Date.now());
console.log(HMS); // 2021/01/12 14:06:25
console.log('>>>>((手动分割线))>>>>>>>>>>>>>>>>>>>');


/**
 * 时间戳转成：YYYY-MM-DD hh:mm:ss新思路：
 * Date的'toJSON'方法返回格林威治时间的JSON格式字符串，
 * 实际是使用'toISOString'方法的结果。字符串形如'2018-08-09T10:20:54.396Z'，
 * 转化为北京时间需要额外增加八个时区，我们需要取字符串前19位，然后把'T'替换为空格，即是我们需要的时间格式。
 */
function time(time = +new Date()) {
  let date = new Date(time + 8 * 3600 * 1000);  // 增加8小时
  console.log(date.toJSON()); // 2021-01-12T14:20:21.511Z
  return date.toJSON().substr(0, 19).replace('T', ' ');
}
const myTime = time();
console.log(myTime);  // 2021-01-12 14:13:13

function getTime(time = +new Date()) {
  let date = new Date(time + 8 * 3600 * 1000);  // 增加8小时
  return date.toJSON().substr(0, 19).replace('T', ' ').replace(/-/g, '.');
}

const time1 = getTime();
console.log(time1); // 2021.01.12 14:18:55
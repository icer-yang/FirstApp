function formatTime(time) {
  if (typeof time !== 'number' || time < 0) {
    return time
  }

  var hour = parseInt(time / 3600)
  time = time % 3600
  var minute = parseInt(time / 60)
  time = time % 60
  var second = time

  return ([hour, minute, second]).map(function (n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }).join(':')
}

function formatLocation(longitude, latitude) {
  if (typeof longitude === 'string' && typeof latitude === 'string') {
    longitude = parseFloat(longitude)
    latitude = parseFloat(latitude)
  }

  longitude = longitude.toFixed(2)
  latitude = latitude.toFixed(2)

  return {
    longitude: longitude.toString().split('.'),
    latitude: latitude.toString().split('.')
  }
}

//获取当前日期，结果格式：YYYY-mm-DD
function getYMD() {
  var d = new Date();
  var year = d.getFullYear();
  var month = d.getMonth() + 1; // 记得当前月是要+1的
  month = month < 10 ? ("0" + month) : month;
  var dt = d.getDate();
  dt = dt < 10 ? ("0" + dt) : dt;
  var today = year + "-" + month + "-" + dt;
  return today;
}

//从date类型转化为string类型，结果格式：YYYY-mm-DD
function dateTOString(date) {
  var source = new Date(date);
  var yy = source.getFullYear().toString();
  var mm = source.getMonth() + 1;
  mm = mm < 10 ? ('0' + mm.toString()) : mm.toString();
  var dd = source.getDate();
  dd = dd < 10 ? ('0' + dd.toString()) : dd.toString();
  var aa = yy + '-' + mm + '-' + dd;
  return aa;
}

//从dateTime转化为string类型，结果格式：YYYY-mm-DD HH:MM:SS
function dateTimeTOString(dateTime) {
  var source = new Date(dateTime);
  var yy = source.getFullYear().toString();
  var mm = source.getMonth() + 1;
  mm = mm < 10 ? ('0' + mm.toString()) : mm.toString();
  var dd = source.getDate();
  dd = dd < 10 ? ('0' + dd.toString()) : dd.toString();
  var hh = source.getHours();
  hh = hh < 10 ? ('0' + hh.toString()) : hh.toString();
  var MM = source.getMinutes();
  MM = MM < 10 ? ('0' + MM.toString()) : MM.toString();
  var ss = source.getSeconds();
  ss = ss < 10 ? ('0' + ss.toString()) : ss.toString();
  var aa = yy + '-' + mm + '-' + dd + ' ' + hh + ':' + MM + ':' + ss;
  return aa;
}

//获取当前时间，结果格式：YYYY-mm-DD HH:MM
function getYMDHM() {
  var d = new Date();
  var year = d.getFullYear();
  var month = d.getMonth() + 1; // 记得当前月是要+1的
  month = month < 10 ? ("0" + month) : month;
  var dt = d.getDate();
  dt = dt < 10 ? ("0" + dt) : dt;
  var hour = d.getHours();
  hour = hour < 10 ? ("0" + hour) : hour;
  var minu = d.getMinutes();
  minu = minu < 10 ? ("0" + minu) : minu;
  var now = year + "-" + month + "-" + dt + " " + hour + ":" + minu;
  return now;
}

function startOpen(hh,mm){
  var d =new Date();
  var hour =d.getHours();
  var minu = d.getMinutes();
  console.log(hour+":"+minu)
  if(hour< hh ){
    return true
  }
  else if(hour=hh && minu<mm){
    return true
  }else{
    return false
  }
}
module.exports = {
  formatTime: formatTime,
  formatLocation: formatLocation,
  getYMD: getYMD,
  startOpen:startOpen,
  dateTimeTOString: dateTimeTOString,
  dateTOString
}

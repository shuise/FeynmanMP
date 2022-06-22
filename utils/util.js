const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const utils = {
  formatTime: formatTime,
  openWebUrl: function(url){
    
  },
  toast: function(msg){
    var _msg = {
      icon: 'success',
      duration: 500
    };

    msg.icon = msg.icon || _msg.icon;
    msg.duration = msg.time || _msg.duration;
    wx.showToast(msg);
  },
  dateFormat: function(date, fmt) {
    fmt = fmt || 'yyyy.MM.dd hh:mm:ss';
    var dateObj = new Date();
    if(date){
        // date = date.split('-').join('/');
        dateObj = new Date(date);
    }
    var o = {
        "M+" : dateObj.getMonth()+1,                 //月份
        "d+" : dateObj.getDate(),                    //日
        "h+" : dateObj.getHours(),                   //小时
        "m+" : dateObj.getMinutes(),                 //分
        "s+" : dateObj.getSeconds(),                 //秒
        "q+" : Math.floor((dateObj.getMonth()+3)/3), //季度
        "S"  : dateObj.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt)) {
        fmt=fmt.replace(RegExp.$1, (dateObj.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
         }
    }
    return fmt;
  },
  getPara: function(url, name){
    // url = url.split("&apm;").join("&");
    if(url == ''){
        return '';
    }

    var v = '', _p = name + '=';

    if(url.indexOf("&" + _p)>-1){
        v = url.split("&" + _p)[1] || '';
    }

    if(url.indexOf("?" + _p)>-1){
        v = url.split("?" + _p)[1] || '';
    }
    v = v.split("&")[0] || '';
    return v;
  }
};
module.exports = utils;
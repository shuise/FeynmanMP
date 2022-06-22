/*
	接口服务，
	请注意，service并非与接口一一对应，更多是面向业务，可能是整合多个接口

	1. 状态标识到接口定义处
	2. 接口调用的必要数据，或者前置依赖接口标识到接口定义处
	3. 用户端需要默认的 enterpriseId
	4. 开发测试时清理数据的问题
*/
/*
### U16: 获取企业基础信息
### U3: 选择车型列表（带价格）
### U6: 获取协议、预订须知、常用语
### U1: 手机验证码登录
### U8: 下单接口 ok

https://developers.weixin.qq.com/miniprogram/dev/api/network/request/wx.request.html
*/


var resultCheck = function(result, url, callback){
	if(!result && typeof result != 'object'){
		console.log(url + ' fail', result);
		return;
	}

	if(result.code === '0'){
		// console.log(url, 'ok', result);
		callback && callback(result.data);
		return;
	}else{
		// alert(result.message || '服务器端错误');
		callback && callback({
			error: true
		});
		console.error(url, result);
	}
}

var get = function(url, callback, data){
	var api = 'https://notes.bluetech.top/api' + url;
	wx.request({
	  url: api, //仅为示例，并非真实的接口地址
	  data: data,
	  method: 'GET',
	  header: {
	    'content-type': 'application/json' // 默认值
	  },
	  success (result) {
	    resultCheck(result.data, url, callback);
	  }
	});
}

var Services = {
	Article: {
		published: function(callback, data){
			var api = '/article/published'; //U16
			get(api, function(result){
				callback(result);
			}, data);
		}
	}
};


module.exports = Services;

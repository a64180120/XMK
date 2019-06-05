/**
 * axios全局配置
 * TODO: 拦截器全局配置，根据实际情况修改
 */
import axios from './axios_new'
import Qs from 'qs'
import store from '../store'
import { Message } from 'element-ui'
import md5 from 'js-md5'

// 在config.js文件中统一存放一些公共常量，方便之后维护
import { getSha512 } from './validate.js'
let Base64 = require('js-base64').Base64

// 封装axios--------------------------------------------------------------------------------------
function apiAxios(method, url, params, hastimeout) {
  //var token = store.state.user.token;
  //var timestamp = new Date().getTime();
  //var signature = getSha512(timestamp + "_" + token + "_newgrand");

  // var appinfo = {
  //   //sql 数据库
  //   DbName: 'NG0002',
  //   OrgId: '547181121000001',
  //   OrgName: '',
  //   OCode: '',
  //   UserId: '521180820000001',
  //   UserKey: '9999',
  //   UserName: '',
  //   TokenKey: '',
  //   AppKey: 'D31B7F91-3068-4A49-91EE-F3E13AE5C48C',
  //   AppSecret: '103CB639-840C-4E4F-8812-220ECE3C4E4D',
  //   DbServerName: '',
  //   SessionKey: '',
  //   UName: ''
  // }
  // var url1 = 'http://127.0.0.1:8020',
  //var url1 = 'http://127.0.0.1:8028';
    // oracle 数据库
    var appKey = 'D31B7F91-3068-4A49-91EE-F3E13AE5C48C',
        appSecret = '103CB639-840C-4E4F-8812-220ECE3C4E4D',
        url1 = "http://127.0.0.1:8031",
        reqTimeStamp = Date.parse(new Date());

    var appinfo = {
      'DbName': 'NG0001',
      'OrgId': '488181024000001',
      'OrgName': '',
      'OCode': '',
      'UserId': '488181024000001',
      'UserKey': '9999',
      'UserName': '',
      'TokenKey': '',
      'AppKey': appKey,
      'AppSecret': appSecret,
      'DbServerName': '',
      'SessionKey': '',
      'UName': ''
    };
    reqTimeStamp = Date.parse(new Date())
  var sign = md5(
    (url1 + reqTimeStamp + appinfo.AppKey + appinfo.AppSecret).toLowerCase()
  )
  var items = [sign, url1, reqTimeStamp, appinfo.AppKey]
  var config = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    Accept: 'multipart/form-data; charset=utf-8',
    AppInfo: Base64.encode(JSON.stringify(appinfo)),
    Sign: items
    // 'token': token,
    // 'timestamp': timestamp,
    // 'signature': signature
  }
  let httpDefault = {
    headers: config,
    method: method,
    url: url,
    // `params` 是即将与请求一起发送的 URL 参数
    // `data` 是作为请求主体被发送的数据
    params: method === 'GET' || method === 'DELETE' ? params : null,
    data:
      method === 'POST' || method === 'PUT' || method === 'FORM'
        ? Qs.stringify(params)
        : null
  }
  // 请求超时时间
  if (!hastimeout) {
    httpDefault.timeout = 10000
  }

  // 注意**Promise**使用(Promise首字母大写)
  return new Promise((resolve, reject) => {
    axios(httpDefault)
      .then(res => {
        resolve(res)
      })
      .catch(response => {
        reject(response)
      })
  })
}

// 封装axios--------------------------------------------------------------------------------------

// 输出函数getAxios、postAxios、putAxios、delectAxios，formAxios 供其他文件调用-----------------------------
// Vue.js的插件应当有一个公开方法 install。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象。
export default {
  install: function(Vue) {
    Vue.prototype.getAxios = (url, params, timeout) =>
      apiAxios('GET', url, params, timeout)
    Vue.prototype.postAxios = (url, params, timeout) =>
      apiAxios('POST', url, params, timeout)
    Vue.prototype.putAxios = (url, params, timeout) =>
      apiAxios('PUT', url, params, timeout)
    Vue.prototype.delectAxios = (url, params, timeout) =>
      apiAxios('DELECT', url, params, timeout)
    //Vue.prototype.formAxios = (url, params, timeout) => apiAxios('FORM', url, params, timeout)
  }
}

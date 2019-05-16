/**
 * axios全局配置
 * TODO: 拦截器全局配置，根据实际情况修改
 */
import axios from './axios_new'
import qs from 'qs'
import store from "../store";
import { Message } from "element-ui";

// 在config.js文件中统一存放一些公共常量，方便之后维护
import { getSha512 } from './validate.js';
let Base64 = require("js-base64").Base64;



// 封装axios--------------------------------------------------------------------------------------
function apiAxios(method, url, params, hastimeout) {

  var config = null
  //var token = store.state.user.token;
  //var timestamp = new Date().getTime();
  //var signature = getSha512(timestamp + "_" + token + "_newgrand");


  if (method === 'FORM') {
    //form表单提交
    method = 'POST'
    config = {
      "Content-Type": "multipart/form-data",
      'Accept': "application/json;",
      // 'token': token,
      // 'timestamp': timestamp,
      // 'signature': signature
    };
  } else {
    config = {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      'Accept': "application/json;",
      // 'token': token,
      // 'timestamp': timestamp,
      // 'signature': signature
    };
  }

  let httpDefault = {
    headers: config,
    method: method,
    baseURL: baseURL,
    url: url,
    // `params` 是即将与请求一起发送的 URL 参数
    // `data` 是作为请求主体被发送的数据
    params: method === 'GET' || method === 'DELETE' ? params : null,
    data: method === 'POST' || method === 'PUT' ? qs.stringify(params) : null,
   
  }
  // 请求超时时间
  if (!hastimeout) {
    httpDefault.timeout = 10000;
  }

  // 注意**Promise**使用(Promise首字母大写)
  return new Promise((resolve, reject) => {
    axios(httpDefault)
      .then((res) => {
        resolve(res)
      }).catch((response) => {
        reject(response)
      })
  })

}

// 封装axios--------------------------------------------------------------------------------------

// 输出函数getAxios、postAxios、putAxios、delectAxios，formAxios 供其他文件调用-----------------------------
// Vue.js的插件应当有一个公开方法 install。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象。
export default {
  install: function (Vue) {
    Vue.prototype.getAxios = (url, params, timeout) => apiAxios('GET', url, params, timeout)
    Vue.prototype.postAxios = (url, params, timeout) => apiAxios('POST', url, params, timeout)
    Vue.prototype.putAxios = (url, params, timeout) => apiAxios('PUT', url, params, timeout)
    Vue.prototype.delectAxios = (url, params, timeout) => apiAxios('DELECT', url, params, timeout)
    Vue.prototype.formAxios = (url, params, timeout) => apiAxios('FORM', url, params, timeout)
  }
}

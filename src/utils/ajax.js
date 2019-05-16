/**
 * axios全局配置
 * TODO: 拦截器全局配置，根据实际情况修改
 */
import axios from 'axios'
import qs from 'qs'
import store from "../store";
import { Message } from "element-ui";

// 在config.js文件中统一存放一些公共常量，方便之后维护
import {  baseURL } from './config.js'
import { getSha512 } from './validate.js';
let Base64 = require("js-base64").Base64;

// 添加请求拦截器，在发送请求之前做些什么(**具体查看axios文档**)--------------------------------------------
axios.interceptors.request.use(
  config => {
    return config;
  },
  err => {
    // 请求错误时弹框提示，或做些其他事
    Message({ message: '请求超时!',type: "error"});
    return Promise.reject(err);
  }
);

// 添加响应拦截器(**具体查看axios文档**)----------------------------------------------------------------
axios.interceptors.response.use(
  response => {
    // 对响应数据做点什么，允许在数据返回客户端前，修改响应的数据
    // 如果只需要返回体中数据，则如下，如果需要全部，则 return response 即可 response.data
    const res = response.data
    //其他返回数据的处理

    if (typeof (res) == "object" && Object.prototype.toString.call(res).toLowerCase() == "[object object]" && !res.length) {
      return Promise.reject(res);
    } else {
      var jsonStr = res.replace(/\n/g, "\\n").replace(/\r/g, "\\r");
      return Promise.resolve(JSON.parse(jsonStr));
    }
  },
  error => {
    // 对响应错误做点什么
    if (axios.isCancel(error)) {
      Message({ message: 'Ajax Abort: 该请求在axios拦截器中被中断', type: "error" });
    } else if (error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '请求错误'
          break;
        case 401:
          error.message = 'HTTP 错误'
          break
        case 403:
          error.message = 'HTTP 错误'
          break
        case 404:
          error.message = `请求地址出错: ${error.response.config.url}`
          break
        case 500:
          error.message = '服务器内部错误'
          break
        case 501:
          error.message = '服务未实现'
          break
        case 502:
          error.message = '网关错误'
          break
        case 503:
          error.message = '服务不可用'
          break
        case 504:
          error.message = '网关超时'
          break
        case 505:
          error.message = 'HTTP版本不受支持'
          break
        default:
          Message({  message: `服务器错误！错误代码：${error.response.status}`, type: "error" });
      }
    }

    var obj = error.response.data;
    if (typeof (obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length) {
      return Promise.reject(obj);
    } else {
      const res = obj.replace(/\n/g, "\\n").replace(/\r/g, "\\r")
      return Promise.reject(JSON.parse(res));
    }
  }
);

// 封装数据返回失败提示函数---------------------------------------------------------------------------
function errorState(response) {
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    // 如果不需要除了data之外的数据，可以直接 return response.data
    return response
  } else {
    Message({ message: response.ExceptionMessage ? response.ExceptionMessage : '获取数据失败!',  type: "error"});
  }
}

// 封装数据返回成功提示函数---------------------------------------------------------------------------
function successState(res) {
  // 统一判断后端返回的错误码(错误码与后台协商而定)
  // if (res.data.code === '000000') {
  //   alert('success')
  //   return res
  // }
}

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
        successState(res)
        resolve(res)
      }).catch((response) => {
        errorState(response)
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

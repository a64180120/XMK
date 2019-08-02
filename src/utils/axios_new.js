/**
 * axios全局配置
 * TODO: 拦截器全局配置，根据实际情况修改
 */

import axios from 'axios'

import store from '@/store'
import {  baseURL } from './config.js'

import  Message  from 'element-ui/packages/message'
import  Loading  from 'element-ui/packages/loading'
// create an axios instance
const service = axios.create({
  baseURL: baseURL, 
  timeout: 10000 // 请求超时时间
})
let loading;

// 添加请求拦截器，在发送请求之前做些什么(**具体查看axios文档**)--------------------------------------------
service.interceptors.request.use(
  config => {
    // 拦截请求 规则
     loading =  Loading.service({text:'数据加载中...'}); //开启加载中图标..
    return config;
  },
  error => {
    return Promise.reject(error);
  }
)

// 添加响应拦截器 (**具体查看axios文档**)----------------------------------------------------------------
service.interceptors.response.use(
  response => {
    loading.close();  //关闭加载中图标..
    // 对响应数据做点什么，允许在数据返回客户端前，修改响应的数据
    // 如果只需要返回体中数据，则如下，如果需要全部，则 return response 即可 response.data
    const res = response.data

    if (typeof (res) == "object" && Object.prototype.toString.call(res).toLowerCase() == "[object object]" && !res.length) {
        return Promise.reject(res);
    } else {
        var jsonStr = res.replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace('：',':');
        return Promise.resolve(JSON.parse(jsonStr));
    }
  },
  error => {
    loading.close(); //关闭加载中图标..
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
)

export default service

/*
 * @Author: chengmx 
 * @Date: 2019-02-22 14:35:47 
 * @Last Modified by:   chengmx 
 * @Last Modified time: 2019-02-22 14:35:47 
 * 
 * 对axio进行二次封装
 */

import axios from 'axios';
import store from 'store2';

import { showFailToast } from '../components/commons/Toast';
import serviceAddress from '../services1/config/serverAddress';
// import { history } from '../router';

const hostName = serviceAddress.serviceIp; // 服务器地址
const userInfo = store.get('user');
const token = userInfo && userInfo.token;
const headers = {
  // 'Content-Type': 'application/x-www-form-urlencoded'
  Accept: 'application/json',
  'Content-Type': 'application/json'
};
if (token) {
  headers.Authorization = token;
}

const instance = axios.create({
  baseURL: hostName,
  timeout: 60000 * 10, // 超时时间
  headers: headers
  // transformRequest: [
  //     function(data) {
  //         // Do whatever you want to transform the data
  //         // form data形式
  //         let ret = '';
  //         for (let it in data) {
  //             ret +=
  //                 encodeURIComponent(it) +
  //                 '=' +
  //                 encodeURIComponent(data[it]) +
  //                 '&';
  //         }

  //         return ret;
  //     }
  // ]
  // withCredentials: true
});

/**
 * get方法
 *
 * @export
 * @param {any} url
 * @param {any} [params={}]
 * @returns
 */
export function axiosGet(url, params) {
  getNewToken();

  return new Promise((resolve, reject) => {
    instance
      .get(url, params)
      .then(function(response) {
        const data = response.data;
        parseData(data, resolve, reject);
      })
      .catch(function(error) {
        parseError(error, reject);
      });
  });
}

/**
 * post方法
 *
 * @export
 * @param {any} url
 * @param {any} [params={}]
 * @returns
 */
export function axiosPost(url, params, isFailToast) {
  getNewToken();

  return new Promise((resolve, reject) => {
    instance
      .post(url, params)
      .then(function(response) {
        const data = response.data;
        parseData(data, resolve, reject, isFailToast);
      })
      .catch(function(error) {
        parseError(error, reject);
      });
  });
}

/**
 * put方法
 *
 * @export
 * @param {any} url
 * @param {any} [params={}]
 * @returns
 */
export function axiosPut(url, params, isFailToast) {
  getNewToken();

  return new Promise((resolve, reject) => {
    instance
      .put(url, params)
      .then(function(response) {
        const data = response.data;
        parseData(data, resolve, reject, isFailToast);
      })
      .catch(function(error) {
        parseError(error, reject);
      });
  });
}

/**
 * DELETE方法
 *
 * @export
 * @param {any} url
 * @param {any} [params={}]
 * @returns
 */
export function axiosDelete(url, isFailToast) {
  getNewToken();

  return new Promise((resolve, reject) => {
    instance
      .delete(url)
      .then(function(response) {
        const data = response.data;
        parseData(data, resolve, reject, isFailToast);
      })
      .catch(function(error) {
        parseError(error, reject);
      });
  });
}


/**
 * pushImg方法
 *
 * @export
 * @param {any} url
 * @param {any} [params={}]
 * @returns
 */
export function axiosPushImg(url, params, config) {
  instance.defaults.headers.common['dataType'] = "formData";
  instance.defaults.headers.common['contentType'] = false;
  instance.defaults.headers.common['processData'] = false;
  return new Promise((resolve, reject) => {
    instance
      .post(url, params, config)
      .then(function(response) {
        const data = response.data;
        parseData(data, resolve, reject);
      })
      .catch(function(error) {
        parseError(error, reject);
      });
  });
}
/**
 * 统一处理异步请求返回的数据
 * 判断code
 * 有token失效、逻辑性错误等
 *
 * @param {any} data
 * @param {any} isReturnAll 返回所有数据，不作code0/1校验
 */
async function parseData(data, resolve, reject, isShowToast = true) {
  
  const code = data.code;

  switch (code) {
    case 0: // 请求成功
      resolve(data); // 返回所有数据(根据code进行判断是否有数据然后再数据处理)
      break;
    case 2: // 客户端身份认证访问令牌无效
      // 提示并重新登录
      // showFailToast(result.subMsg);
      store.clear('user'); // 清除用户信息缓存
      resolve(data);
      break;
    default:
      isShowToast && showFailToast(data.error); // 一般错误错误 => 给toast提示
      resolve(data);
      break;
  }
}

/**
 * 解析特殊性错误
 * 例如请求超时等等
 * TODO: 请求超时后重发或其它处理
 *
 * @param {any} data
 * @param {any} reject
 */
function parseError(error, reject) {
  const message =
        error.message.indexOf('timeout') === -1 ? error.message : 'timeout';

  let tipMessage = ``;

  switch (message) {
    case 'timeout':
      tipMessage = `请求超时`;
      break;
    case 'Network Error':
      tipMessage = `网络异常`;
      break;
    default:
      tipMessage = error.message;
      break;
  }

  // tipMessage && showFailToast(tipMessage);

  reject();
}

/**
 * 在header中设置存在localstorage中的token
 *
 */
function getNewToken() {
  const userInfo = store.get('user');
  const token = userInfo && userInfo.token; // TODO: 检验存储token的key值
  
  if (token) {
    instance.defaults.headers.common['Authorization'] = token;
  }
}

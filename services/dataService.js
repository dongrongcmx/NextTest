/*
 * @Author: chengmx 
 * @Date: 2019-02-21 09:30:21 
 * @Last Modified by: chengmx
 * @Last Modified time: 2019-02-22 14:34:37
 * 
 * 获取数据接口
 */


import { axiosGet } from '../until/axiosRequest';
import apiAddress from './config/apiAddress';

export async function getProductData(params = null) {
  return axiosGet(`${apiAddress.GET_DATA}?pageSize=${params.pageSize}&checkArr=${params.checkArr}&pageNumber=${params.pageNumber}`)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
}


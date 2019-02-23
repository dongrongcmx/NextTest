/*
 * @Author: chengmx 
 * @Date: 2019-02-20 15:08:21 
 * @Last Modified by: chengmx
 * @Last Modified time: 2019-02-23 09:54:20
 * 
 * 专题页面。图片懒加载，瀑布流，异步加载。选择器
 */

import React, { Component } from "react";
import { Header, Banner, Products, Footer } from "./compoents";

import { getProductData } from "../../services/dataService";

import './index.less'

class Index extends Component {
  render() {
    const {info} = this.props

    const {result,isNext} = info
    return (
      <div className={'index-box'}>
        <div className={'index-container'}>
          <Header></Header>
          <Banner></Banner>
          <Products val = {result} isNext={isNext}></Products>
          <Footer></Footer>
        </div>
      </div>
    )
  }
}

Index.getInitialProps = async function (context) {
  const info = await getProductData({pageSize:20,checkArr:[],pageNumber:1})
  return {info}
}

export default  Index
/*
 * @Author: chengmx 
 * @Date: 2019-02-20 16:20:10 
 * @Last Modified by: chengmx
 * @Last Modified time: 2019-02-23 10:14:59
 * 
 * 商品列表
 */


import React, { Component } from "react";

import ProductItem from "./productItem";

import Pickter from "./pickter";

import ReactDOM from 'react-dom';

import { getProductData } from "../../../services/dataService";

class Products extends Component {
  state={
    top:0,
    val:[],
    isNext:false,
    pageNumber:1
  }

  componentWillMount(){
    const {val=[],isNext} = this.props
    this.setState({val,isNext})
  }

  onScroll = async(e)=>{
    this.top = ReactDOM.findDOMNode(this.listview).scrollTop
    this.height = ReactDOM.findDOMNode(this.listview).offsetHeight
    this.scrollHeight = ReactDOM.findDOMNode(this.listview).scrollHeight

      this.setState({
        top:this.top
      })
      
      if(this.scrollHeight - this.height <= this.top + 100){
        let newTime = new Date().getTime()
        if(!this.state.isNext || newTime - this.time < 500){
          return
        }

        console.log('异步加载');  
        this.time = new Date().getTime()
        const info = await getProductData({pageSize:20,checkArr:[],pageNumber:this.state.pageNumber+1})
        
        if(info.code == 0){
          const {result,isNext} = info
          this.setState(preState=>({
            val:preState.val.concat(result),
            isNext:isNext,
            pageNumber:preState.pageNumber +1
          }))
        }
      }

  }

  render() {

    return (
      <div>
        <Pickter onRefresh={this._onRefresh}></Pickter>
        <div 
          className={'product-row'}
          ref={ref => (this.listview = ref)}
          onScroll={this.onScroll}
        >
            <div className={'render-body'}>
            {this.state.val.map((value,index)=>(
              <ProductItem
              key = {index}
              img = {value.img} 
              title = {value.title} 
              price={value.price}
              initSize={12}
              top={this.state.top}
              index={index}
            />
            ))}
            </div>
        </div>
        
      </div>
    )
  }
}

export default Products
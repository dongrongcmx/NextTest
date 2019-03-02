/*
 * @Author: chengmx 
 * @Date: 2019-02-20 15:08:21 
 * @Last Modified by: chengmx
 * @Last Modified time: 2019-03-02 15:58:50
 * 
 * 专题页面。图片懒加载，瀑布流，异步加载。选择器
 */

import React, { Component } from "react";
import { Header, Banner, Products, Footer } from "./compoents";

import { connect } from 'dva-no-router';

import { getProductData } from "../../services/dataService";

import './index.less'
import glamorous from "glamorous";

const _color = ['#3370CC','#09F709','#856699']

const Test = glamorous.p({
  color:'#856699'
},({color})=>({color}))

class Index extends Component {
  componentDidMount(){
    console.log('componentDidMount');
    
  }

  componentWillMount(){
    console.log('componentWillMount');
  }

  onClick = ()=>{
    const { dispatch} = this.props
    dispatch({
      type:'test/changeColor',
      payload:{
        color:_color[parseInt(Math.random() * _color.length)]
      }
    })
  }

  render() {
    const { color } = this.props.test
    console.log(this.props);
    
    
    return (
      <div className={'index-box'}>
        <div className={'index-container'}>
          <Header></Header>
          <Banner></Banner>
          {/* <Products val = {result} isNext={isNext}></Products> */}
          <Test onClick={this.onClick} color = {color}>{this.props.info}</Test>
          <Footer></Footer>

        </div>
      </div>
    )
  }
}

Index.getInitialProps = async function (context) {
  // const info = await getProductData({pageSize:20,checkArr:[],pageNumber:1})
  return {info:'info'}
}


export default connect(({ index,test }) => ({
  index,
  test
}))(Index);


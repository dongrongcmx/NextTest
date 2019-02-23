/*
 * @Author: chengmx 
 * @Date: 2019-02-20 16:19:52 
 * @Last Modified by: chengmx
 * @Last Modified time: 2019-02-22 14:09:32
 * 
 * 页面底部
 */


import React, { Component } from "react";
import glamorous from "glamorous";

const FOOTERBANNER = '/static/images/mpHnH8Z91m.jpg'

const Container = glamorous.footer({
  width:'100%',
  height:'120px',
  background:`url('${FOOTERBANNER}') no-repeat center center`,
  backgroundSize:'100% 100%',
  marginTop:'30px'
})

class Footer extends Component {
  render() {
    return (
      <Container></Container>
    )
  }
}

export default Footer
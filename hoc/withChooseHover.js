/*
 * @Author: chengmx 
 * @Date: 2019-03-04 10:56:33 
 * @Last Modified by: chengmx
 * @Last Modified time: 2019-03-04 10:57:48
 * 
 * 检测鼠标滑过
 */

import React, { Component } from 'react';

export default function(WrapedComponent){
  return class WrapComponent extends Component{
    state={
      hover:false
    }
    setHover(v){
      this.setState({hover:v});
    }
    render(){
      return <WrapedComponent 
        hover={this.state.hover}
        setHover={this.setHover.bind(this)}
        {...this.props}
      />;
    }
  };
}

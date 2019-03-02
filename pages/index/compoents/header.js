/*
 * @Author: chengmx 
 * @Date: 2019-02-20 16:27:13 
 * @Last Modified by: chengmx
 * @Last Modified time: 2019-03-02 10:47:14
 * 
 * 页面头部
 */

import React, { Component } from "react";
import glamorous from "glamorous";

const LOGO = '/static/images/logo.png'

const Head = glamorous.header({
  width:'100%',
  height:'72px',
  display:'flex',
  justifyContent:'space-between',
  aLignItems:'center'
})

const Ul = glamorous.ul({
  height:'72px',
  display:'flex',
  paddingTop:'30px'
})

const Li = glamorous.li({
  color:'#333',
  padding:'0 15px',
  fontSize:'20px',
  cursor:'pointer'
})

class Header extends Component {
  render() {
    return (
      <Head>
        <img src={LOGO} ></img>
        <Ul >
          <Li >EYEGLASSES</Li>
          <Li >SUNGLASSES</Li>
          <Li >DAILY NEW</Li>
          <Li >BOGO SALE</Li>
          <Li >FEATURED STYLES</Li>
        </Ul>
        <input className={'search'} placeholder={'Search'}></input>
      </Head>
    )
  }
}

export default Header
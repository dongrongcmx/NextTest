/*
 * @Author: chengmx 
 * @Date: 2019-02-20 16:27:13 
 * @Last Modified by: chengmx
 * @Last Modified time: 2019-02-22 15:50:49
 * 
 * 页面头部
 */

import React, { Component } from "react";

const LOGO = '/static/images/logo.png'

class Header extends Component {
  render() {
    return (
      <header>
        <img src={LOGO} className={'logo'}></img>
        <ul className={'nav'}>
          <li className={'nav-item'}>EYEGLASSES</li>
          <li className={'nav-item'}>SUNGLASSES</li>
          <li className={'nav-item'}>DAILY NEW</li>
          <li className={'nav-item'}>BOGO SALE</li>
          <li className={'nav-item'}>FEATURED STYLES</li>
        </ul>
        <input className={'search'} placeholder={'Search'}></input>
      </header>
    )
  }
}

export default Header
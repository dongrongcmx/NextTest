
/*
 * @Author: chengmx 
 * @Date: 2019-02-21 13:31:17 
 * @Last Modified by: chengmx
 * @Last Modified time: 2019-02-21 14:59:14
 * 
 * 图片的懒加载
 */

import React, { Component } from "react";
import glamorous from "glamorous";

import ReactDOM from 'react-dom';

const Container = glamorous.div({

})

const ProductImg = glamorous.img({
  width:'370px',
  height:'auto'
})

class Gallery extends Component {
    state = {
      url:''
    }

    render() {
      const { url } = this.props
      return (
        <Container ref={ref => (this.box = ref)}>
          <ProductImg src={url}/>  
        </Container>
      )
    }
}

export default Gallery
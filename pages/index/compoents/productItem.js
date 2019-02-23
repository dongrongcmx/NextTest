import React, { Component } from "react";

import { serviceIp } from '../../../services/config/serverAddress'
import ReactDOM from 'react-dom';

class ProductItem extends Component {
  state = {
    url:'',
    isLoad:false
  }
  componentWillMount(){
    const { img, index,initSize } = this.props
    if(index < initSize){
      this.setState({
        url:img,
        isLoad:true
      })
    }
  }

  //图片按需加载
  componentWillReceiveProps(nextProps){
    const {top,img,index} = nextProps
    const _chile_top = ReactDOM.findDOMNode(this.view).offsetTop
    if(!this.state.isLoad && top + 800 >= _chile_top - 100){
      this.setState({
        url:img,
        isLoad:true
      })
      
    }
  }
  render() {
    const { img, title, price,top,index } = this.props
    
    return (
      <div 
      className={'product-item-container'}
      ref={ref => (this.view = ref)}
      >
        <img src={this.state.url ? `${serviceIp}/images/${this.state.url}` : ''}></img>
        <p className={'normal-font'}>{title + '-' + price}</p>
      </div>
    )
  }
}

export default ProductItem
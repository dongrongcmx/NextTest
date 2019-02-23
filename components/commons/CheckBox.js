/*
 * @Author: chengmx 
 * @Date: 2019-02-21 15:35:19 
 * @Last Modified by: chengmx
 * @Last Modified time: 2019-02-23 14:32:36
 * 
 * 选择框
 */

import React, { Component } from "react";
import glamorous from "glamorous";

const Container = glamorous.div({
  display:'flex',
  margin:'0 10px'
})

const Check = glamorous.div({
  width:'16px',
  height:'16px',
  border:'1px solid #666',
  marginRight:'10px',
  background:'#fff'
}, ({ check = false }) => ({ background:`${check ? "#666" : "#fff"}` }))

const Title = glamorous.p({
  fontSize:'18px',
  color:'#333'
})

class CheckBox extends Component {

  render() {
    const { check, title, onChange, val } = this.props
    return (
      <Container>
        <Check check={check} onClick={() => {onChange(val)}}></Check>
        <Title>{title}</Title>
      </Container>
    )
  }
}

export default CheckBox

/*
 * @Author: chengmx 
 * @Date: 2019-02-20 16:20:52 
 * @Last Modified by: chengmx
 * @Last Modified time: 2019-02-23 14:55:51
 * 
 * 商品显示
 */

import React, { Component } from "react";
import glamorous from "glamorous";
import { connect } from 'react-redux'
import { CheckBox } from "../../../components/commons";

const CheckWrap = glamorous.div({
  padding:'20px',
  display:'flex',
  justifyContent:'center',
  flexWrap:'wrap'
})

class Pickter extends Component {
  state={
    isShowCheck:false,
    name:''
  }

  onShowCheck = name => {

    if (name == this.state.name || this.state.name == '') {
      this.setState(preState => ({
        isShowCheck:!preState.isShowCheck
      }))
    }

    this.setState({
      name:name
    })

    const { dispatch } = this.props;
    dispatch({
      type: 'changeActiveCheckData',
      name:name
    });
  }

  onChange = async (id) => {
    const { onRefresh, dispatch } = this.props

    await dispatch({
      type: 'checkArrChange',
      id:id
    });

    onRefresh && onRefresh()
  }

  render() {
    const { activeCheck } = this.props
    
    return (
      <div className={'picter-conatiner'}>
        <div className={'row'}>
          <p>FILTER BY :</p>
          <ul>
            <li onClick={() => {this.onShowCheck('GENDER')}}>GENDER</li>
            <li onClick={() => {this.onShowCheck('MATERIAL')}}>MATERIAL</li>
          </ul>
          
        </div>
        {this.state.isShowCheck &&
          <CheckWrap>
            {activeCheck.map((val, index) => (
              <CheckBox key={index} title={val.name} val = {val.id} onChange={this.onChange} check={val.check}/>
            ))}
          </CheckWrap>}
      </div>
    )
  }
}


//这里根据需要传入redux
const mapStateToProps = state => {
  const { activeCheck } = state
  console.log(activeCheck);
  return {activeCheck}
}

export default connect(mapStateToProps)(Pickter)
/*
 * @Author: chengmingxue 
 * @Date: 2018-09-20 14:52:42 
 * @Last Modified by: chengmx
 * @Last Modified time: 2019-02-22 14:36:35
 * 
 * toast 轻提示
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import * as glamor from 'glamor';
import { Toast } from 'antd-mobile';

const TOAST_SUCCESS = '/static/images/toast_icon_success.svg';
const TOAST_INFO = '/static/images/toast_icon_i.svg';
const TOAST_FAIL = '../../static/images/toast_icon_fail.svg';
const TOAST_LOADING = '../../static/images/loading.png';

const LoadingContainer = glamorous.div({
  width: '120px',
  height: '120px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});

const ToastContainer = glamorous.div({
  paddingTop:'28px',
  paddingBottom:'21px',
  paddingLeft:'20px',
  paddingRight:'20px',
  display:'flex',
  justifyItems:'center',
  alignItems:'center',
  flexDirection:'column'
});

const ToastIcon = glamorous.img({
  width: ' 40px',
  height: '40px',
  marginBottom: '14px'
});

const LoadingIcon = glamorous.img(
  {
    width: '38px',
    height: '38px'
  },
  () => {
    const rotate = glamor.css.keyframes({
      from: { transform: `rotate(0deg)` },
      to: { transform: `rotate(360deg)` }
    });
    return { animation: `${rotate} 2s infinite linear` };
  }
);

const ToastText = glamorous.p({
  minWidth:'104px',
  // maxWidth:'21px',
  fontSize: '14px',
  fontFamily: 'PingFangSC-Regular',
  color: 'rgba(255,255,255,1)',
  lineHeight: '26px',
  // maxHeight: '52px',
  overflow: 'hidden',
  textAlign: 'center'
});

const NormalInfoContainer = glamorous.div({
  paddingTop:'28px',
  paddingBottom:'21px',
  paddingLeft:'20px',
  paddingRight:'20px',
  display:'flex',
  justifyItems:'center',
  alignItems:'center',
  flexDirection:'column'
});

const NormalText = glamorous.p({
  minWidth:'104px',
  maxWidth:'21px',
  fontSize: '14px',
  fontFamily: 'PingFangSC-Regular',
  color: 'rgba(255,255,255,1)',
  lineHeight: '26px',
  // maxHeight: '52px',
  overflow: 'hidden',
  textAlign: 'center'
});

const renderCustomer = (url, text) => (
  <ToastContainer>
    <ToastIcon src={url} alt="" />
    {text && <ToastText>{text}</ToastText>}
  </ToastContainer>
);

const renderLoading = url => (
  <LoadingContainer>
    <LoadingIcon src={url} />
  </LoadingContainer>
);

const renderNormalInfo = text => (
  <NormalInfoContainer>
    <ToastIcon src={TOAST_INFO} alt="" />
    <NormalText>{text}</NormalText>
  </NormalInfoContainer>
);

const showToast = text => {
  Toast.info(renderNormalInfo(text), 1.5);
};

const showSuccessToast = text => {
  // Toast.success(text, 1);
  Toast.info(renderCustomer(TOAST_SUCCESS, text), 1.5);
};

const showFailToast = text => {
  // Toast.fail(text, 1);
  Toast.info(renderCustomer(TOAST_FAIL, text), 1.5);
};

const showLoading = () => {
  Toast.info(renderLoading(TOAST_LOADING), 0);
  // Toast.loading('Loading...', 0);
};

const showNetError = () => {
  Toast.offline('网络连接失败 !!!', 1.5);
};

const hideLoading = () => {
  Toast.hide();
};

class LightToast extends Component {
    static propTypes = {
      render: PropTypes.func.isRequired // 渲染组件的方法
    };

    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
      const SEND_PROPS = {
        showToast: showToast,
        showSuccessToast: showSuccessToast,
        showFailToast: showFailToast,
        showLoading: showLoading,
        showNetError: showNetError,
        hideLoading: hideLoading
      };

      return this.props.render(SEND_PROPS);
    }
}

export {
  showToast,
  showSuccessToast,
  showFailToast,
  showLoading,
  showNetError,
  hideLoading
};

export default function WithLightToast(Component) {
  return class extends Component {
    render() {
      return (
        <LightToast
          render={props => <Component {...this.props} {...props} />}
        />
      );
    }
  };
}

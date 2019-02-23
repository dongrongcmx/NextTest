/*
 * @Author: chengmingxue
 * @Date: 2018-09-20 14:43:26
 * @Last Modified by: chengmx
 * @Last Modified time: 2018-12-23 20:07:19
 *
 * 可通用的样式组件
 */

import glamorous from 'glamorous';
import { Modal } from 'antd-mobile';

const Row = glamorous.div(
  {
    display: 'flex'
  },
  ({
    alignItems = 'center',
    justifyContent = 'flex-start',
    flexDirection = 'row',
    marginBottom = 0,
    marginRight = 0,
    marginLeft = 0,
    marginTop = 0,
    width,
    height
  }) => {
    let styles = {
      flexDirection:flexDirection,
      alignItems: alignItems,
      justifyContent: justifyContent,
      marginBottom: `${marginBottom}px`,
      marginRight: `${marginRight}px`,
      marginLeft: `${marginLeft}px`,
      marginTop: `${marginTop}px`
    };

    if (width) {
      styles.width = `${width}px`;
    }

    if (height) {
      styles.width = `${height}px`;
    }

    return styles;
  }
);


const FlexGenerator = (flex) => {
  switch (flex) {
    // 上下左右居中
    case 1:
    {
      return {
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
      }
    }
    // 垂直方向，居中
    case 2:
    {
      return {
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
      }
    }

  }
}

// 可滚动的容器
const ScrollView = glamorous.div(
  {
    flex: 1,
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',

  },
  ({ paddingBottom = 0 }) => ({
    paddingBottom: `${paddingBottom}px`
  })
);


// 常用Modal
const NormalModal = glamorous(Modal)(
  {
    borderRadius: '0 !important',
    maxHeight: '448px',
    [`& .am-modal-content`]: {
      borderRadius: '0 !important',
      backgroundColor: 'transparent',
      padding: '0 !important'
    },
    [`& .am-modal-body`]: {
      padding: '0 !important'
    }
  },
  ({ isFullWidthContainer }) => ({
    width: isFullWidthContainer ? '100% !important' : 'auto !important'
  })
);

const PrimordialModal = glamorous(Modal)({
  width: 'auto !important',
  borderRadius: '0 !important',

  [`& .am-modal-content`]: {
    borderRadius: '0 !important',
    backgroundColor: '#FFFFFF',
    padding: '0 !important'
  },
  [`& .am-modal-body`]: {
    padding: '0 !important'
  }
});

const OpacityModal = glamorous(Modal)({
  width: '100%',
  [`& .am-modal-content`]: {
    width: '100%',
    borderRadius: '0 !important',
    padding: '0 !important',
    backgroundColor: 'transparent'
  },
  [`& .am-modal-body`]: {
    width: '100%',
    padding: '0 !important',
    backgroundColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  }
});
// 扩展按钮，利用伪元素扩大点击区域
const ExtendButton = glamorous.div(
  {
    position: 'relative',
    fontSize: 0,
    '&::after': {
      content: `''`,
      position: 'absolute',
      left: '-10px',
      top: '-10px',
      bottom: '-10px',
      right: '-10px',
      cursor:'pointer'
    }
  },
  ({ right }) => {
    let styles = {};

    if (right) {
      styles.right = `${right}px`;
    }

    return styles;
  }
);

const NormalFont = glamorous.p({
  fontSize:'14px',
  color:'#999',
}, ({ fontSize = 14, color = '#999', width, textAlign }) => {
  let Style = {}

  if (width) {
    Style.width = `${width}px`
    Style.overflow = 'hidden'
    Style.whiteSpace = 'nowrap'
    Style.textOverflow = 'ellipsis'
  }

  if (textAlign) {
    Style.textAlign = textAlign
  }

  return { fontSize:`${fontSize}px`, lineHeight:`${fontSize + 2}px`, color:color, ...Style }
})

const Logo = glamorous.div({
  height: '24px',
  lineHeight: '24px',
  display: 'inline-block',
  fontSize: '20px',
  fontFamily: 'MicrosoftYaHei-Bold',
  fontWeight: 'bold',
  color: 'rgba(34,34,35,1)',
})

export {
  OpacityModal,
  Row,
  NormalModal,
  PrimordialModal,
  ScrollView,
  FlexGenerator,
  NormalFont,
  ExtendButton,
  Logo,
};

/*
 * @Author: chengmx 
 * @Date: 2019-02-21 09:24:59 
 * @Last Modified by: chengmx
 * @Last Modified time: 2019-02-22 15:19:24
 * 
 * 数据信息相关
 */

import {
  getProductData
} from '../services1/dataService'

const checkData = {
  'GENDER':[{ id:0, name:'Unisex' }, { id:1, name:'Men' }, { id:2, name:'Women' }],
  'MATERIAL':[{ id:3, name:'Metal' }, { id:4, name:'Acetate' }, { id:5, name:'TR' }, { id:6, name:'Metal' }, { id:7, name:'Titanium' }, { id:8, name:'Memory Metal' }, { id:9, name:'Mixed Materials' }, { id:10, name:'Memory Plastic' }, { id:11, name:'Super thin acetate' }],
}

export default{
  namespace:'dataInfo',
  state:{
    info:[],
    activeCheck:checkData.GENDER,
    checkArr:[]
  },
  subscriptions: {
    setup({ history }) {
        // eslint-disable-line
      return history.listen(() => {
            // eslint-disable-line
      });
    }
  },
  effects:{
    *getProductData({ payload }, { call, put, select }) {
      let { checkArr } = yield select(state => state.dataInfo);
      const { pageNumber, pageSize, callback } = payload;

      const data = yield call(getProductData, { pageSize:pageSize, checkArr:checkArr, pageNumber:pageNumber })
      
      if (data.code == 0) {
        callback && callback(data.result, data.isNext); // 由组件内部管理状态
        yield put({
          type: 'saveInfo',
          payload: {
            info:data.result
          }
        }) 
      }
    }
  },
  reducers:{
    // 保存数据
    saveInfo(state, action) {
      return {
        ...state,
        ...action.payload
      };
    },
    changeActiveCheckData(state, action) {
      const { name } = action.payload
      return {
        ...state,
        activeCheck:checkData[name]
      };
    },
    checkArrChange(state, action) {
      let { checkArr } = state
      const { id } = action.payload

      let isPush = true
      checkArr.forEach((element, index) => {
        if (element == id) {
          isPush = false
          checkArr.splice(index, 1);
        }
      });
      if (isPush) {
        checkArr.push(id)
      }
      return {
        ...state,
        checkArr
      };
    }
  }
}


import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import {reducer} from './reducers';


const checkData = {
  'GENDER':[{ id:0, name:'Unisex' }, { id:1, name:'Men' }, { id:2, name:'Women' }],
  'MATERIAL':[{ id:3, name:'Metal' }, { id:4, name:'Acetate' }, { id:5, name:'TR' }, { id:6, name:'Metal' }, { id:7, name:'Titanium' }, { id:8, name:'Memory Metal' }, { id:9, name:'Mixed Materials' }, { id:10, name:'Memory Plastic' }, { id:11, name:'Super thin acetate' }],
}

const exampleInitialState = {
  checkData:checkData,
  activeCheck:checkData.GENDER
}

export function initializeStore(initialState = exampleInitialState) {
  return createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}

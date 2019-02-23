import {actionTypes} from "./action-types";


const exampleInitialState = {}

export const reducer = (state = exampleInitialState, action) => {

  switch (action.type) {
    //前台
    case actionTypes.changeActiveCheckData:
      return {
        ...state,
        activeCheck:state.checkData[action.name]
      };

    case actionTypes.checkArrChange:{
      let { activeCheck } = state
      const { id } = action

      activeCheck.forEach((element, index) => {
        if (element.id == id) {
          element.check = !element.check
        }
      });

      return {
        ...state,
        activeCheck
      };
    }
      
    default:
      return state
  }
}

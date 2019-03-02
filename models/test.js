const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));



const model = {

  namespace: 'test',

  state: {
    name: 'testmodel',
    count: 0,
    init: false,
    color:'#555'
  },

  reducers: {

    caculate(state, payload) {

      const { count } = state;

      const { delta } = payload;

      return { ...state, count: count + delta };

    },
    changeColor(state,action){
        const { color } = action.payload;
        return {
            ...state,
            color
        }
    }

  },

  effects: {

    *init(action, { put }) {

      yield delay(2000);

      yield put({ type: 'caculate', delta: 1 });

    },

  },

};



export default model;


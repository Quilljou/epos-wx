import {routerRedux} from 'dva/router';
import { queryBranch,queryUser } from '../services/app'

export default {
  namespace : 'app',
  state : {
    selectedBar: 'home',
    user: {}
  },
  reducers : {
    changeSelectedBar(state, action) {
      const {selectedBar} = action.payload;
      // routerRedux.push(`/${selectedBar}`);
      return {
        ...state,
        selectedBar
      };
    },
    queryUserSuccess(state, action) {
      return {...state,user: action.payload.data};
    }
  },
  effects : {
    *queryUser({
      payload
    }, {call, put}) {
      const data = yield call(queryUser, payload);
      if (data) {
        yield put(
          {
            type: 'queryUserSuccess',
           payload: data
         })
      }
    }
  },
  subscriptions: {
    setup({history,dispatch}){
      history.listen((location) => {
        let selectedBar = '';
        switch (location.pathname) {
          case '/home':
            selectedBar = 'home'
            break;
          case '/report':
            selectedBar = 'report'
            break;
          case '/me':
            selectedBar = 'me'
            break;
          default:
            selectedBar = 'home';
            return
        }

        dispatch({
          type: 'changeSelectedBar',
          payload: {
            selectedBar
          }
        })

      })
    }
  }
}

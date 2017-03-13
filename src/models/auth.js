import { login, logout } from '../services/auth'
import { toast } from 'antd-mobile'
// import {routerRedux} from 'dva/router'
import Auth from '../utils/auth'

export default {
  namespace: 'auth',
  state: {
    user: {}
  },
  reducers: {
    loginSuccess (state,action) {
      // routerRedux.push('/home')
      Auth.login(action.payload.data);
      return state;
    },
    logOut (state,action) {
      Auth.logout();
      // routerRedux.push('/login')
      return state;
    }
  },
  effects: {
      *login ({ payload }, { call, put}) {
          const data =  yield call(login,payload);
          if(data) {
            yield put({
              type: 'loginSuccess',
              payload: data
            })
          }
          toast.info(data.message)
      }
  },
  subscriptions: {
    setup({history,dispatch}){
      history.listen((location) => {
        if(location.pathname === '/login' && Auth.isLoggedIn()) {
          history.push('/')
        }
      })
    }
  },
};

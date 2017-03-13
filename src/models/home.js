import { query } from '../services/home';
import { queryBranch } from '../services/app'
import { betweenToday } from '../utils/util';

export default {
  namespace : 'home',
  state : {
    branches: [],
    basic: {},
    income: [],
    dishes: [],
    branchId: null
  },
  reducers : {
    querySuccess (state,action) {
      return {...state,...action.payload.data};
    },
    queryBranchSuccess(state, action) {
      return {...state,...action.payload.data};
    },
    changeBranch (state,action) {
      return {...state,...action.payload};
    }
  },
  effects : {
    *query ({ payload }, { call, put}) {
      const data =  yield call(query,payload);
      
      if(data) {
        yield put({
          type: 'querySuccess',
          payload: data
        })
      }
    },
    *queryBranch({
      payload
    }, {call, put}) {
      const data = yield call(queryBranch, payload);
      if (data) {
        yield put(
          {
            type: 'queryBranchSuccess',
           payload: data
         })
      }
    },
  }
};

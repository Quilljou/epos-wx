import { query } from '../services/report';
import { queryBranch } from '../services/app'
import moment from 'moment'



let time = {
  start: moment(),
  end: moment()
}


export default {
  namespace: 'report',
  state: {
    time: time,
    branchId: null,
    records: [],
    branches: []
  },
  reducers: {
    querySuccess (state,action) {
      return {...state,...action.payload.data};
    },
    changeTime (state,action) {
      console.log(action);
      return {...state,time: {...state.time,...action.payload}}
    },
    queryBranchSuccess(state, action) {
      const { records: branches , branchId } = action.payload.data;
      return {...state, branches, branchId };
    },
    changeBranch (state,action) {
      return {...state,...action.payload};
    }
  },
  effects: {
    *query({
      payload
    }, {call, put, select}) {

      const report = yield select(state => state.report);
      let { start, end } = report.time;


      start = start.startOf('day').format('YYYY-MM-DD HH:mm:ss');
      end = end.endOf('day').format('YYYY-MM-DD HH:mm:ss');

      const time = {start, end}

      payload = {...payload, ...time}
      if(report.branchId) {
        payload = {...payload, ...report.branchId}
      }

      const data = yield call(query, payload);
      if (data) {
        yield put(
          {
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
    }
  },
  subscriptions: {
    // setup({history,dispatch}){
    //   history.listen((location) => {
    //     if(location.pathname === '/report') {
    //       dispatch({
    //         type: 'query',
    //         payload: {}
    //       })
    //     }
    //   })
    // }
  },
};

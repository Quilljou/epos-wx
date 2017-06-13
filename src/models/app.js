import { hashHistory } from 'dva/router';
import { queryData } from '../services/app'
import { Toast } from 'antd-mobile'
import moment from 'moment'

export default {
  namespace : 'app',
  state : {
    selectedBar: 'home',
    appBar: true,
    machine: [],
    selectedMachine: null,
    start: moment(),
    end: moment(),
    discount: [],
    payment: [],
    conclusion: [],
    refundQty: 0,
    refundSum: 0,
    tradeQty: 0,
    tradeSum: 0
  },
  reducers : {
    changeSelectedBar(state, { payload }) {
      const {selectedBar} = payload;
      return {
        ...state,
        selectedBar
      };
    },

    save(state, { payload }) {
      console.log(payload);
      const newState  = {...state, ...payload};
      localStorage.setItem('machine', JSON.stringify(newState.machine))
      return newState;
    },

    changeAppBar(state, { payload }) {
      return {...state, ...payload };
    },
  },
  effects : {
    *addMachine({
      payload
    }, {call, put, select}) {
      let app = yield select(state => state.app);

      let { machine, selectedMachine } = app;

      machine.push(payload);

      // 改变当前选中
      selectedMachine = payload.id;

      hashHistory.goBack(); // 返回来时页面

      Toast.info('添加成功', 1.5,null, false);

      yield put({
        type: 'save',
        payload: { machine, selectedMachine }
      })
    },

    // 初始化app，查询机器和数据
    *queryMachine({
      payload
    }, {call, put, select}) {
      let app = yield select(state => state.app);
      let machine = JSON.parse(localStorage.getItem('machine'));

      let { start, end } = app;

      // 只有存在机器的时候才继续
      if(machine && machine.length) {
        const { id, password } = machine[0];

        yield put({
            type: 'save',
            payload: {
              machine,
              selectedMachine: id
            }
        })

        const response = yield call(queryData,{
          id,
          password,
          start: start.format('YYYY-MM-DD'),
          end: end.format('YYYY-MM-DD')
        });

        // 返回正确数据显示
        if(response && response.status) {
          yield put({
              type: 'save',
              payload: response.data
          })
        }
        // else {
        //   yield put({
        //       type: 'save',
        //       payload: {
        //         payment: [],
        //         discount: [],
        //         refundQty: 0,
        //         refundSum: 0,
        //         tradeQty: 0,
        //         tradeSum: 0
        //       }
        //   })
        // }
      }
    },

    *deleteMachine({
      payload
    }, {call, put, select}) {
      const { id } = payload;
      let app = yield select(state => state.app);
      let { machine, selectedMachine } = app;

      machine = machine.filter((item) => {
        return item.id !== id;
      })

      // 如果删除的是当前选中的机器，改变当前机器为第一台
      if(selectedMachine === id && machine.length) {
        selectedMachine = machine[0].id;
      }

      Toast.info('删除成功', 1.5,null, false);

      // 清除数据，反正进入报表页面会再次请求
      yield put({
          type: 'save',
          payload: {
            machine,
            selectedMachine,
            payment: [],
            discount: [],
            refundQty: 0,
            refundSum: 0,
            tradeQty: 0,
            tradeSum: 0
         }
      })
    },

    *updateMachine({
      payload
    }, {call, put, select}) {
      const { id } = payload;
      let app = yield select(state => state.app);
      let { machine } = app;

      machine = machine.map((item) => {
        if(item.id === payload.id) {
          return Object.assign(item, payload)
        }
        return item;
      })

      hashHistory.goBack();
      Toast.info('更新成功', 1.5,null, false);

      yield put({
          type: 'save',
          payload: { machine }
      })
    },

    *queryData({
      payload
    }, {call, put, select}) {
      let app = yield select(state => state.app);
      let { start, end, machine, selectedMachine} = app;
      let { id, start: incomingStart, end: incomingEnd } = payload;
      let password;

      // 如果根据日期查询，那么使用新传入的日期，并将他们存入
      if(incomingStart) start = incomingStart;
      if(incomingEnd) end = incomingEnd;

      // 如果根据日期查询，没有id，则是选中id
      if(!id) id = selectedMachine;
      console.log(id);
      // 找到匹配的id
      machine.forEach(item => {
        if(item.id === id) {
          return password = item.password;
        }
      })

      // 请求
      const response = yield call(queryData,{
        id,
        password,
        start: start.format('YYYY-MM-DD'),
        end: end.format('YYYY-MM-DD')
      });

      if(response && response.status) {
        yield put({
            type: 'save',
            payload: {...response.data, selectedMachine: id, start, end}
        })
      }else{
        yield put({
            type: 'save',
            payload: {
              selectedMachine: id,
              payment: [],
              discount: [],
              refundQty: 0,
              refundSum: 0,
              tradeQty: 0,
              tradeSum: 0
            }
        })
      }
    },

  },
  subscriptions: {
    setup({history,dispatch}){
      history.listen((location) => {
        let selectedBar = '';
        switch (location.pathname) {
          case '/home':
            selectedBar = 'home'
            changeAppBar(true)
            break;
          case '/machine':
            selectedBar = 'machine'
            changeAppBar(true)
            break;
          default:
            selectedBar = 'home';
            changeAppBar(false)
            return
        }

        // 控制选中icon
        dispatch({
          type: 'changeSelectedBar',
          payload: {
            selectedBar
          }
        })

        // 控制 appbar显示
        function changeAppBar(bool) {
          dispatch({
            type: 'changeAppBar',
            payload: {
              appBar: bool
            }
          })
        }

      })
    }
  }
}

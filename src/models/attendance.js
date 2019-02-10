import { getAttenInfo, addAttenInfo } from '@/services';

export default {
  namespace: 'attendance',
  state: {},
  // 异步操作
  effects: {
    *GetInfo({ payload: info }, { call, put }) {
      // 请求用户数据
      const { data } = yield call(getAttenInfo, info)
      yield put({ type: 'save', payload: data[0] });
    },
    *addAtten({ payload: data }, { call, dispatch }) {
      yield call(addAttenInfo, data).then(res => {
        console.log('add------effects------', res);
      })
      .catch(err => {
        console.log('errrr->>>>>', err);
      });;
      dispatch({ type: 'getInfo', payload: data });
    },
  },
  // 同步操作
  reducers: {
    save(state, { payload: data }) {
      const newState = Object.assign({}, state, data);
      console.log('-------models----reduce----', newState);
      return newState;
    },
  },
  // 订阅数据，如键盘或路由
  subscriptions: {
    // 监听路由的变化 获取初始化数据
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/attendance') {
          dispatch({ type: 'getInfo', payload: query });
        }
      });
    },
  },
};

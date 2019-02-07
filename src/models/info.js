import { getInfo } from '@/services';

export default {
  namespace: 'info',
  state: {},
  // 异步操作
  effects: {
    *GetInfo({ payload: info }, { call, put }) {
      // 请求用户数据
      const { data } = yield call(getInfo, info);
      // 发起一个action
      yield put({ type: 'save', payload: data[0] });
    },
  },
  // 同步操作
  reducers: {
    save(state, { payload: info }) {
      const newState = Object.assign({}, state, info);
      console.log('-------models----reduce----', newState);
      return newState;
    },
  },
  // 订阅数据，如键盘或路由
  subscriptions: {
    // 监听路由的变化 获取初始化数据
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/info') {
          dispatch({ type: 'GetInfo', payload: query });
        }
      });
    },
  },
};

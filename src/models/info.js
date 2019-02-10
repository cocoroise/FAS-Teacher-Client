import { getInfo, updateInfo } from '@/services';
import Router from 'umi/router';
import { getLocalStorage, setLocalStorage } from '@/util/helper';

export default {
  namespace: 'info',
  state: {
    isLogined: false,
  },
  // 异步操作
  effects: {
    *GetInfo({ payload: info }, { call, put }) {
      // 请求用户数据
      const { data } = yield call(getInfo, { teacher_id: info.teacher_id });
      if (data && data.length !== 0) {
        setLocalStorage('info', data[0]);
        yield put({
          type: 'save',
          payload: {
            info: data[0],
          },
        });
      }
    },
    *getCacheInfo({ payload }, { put }) {
      const { info } = getLocalStorage('info');
      yield put({ type: 'save', payload: info });
    },
  },
  // 同步操作
  reducers: {
    // 没有缓存的时候
    save(state, { payload: info }) {
      const newState = Object.assign({}, state, info, { isLogined: true });
      console.log('---info---models---reduce---', newState);
      return newState;
    },
  },
  // 订阅数据，如键盘或路由
  subscriptions: {
    // 监听路由的变化 获取初始化数据
    setup({ dispatch, history }) {
      const data = getLocalStorage('info');
      return history.listen(({ pathname, query }) => {
        if (pathname === '/info' && !data) {
          Router.replace('/login');
        } else {
          dispatch({ type: 'GetInfo', payload: query });
        }
      });
    },
  },
};

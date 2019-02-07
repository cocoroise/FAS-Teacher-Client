import { getInfo } from '@/services';

export default {
  namespace: 'attendance',
  state: {},
  // 异步操作
  effects: {},
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
  },
};

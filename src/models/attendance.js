/**
 * 新用户登录->保存数据到store和localstorage
 * 获取先看本地有没有->没有就重新获取
 * 注销的时候删除
 */

import { getAttenInfo, addAttenInfo, updateAttenInfo } from '@/services';
import { setLocalStorage, getLocalStorage, deleteLocalStorage } from '@/util/helper';
import { Toast } from 'antd-mobile';
import Router from 'umi/router';

export default {
  namespace: 'attendance',
  state: {},
  // 异步操作
  effects: {
    // 请求教师今天的考勤数据 保存到localstorage
    *fetchData({ payload: d }, { call, put }) {
      if (d.attendance_id) {
        const { data } = yield call(getAttenInfo, d);
        yield put({ type: 'save', payload: data[0] });
        yield put({ type: 'saveStorage', payload: data[0] });
      }
    },
    // 获取本地的数据 没有就fetch
    *getInfo({ payload: data }, { put, select }) {
      const { attendance_id } = data;
      const cacheData = getLocalStorage('attendance');
      if (cacheData) {
        yield put({ type: 'save', payload: cacheData });
        return cacheData.data;
      }
      yield put({ type: 'fetchData', payload: { attendance_id } });
      return select();
    },
    // 添加新的记录 添加了之后要重新fetch并更新store&localstorage
    *addAtten({ payload: data }, { call, put }) {
      yield call(addAttenInfo, data);
      // 更新了之后重新获取一下
      const result = yield put({ type: 'fetchData', payload: data });
      yield put({ type: 'save', payload: result });
      yield put({ type: 'saveStorage', payload: result });
    },
    // 更新记录
    *updateAtten({ payload: data }, { call, put }) {
      const res = yield call(updateAttenInfo, data);
      if (res.code == 0) {
        yield put({type:'save',payload:data});
        Toast.success('正在跳转本场考勤详情页...', 0.8);
        Router.push(`/index/detail?id=${data.attendance_id}`);
      } else {
        Toast.fail('提前考勤失败，请重试！');
      }
    },
  },
  // 同步操作
  reducers: {
    save(state, { payload: data }) {
      const newState = Object.assign({}, state, data);
      return newState;
    },
    // 保存到localStorage 需要teacher_id和数据
    saveStorage(state, { payload: data }) {
      setLocalStorage('attendance', data);
      return state;
    },
    delStorage(state) {
      deleteLocalStorage('attendance');
      return state;
    },
  },
  // 订阅数据，如键盘或路由
  subscriptions: {
    // 监听路由的变化 获取初始化数据
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/') {
          dispatch({ type: 'getInfo', payload: query });
        }
      });
    },
  },
};

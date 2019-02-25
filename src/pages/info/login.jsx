import React, { Component } from 'react';
import { List, Flex, InputItem, WhiteSpace, WingBlank, Button, Toast } from 'antd-mobile';
import BizIcon from '../../components/BizIcon';

import style from './login.less';
import Router from 'umi/router';
import { getInfo } from '@/services';

class Login extends Component {
  state = {
    loading: false,
  };

  enterLoading = () => {
    this.setState({ loading: true });
  };

  login = () => {
    this.enterLoading();
    const {
      state: { value: id },
    } = this.idRef;
    const {
      state: { value: pwd },
    } = this.pwdRef;
    // 请求服务器数据
    getInfo({ teacher_id: id })
      .then(res => {
        const password = res.data[0].pwd;
        if (password === pwd) {
          Toast.success('登录成功，正在跳转...', 0.8);
          Router.replace(`/info?id=${id}`);
        }else {
          Toast.fail('密码或账号错误，请重试', 0.8);
          this.setState({ loading: false });
        }
      })
  };

  render() {
    const { loading } = this.state;
    return (
      <div className={style.loginContainer}>
        <div className={style.loginFlex}>
          <List renderHeader={() => '教师登陆'} className={style.list}>
            <List.Item thumb={<BizIcon type="idcard" />}>
              <InputItem
                clear
                ref={el => {
                  this.idRef = el;
                }}
              >
                教师号：
              </InputItem>
            </List.Item>
            <List.Item thumb={<BizIcon type="user" />}>
              <InputItem
                clear
                ref={el => {
                  this.pwdRef = el;
                }}
              >
                密码：
              </InputItem>
            </List.Item>
          </List>
          <WhiteSpace size="lg" />
          <Button loading={loading} onClick={this.login} className={style.loginSubmit}>
            登陆
          </Button>
          <WhiteSpace size="lg" />
        </div>
      </div>
    );
  }
}
export default Login;

import React, { Component } from 'react';
import { List, Flex, InputItem, WhiteSpace, Button, Toast } from 'antd-mobile';
import style from './login.less';
import Router from 'umi/router';
import { userLogin } from '@/services';

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
    userLogin({ id, pwd })
      .then(() => {
        Toast.success('登录成功，正在跳转...', 0.8);
        Router.push(`/info?id=${id}`);
      })
      .catch(() => {
        Toast.fail('password error');
        this.setState({ loading: false });
      });
  };

  render() {
    const { loading } = this.state;
    return (
      <div className={style.loginContainer}>
        <div className={style.loginFlex}>
          <WhiteSpace size="lg" />
          <Flex>
            <Flex.Item>
              <List>
                <InputItem
                  clear
                  ref={el => {
                    this.idRef = el;
                  }}
                  className={style.loginInput}
                >
                  学号：
                </InputItem>
              </List>
            </Flex.Item>
          </Flex>
          <WhiteSpace size="lg" />
          <Flex>
            <Flex.Item>
              <List>
                <InputItem
                  clear
                  ref={el => {
                    this.pwdRef = el;
                  }}
                  className={style.loginInput}
                >
                  密码：
                </InputItem>
              </List>
            </Flex.Item>
          </Flex>
          <WhiteSpace size="lg" />
          <Flex>
            <Flex.Item>
              <Button loading={loading} onClick={this.login} className={style.loginSubmit}>
                登陆
              </Button>
            </Flex.Item>
          </Flex>
          <WhiteSpace size="lg" />
        </div>
      </div>
    );
  }
}
export default Login;

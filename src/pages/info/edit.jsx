import React, { PureComponent } from 'react';
import Router from 'umi/router';
import { connect } from 'dva';
import { List, InputItem, WhiteSpace, NavBar, Icon, Button, Picker, Toast } from 'antd-mobile';
import { createForm, createFormField } from 'rc-form';
import styles from './edit.less';
import { updateInfo } from '@/services';

const buttonStyle = {
  width: '70%',
  margin: '0 auto',
};

class Edit extends PureComponent {
  state = {
    loading: false,
  };

  // 验证数据并提交数据
  handleClick = () => {
    this.props.form.validateFields(async (error, value) => {
      if (error) {
        console.log('error->', error);
      } else {
        console.log('------before fetch-----', this.props.info);
        await updateInfo(this.props.info)
          .then(res => {
            if (res.code === 0) {
              Toast.success('修改成功', 0.6);
              Router.push(`/info?id=${this.props.info.stu_id}`);
            }
          })
          .catch(err => {
            Toast.fail('修改信息出现问题啦，请再试一次', err);
          });
      }
    });
  };

  // 控制错误的组件
  errorCom = errorName => {
    const err = this.props.form.getFieldError(`${errorName}`);
    return (
      err && (
        <div className={styles.error}>
          <span>{err}</span>
        </div>
      )
    );
  };

  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div className={styles.registerContainer}>
        <NavBar mode="light" icon={<Icon type="left" />} onLeftClick={() => Router.push('/info')}>
          编辑信息
        </NavBar>
        <div className={styles.list}>
          <List>
            <InputItem
              clear
              placeholder="请输入姓名"
              {...getFieldProps('name', {
                rules: [{ required: true }],
              })}
            >
              姓名
            </InputItem>
            {this.errorCom('name')}
            <InputItem
              clear
              placeholder="请输入年龄"
              {...getFieldProps('age', {
                rules: [{ required: true, max: 3 }],
              })}
            >
              年龄
            </InputItem>
            {this.errorCom('age')}
            <InputItem
              clear
              placeholder="请输入你的电话"
              {...getFieldProps('phone', {
                rules: [{ required: true, len: 11 }],
              })}
            >
              电话
            </InputItem>
            {this.errorCom('phone')}
            <InputItem
              clear
              placeholder="请输入密码"
              {...getFieldProps('pwd', {
                rules: [{ required: true }],
              })}
            >
              密码
            </InputItem>
            {this.errorCom('password')}
            <InputItem clear placeholder="请输入你的民族" {...getFieldProps('nation')}>
              民族
            </InputItem>
            <InputItem clear placeholder="请输入你的籍贯" {...getFieldProps('hometown')}>
              籍贯
            </InputItem>
            <WhiteSpace />
          </List>
        </div>
        <Button style={buttonStyle} type="primary" onClick={this.handleClick}>
          提交修改
        </Button>
      </div>
    );
  }
}

const mapPropsToFields = function mapPropsToFields(props) {
  const { info } = props;
  const transform = obj =>
    Object.keys(obj).reduce(
      (acc, cv) => ({
        ...acc,
        [cv]:
          typeof obj[cv] === 'object' ? transform(obj[cv]) : createFormField({ value: obj[cv] }),
      }),
      obj
    );
  return transform(info);
};
const onFieldsChange = function onFieldsChange(props, data) {
  const value = Object.keys(data).map(v => ({ [v]: data[v].value }));
  props.save(value[0]);
};
const artifectForm = createForm({
  mapPropsToFields,
  onFieldsChange,
})(Edit);
const mapDispatchToProps = dispatch => ({
  save: data => {
    dispatch({ type: 'info/save', payload: data });
  },
});
// 先生成form组件再connect 不然props传不进去
export default connect(
  ({ info }) => info,
  mapDispatchToProps
)(artifectForm);

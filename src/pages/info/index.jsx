import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, WhiteSpace, List } from 'antd-mobile';
import Router from 'umi/router';
import BizIcon from '../../components/BizIcon';

import style from './index.less';

// connect视图和state
@connect(({ info }) => info)
class Info extends Component {
  handleEdit = () => {
    Router.push('/info/edit');
  };

  render() {
    // 传进来的state当做props用
    const { info } = this.props;
    return (
      <div className={style.container}>
        <div className={style.edit} onClick={() => Router.push('/info/edit')}>
          <BizIcon type="bianji" />
        </div>
        <div className={style.top} />
        <div className={style.cardContainer}>
          <WhiteSpace size="sm" />
          <Card className={style.card}>
            <Card.Header
              title={info.name}
              thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
            />
            <Card.Body>
              <List className={style.card.content}>
                <List.Item className={style.list_item}>
                  教师工号:
                  {info.teacher_id}
                </List.Item>
                <List.Item>
                  学院:
                  {info.college_name}
                </List.Item>
                <List.Item>
                  电话:
                  {info.phone}
                </List.Item>
                <List.Item>
                  状态:
                  {info.state}
                </List.Item>
                <List.Item>
                  入职时间:
                  {info.entertime}
                </List.Item>
                <List.Item>
                  籍贯:
                  {info.hometown}
                </List.Item>
                <List.Item>
                  民族:
                  {info.nation}
                </List.Item>
              </List>
            </Card.Body>
          </Card>
          <WhiteSpace size="sm" />
        </div>
      </div>
    );
  }
}

export default Info;

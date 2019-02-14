import React, { Component } from 'react';
import connect from 'dva';
import Router from 'umi/router';
import BizIcon from '@/components/BizIcon';
import { Toast, Grid, NavBar, Icon, WingBlank, Card, List } from 'antd-mobile';
import { getStuAttendanceList } from '@/services';

import style from './detail.less';

// @connect(({ info }) => info)
class Detail extends Component {
  state = {
    data: [],
    rawData: [],
    percent: 0,
    selectStu: [],
  };

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.fetchData();
      // 这里还要判断一下有没有到考勤结束的时间
    }, 2000);
  }

  // 卸载定时器
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  fetchData = () => {
    // 获取attendance_id
    // const { id } = this.props.location.query;
    getStuAttendanceList({ attendance_id: 1040 })
      .then(res => {
        if (res.code === 0) {
          const {
            data: { list },
          } = res;
          this.setState({ data: this.formatGridData(list) });
          this.setState({ rawData: list, percent: res.data.percent });
        }
      })
      .catch(err => Toast.fail('出了点问题，请重试...', 0.8));
  };

  formatGridData = data => {
    const res = data.map(v => {
      // 设置图标的颜色和类别
      const tag = v.status === 0 ? 'frown' : v.status === 1 ? 'smile' : 'meh';
      const color = v.status === 0 ? '#EE5F83' : v.status === 1 ? '#16CAC8' : '#FCC991';
      return {
        text: v.name,
        icon: tag,
        color,
      };
    });
    return res;
  };

  handleGridClick = (el, index) => {
    const { rawData } = this.state;
    let status = rawData[index].status;
    let time = rawData[index].time;
    status = status === 0 ? '未签到' : status === 1 ? '签到成功' : '延迟签到';
    time = time.slice(0, 5);
    this.setState({
      selectStu: {
        stu_id: rawData[index].stu_id || '',
        status: status || '',
        time: time || '暂无时间',
      },
    });
  };

  render() {
    const { selectStu, data, percent, rawData } = this.state;
    return (
      <div className={style.container}>
        <NavBar mode="dark" icon={<Icon type="left" />} onLeftClick={() => Router.push('/')}>
          考勤详情
        </NavBar>
        <WingBlank size="lg">
          <div className={style.gridContainer}>
            <Grid
              data={data}
              columnNum={4}
              onClick={this.handleGridClick}
              renderItem={dataItem => (
                <div className={style.grid}>
                  <BizIcon type={dataItem.icon} color={dataItem.color} />
                  <div className={style.gridBox}>
                    <span>{dataItem.text} </span>
                  </div>
                </div>
              )}
            />
          </div>
        </WingBlank>
        <WingBlank size="lg">
          <div className={style.cardContainer}>
            <Card>
              <Card.Header title={`当前考勤率：${percent}%`} thumb={<BizIcon type="block" />} />
              <Card.Body>
                <List>
                  <List.Item thumb={<BizIcon type="user" />}>
                    学号:
                    {selectStu.stu_id}
                  </List.Item>
                  <List.Item thumb={<BizIcon type="question" />}>
                    考勤状态：
                    {selectStu.status}
                  </List.Item>
                  <List.Item thumb={<BizIcon type="calendar" />}>
                    考勤时间：
                    {selectStu.time}
                  </List.Item>
                </List>
              </Card.Body>
            </Card>
          </div>
        </WingBlank>
      </div>
    );
  }
}

export default Detail;

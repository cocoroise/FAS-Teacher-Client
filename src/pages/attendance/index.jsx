import React, { PureComponent } from 'react';
import { WhiteSpace, WingBlank, NavBar, } from 'antd-mobile';
import { connect } from 'dva';
import { Dropdown } from '@/components/Dropdown';
import { getAttendanceOfTeacher, lineChartOfTeacher } from '@/services';
import Chart from './lineChart';
import { unique } from '@/util/tools';

import style from './index.less';

@connect(({ info }) => info)
class Attendance extends PureComponent {
  state = {
    list: [],
    axis: [],
    course: [],
    selectCourse: '',
  };

  componentDidMount() {
    // const { teacher_id } = this.props.info;
    getAttendanceOfTeacher({ teacher_id:1 }).then(res => {
      // 给dropdown数据
      const uniRes = res.data.map(v => {
        return {
          title: v.course_name,
          cid: v.course_id,
        };
      });
      const result = unique(uniRes).map((v, i) => {
        return Object.assign(
          {
            id: i,
            selected: false,
            key: 'course',
          },
          v
        );
      });
      this.setState({ course: result });

      // const { teacher_id, course_id } = this.state;
      lineChartOfTeacher({ teacher_id:1, course_id: 205 }).then(r => {
        const { data } = r;
        let list = [];
        Object.values(data).map(v => {
          if (v.name) {
            list.push(v);
          }
        });
        this.setState({ list, axis: data.axis });
      });
    });
  }

  resetThenSet = (id, key, cid) => {
    const temp = JSON.parse(JSON.stringify(this.state[key]));
    temp.forEach(i => {
      i.selected = false;
    });
    temp[id].selected = true;
    this.setState({
      [key]: temp,
    });
    console.log('cccccccid',id,key,cid)
    this.setState({ selectCourse: cid });
  };

  render() {
    const { list, axis } = this.state;
    return (
      <div className={style.flex_container}>
        <NavBar mode="dark">考勤情况</NavBar>
        <WingBlank size="lg">
          <div className={style.select_section}>
            <Dropdown title="选择课程" list={this.state.course} resetThenSet={this.resetThenSet} />
          </div>
          <WhiteSpace size="lg" />
          <div className={style.chart}>
            <Chart list={list} axis={axis} />
          </div>
        </WingBlank>
        <WhiteSpace size="lg" />
      </div>
    );
  }
}

export default Attendance;

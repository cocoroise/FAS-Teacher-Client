import React, { PureComponent } from 'react';
import { Flex, WhiteSpace, WingBlank, NavBar, Tag } from 'antd-mobile';
import { connect } from 'dva';
import LineChart from '@/components/Chart/line';
import PieChart from '@/components/Chart/pie';
import { Dropdown } from '@/components/Dropdown';
import { getAttendanceOfTeacher, lineChartDataOfTeacher } from '@/services';
import { unique } from '@/util/tools';

import style from './index.less';

@connect(({ info }) => info)
class Attendance extends PureComponent {
  state = {
    lineData: [],
    pieData: [],
    course: [],
    allClass: [],
    selectCourse: '',
  };

  componentDidMount() {
    const { teacher_id } = this.props.info;
    lineChartDataOfTeacher({ teacher_id: 1, course_id: 205, class_id: 1111 }).then(({ data }) => {
      this.setState({ pieData: data });
    });
    getAttendanceOfTeacher({ teacher_id }).then(res => {
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

      const classList = res.data.map(v => {
        return { class_id: v.class_id, class_name: v.class_name };
      });
      this.setState({ course: result, allClass: unique(classList) });
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
    this.setState({ selectCourse: cid });
  };

  onChange = (selected, id) => {
    const { teacher_id } = this.props.info;
    const { selectCourse } = this.state;
    lineChartDataOfTeacher({
      teacher_id,
      course_id: selectCourse,
      class_id: id,
    }).then(({ data }) => {
      this.setState({ pieData: data });
    });
  };

  render() {
    const { pieData, lineData, allClass } = this.state;
    return (
      <div className={style.flex_container}>
        <NavBar mode="dark">考勤情况</NavBar>
        <WingBlank size="lg">
          <div className={style.select_section}>
            <Dropdown title="选择课程" list={this.state.course} resetThenSet={this.resetThenSet} />
            <div className={style.tag_container}>
              {allClass.map(v => {
                const { class_id, class_name } = v;
                return (
                  <Tag key={class_id} onChange={selected => this.onChange(selected, class_id)}>
                    {class_name}
                  </Tag>
                );
              })}
            </div>
          </div>
          <WhiteSpace size="lg" />
          <div className={style.chart}>
            <Flex direction="column">
              <Flex.Item>
                <PieChart height={800} width={900} type="line" data={pieData} />
              </Flex.Item>
              <WhiteSpace size="lg" />
              {/* <Flex.Item>
                <PieChart height={800} width={900} type="bar" data={pieData} />
              </Flex.Item> */}
            </Flex>
          </div>
        </WingBlank>
        <WhiteSpace size="lg" />
      </div>
    );
  }
}

export default Attendance;

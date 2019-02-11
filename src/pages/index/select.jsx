import React, { Component } from 'react';
import Router from 'umi/router';
import { getAttendanceOfTeacher, addAttenInfo } from '@/services';
import {
  List,
  WhiteSpace,
  Button,
  Picker,
  DatePicker,
  Toast,
  Steps,
  InputItem,
  Stepper,
  NavBar,
  Icon,
} from 'antd-mobile';
import { unique, formatDate } from '@/util/tools';
import style from './index.less';

class Select extends Component {
  // 判断一下 以免出现
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      step: 0,
      selectRoom: '',
      selectTime: '',
      selectClass: '',
      duration: 5,
      courseData: [],
      classData: [],
      list: [],
    };
  }

  componentDidMount() {
    this._isMounted = true;
    const { id } = this.props.location.query;
    getAttendanceOfTeacher({ teacher_id: id }).then(res => {
      let data = res.data.map((v, index) => {
        if (v.course_id) {
          return { label: v.course_name, value: v.course_id };
        }
      });
      // 去重
      data = unique(data);
      // picker只有一行的时候要包2层[]
      if (this._isMounted) this.setState({ list: res.data, courseData: [data] });
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  // 选择课程的时候设置课室和班级
  handleCourseChange = async v => {
    const { id } = this.props.location.query;
    this.setState({ selectCourse: v });
    const [course_id] = v;
    let data = [];
    // 修改选了此课程的班级 有时候一个老师会教两个班
    await getAttendanceOfTeacher({ teacher_id: id, course_id }).then(res => {
      data = res.data.map((value, index) => {
        this.setState({ selectRoom: value.classroom_id });
        return { label: value.class_name, value: value.class_id };
      });
    });
    this.setState({ classData: [data] });
  };

  // submit
  handleSubmit = async () => {
    this.setState({ loading: true });
    const { id } = this.props.location.query;
    const { duration, selectClass, selectCourse, selectTime, selectRoom, list } = this.state;
    const classtable = list.filter(v => {
      if (v.course_id == selectCourse[0] && v.class_id == selectClass[0] && v.teacher_id == id)
        return v;
    });
    const [date, time] = formatDate(selectTime).split(' ');
    const params = {
      classtable_id: classtable[0].classtable_id,
      date,
      time,
      alter_classroom_id: selectRoom,
      duration,
    };
    await addAttenInfo(params)
      .then(res => {
        Router.replace('/');
        Toast.success('开启考勤成功，正在跳转...', 0.8);
      })
      .catch(() => {
        Toast.fail('开启考勤失败，请重试', 0.8);
      });
  };

  render() {
    const Item = List.Item;
    const Step = Steps.Step;

    const {
      step,
      selectCourse,
      selectRoom,
      selectTime,
      selectClass,
      courseData,
      classData,
    } = this.state;
    return (
      <div className={style.container}>
        <NavBar mode="dark" icon={<Icon type="left" />} onLeftClick={() => Router.push('/')}>
          开启一条考勤
        </NavBar>
        <div className={style.step}>
          <Steps size="small" direction="horizontal" current={step}>
            <Step title="课程" />
            <Step title="时间" />
            <Step title="班级" />
          </Steps>
        </div>
        <div className={style.main}>
          <List>
            <Picker
              data={courseData}
              title="课程"
              cols={1}
              cascade={false}
              value={selectCourse}
              onChange={this.handleCourseChange}
            >
              <Item arrow="horizontal">课程</Item>
            </Picker>
            <InputItem value={selectRoom} onChange={v => this.setState({ selectRoom: v })}>
              课室
            </InputItem>
            <Picker
              data={classData}
              cols={1}
              cascade={false}
              value={selectClass}
              onChange={v => this.setState({ selectClass: v, step: 2 })}
            >
              <Item arrow="horizontal">班级</Item>
            </Picker>
            <DatePicker
              title="时间"
              mode="datetime"
              format="YYYY-MM-DD HH:mm"
              value={selectTime}
              onChange={v => this.setState({ selectTime: v, step: 1 })}
            >
              <Item arrow="horizontal">时间</Item>
            </DatePicker>
            <Item
              wrap
              extra={
                <Stepper
                  style={{ width: '100%', minWidth: '100px' }}
                  showNumber
                  step={5}
                  max={100}
                  min={5}
                  value={this.state.duration}
                  onChange={v => {
                    this.setState({ duration: v });
                  }}
                />
              }
            >
              考勤时长
            </Item>
            <WhiteSpace />
            <Item>
              <Button type="primary" onClick={this.handleSubmit}>
                提交
              </Button>
            </Item>
          </List>
        </div>
      </div>
    );
  }
}

export default Select;

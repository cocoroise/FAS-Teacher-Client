import React, { PureComponent } from 'react';
import { Flex, WhiteSpace, WingBlank, NavBar, Tag } from 'antd-mobile';
import LineChart from '@/components/Chart/line';
import PieChart from '@/components/Chart/pie';
import { DropdownMultiple } from '@/components/Dropdown';

import style from './index.less';

const data = {};
class Attendance extends PureComponent {
  state = {
    lineData: [],
    pieData: [],
    location: [
      {
        id: 0,
        title: 'New York',
        selected: false,
        key: 'location',
      },
      {
        id: 1,
        title: 'Dublin',
        selected: false,
        key: 'location',
      },
      {
        id: 2,
        title: 'California',
        selected: false,
        key: 'location',
      },
    ],
  };

  componentDidMount() {
    fetch('https://stockholm.zeemu.net/api/fundamentals/trends/SZ002161/AccountsReceivableTurnover')
      .then(res => res.json())
      .then(({ data }) => this.setState({ pieData: data }))
  }

  toggleSelected = (id, key) => {
    const temp = JSON.parse(JSON.stringify(this.state[key]));
    temp[id].selected = !temp[id].selected;
    this.setState({
      [key]: temp,
    });
  };

  onChange = selected => {
    console.log(`tag selected: ${selected}`);
  };

  render() {
    const { pieData, lineData } = this.state;
    return (
      <div className={style.flex_container}>
        <NavBar mode="dark">考勤情况</NavBar>
        <WingBlank size="lg">
          <div className={style.select_section}>
            <DropdownMultiple
              title="选择课程"
              list={this.state.location}
              toggleItem={this.toggleSelected}
              titleHelper="课程"
            />
            <div className={style.tag_container}>
              <Tag data-seed="logId">Basic</Tag>
              <Tag selected>Selected</Tag>
              <Tag onChange={this.onChange}>Callback</Tag>
            </div>
          </div>
          <WhiteSpace size="lg" />
          <div className={style.chart}>
            <Flex direction="column">
              <Flex.Item>
                <PieChart height={800} width={900} type="line" data={pieData} />
              </Flex.Item>
              <WhiteSpace size="lg" />
              <Flex.Item>
                <PieChart height={800} width={900} type="bar" data={pieData} />
              </Flex.Item>
            </Flex>
          </div>
        </WingBlank>
        <WhiteSpace size="lg" />
      </div>
    );
  }
}

export default Attendance;

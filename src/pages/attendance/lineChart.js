import React, { Component } from 'react';
import ReactEcharts from '@/components/Chart';
import echarts from 'echarts';

export default class LineChart extends Component {
  onChartReady = chart => {
    chart.hideLoading();
  };

  getSeries = () => {
    const { list } = this.props;
    const colors = ['#ea168e', '#6d3580', '#eeee'];
    return list.map((v, index) => {
      if (index === 0) v.symbol ='rect'
      v.itemStyle = { color: colors[index] };
      v.symbolSize = 30;
      return v;
    });
  };

  getOption = () => ({
    title: {
      text: '学生考勤记录',
      textStyle: {
        fontSize: 40,
      },
    },
    tooltip: {
      trigger: 'axis',
      textStyle: {
        fontSize: 40,
      },
    },
    legend: {
      top: '5%',
      textStyle: {
        fontSize: 40,
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '5%',
      top: '15%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: true,
        data: this.props.axis,
        // x轴的字体样式
        axisLabel: {
          show: true,
          textStyle: {
            color: '#40514e',
            fontSize: '30',
          },
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        // y轴的字体样式
        axisLabel: {
          show: true,
          textStyle: {
            color: '#40514e',
            fontSize: '30',
          },
          formatter: value => `${value}%`,
        },
      },
    ],
    dataZoom: [
      {
        // 这个dataZoom组件，默认控制x轴。
        type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
        start: 0, // 左边在 0% 的位置。
        end: 60, // 右边在 80% 的位置。
      },
    ],
    series: this.getSeries(),
    backgroundColor: {
      type: 'linear',
      x: 0.5,
      y: 0.5,
      x2: 0.7,
      y2: 1,
      colorStops: [
        {
          offset: 0,
          color: '#fff1eb', // 0% 处的颜色
        },
        {
          offset: 1,
          color: '#c3cfe2', // 100% 处的颜色
        },
      ],
      global: false, // 缺省为 false
    },
  });

  render() {
    return (
      <ReactEcharts
        option={this.getOption()}
        onChartReady={this.onChartReady}
        style={{ height: '700px', width: '100%' }}
        className="react_for_echarts"
      />
    );
  }
}

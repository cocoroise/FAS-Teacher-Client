import React, { Component } from 'react';
import PropTypes from 'prop-types';
import F2 from '@antv/f2';

export default class extends Component {
  static propTypes = {
    creator: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  };

  id = `c${Math.random()
    .toString(36)
    .substring(7)}`;

  chart = null;

  componentDidMount() {
    this.init();
  }

  componentWillReceiveProps(next) {
    if (next.data !== this.props.data) {
      this.chart.changeData(next.data.source);
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    this.chart.destroy();
    this.chart = null;
  }

  init = () => {
    const { width, height, creator, data } = this.props;
    const chart = new F2.Chart({
      id: this.id,
      width,
      height,
      pixelRatio: window.devicePixelRatio,
    });
    creator(chart, data);
    this.chart = chart;
  };

  render() {
    return <canvas id={this.id}/>;
  }
}

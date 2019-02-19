/**
 * 封装的echart组件
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'fast-deep-equal';
import { bind, clear } from 'size-sensor';
import { pick } from '@/util/tools';

export default class EchartsReactCore extends Component {
  constructor(props) {
    super(props);
    this.echartsLib = props.echarts;
    this.echartsElement = null;
  }

  // first add
  componentDidMount() {
    this.rerender();
  }

  // update
  componentDidUpdate(prevProps) {
    // theme opts onEvents修改时需要dispose再新建
    if (!isEqual(prevProps.them, this.props.theme) ||
      !isEqual(prevProps.opts, this.props.opts) ||
      !isEqual(prevProps.onEvents, this.props.onEvents)) {
      this.dispose();
      this.rerender();
      return;
    }
    // 当这些属性保持不变的时候，不 setOption
    const pickKeys = ['option', 'notMerge', 'lazyUpdate', 'showLoading', 'loadingOption'];
    if (isEqual(pick(this.props, pickKeys), pick(prevProps, pickKeys))) {
      return;
    }

    // 判断是否需要 setOption，由开发者自己来确定。默认为 true
    if (typeof this.props.shouldSetOption === 'function' && !this.props.shouldSetOption(prevProps, this.props)) {
      return;
    }

    const echartObj = this.renderEchartDom();
    if (!isEqual(prevProps.style, this.props.style) || !isEqual(prevProps.className, this.props.className)) {
      try {
        echartObj.resize();
      } catch (e) {
        console.warn(e)
      }
    }
  }

  // remove
  componentWillUnmount() {
    this.dispose();
  }

  //return the echart object
  getEchartsInstance = () => this.echartsLib.getInstanceByDom(this.echartsElement) ||
    this.echartsLib.init(this.echartsElement, this.props.theme, this.props.opts)

  // dispose echarts and clear size-sensor
  dispose = () => {
    if (this.echartsElement) {
      try {
        clear(this.echartsElement)
      } catch (e) {
        console.warn(e);
      }
      this.echartsLib.dispose(this.echartsElement)
    }
  }

  rerender = () => {
    const { onEvents, onChartReady } = this.props;
    const echartObj = this.renderEchartDom();
    this.bindEvents(echartObj, onEvents || {});

    // on chart ready
    if (typeof onChartReady === 'function') this.props.onChartReady(echartObj);
    // on resize
    if (this.echartsElement) {
      bind(this.echartsElement, () => {
        try {
          echartObj.resize();
        } catch (e) {
          console.warn(e);
        }
      })
    }
  }

  // bind the events
  bindEvents = (instance, events) => {
    const _bindEvents = (eventName, func)=>{
      if (typeof eventName === 'string' && typeof func === 'function') {
        // binding event
        // instance.off(eventName); // 已经 dispose 在重建，所以无需 off 操作
        instance.on(eventName, (param) => {
          func(param, instance);
        });
      }
    }
    // loop and bind
    for (const eventName in events) {
      if (Object.prototype.hasOwnProperty.call(events, eventName)) {
        _bindEvents(eventName, events[eventName]);
      }
    }
  }

  // render the dom
  renderEchartDom = () => {
    const echartObj = this.getEchartsInstance();
    echartObj.setOption(this.props.option, this.props.notMerge || false, this.props.lazyUpdate || false);
    // set loading mask
    if (this.props.showLoading) echartObj.showLoading(this.props.loadingOption || null)
    else echartObj.hideLoading();
    return echartObj;
  }

  render() {
    const { style, className } = this.props;
    const newStyle = {
      height: 300,
      ...style,
    };
    return (
      <div
        ref={el => { this.echartsElement = el }}
        style={newStyle}
        className={`echarts-for-react ${className}`}
      />
    )
  }
}
EchartsReactCore.propTypes = {
  option: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  echarts: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  notMerge: PropTypes.bool,
  lazyUpdate: PropTypes.bool,
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  className: PropTypes.string,
  theme: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  onChartReady: PropTypes.func,
  showLoading: PropTypes.bool,
  loadingOption: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  onEvents: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  opts: PropTypes.shape({
    devicePixelRatio: PropTypes.number,
    renderer: PropTypes.oneOf(['canvas', 'svg']),
    width: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.oneOf([null, undefined, 'auto'])
    ]),
    height: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.oneOf([null, undefined, 'auto'])
    ]),
  }),
  shouldSetOption: PropTypes.func,
};

EchartsReactCore.defaultProps = {
  echarts: {},
  notMerge: false,
  lazyUpdate: false,
  style: {},
  className: '',
  theme: null,
  onChartReady: () => {},
  showLoading: false,
  loadingOption: null,
  onEvents: {},
  opts: {},
  shouldSetOption: () => true,
};

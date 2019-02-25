import React, { PureComponent } from 'react';
import MenuBar from '@/components/MenuBar';
import NProgress from 'nprogress';
import withRouter from 'umi/withRouter';
import { connect } from 'dva';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import '@/layouts/nprogress.less';
import './index.css'

NProgress.configure({ showSpinner: false });

// 底部有bar菜单
const BarRoutes = ['/', '/info', '/attendance'];
let currHref = '';

class BasicLayout extends PureComponent {
  render() {
    const { children, location, loading } = this.props;
    const { href } = window.location; // 浏览器地址栏中地址
    if (currHref !== href) {
      // currHref 和 href 不一致时说明进行了页面跳转
      NProgress.start(); // 页面开始加载时调用 start 方法
      if (!loading.global) {
        // loading.global 为 false 时表示加载完毕
        NProgress.done(); // 页面请求完毕时调用 done 方法
        currHref = href; // 将新页面的 href 值赋值给 currHref
      }
    }

    if (BarRoutes.indexOf(location.pathname) < 0) {
      return <div>{children}</div>;
    }

    return (
      <div style={{ overflowX: 'hidden' }}>
        <TransitionGroup>
          <CSSTransition key={location.pathname} classNames='move' timeout={300}>
            <MenuBar pathname={location.pathname}>{children}</MenuBar>
          </CSSTransition>
        </TransitionGroup>
      </div>
    );
  }
}

export default withRouter(connect(({ app, loading }) => ({ app, loading }))(BasicLayout));

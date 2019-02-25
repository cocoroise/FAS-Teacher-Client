import React, { PureComponent } from 'react';
import Router from 'umi/router';
import withRouter from 'umi/withRouter';
import { connect } from 'dva';
import BizIcon from '@/components/BizIcon';
import { Toast, NoticeBar } from 'antd-mobile';
import Bg from '@/components/mainBg';
import { getDate, timeDiff } from '@/util/tools';

import styles from './index.less';

const mapDispatchToProps = dispatch => ({
  updateAtten: data => {
    dispatch({ type: 'attendance/updateAtten', payload: data });
  },
  delStorage: () => {
    dispatch({ type: 'attendance/delStorage' });
  },
});
@connect(
  state => ({
    info: state.info.info,
    attendance: state.attendance,
  }),
  mapDispatchToProps
)
class Index extends PureComponent {
  state = {
    isOpen: false,
  };

  componentDidMount() {
    this.checkOpen();
  }

  // 检查考勤的状态 开启还是关闭
  checkOpen = () => {
    const { attendance, delStorage } = this.props;
    if (attendance.time) {
      const { time, duration } = attendance;
      const isOpen = !(Math.abs(Number(timeDiff(time, getDate('H:Mi:S'))) >= duration));
      console.log('time diff',timeDiff(time, getDate('H:Mi:S')))
      if (!isOpen) {
        delStorage();
      }
      this.setState({ isOpen });
    }
  };

  handleClick = () => {
    const {
      info: { teacher_id },
    } = this.props;
    const { isOpen } = this.state;
    if (!isOpen) {
      Router.push(`/select?id=${teacher_id}`);
    } else {
      this.handelEarlyClose();
    }
  };

  // 提前结束考勤
  handelEarlyClose = async () => {
    const {
      attendance: { attendance_id, time },
      updateAtten,
      delStorage,
    } = this.props;
    const nowTime = getDate('H:Mi:S');
    const dur = Math.abs(Number(timeDiff(time, nowTime)));
    delStorage();
    this.setState({isOpen:false});
    await updateAtten({ attendance_id, duration: dur });
  };

  render() {
    const {
      attendance: { attendance_id },
    } = this.props;
    return (
      <div className={styles.container}>
        <Bg />
        <div className={styles.main}>
          <div className={styles.circle} onClick={this.handleClick}>
            <div className={styles.open}>
              <div>
                <BizIcon type="quanping" />
              </div>
              {this.state.isOpen && <span>结束考勤</span>}
              {!this.state.isOpen && <span>开启考勤</span>}
            </div>
          </div>
        </div>
        {this.state.isOpen && (
          <NoticeBar mode="link" onClick={() => Router.push(`/index/detail?id=${attendance_id}`)}>
            您当前有场考勤正在进行，进去看看
          </NoticeBar>
        )}
      </div>
    );
  }
}

export default withRouter(Index);

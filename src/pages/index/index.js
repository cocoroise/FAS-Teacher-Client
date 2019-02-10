import React, { PureComponent } from 'react';
import Router from 'umi/router';
import withRouter from 'umi/withRouter';
import { connect } from 'dva';
import styles from './index.less';

@connect(({ info }) => info)
class Index extends PureComponent {
  handleClick = () => {
    const { info } = this.props;
    Router.push(`/select?id=${info.teacher_id}`);
  };

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.circle} onClick={this.handleClick}>
            <span>开启考勤</span>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Index);

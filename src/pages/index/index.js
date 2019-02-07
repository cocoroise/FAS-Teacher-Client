import React, { PureComponent } from 'react';
import Router from 'umi/router';
import styles from './index.less';

class Index extends PureComponent {
  handleClick = () => {
    Router.push('/select');
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

export default Index;

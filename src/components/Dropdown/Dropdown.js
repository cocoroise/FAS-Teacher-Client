import React, { Component } from 'react';
import BizIcon from '@/components/BizIcon';
import style from './index.less';

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOpen: false,
      headerTitle: this.props.title,
    };
    this.close = this.close.bind(this);
  }

  componentDidUpdate() {
    const { listOpen } = this.state;
    setTimeout(() => {
      if (listOpen) {
        window.addEventListener('touch', this.close);
      } else {
        window.removeEventListener('touch', this.close);
      }
    }, 0);
  }

  componentWillUnmount() {
    window.removeEventListener('touch', this.close);
  }

  close(timeOut) {
    this.setState({
      listOpen: false,
    });
  }

  selectItem(title, id, stateKey,cid) {
    this.setState(
      {
        headerTitle: title,
        listOpen: false,
      },
      // id是自然数从0开始的，cid是主键
      this.props.resetThenSet(id, stateKey,cid)
    );
  }

  toggleList() {
    this.setState(prevState => ({
      listOpen: !prevState.listOpen,
    }));
  }

  render() {
    const { list } = this.props;
    const { listOpen, headerTitle } = this.state;
    return (
      <div className={style.dd_wrapper}>
        <div className={style.dd_header} onClick={() => this.toggleList()}>
          <div className={style.dd_header_title}>
            {headerTitle}
            {listOpen ? <BizIcon type="icon_arrow_up" /> : <BizIcon type="icon_arrow_down" />}
          </div>
        </div>
        {listOpen && (
          <ul className={style.dd_list} onClick={e => e.stopPropagation()}>
            {list.map(item => (
              <li
                className={style.dd_list_item}
                key={item.id}
                onClick={() => this.selectItem(item.title, item.id, item.key,item.cid)}
              >
                {item.title} {item.selected && <BizIcon type="dingzhi" />}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default Dropdown;

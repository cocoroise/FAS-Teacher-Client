import React, { Component } from 'react';
import BizIcon from '@/components/BizIcon';
import style from './index.less';

class DropdownMultiple extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOpen: false,
      headerTitle: this.props.title,
      timeOut: null,
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

  static getDerivedStateFromProps(nextProps) {
    const count = nextProps.list.filter(a => a.selected).length;
    if (count === 0) {
      return { headerTitle: nextProps.title };
    }
    if (count >= 1) {
      return { headerTitle: `已选 ${count} ${nextProps.titleHelper}` };
    }
    return 'default title';
  }

  close(timeOut) {
    this.setState({
      listOpen: false,
    });
  }

  toggleList() {
    this.setState(prevState => ({
      listOpen: !prevState.listOpen,
    }));
  }

  render() {
    const { list, toggleItem } = this.props;
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
                key={item.title}
                onClick={() => toggleItem(item.id, item.key)}
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

export default DropdownMultiple;

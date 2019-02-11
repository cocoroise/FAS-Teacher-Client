import React, { Component } from 'react';
import BizIcon from '@/components/BizIcon';
import './index.less';

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

  selectItem(title, id, stateKey) {
    this.setState(
      {
        headerTitle: title,
        listOpen: false,
      },
      this.props.resetThenSet(id, stateKey)
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
      <div className="dd-wrapper">
        <div className="dd-header" onClick={() => this.toggleList()}>
          <div className="dd-header-title">
            {headerTitle}
            {listOpen ? <BizIcon type="icon_arrow_up" /> : <BizIcon type="icon_arrow_down" />}
          </div>
        </div>
        {listOpen && (
          <ul className="dd-list" onClick={e => e.stopPropagation()}>
            {list.map(item => (
              <li
                className="dd-list-item"
                key={item.id}
                onClick={() => this.selectItem(item.title, item.id, item.key)}
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

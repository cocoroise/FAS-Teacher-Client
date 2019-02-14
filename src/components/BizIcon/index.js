import React from 'react';

const BizIcon = props => {
  const { type, color } = props;
  return <i className={`iconfont icon-${type}`} style={{ color }} />;
};
export default BizIcon;

import * as React from 'react';

const Icon = ({type, ...rest}) => {
  const icons = require(`@ant-design/icons`);
  const Component = icons[type];
  return <Component {...rest}/>
}
export default Icon;

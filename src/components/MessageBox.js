import React from 'react';

export default function MessageBox(props) {
  return (
    <span className={props.classcolor}>{props.children}</span>
  );
}

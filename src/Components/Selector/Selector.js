import React from 'react';
import './Selector.css';

const Selector = (props) => {
  return (
    <div className={`selector ${props.ticked ? 'selected' : ''} `}>
      <label htmlFor={props.group}>{`${props.group.slice(0, -7)} / ${
        props.kana
      } group`}</label>
      <input
        onChange={() => props.check(props.group)}
        type="checkbox"
        id={props.group}
        checked={props.ticked}
      />
    </div>
  );
};

export default Selector;

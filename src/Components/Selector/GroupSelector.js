import React from 'react';

import './GroupSelector.css';

const GroupSelector = (props) => {
  return (
    <div
      className={`card ${props.selected ? 'selected' : ''}`}
      onClick={props.select}
      selected={props.selected}
    >
      <p>{props.selected ? props.groupNameRomaji : props.groupNameKana}</p>
    </div>
  );
};

export default GroupSelector;

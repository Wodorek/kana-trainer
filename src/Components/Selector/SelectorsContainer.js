import React from 'react';

import GroupSelector from './GroupSelector';
import './SelectorsContainer.css';

const SelectorsContainer = (props) => {
  //consider iterating over items with lodash functions

  const itemsIterable = Object.keys(props.items);

  const mappable = new Map(Object.values(props.items));

  console.log(mappable);

  return (
    <div className="selectorsContainer">
      <h1>{props.groupName}</h1>
      <div className="selectorElements">
        {itemsIterable.map((group) => {
          return (
            <GroupSelector
              key={group}
              groupNameKana={Object.keys(props.items[group].characters)[0]}
              groupNameRomaji={Object.values(group).slice(0, -7)}
              select={() => props.checkOne(props.groupName, group)}
              selected={props.items[group].selected}
            />
          );
        })}
      </div>
      <div className="scButtons">
        <button onClick={() => props.bundleSelect(props.groupName, true)}>
          Check All
        </button>
        <button onClick={() => props.bundleSelect(props.groupName, false)}>
          Uncheck All
        </button>
      </div>
    </div>
  );
};

export default SelectorsContainer;

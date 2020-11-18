import React from 'react';
import Selector from './Selector';

import './SelectorGroup.css';

const SelectorGroup = (props) => {
  //pass the state to the parent

  const forItemsIteration = Object.keys(props.items);

  return (
    <div className="selectorGroup">
      <h1>{props.groupName}</h1>
      <div className="selectorElements">
        {forItemsIteration.map((group) => {
          return (
            <Selector
              check={() => props.checkOne(props.groupName, group)}
              ticked={props.items[group].checked}
              kana={Object.keys(props.items[group].characters)[0]}
              key={group}
              group={group}
            />
          );
        })}
      </div>
      <div className="sgButtons">
        <button onClick={() => props.checkAll(props.groupName)}>
          Check All
        </button>
        <button onClick={() => props.uncheckAll(props.groupName)}>
          Uncheck All
        </button>
      </div>
    </div>
  );
};

export default SelectorGroup;

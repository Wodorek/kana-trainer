import React, { useEffect, useState } from 'react';
import Selector from './Selector';

const SelectorGroup = (props) => {
  //pass the state to the parent

  const forItemsIteration = Object.keys(props.items);

  return (
    <div>
      <h1>{props.groupName}</h1>
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
      <button onClick={props.checkAll}>check</button>
      <button onClick={() => props.uncheckAll(props.groupName)}>uncheck</button>
    </div>
  );
};

export default SelectorGroup;

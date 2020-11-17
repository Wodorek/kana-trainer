import React from 'react';

import { dictionary } from '../../InternalData/dictionary';
import SelectorGroup from './SelectorGroup';

import './GroupsContainer.css';

const GroupsContainer = () => {
  const groups = Object.entries(dictionary);

  const logAll = () => {
    console.log(groups);
  };

  return (
    <div className="groupsContainer">
      {groups.map((e) => {
        return <SelectorGroup key={e[0]} groupName={e[0]} items={e[1]} />;
      })}
      <button onClick={logAll}>RENDER</button>
    </div>
  );
};

export default GroupsContainer;

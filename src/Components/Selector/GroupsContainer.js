import React, { useEffect, useState } from 'react';
import { after, cloneDeep } from 'lodash';

import { dictionary } from '../../InternalData/dictionary';
import SelectorGroup from './SelectorGroup';

import './GroupsContainer.css';

const GroupsContainer = () => {
  const [groups, setGroups] = useState();

  console.log(groups);

  useEffect(() => {
    for (let [key] of Object.entries(dictionary)) {
      for (let [, values] of Object.entries(dictionary[key])) {
        values.checked = false;
      }
    }
    setGroups(dictionary);
  }, []);

  const checkAllHandler = () => {};

  const uncheckAllHandler = (kanaType) => {
    const allUnchecked = Object(groups[kanaType]);
  };

  const checkHandler = (kanaType, group) => {
    const afterSelection = cloneDeep(groups);
    afterSelection[kanaType][group].checked = !afterSelection[kanaType][group]
      .checked;
    setGroups(afterSelection);
  };

  const showSelectedHandler = () => {
    const selected = [];
    for (let kana in groups) {
      for (let group in groups[kana]) {
        if (groups[kana][group].checked === true) {
          selected.push(group);
        }
      }
    }
    console.log(selected);
  };

  let content;

  if (!groups) {
    content = <p>Loading</p>;
  } else {
    content = (
      <>
        <div className="groupsContainer">
          {Object.keys(groups).map((e) => {
            return (
              <SelectorGroup
                checkOne={checkHandler}
                checkAll={checkAllHandler}
                uncheckAll={uncheckAllHandler}
                key={e}
                groupName={e}
                items={groups[e]}
              />
            );
          })}
        </div>
        <button onClick={showSelectedHandler}>Show</button>
      </>
    );
  }

  return content;
};

export default GroupsContainer;

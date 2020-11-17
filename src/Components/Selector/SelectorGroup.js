import React, { useEffect, useState } from 'react';
import Selector from './Selector';

const SelectorGroup = (props) => {
  //pass the state to the parent

  const { items } = props;

  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const groups = Object.keys(items).map((el) => {
      return { name: el, checked: false };
    });
    setGroups([...groups]);
  }, [items]);

  const checkOneHandler = (id) => {
    const newGroups = groups.map((group) => {
      if (group.name === id) {
        group.checked = !group.checked;
        return group;
      }
      return group;
    });
    setGroups(newGroups);
  };

  const checkAllHandler = () => {
    const newGroups = groups.map((group) => {
      group.checked = true;
      return group;
    });
    setGroups(newGroups);
  };

  const uncheckAllHandler = () => {
    const newGroups = groups.map((group) => {
      group.checked = false;
      return group;
    });
    setGroups(newGroups);
  };

  return (
    <div>
      <h1>{props.groupName}</h1>
      {groups.map((group) => {
        return (
          <Selector
            check={checkOneHandler}
            ticked={group.checked}
            kana={Object.keys(items[group.name])[0]}
            key={group.name}
            group={group.name}
          />
        );
      })}
      <button onClick={checkAllHandler}>Check All</button>
      <button onClick={uncheckAllHandler}>Uncheck All</button>
    </div>
  );
};

export default SelectorGroup;

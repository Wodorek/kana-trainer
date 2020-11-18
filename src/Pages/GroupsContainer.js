import React, { useContext, useEffect, useState } from 'react';
import { cloneDeep } from 'lodash';

import { dictionary } from '../InternalData/dictionary';
import SelectorGroup from '../Components/Selector/SelectorGroup';

import './GroupsContainer.css';
import { useHistory } from 'react-router-dom';
import QuizContext from '../shared/context/quiz-context';

const GroupsContainer = () => {
  const { setQuizOn } = useContext(QuizContext);

  const [groups, setGroups] = useState();

  const history = useHistory();

  // const [selectedGroup, setSelectedGroup] = useState([]);

  useEffect(() => {
    for (let [key] of Object.entries(dictionary)) {
      for (let [, values] of Object.entries(dictionary[key])) {
        values.checked = false;
      }
    }
    setGroups(dictionary);
  }, []);

  const checkAllHandler = (kanaType) => {
    const checkedAll = cloneDeep(groups);
    Object.keys(checkedAll[kanaType]).map((group) => {
      return (checkedAll[kanaType][group].checked = true);
    });

    setGroups(checkedAll);
  };

  const uncheckAllHandler = (kanaType) => {
    const uncheckedAll = cloneDeep(groups);
    Object.keys(uncheckedAll[kanaType]).map((group) => {
      return (uncheckedAll[kanaType][group].checked = false);
    });

    setGroups(uncheckedAll);
  };

  const checkHandler = (kanaType, group) => {
    const afterSelection = cloneDeep(groups);
    afterSelection[kanaType][group].checked = !afterSelection[kanaType][group]
      .checked;
    setGroups(afterSelection);
  };

  const quizStartHandler = () => {
    setQuizOn(true);
    history.push('/quiz');
  };

  //testing purposes only, remove it later
  // const showSelectedHandler = () => {
  //   const selected = [];
  //   for (let kana in groups) {
  //     for (let group in groups[kana]) {
  //       if (groups[kana][group].checked === true) {
  //         selected.push(group);
  //       }
  //     }
  //   }
  //   setSelectedGroup([...selected]);
  // };

  let content;

  if (!groups) {
    content = <p>お待ち下さい</p>;
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
        <button onClick={quizStartHandler}>Start</button>
      </>
    );
  }

  return content;
};

export default GroupsContainer;

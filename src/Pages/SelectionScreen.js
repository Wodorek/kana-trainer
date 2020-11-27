import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { cloneDeep } from 'lodash';

import QuizContext from '../shared/context/quiz-context';

import { dictionary } from '../InternalData/dictionary';
import SelectorsContainer from '../Components/Selector/SelectorsContainer';
import './SelectionScreen.css';

const SelectionScreen = () => {
  const { setQuizOn } = useContext(QuizContext);

  const [groups, setGroups] = useState();

  const history = useHistory();

  // const [selectedGroups, setSelectedGroups] = useState([]);

  useEffect(() => {
    for (let [key] of Object.entries(dictionary)) {
      for (let [, values] of Object.entries(dictionary[key])) {
        values.selected = false;
      }
    }
    setGroups(dictionary);
  }, []);

  const bundleSelectHandler = (kanaType, setSelected) => {
    const allGroups = cloneDeep(groups);
    Object.keys(allGroups[kanaType]).map((group) => {
      return (allGroups[kanaType][group].selected = setSelected);
    });

    setGroups(allGroups);
  };

  const checkHandler = (kanaType, group) => {
    const afterSelection = cloneDeep(groups);
    afterSelection[kanaType][group].selected = !afterSelection[kanaType][group]
      .selected;
    setGroups(afterSelection);
  };

  const quizStartHandler = () => {
    //todo: add a check if atleast one group is selected to continue

    setQuizOn(true);
    history.push('/quiz');
  };

  //testing purposes only, remove it later
  // const showSelectedHandler = () => {
  //   const selected = [];
  //   for (let kana in groups) {
  //     for (let group in groups[kana]) {
  //       if (groups[kana][group].selected === true) {
  //         selected.push(group);
  //       }
  //     }
  //   }
  //   setSelectedGroup([...selected]);
  // };

  let content;

  if (!groups) {
    content = <p className="loadingMessage">お待ち下さい</p>;
  } else {
    content = (
      <>
        <div className="selectionScreen">
          {Object.keys(groups).map((kanaType) => {
            return (
              <SelectorsContainer
                checkOne={checkHandler}
                bundleSelect={bundleSelectHandler}
                key={kanaType}
                groupName={kanaType}
                items={groups[kanaType]}
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

export default SelectionScreen;

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { dictionary } from '../InternalData/dictionary';
import SelectorsContainer from '../Components/Selector/SelectorsContainer';
import { useStore } from '../shared/context/store';
import './SelectionScreen.css';

const SelectionScreen = () => {
  const [groups, setGroups] = useState();

  const { state, dispatch } = useStore();

  const history = useHistory();

  useEffect(() => {
    setGroups(dictionary);
  }, []);

  const quizStartHandler = () => {
    //todo: add a check if atleast one group is selected to continue

    console.log(state);

    // history.push('/quiz');
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

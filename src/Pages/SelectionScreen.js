import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

import { dictionary } from '../InternalData/dictionary';
import SelectorsContainer from '../Components/Selector/SelectorsContainer';
import { useStore } from '../shared/context/store';

const load = keyframes`
  0% {
    width: 0
  }
  100%
  {
    width: 100%
  }
`;

const StyledMessage = styled.p`
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  font-size: 6rem;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
  -webkit-text-fill-color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  &::before {
    content: '少々お待ち下さい';
    position: absolute;
    -webkit-text-fill-color: black;
    top: 0;
    left: 0;
    width: 100%;
    color: blue;
    overflow: hidden;
    animation: ${load} 2s linear infinite;
  }
`;

const StyledScreen = styled.div`
  display: flex;
  column-count: 2;
  justify-content: space-around;
`;

const SelectionScreen = () => {
  const [groups, setGroups] = useState();

  const { dispatch } = useStore();

  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      setGroups(dictionary);
    }, 100);
  }, []);

  const quizStartHandler = () => {
    dispatch({ type: 'startQuiz' });
    history.push('/quiz');
  };

  let content;

  if (!groups) {
    content = <StyledMessage>少々お待ち下さい</StyledMessage>;
  } else {
    content = (
      <>
        <StyledScreen>
          {Object.keys(groups).map((kanaType) => {
            return (
              <SelectorsContainer
                key={kanaType}
                groupName={kanaType}
                items={groups[kanaType]}
              />
            );
          })}
        </StyledScreen>
        <button onClick={quizStartHandler}>Start</button>
      </>
    );
  }

  return content;
};

export default SelectionScreen;

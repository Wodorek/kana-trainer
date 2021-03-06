import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { QuestionCircle } from '@styled-icons/fa-solid/QuestionCircle';
import { useDispatch, useSelector } from 'react-redux';

import { quizStart } from './selectionSlice';
import {
  setHeading,
  setMessage,
  displayModal,
  closeModal,
  resetModal,
} from '../Modal/modalSlice';
import { dictionary } from '../../common/dictionary';
import SelectorsContainer from './SelectorsContainer';
import Button from '../../common/UIElements/Button';
import Modal from '../Modal/Modal';
import MobileFooter from '../../common/UIElements/MobileFooter';

const load = keyframes`
  0% {
    width: 0
  }
  100%
  {
    width: 100%
  }
`;

const StyledIcon = styled(QuestionCircle)`
  display: block;
  margin: 15px 15px 0 auto;
  height: 3rem;
  width: auto;
  color: ${(props) => props.theme.primary};
  :hover {
    cursor: pointer;
    transition: 0.5s;
    transform: scale(1.2);
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
  @media (max-width: 521px) {
    flex-direction: column;
    width: 100%;
    justify-content: center;
  }
`;

const StartButtonContainer = styled.div`
  justify-content: center;
  display: flex;
  margin-top: 1rem;
  padding-bottom: 2rem;
`;

const SelectionScreen = (props) => {
  const [groups, setGroups] = useState();

  const history = useHistory();

  const dispatch = useDispatch();

  const showModal = useSelector((state) => state.modal.display);

  const selectedGroups = useSelector((state) => state.selection.selectedGroups);

  const mql = window.matchMedia('(max-width: 412px)');

  const mobileView = mql.matches;

  useEffect(() => {
    setGroups(dictionary);
  }, []);

  const quizStartHandler = () => {
    if (selectedGroups.length === 0) {
      dispatch(setHeading('No groups selected!'));
      dispatch(
        setMessage(
          'No groups were selected for the quiz. Select some by clicking on the cards, and then press "start" to continue with the quiz.'
        )
      );
      dispatch(displayModal());
    } else {
      dispatch(quizStart());
      history.push('/quiz');
    }
  };

  const closeModalHandler = () => {
    dispatch(closeModal());
    dispatch(resetModal());
  };

  const helpMessageHandler = () => {
    dispatch(setHeading('How does this work?'));
    dispatch(
      setMessage(
        "Select groups of Hiragana or Katakana (or both!) that you want to quiz yourself on, and press start. You will see a shuffled grid of all syllables from selected groups. Type in Romaji for each syllable, and press enter to submit.\n Be careful, you'll get only one chance to input an answer into a box in each card! After all cards are completed you will see how well you've done overall. "
      )
    );
    dispatch(displayModal());
  };

  let content;
  let startDiv;

  if (mobileView) {
    startDiv = <MobileFooter onClick={quizStartHandler} />;
  } else {
    startDiv = (
      <StartButtonContainer>
        <Button start onClick={quizStartHandler}>
          Start
        </Button>
      </StartButtonContainer>
    );
  }

  if (!groups) {
    content = <StyledMessage>少々お待ち下さい</StyledMessage>;
  } else {
    content = (
      <>
        <Modal display={showModal} dismiss={closeModalHandler} />
        <StyledIcon onClick={helpMessageHandler} />
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
      </>
    );
  }

  return (
    <>
      {content}
      {startDiv}
    </>
  );
};

export default SelectionScreen;

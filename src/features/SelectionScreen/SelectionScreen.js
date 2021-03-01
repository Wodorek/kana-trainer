import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { QuestionCircle } from '@styled-icons/fa-solid/QuestionCircle';

import { dictionary } from '../../common/dictionary';
import SelectorsContainer from './SelectorsContainer';
import HelpMessageBox from './HelpMessageBox';
import Button from '../../common/UIElements/Button';
import { connect } from 'react-redux';
import Modal from '../Modal/Modal';

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
  right: 3%;
  top: 3%;
  position: absolute;
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

  const { onQuizStart } = props;

  useEffect(() => {
    setGroups(dictionary);
  }, []);

  const quizStartHandler = () => {
    if (props.selectedGroups.length === 0) {
      props.onModalShow();
    } else {
      onQuizStart();
      history.push('/quiz');
    }
  };

  const closeModalHandler = () => {
    props.onModalClose();
    props.onModalReset();
  };

  const modalHandler = () => {
    props.onSetHeading('How does this work?');
    props.onSetMessage(
      "Select groups of Hiragana or Katakana (or both!) that you want to quiz yourself on, and press start. You will see a shuffled grid of all syllables from selected groups. Type in Romaji for each syllable, and press enter to submit.\n Be careful, you'll get only one chance to input an answer into a box in each card! After all cards are completed you will see how well you've done overall. "
    );
    props.onModalShow();
  };

  let content;

  if (!groups) {
    content = <StyledMessage>少々お待ち下さい</StyledMessage>;
  } else {
    content = (
      <>
        <Modal display={props.showModal} dismiss={closeModalHandler} />
        <StyledScreen>
          <StyledIcon onClick={modalHandler} />
          {/* <HelpMessageBox /> */}
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
        <StartButtonContainer>
          <Button start onClick={quizStartHandler}>
            Start
          </Button>
        </StartButtonContainer>
      </>
    );
  }

  return content;
};

const mapStateToProps = (state) => {
  return {
    showModal: state.modal.show,
    selectedGroups: state.selection.selectedGroups,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onQuizStart: () => dispatch({ type: 'selection/quizStart' }),
    onSetHeading: (payload) => {
      dispatch({ type: 'modal/setHeading', payload: payload });
    },
    onSetMessage: (payload) => {
      dispatch({ type: 'modal/setMessage', payload: payload });
    },
    onModalShow: () => {
      dispatch({ type: 'modal/show' });
    },
    onModalClose: () => {
      dispatch({ type: 'modal/close' });
    },
    onModalReset: () => {
      dispatch({ type: 'modal/reset' });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectionScreen);

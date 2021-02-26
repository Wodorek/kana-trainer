import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

import { dictionary } from '../../common/dictionary';
import SelectorsContainer from './SelectorsContainer';
import HelpMessageBox from './HelpMessageBox';
import Button from '../../common/UIElements/Button';
import { connect } from 'react-redux';

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

const SelectionScreen = (props) => {
  const [groups, setGroups] = useState();

  const history = useHistory();

  const { onQuizStart } = props;

  useEffect(() => {
    setGroups(dictionary);
  }, []);

  const quizStartHandler = () => {
    onQuizStart();

    history.push('/quiz');
  };

  let content;

  if (!groups) {
    content = <StyledMessage>少々お待ち下さい</StyledMessage>;
  } else {
    content = (
      <>
        <StyledScreen>
          <HelpMessageBox />
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
        <div
          style={{
            justifyContent: 'center',
            display: 'flex',
            marginTop: '1rem',
            paddingBottom: '2rem',
          }}
        >
          <Button start onClick={quizStartHandler}>
            Start
          </Button>
        </div>
      </>
    );
  }

  return content;
};

const mapDispatchToProps = (dispatch) => {
  return {
    onQuizStart: () => dispatch({ type: 'selection/quizStart' }),
  };
};

export default connect(null, mapDispatchToProps)(SelectionScreen);

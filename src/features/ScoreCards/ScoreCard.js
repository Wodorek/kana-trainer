import React from 'react';
import styled from 'styled-components';
import theme from '../../common/Themes/theme';

const StCard = styled.div`
  font-size: 1.5rem;
  color: white;
  border-radius: 0.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.isCorrect ? theme.correct : theme.incorrect};

  height: 4rem;
  width: 3rem;
`;

const ScoreCard = (props) => {
  const { name, isCorrect } = props;
  return <StCard isCorrect={isCorrect}>{name}</StCard>;
};

export default ScoreCard;

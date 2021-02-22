import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  border: 4px solid
    ${(props) =>
      props.start
        ? props.theme.blue.colors.correct
        : props.theme.blue.colors.primary};
  border-radius: 5px;
  font-size: 2rem;
  color: ${(props) =>
    props.start
      ? props.theme.blue.colors.correct
      : props.theme.blue.colors.primary};
  background: ${(props) =>
    props.start ? 'white' : props.theme.blue.colors.correct};
  :hover {
    background: ${(props) =>
      props.start
        ? props.theme.blue.colors.correct
        : props.theme.blue.colors.primary};
    color: white;
  }
`;

const Button = (props) => {
  const { onClick, children, start } = props;

  return (
    <StyledButton start={start} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default Button;

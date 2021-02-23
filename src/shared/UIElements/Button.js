import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  border: 4px solid ${(props) => props.theme.blue.colors.primary};
  border-radius: 5px;
  font-size: 2rem;
  color: ${(props) => props.theme.blue.colors.primary};
  background: white;
  transition: transform 0.1s;
  :hover {
    border: 4px solid
      ${(props) => (props.start ? props.theme.blue.colors.correct : 'inherit')};
    background: ${(props) =>
      props.start
        ? props.theme.blue.colors.correct
        : props.theme.blue.colors.primary};
    color: ${(props) => (props.start ? 'black' : 'white')};
    box-shadow: 5px 5px 15px 1px rgba(0, 0, 0, 0.5);
    transform: scale(1.1);
  }
`;

const Button = (props) => {
  const { onClick, children } = props;

  return (
    //that ternary operator haunts my dreams, but somehow prevents warns
    <StyledButton start={props.start ? 1 : 0} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default Button;

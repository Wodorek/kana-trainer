import React from 'react';
import styled, { keyframes } from 'styled-components';
import Button from '../../common/UIElements/Button';
import { useSelector } from 'react-redux';

const animation = keyframes`
0% {
  transform: scale(0)
}
100% {
  transform: scale(1)
}
`;

const StyledModal = styled.div`
  display: ${(props) => (props.display ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 5;
  width: 100%;
  height: 100%;
`;

const StyledMessage = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: 25rem;
  width: 40%;
  background-color: white;
  animation: ${animation} 0.2s;
  @media (max-width: 821px) {
    padding: 0.5rem;
    width: 70%;
  }
`;

const StyledHeading = styled.h2`
  text-align: center;
  font-size: 2rem;
  @media (max-width: 421px) {
    margin-top: 1rem;
    font-size: 1.5rem;
  }
`;

const StyledExplanation = styled.p`
  padding: 1rem;
  font-size: 120%;
  text-align: center;
  @media (max-width: 421px) {
    padding: 0;
    font-size: 110%;
  }
`;

const Modal = (props) => {
  const heading = useSelector((state) => state.modal.heading);
  const message = useSelector((state) => state.modal.message);

  const { display, dismiss } = props;
  return (
    <StyledModal display={display ? 1 : 0}>
      <StyledMessage>
        <StyledHeading> {heading}</StyledHeading>
        <StyledExplanation>{message}</StyledExplanation>
        <Button onClick={dismiss}>Dismiss</Button>
      </StyledMessage>
    </StyledModal>
  );
};

export default Modal;

import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Button from '../../common/UIElements/Button';

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
  width: 40rem;
  background-color: white;
`;

const StyledHeading = styled.h2`
  align-items: center;
  font-size: 2rem;
`;

const StyledExplanation = styled.p`
  padding: 1rem;
  font-size: 120%;
`;

const Modal = (props) => {
  const { heading, message } = props;
  return (
    <StyledModal display={props.display ? 1 : 0}>
      <StyledMessage>
        <StyledHeading> {heading}</StyledHeading>
        <StyledExplanation>{message}</StyledExplanation>
        <Button onClick={props.dismiss}>Dismiss</Button>
      </StyledMessage>
    </StyledModal>
  );
};

const mapStateToProps = (state) => {
  return {
    heading: state.modal.heading,
    message: state.modal.message,
  };
};

export default connect(mapStateToProps)(Modal);

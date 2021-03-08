import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.div`
  position: sticky;
  bottom: 0;
  width: 100%;
  height: 3rem;
  background-color: ${(props) => props.theme.primary};
`;

const StyledText = styled.p`
  height: inherit;
  display: flex;
  color: white;
  font-size: 1.5rem;
  justify-content: center;
  align-items: center;
`;

const MobileFooter = (props) => {
  const { onClick } = props;

  return (
    <StyledFooter onClick={onClick}>
      <StyledText>Start</StyledText>
    </StyledFooter>
  );
};

export default MobileFooter;

import React from 'react';
import styled from 'styled-components';

const SelectorCard = styled.div`
  display: flex;
  margin: auto;
  height: 7rem;
  width: 5rem;
  font-size: 2rem;
  border-radius: 0.7rem;
  color: white;
  background-color: dimgrey;
  transition: 0.4s;
  transform: ${(props) => (props.selected ? 'rotate(20deg)' : '')};
`;

const CardText = styled.p`
  margin: auto;
  cursor: default;
  ::selection {
    text-decoration: none;
  }
`;

const GroupSelector = (props) => {
  const { select, selected, groupNameKana, groupNameRomaji } = props;
  return (
    <SelectorCard onClick={select} selected={selected}>
      <CardText>{selected ? groupNameRomaji : groupNameKana}</CardText>
    </SelectorCard>
  );
};

export default GroupSelector;

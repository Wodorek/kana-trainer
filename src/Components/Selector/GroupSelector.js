import React, { useState } from 'react';
import styled from 'styled-components';
import { useStore } from '../../shared/context/store';

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
  transform: ${(state) => (state.selected ? 'rotate(20deg)' : '')};
`;

const CardText = styled.p`
  margin: auto;
  cursor: default;
  ::selection {
    text-decoration: none;
  }
`;

const GroupSelector = (props) => {
  const { state, dispatch } = useStore();

  const { group, groupNameKana, groupNameRomaji } = props;

  const selected = state.selectedGroups.includes(group);

  const singleSelectionHandler = () => {
    if (selected === false) {
      dispatch({ type: 'addGroup', payload: group });
    } else {
      dispatch({ type: 'removeGroup', payload: group });
    }
  };

  return (
    <SelectorCard onClick={singleSelectionHandler} selected={selected}>
      <CardText>{selected ? groupNameRomaji : groupNameKana}</CardText>
    </SelectorCard>
  );
};

export default GroupSelector;

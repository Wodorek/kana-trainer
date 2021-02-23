import React from 'react';
import styled from 'styled-components';
import { useStore } from '../../shared/context/store';

const SelectorCard = styled.div`
  border: solid 5px ${(props) => props.theme.blue.colors.primary};
  display: flex;
  margin: auto;
  height: 9rem;
  width: 6rem;
  font-size: 2.5rem;
  border-radius: 1rem;
  color: ${(props) =>
    props.selected ? 'white' : props.theme.blue.colors.primary};
  background-color: ${(props) =>
    props.selected ? props.theme.blue.colors.primary : `white`};
  transition: 0.5s;
  transform: ${(props) => (props.selected ? 'rotateY(180deg)' : '')};
`;

const CardText = styled.p`
  transition: 0.5s;
  transform: ${(props) => (props.selected ? 'rotateY(180deg)' : '')};
  margin: auto;
  cursor: default;
  ::selection {
    text-decoration: none;
  }
`;

const GroupSelector = (props) => {
  const { state, dispatch } = useStore();

  const { group, groupNameKana } = props;

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
      <CardText selected={selected}>{groupNameKana}</CardText>
    </SelectorCard>
  );
};

export default GroupSelector;

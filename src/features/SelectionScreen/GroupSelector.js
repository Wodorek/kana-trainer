import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { addGroup, removeGroup } from './selectionSlice';

const SelectorCard = styled.div`
  --height: 9rem;
  --width: 6rem;
  --font-size: 2.5rem;
  --percentage: 1;

  border: solid 5px ${(props) => props.theme.primary};
  display: flex;
  margin: auto;
  height: calc(var(--height) * var(--percentage));
  width: calc(var(--width) * var(--percentage));
  font-size: calc(var(--font-size) * var(--percentage));
  border-radius: 1rem;
  color: ${(props) => (props.selected ? 'white' : props.theme.primary)};
  background-color: ${(props) =>
    props.selected ? props.theme.primary : `white`};
  transition: 0.5s;
  transform: ${(props) => (props.selected ? 'rotateY(180deg)' : '')};
  :hover {
    cursor: pointer;
  }
  @media (max-width: 421px) {
    border: solid 3px;
    --percentage: 0.7;
    height: calc(var(--height) * var(--percentage));
    width: calc(var(--width) * var(--percentage));
    font-size: calc(var(--font-size) * var(--percentage));
  }
`;

const CardText = styled.p`
  transition: 0.5s;
  transform: ${(props) => (props.selected ? 'rotateY(180deg)' : '')};
  margin: auto;
  ::selection {
    text-decoration: none;
  }
`;

const GroupSelector = (props) => {
  const { group, groupNameKana } = props;

  const selectedGroups = useSelector((state) => state.selection.selectedGroups);

  const dispatch = useDispatch();

  const selected = selectedGroups.includes(group);

  const singleSelectionHandler = () => {
    if (selected === false) {
      dispatch(addGroup(group));
    } else {
      dispatch(removeGroup(group));
    }
  };

  return (
    <SelectorCard onClick={singleSelectionHandler} selected={selected}>
      <CardText selected={selected}>{groupNameKana}</CardText>
    </SelectorCard>
  );
};

export default GroupSelector;

import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { addAll, removeAll } from './selectionSlice';
import Button from '../../common/UIElements/Button';
import GroupSelector from './GroupSelector';

const StyledContainer = styled.div`
  justify-content: space-around;
  width: 40vw;
  @media (max-width: 521px) {
    justify-content: center;
    width: 100%;
    padding: 0.5rem;
  }
`;

const StyledElements = styled.div`
  gap: 1rem;
  justify-content: left;
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 521px) {
    gap: 0.5rem;
    justify-content: center;
    width: 100;
  }
`;

const StyledHeading = styled.h1`
  text-transform: capitalize;
  font-weight: 500;
  text-align: center;
  font-size: 3rem;
  margin-bottom: 2rem;
`;

const StyledButtonsGroup = styled.div`
  margin-top: 2rem;
  height: auto;
  display: flex;
  justify-content: space-around;
`;

const SelectorsContainer = (props) => {
  //consider iterating over items with lodash functions

  const { items, groupName, select } = props;

  const dispatch = useDispatch();

  const itemsIterable = Object.keys(items);

  return (
    <StyledContainer>
      <StyledHeading>{groupName}</StyledHeading>
      <StyledElements>
        {itemsIterable.map((group) => {
          return (
            <GroupSelector
              group={group}
              key={group}
              groupNameKana={Object.keys(items[group].characters)[0]}
              // groupNameRomaji={Object.values(group).slice(0, -7)}
              select={() => select(groupName, group)}
            />
          );
        })}
      </StyledElements>
      <StyledButtonsGroup className="scButtons">
        <Button onClick={() => dispatch(addAll(itemsIterable))}>
          Select All
        </Button>
        <Button onClick={() => dispatch(removeAll(itemsIterable))}>
          Deselect All
        </Button>
      </StyledButtonsGroup>
    </StyledContainer>
  );
};

export default SelectorsContainer;

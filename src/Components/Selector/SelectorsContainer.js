import React from 'react';
import styled from 'styled-components';

import GroupSelector from './GroupSelector';

const StyledContainer = styled.div`
  margin-top: 1rem;
  justify-content: space-around;
  width: 40vw;
`;

const StyledElements = styled.div`
  gap: 1rem;
  justify-content: left;
  display: flex;
  flex-wrap: wrap;
`;

const StyledHeading = styled.h1`
  font-weight: 500;
  text-align: center;
  font-size: 3rem;
`;

const StyledButtonsGroup = styled.div`
  margin-top: 1rem;
  height: auto;
  display: flex;
  justify-content: space-around;
`;

const StyledButton = styled.button`
  margin-top: 2rem;
  font-size: 2rem;
  border-radius: 0.5rem;
`;

const SelectorsContainer = (props) => {
  //consider iterating over items with lodash functions
  //TODO put buttons in their own component

  const itemsIterable = Object.keys(props.items);

  const { items, groupName, checkOne, bundleSelect } = props;

  return (
    <StyledContainer>
      <StyledHeading>{props.groupName}</StyledHeading>
      <StyledElements>
        {itemsIterable.map((group) => {
          return (
            <GroupSelector
              key={group}
              groupNameKana={Object.keys(items[group].characters)[0]}
              groupNameRomaji={Object.values(group).slice(0, -7)}
              select={() => checkOne(groupName, group)}
              selected={items[group].selected}
            />
          );
        })}
      </StyledElements>
      <StyledButtonsGroup className="scButtons">
        <StyledButton onClick={() => bundleSelect(groupName, true)}>
          Check All
        </StyledButton>
        <StyledButton onClick={() => bundleSelect(groupName, false)}>
          Uncheck All
        </StyledButton>
      </StyledButtonsGroup>
    </StyledContainer>
  );
};

export default SelectorsContainer;

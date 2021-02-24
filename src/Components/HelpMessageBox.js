import React, { useState } from 'react';
import styled from 'styled-components';
import { QuestionCircle } from '@styled-icons/fa-solid/QuestionCircle';

const StyledIcon = styled(QuestionCircle)`
  right: 3%;
  top: 3%;
  position: absolute;
  height: 3rem;
  width: auto;
  color: ${(props) => props.theme.primary};
`;

const StyledText = styled.p`
  font-size: 130%;
`;

const StyledMessageBox = styled.div`
  /* display: ${(props) => (props.visible ? 'block' : 'none')}; */
  color: white;
  padding: 1rem;
  position: absolute;
  right: 6rem;
  top: 5rem;
  background-color: ${(props) => props.theme.primary};
  box-shadow: 4px 4px 8px black;
  max-width: 30rem;
  width: auto;
  a {
    color: red;
  }
`;

const StyledHeading = styled.h2`
  text-align: center;
`;

const HelpMessageBox = () => {
  const [isHovering, setIsHovering] = useState(false);

  let timeoutId;

  const toggleHoverState = (state) => {
    if (state === true) {
      setIsHovering(state);
      clearTimeout(timeoutId);
    }
    if (state === false) {
      timeoutId = setTimeout(() => {
        setIsHovering(state);
      }, 200);
    }
  };

  return (
    <>
      <StyledIcon
        onMouseEnter={() => toggleHoverState(true)}
        onMouseLeave={() => toggleHoverState(false)}
      />
      {isHovering && (
        <>
          <StyledMessageBox
            onMouseEnter={() => toggleHoverState(true)}
            onMouseLeave={() => toggleHoverState(false)}
          >
            <StyledHeading>How does this work?</StyledHeading>
            <StyledText>
              Select groups of Hiragana or Katakana (or both!) that you want to
              quiz yourself on, and press start. You will see a shuffled grid of
              all syllables from selected groups. Type in Romaji for each
              syllable, and press enter to submit<br></br> Be careful, you'll
              get only one chance to input an answer into a box in each card!
              After all cards are completed you will see how well you've done
              overall.
              <br></br>
              You can read more on japanese writing system:{' '}
              <a
                target="_blank"
                rel="noreferrer"
                href="https://en.wikipedia.org/wiki/Japanese_writing_system"
              >
                here
              </a>
            </StyledText>
          </StyledMessageBox>
        </>
      )}
    </>
  );
};

export default HelpMessageBox;

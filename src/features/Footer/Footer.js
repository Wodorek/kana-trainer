import { Github } from '@styled-icons/fa-brands';
import React from 'react';
import styled from 'styled-components';

const StIcon = styled(Github)`
  height: 1rem;
  margin-bottom: 3px;
  width: auto;
  margin-left: 0.5rem;
`;

const StFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
  height: 1.5rem;
  font-size: 1rem;
  flex-shrink: 0;
  background-image: linear-gradient(whitesmoke, rgb(160, 160, 160));
  @media (max-width: 521px) {
    display: none;
  }
`;

const StLink = styled.a`
  text-decoration: none;
  color: grey;
  text-shadow: -1px -1px 1px whitesmoke, 1px -1px 1px whitesmoke,
    -1px 1px 1px whitesmoke, 1px 1px 1px whitesmoke;
  :hover {
    ${StIcon} {
      color: black;
    }
  }
`;

const Footer = () => {
  return (
    <StFooter>
      <StLink href="https://github.com/Wodorek/kana-trainer">
        check out the code on github
        <StIcon />
      </StLink>
    </StFooter>
  );
};

export default Footer;

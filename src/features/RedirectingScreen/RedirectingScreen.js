import React, { useEffect, useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import ScrollToTop from '../../common/Util/ScrollToTop';
import LoadingBar from './LoadingBar';

const StyledMessage = styled.p`
  font-size: 2rem;
  text-align: center;
  @media (max-width: 420px) {
    font-size: 1.4rem;
    margin: 0 0.5rem 0 0.5rem;
  }
`;

const StyledContainer = styled.div`
  margin: auto;
  gap: 4rem;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const RedirectingScreen = (props) => {
  const [redirect, setRedirect] = useState(false);

  const history = useHistory();

  const { redirectTime, children, redirectTo } = props;

  let redirector;

  if (redirect) {
    redirector = <Redirect to={redirectTo} />;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    const timeoutId = setTimeout(() => {
      setRedirect(true);
    }, redirectTime * 1000);
    return function cleanup() {
      clearTimeout(timeoutId);
    };
  });

  return (
    <StyledContainer>
      <StyledMessage redirectTime={`${redirectTime}s`}>
        {children}
      </StyledMessage>
      <LoadingBar redirectTime={redirectTime} />
      {redirector}
    </StyledContainer>
  );
};

export default RedirectingScreen;

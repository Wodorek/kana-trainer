import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import LoadingBar from './LoadingBar';

const StyledMessage = styled.p``;

const RedirectingScreen = (props) => {
  const [redirect, setRedirect] = useState(false);

  const { message, redirectTime, redirectTo } = props;

  let redirector;

  if (redirect) {
    redirector = <Redirect to={redirectTo} />;
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setRedirect(true);
      return function cleanup() {
        clearTimeout(timeoutId);
      };
    }, redirectTime * 1000);
  });

  return (
    <>
      <StyledMessage redirectTime={`${redirectTime}s`} text={message}>
        {message}
      </StyledMessage>
      <LoadingBar redirectTime={redirectTime} />
      {redirector}
    </>
  );
};

export default RedirectingScreen;

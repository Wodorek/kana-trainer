const redirect = () => {
  props.onSetHeading('No questions selected!');
  props.onSetMessage(
    'No groups were selected for the quiz. Please select some kana groups by clicking on the cards, and press start to begin'
  );
  props.onModalShow();
  history.push('/');
};

export default redirect;

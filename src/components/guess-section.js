import React from 'react';

import Feedback from './feedback';
import GuessForm from './guess-form';

export default function GuessSection(props) {

  return (
    <section aria-label="Guess section" aria-describedby="feedback">
      <Feedback feedback={props.feedback} guessCount={props.guessCount} />
      <GuessForm onMakeGuess={guess => props.onMakeGuess(guess)} />
    </section>
  );
}

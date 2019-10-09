import React from 'react';
import {connect} from 'react-redux';

import{restartGame, makeGuess, generateAuralUpdate} from '../actions';

import Header from './header';
import GuessSection from './guess-section';
import StatusSection from './status-section';
import InfoSection from './info-section';

class Game extends React.Component {

  restartGame() {
    this.props.dispatch(restartGame());
    console.log(this.props);
  }

  makeGuess(guess) {
    guess = parseInt(guess, 10);
    if (isNaN(guess)) {
      this.setState({ feedback: 'Please enter a valid number' });
      return;
    }

    const difference = Math.abs(guess - this.props.correctAnswer);

    let feedback;
    if (difference >= 50) {
      feedback = 'You\'re Ice Cold...';
    } else if (difference >= 30) {
      feedback = 'You\'re Cold...';
    } else if (difference >= 10) {
      feedback = 'You\'re Warm.';
    } else if (difference >= 1) {
      feedback = 'You\'re Hot!';
    } else {
      feedback = 'You got it!';
    }

    console.log(difference);
    console.log(feedback);

    this.props.dispatch(makeGuess(guess, feedback));

    // We typically wouldn't touch the DOM directly like this in React
    // but this is the best way to update the title of the page,
    // which is good for giving screen-reader users
    // instant information about the app.
    document.title = feedback ? `${feedback} | Hot or Cold` : 'Hot or Cold';
  }

  generateAuralUpdate() {
    const { guesses, feedback } = this.props;

    // If there's not exactly 1 guess, we want to
    // pluralize the nouns in this aural update.
    const pluralize = guesses.length !== 1;

    let  auralStatus = `Here's the status of the game right now: ${feedback} You've made ${guesses.length} ${pluralize ? 'guesses' : 'guess'}.`;

    if (guesses.length > 0) {
      auralStatus += ` ${pluralize ? 'In order of most- to least-recent, they are' : 'It was'}: ${guesses.reverse().join(', ')}`;
    }

    this.props.dispatch(generateAuralUpdate(guesses, feedback));

  }

  render() {
    const { feedback, guesses, auralStatus } = this.props;
    const guessCount = guesses.length;

    console.log(this.props);

    return (
      <div>
        <Header
          onRestartGame={() => this.restartGame()}
          onGenerateAuralUpdate={() => this.generateAuralUpdate()}
        />
        <main role="main">
          <GuessSection
            feedback={feedback}
            guessCount={guessCount}
            onMakeGuess={guess => this.makeGuess(guess)}
          />
          <StatusSection guesses={guesses} 
            auralStatus={auralStatus}
            guessCount={guessCount}
          />
          <InfoSection />
        </main>
      </div>
    );
  }
}

Game.defaultProps = {
      guesses: [],
      feedback: 'Mickey Mouse Default!',
      auralStatus: '',
      correctAnswer: 51
};

function mapStateToProps(state) {
      console.log(state);
      return {
        guesses: state.guesses,
        feedback: state.feedback,
        auralStatus: state.auralStatus,
        correctAnswer: state.correctAnswer
      }
    };

export default connect(mapStateToProps)(Game);

import * as actions from '../actions';

const initialState = {
	  guesses: [15, 35, 90],
      feedback: 'Shazam!!',
      auralStatus: '',
      correctAnswer: Math.floor(Math.random() * 100) + 1
}

export const hotColdGameReducer = (state=initialState, action) => {
	if (action.type === actions.RESTART_GAME) {
		return {
			guesses: [],
      		feedback: 'Restarted! Make a guess!',
      		auralStatus: '',
      		correctAnswer: Math.floor(Math.random() * 100) + 1
		}
	}
	if (action.type === actions.MAKE_GUESS) {
		return Object.assign({}, ...state, {
				guesses: [ ...state.guesses, action.guess],
				feedback: action.feedback
		})
	}

	if (action.type === actions.AURAL_FEEDBACK) {
		return {
			guesses: action.guesses,
			feedback: action.feedback,
			auralStatus: action.auralStatus
		}
	}

	return state;
}

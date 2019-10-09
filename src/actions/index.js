export const RESTART_GAME = 'RESTART_GAME';
export const restartGame = () => ({
	type: RESTART_GAME
})

export const MAKE_GUESS = 'MAKE_GUESS';
export const makeGuess = (guess, feedback) => ({
	type: MAKE_GUESS,
	guess,
	feedback
})

export const AURAL_FEEDBACK = 'AURAL_FEEDBACK';
export const generateAuralUpdate = (guesses, feedback, auralStatus) => ({
	type: AURAL_FEEDBACK,
	guesses,
	feedback,
	auralStatus
})
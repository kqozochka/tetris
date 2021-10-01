export default class Controller{
	constructor(game, view){
		this.game = game;
		this.view = view;
		this.inervalId = null;
		this.isPlaying = false;

		document.addEventListener('keydown', this.handleKeyDown.bind(this));
		document.addEventListener('keyup', this.handleKeyUp.bind(this));

		this.view.renderStartScreen();
	}

	upd(){
		this.game.movePieceDown();
		this.updView()
	}

	play(){
		this.isPlaying = true;
		this.startTimer();
		this.updView()

	}

	pause(){
		this.isPlaying = false;
		this.stopTimer();
		this.updView()
	}

	reset(){
		this.game.reset();
		this.play();
	}

	updView(){
		const state = this.game.getState();

		if (state.isGameOver) {
			this.view.renderEndScreen(state);
		} else if (!this.isPlaying) {
			this.view.renderPauseScreen();
		} else {
			this.view.renderMainScreen(state);
		}
	}

	startTimer(){
		const speed = 1000 - this.game.getState().level * 100;

		if (!this.intervalId) {
			this.intervalId =  setInterval(() =>{
			this.upd();
			}, speed > 0 ? speed : 100);
		}
	}

	stopTimer(){
		if (this.intervalId ) {
			clearInterval(this.intervalId);
			this.intervalId = null;

		}


	}

	handleKeyDown(){
	const state = this.game.getState();

		switch(event.keyCode){
			case 13:
				if (state.isGameOver) {
					this.reset();
				} else if (this.isPlaying) {
					this.pause();
				} else {
					this.play();
				}
				break;
		    case 37: //LEFT
		      this.game.movePieceLeft();
		      this.updView();
		      break;
		    case 38: //UP - ROTATE
		      this.game.rotatePiece();
		      this.updView();
		      break;
		    case 39: //Right
		      this.game.movePieceRight();
		      this.updView();
		      break;
		    case 40: //Down
		      this.stopTimer();
		      this.game.movePieceDown();
		      this.updView();
		      break;
		} 
	}

	handleKeyUp(event){
		switch(event.keyCode){
		    case 40: //Down
		      this.startTimer();
		      break;
		} 
	}
}
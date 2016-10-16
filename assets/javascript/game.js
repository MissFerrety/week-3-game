var board = document.getElementById('gameboard');
var canvas = board.getContext('2d');

var hangman = {

	gameStarted: false,

	dictionary: [
		'FOREVER ALONE',
		'DOGE',
		'ALIENS',
		'HATERS GONNA HATE',
		'GRUMPY CAT',
		'GANGNAM STYLE',
		'DEAL WITH IT',
		'ME GUSTA',
		'HONEY BADGER',
		'OVER NINE THOUSAND',
		'ITS A TRAP',
		'ONE DOES NOT SIMPLY',
	],

	images: [
		'assets/images/forever-alone.jpg',
		'assets/images/doge.jpg',
		'assets/images/aliens.jpg',
		'assets/images/haters-gonna-hate.jpg',
		'assets/images/grumpy-cat.jpg',
		'assets/images/gangnam-style.jpg',
		'assets/images/deal-with-it.jpg',
		'assets/images/me-gusta.jpg',
		'assets/images/honey-badger.jpg',
		'assets/images/over-nine-thousand.jpg',
		'assets/images/its-a-trap.jpg',
		'assets/images/one-does-not-simply.jpg',
	],

	letters: [],

	score: 0,
	winStreak: 0,
	loseStreak: 0,
	answer: '',
	step: 0,

	checkEntry: function(key){
		// If game is started, check the letter
		// If game is not started, start the game
		if(this.gameStarted === true){
			// Check letter
			if(key.keyCode >= 65 && key.keyCode <= 90){
				// It's a letter!
			}else{
				// Not a letter!
			}
		}else{
			// Start the game
			this.gameStarted = true;
			// Replace the instructions
			document.getElementById('instructions').innerHTML = 'Enter a letter to guess';
			// Add blanks
			this.answer = this.dictionary[Math.floor(Math.random()*this.dictionary.length)];
			document.getElementById('guessing').innerHTML = '___ __';

		}
	},

	drawLine: function(oX,oY,nX,nY){
		canvas.moveTo(oX, oY);
		canvas.lineTo(nX, nY);
		canvas.stroke();
	},

	drawCircle: function(oX,oY,rad){
		canvas.beginPath();
		canvas.arc(oX,oY,rad,0,2*Math.PI);
		canvas.stroke();
	},

	drawGallows: function(){
		// Gallows
		drawLine(10,280,290,280);
		drawLine(30,280,30,30);
		drawLine(30,30,170,30);
		drawLine(170,30,170,60);
	},

	drawStickman: function(step){
		switch(step){
			case 1:
				// Head
				this.drawCircle(170,80,20);
				break;
			case 2:
				// Neck
				this.drawLine(170,100,170,110);
				break;
			case 3:
				// Left Arm
				this.drawLine(170,110,130,160);
				break;
			case 4:
				// Right Arm
				this.drawLine(170,110,210,160);
				break;
			case 5:
				// Body
				this.drawLine(170,110,170,180);
				break;
			case 6:
				// Left Leg
				this.drawLine(170,180,130,240);
				break;
			case 7:
				// Right Leg
				this.drawLine(170,180,210,240);
				break;
			case 8:
				// Face
				this.drawLine(157,70,167,80);
				this.drawLine(167,70,157,80);
				this.drawLine(173,70,183,80);
				this.drawLine(183,70,173,80);
				this.drawLine(157,88,183,88);
				break;
			default:
				// Do nothing
				break;
		}

	}

}
	console.log(hangman.dictionary);

window.addEventListener('keyup', hangman.checkEntry);

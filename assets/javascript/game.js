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
		'HONEY BADGER DON\'T CARE',
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
	guess: '',
	step: 0,

	checkGame: function(key){
		// If game is started, check the letter
		// If game is not started, start the game
		if(hangman.gameStarted === true){
			// Check letter
			if(key.keyCode >= 65 && key.keyCode <= 90){
				// It's a letter!
				hangman.checkEntry(key.key);
			}else{
				// Not a letter!
			}
		}else{
			// Start the game
			hangman.gameStarted = true;
			// Replace the instructions
			document.getElementById('instructions').innerHTML = 'Enter a letter to guess';

			// Standardize dictionary
			toUpper = function(x){ 
				return x.toUpperCase();
			};
			hangman.dictionary.map(toUpper);

			// Add blanks
			numAnswers = hangman.dictionary.length;
			//hangman.answer = hangman.dictionary[Math.floor(Math.random()*numAnswers)];
			hangman.answer = "ABABCCD";

			hangman.guess = hangman.answer.replace(/[A-Z]/g,'_');
			document.getElementById('guessing').innerHTML = hangman.guess;

			// Draw the gallows
			hangman.drawGallows();
		}
	},

	checkEntry: function(letter){
		letter = letter.toUpperCase();
		if(hangman.letters.indexOf(letter) === -1){
			// Not guessed before; add to guesses
			hangman.letters.push(letter);
			document.getElementById('guessed').innerHTML = hangman.letters;

			if(hangman.answer.indexOf(letter) === -1){
				// Not in answer
				hangman.guessedWrong(letter);
			}else{
				// In answer; replace as necessary
				hangman.guessedRight(letter);
			}
		}else{
			// Guessed before
			alert('You already guessed that letter! Try again.')
		}
	},

	guessedWrong: function(letter) {
		hangman.step++;
		if(hangman.step < 8){
			// Still have steps to go
			hangman.drawStickman(hangman.step);
		}else if(hangman.step === 8){
			// Run the Hail Mary play!
		}else{
			// Game over, man.
		}
	},

	guessedRight: function(letter){
		// Replace letters
		for(i=0;i<hangman.answer.length;i++){
			// Find index of letter
			if(letter === hangman.answer.charAt(i)){
				// Replace every instance
				hangman.guess = hangman.guess.substr(0,i)+letter+hangman.guess.substr(i+1);
			}
		}
		// Add new guess string to answer box
		document.getElementById('guessing').innerHTML = hangman.guess;

		// Check if game won
		if(hangman.guess.indexOf('_') === -1){
			alert('YOU WON!');
			var play = confirm('Play again?');
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
		this.drawLine(10,280,290,280);
		this.drawLine(30,280,30,30);
		this.drawLine(30,30,170,30);
		this.drawLine(170,30,170,60);
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
window.addEventListener('keyup', hangman.checkGame);

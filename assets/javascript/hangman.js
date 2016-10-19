$(function(){

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
			'IT\'S OVER NINE THOUSAND',
			'IT\'S A TRAP',
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

		wins: 0,
		losses: 0,
		winStreak: 0,
		loseStreak: 0,
		answer: '',
		guess: '',
		guesses: 7,
		step: 0,
		newGame: $('#game').html(),
		winImg: '<img src="assets/images/awinnerisyou.jpg" />',
		loseImg: '<img src="assets/images/youlose.jpg" />',


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

				// Initiate the canvas
				hangman.canvas = document.getElementById('gameboard').getContext('2d');


				// Replace the instructions
				$('#instructions').html('Enter a letter to guess');
				$('#resultimg').html('');

				// Standardize dictionary
				toUpper = function(x){ 
					return x.toUpperCase();
				};
				hangman.dictionary.map(toUpper);

				// Add blanks
				numAnswers = hangman.dictionary.length;
				hangman.answer = hangman.dictionary[Math.floor(Math.random()*numAnswers)];
				hangman.guess = hangman.answer.replace(/[A-Z]/g,'_');
				$('#guessing').html(hangman.guess);
				$('#guessnum').html(hangman.guesses);

				// Draw the gallows
				hangman.drawGallows();
			}
		},

		checkEntry: function(letter){
			letter = letter.toUpperCase();
			if(hangman.letters.indexOf(letter) === -1){
				// Not guessed before; add to guesses
				hangman.letters.push(letter);
				$('#guessed').html(hangman.letters);

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
			$('#guessnum').html(hangman.guesses - hangman.step);
			if(hangman.step < hangman.guesses){
				// Still have steps to go
				hangman.drawStickman(hangman.step);
	//		}else if(hangman.step === hangman.guesses){
				// Run the Hail Mary play!
			}else{
				// Game over, man.
				hangman.drawStickman(hangman.step);
				hangman.endGame('lose');
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
			$('#guessing').html(hangman.guess);

			// Check if game won
			if(hangman.guess.indexOf('_') === -1){
				hangman.endGame('win');
			}
		},

		endGame: function(point){
			window.removeEventListener('keyup', hangman.checkGame);

			if('win'===point){
				$('#guessing').addClass('correct');
				hangman.loseStreak = 0;
				hangman.wins++;
				$('#wins').html(hangman.wins);
				hangman.winStreak++;
				$('#resultimg').html(hangman.winImg);
			}
			if('lose'===point){
				$('#guessing').addClass('wrong');
				hangman.winStreak = 0;
				hangman.losses++;
				$('#losses').html(hangman.losses);
				hangman.loseStreak++;
				$('#resultimg').html(hangman.loseImg);
			}
			console.log(hangman.newGame);
			$('#game').delay(1000).fadeOut('slow', function(){
				$('#result').fadeIn('slow');
				if(hangman.winStreak===3){
					// Run the win super
				}
				if(hangman.loseStreak===3){
					// Run the lose super
				}
				$('#restart').on('click',function(){
					hangman.restartGame();
				});
			});
		},

		restartGame: function(){
			// Show/hide appropriate divs
			$('#guessing').removeClass();
			$('#game').html(hangman.newGame).show();
			$('#result').hide();

			// Reset variables
			hangman.gameStarted = false;
			hangman.letters = [];
			hangman.step = 0;

			window.addEventListener('keyup', hangman.checkGame);
			hangman.checkGame();
		},

		drawLine: function(oX,oY,nX,nY){
			hangman.canvas.moveTo(oX, oY);
			hangman.canvas.lineTo(nX, nY);
			hangman.canvas.stroke();
		},

		drawCircle: function(oX,oY,rad){
			hangman.canvas.beginPath();
			hangman.canvas.arc(oX,oY,rad,0,2*Math.PI);
			hangman.canvas.stroke();
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
});
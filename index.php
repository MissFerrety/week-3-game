<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Hangman</title>
	<link rel="stylesheet" href="assets/css/reset.css">
	<link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
	<div class="page-header">
		<h1 class="page-title">Hangman</h1>
		<h2 class="sub-title">Meme Edition</h2>
	</div>

	<div id="result">
		<div id="resultimg"></div>
		<button id="restart">Play another game?</button>
	</div>
	<div id="game">
		<h3 id="instructions">Press any key to start!</h3>
		<div id="guessing"></div>
		<canvas id="gameboard" width="300" height="300">
		</canvas>
		<div>
			<strong>Letters guessed: </strong><span id="guessed"></span>
		</div>
	</div>
	<br />
	<div>
		<div class="wscore">Wins: <span id="wins">0</span></div>
		<div class="lscore">Losses: <span id="losses">0</span></div>
	</div>

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
	<script type="text/javascript" src="assets/javascript/hangman.js"></script>
</body>
</html>
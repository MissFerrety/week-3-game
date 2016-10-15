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

	<div class="game">
		<h3 id="instruction">Press any key to start!</h3>
		<canvas id="gameboard" width="300" height="300">
		</canvas>
		<div>
			<strong>Letters guessed: </strong><span id="guessed"></span>
		</div>
	</div>

	<script type="text/javascript" src="assets/javascript/game.js"></script>
</body>
</html>
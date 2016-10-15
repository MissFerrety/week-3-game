var board = document.getElementById('gameboard');
var canvas = board.getContext('2d');

function drawLine(oX,oY,nX,nY){
	canvas.moveTo(oX, oY);
	canvas.lineTo(nX, nY);
	canvas.stroke();
}
function drawCircle(oX,oY,rad){
	canvas.beginPath();
	canvas.arc(oX,oY,rad,0,2*Math.PI);
	canvas.stroke();
}

function drawGallows(){
	// Gallows
	drawLine(10,280,290,280);
	drawLine(30,280,30,30);
	drawLine(30,30,170,30);
	drawLine(170,30,170,60);
}

function drawStickman(step){
	switch(step){
		case 1:
			// Head
			drawCircle(170,80,20);
			break;
		case 2:
			// Neck
			drawLine(170,100,170,110);
			break;
		case 3:
			// Left Arm
			drawLine(170,110,130,160);
			break;
		case 4:
			// Right Arm
			drawLine(170,110,210,160);
			break;
		case 5:
			// Body
			drawLine(170,110,170,180);
			break;
		case 6:
			// Left Leg
			drawLine(170,180,130,240);
			break;
		case 7:
			// Right Leg
			drawLine(170,180,210,240);
			break;
		case 8:
			// Face
			drawLine(157,70,167,80);
			drawLine(167,70,157,80);
			drawLine(173,70,183,80);
			drawLine(183,70,173,80);
			drawLine(157,88,183,88);
	}

}



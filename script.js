function gbi(ID){
	return document.getElementById(ID);
}

gbi('start').addEventListener("click", function(){
	this.style.display = "none";
	play();
})

var computerScore = 0;
var playerScore   = 0;

var verticalSpeed     = 20;
var verticalDirection = 10;
var horizontalSpeed     = 50;
var horizontalDirection = 10;
var V,H;

function play(){
	 V = setInterval(ballVertical, verticalSpeed);
	 H = setInterval(ballHorizontal, horizontalSpeed);
}

function stop(){
	clearInterval(V);
	clearInterval(H);
	gbi('start').style.display = "block";
	gbi('ball').style.top = "0px";
	gbi('ball').style.left = "390px";

}

function ballVertical(){
	var ballHeight = gbi('ball').offsetTop;
	if(ballHeight >= 390){
		verticalDirection = -10;
	} else if (ballHeight <= 0){
		verticalDirection = 10;
	}
	var current = 0;
	var end   = verticalDirection;
	var id = setInterval(frame, 10);
	function frame(){
		if(current == verticalDirection){
			clearInterval(id);
		} else {
			current += (verticalDirection / (verticalSpeed/10));
			gbi('ball').style.top = ballHeight + current + 'px';
		}
	}
}

function ballHorizontal(){
	var ballOffset     = gbi('ball').offsetLeft;
	var ballheight     = gbi('ball').offsetTop;
	var paddleHeight   = gbi('paddle').offsetTop;
	var computerHeight = gbi('computer').offsetTop;
	if(ballOffset == 780) {			
		if (paddleHeight >= (ballheight - 60) && paddleHeight <= (ballheight)) {
			horizontalDirection = -10;
		} 
	} else if (ballOffset == 10){
		if (computerHeight >= (ballheight - 60) && computerHeight <= (ballheight)){
			horizontalDirection = 10;
		}
	} else if(ballOffset == 790){
		computerScore += 1;
		gbi('comp-score').innerText = computerScore;
		stop();
		return;
	} else if(ballOffset == 0){
		playerScore += 1;
		gbi('player-score').innerText = playerScore;
		stop();
		return;
	}
	var id = setInterval(frame,10);
	var current = 0;
	var end   = horizontalDirection;
	function frame(){
		if(current == horizontalDirection){
			clearInterval(id);
		} else {
			current += (horizontalDirection / (horizontalSpeed/10));
			gbi('ball').style.left = ballOffset + current + 'px';
		}
	}

	gbi('ball').style.left = ballOffset + horizontalDirection + 'px';
}

gbi('pong-table').addEventListener("mousemove", function(e){
	var Y = e.pageY - this.offsetTop;
	if( Y < 30 ){
		gbi('paddle').style.top = 0 + 'px';
	} else if ( Y > 370) {
		gbi('paddle').style.top = 340 + 'px';
	} else {
		gbi('paddle').style.top = Y - 30 + 'px';
	}
	
})

//computer
setInterval(track, 100);

function track(){
	var ballHeight = gbi('ball').offsetTop;
	var chance     = Math.random() * 10;
	var final      = ballHeight + chance;
	if(final < 30){
		gbi('computer').style.top = 0 + 'px';
	} else if (final > 370){
		gbi('computer').style.top = 340 + 'px';
	} else {
		gbi('computer').style.top = (final - 30) + 'px';
	}
}

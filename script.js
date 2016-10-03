function gbi(ID){
	return document.getElementById(ID);
}

gbi('start').addEventListener("click", function(){
	this.style.display = "none";
	play();
})

var computerScore = 0;
var playerScore   = 0;

function play(){
	var verticalSpeed     = 20;
	var verticalDirection = 10;
	setInterval(function(){
		var ballHeight = gbi('ball').offsetTop;
		if(ballHeight >= 390){
			verticalDirection = -10;
		} else if (ballHeight <= 0){
			verticalDirection = 10;
		}
		gbi('ball').style.top        = ballHeight + verticalDirection + 'px';
	}, verticalSpeed);
	var horizontalSpeed     = 10;
	var horizontalDirection = 10;
	setInterval(function(){
		var ballOffset = gbi('ball').offsetLeft;
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
			computerScore =+ 1;
			gbi('comp-score').innerText = computerScore;
		} else if(ballOffset == 0){
			playerScore =+ 1;
			gbi('player-score').innerText = playerScore;
		}
		gbi('ball').style.left       = ballOffset + horizontalDirection + 'px';
	}, horizontalSpeed);


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

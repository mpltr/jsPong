function gbi(ID){
	return document.getElementById(ID);
}

//globals;
var ini;
var computerScore = 0;
var playerScore   = 0;
var ball          = gbi('ball');
var start         = gbi('start');
var paddle        = gbi('paddle');
var computer      = gbi('computer');
var Yspeed        = 1;
var Ydirection    = 1;
var Xspeed        = 2;
var Xdirection    = 1;

start.addEventListener("click", function(){
	this.style.display = "none";
	play();
})

function play(){
	ini = setInterval(moveBall, 100);
}

function stop(){
	clearInterval(ini);
	// start.style.display = "block";
	ball.style.top      = "0px";
	ball.style.left     = "390px";
	ini = setInterval(moveBall, 100);
}

function moveBall(){
	var move = setInterval(check, 5);

	var current = 0;
	var end     = 20;
	var paddlespin = 0;

	function check(){
		var ballHeight     = ball.offsetTop;
		var ballOffset     = ball.offsetLeft;
		var paddleHeight   = paddle.offsetTop;
		var paddleLength   = paddle.clientHeight;
		var computerHeight = computer.offsetTop;
		// vertical
		if(ballHeight <= 0){
			Ydirection = 1;
		} 
		else if(ballHeight >= 390){
			Ydirection = -1;
		}

		//horizontal
		if(ballOffset == 10){
			Xdirection = 1;
		}
		if(ballOffset == 760){
			paddlespin = paddleHeight;
		}
		else if(ballOffset == 780 && paddleHeight > (ballHeight - paddleLength - 5) && paddleHeight < (ballHeight + 5)){
			Xdirection = -1;
			if(paddlespin - paddleHeight > 10){
				Ydirection += 1;
			}
			if(paddlespin - paddleHeight < -10){
				Ydirection -= 1;
			}
		}
		else if(ballOffset == 790){
			computerScore += 1;
			gbi('comp-score').innerText = computerScore;
			stop();
			return;
		}
		//frames
		if(current == end){
			clearInterval(move);
		} else {
			current++;
			ball.style.top  = ballHeight + ((Yspeed) * Ydirection) + 'px';
			ball.style.left = ballOffset + ((Xspeed) * Xdirection) + 'px';
		}

	}


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


console.log(devise(390));
console.log(devise(790));


function devise(input){
	var out = [];
	for(var i = 0; i < input+1; i++ ){
		if(input % i == 0 && (input-10) % i == 0){
			out.push(i);
		}
	}
	return out;
}
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
var Xspeed        = 5;
var Xdirection    = 1;

start.addEventListener("click", function(){
	this.style.display = "none";
	play();
})

function play(){
	ini = setInterval(check, 5);
}

function stop(){
	clearInterval(ini);
	start.style.display = "block";
	ball.style.top      = "0px";
	ball.style.left     = "390px";
}

function check(){
	var ballHeight     = ball.offsetTop;
	var ballOffset     = ball.offsetLeft;
	var paddleHeight   = paddle.offsetTop;
	var paddleLength   = paddle.clientHeight;
	var computerHeight = computer.offsetTop;

	// vertical ball
	if(ballHeight <= 0){
		Ydirection = 1;
	} 
	else if(ballHeight >= 390){
		Ydirection = -1;
	}

	// horizontal ball
	if(ballOffset <= 0){
		playerScore += 1;
		gbi('player-score').innerText = playerScore;
		stop();
		endFlag = 1;
		return;
	}
	if(ballOffset == 10 && computerHeight > (ballHeight - paddleLength - 5) && computerHeight < (ballHeight + 5)){
		Xdirection = 1;
	}
	if(ballOffset == 760){
		paddlespin = paddleHeight;
	}
	else if(ballOffset == 780 && paddleHeight > (ballHeight - paddleLength - 5) && paddleHeight < (ballHeight + 5)){
		Xdirection = -1;
	}
	else if(ballOffset >= 790){
		computerScore += 1;
		gbi('comp-score').innerText = computerScore;
		stop();
		endFlag = 1;
		return;
	}

	// computer paddle 
	if(ballOffset < 390 && Xdirection == -1){
		if(ballHeight < 30) {
			gbi('computer').style.top = '0px';
		} else if (ballHeight > 370){
			gbi('computer').style.top = '340px';
		} else {
			gbi('computer').style.top = (ballHeight-30) + 'px';
		}
	}

	// frames ball
		ball.style.top  = ballHeight + ((Yspeed) * Ydirection) + 'px';
		ball.style.left = ballOffset + ((Xspeed) * Xdirection) + 'px';

	

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

// //computer
// setInterval(track, 3);

// function track(){
// 	var ballHeight     = gbi('ball').offsetTop;
// 	var ballOffset     = gbi('ball').offsetLeft;
// 	var chance         = Math.random() * 10;
// 	var final          = ballHeight + chance;

// 	if(ballOffset > 390){
// 		return;
// 	} else {
// 		computerHeight(ballHeight-20);
// 	}



// }


console.log(devise(390));
console.log(devise(770));


function devise(input){
	var out = [];
	for(var i = 0; i < input+1; i++ ){
		if(input % i == 0){
			out.push(i);
		}
	}
	return out;
}
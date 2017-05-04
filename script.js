function gbi(ID){
	return document.getElementById(ID);
}

function gbc(CL){
	return document.getElementsByClassName(CL);
}

//globals;
var ini;
var computerScore = 0;
var playerScore   = 0;
var ball          = gbi('ball');
var start         = gbi('start');
var paddle        = gbi('paddle');
var paddleContact = '580';
var computer      = gbi('computer');
var compContact   = '10';
var Yspeed        = 1;
var Ydirection    = 1;
var Xspeed        = 5;
var Xdirection    = -1;
var animationInt  = 10;
var startOffset   = '300px';
var chance        = 0;


var difLength = gbc('difBut').length;
for(var i = 0; i < difLength; i++){
	gbc('difBut')[i].addEventListener("click", function(){
		gbc('difBut difButHigh')[0].className = "difBut";
		this.className = "difBut difButHigh";
	})
}

function registerDifficulty() {
	var highlightedID = gbc('difBut difButHigh')[0].id;
	if(highlightedID == "easy"){
		animationInt = 10;
	} else if (highlightedID == "normal"){
		animationInt = 5;
	} else if (highlightedID == "hard"){
		animationInt = 3;
	}

}


start.addEventListener("click", function(){
	this.style.display = "none";
	registerDifficulty();
	gbi('difficulty').style.display = "none";
	playerScore = 0;
	gbi('player-score').innerText = playerScore;
	computerScore = 0;
	gbi('comp-score').innerText = computerScore;
	resetBall();
	play();
})

function resetBall(){
	ball.style.left = startOffset;
	ball.style.top = Math.random() * 390 + 'px';
	Xdirection = -1;
}

function play(){
	ini = setInterval(check, animationInt);
}

function newRound(){
	clearInterval(ini);
	resetBall();
	setTimeout(play, 300);	
}

function endGame(winner){
	clearInterval(ini);
	gbi('wins').innerHTML = winner.toUpperCase() + "<br>WINS!<br><br><div id='playAgain'>PLAY AGAIN</div>"
	gbi('wins').style.display = "block";
	gbi('playAgain').addEventListener("click", function(){
		gbi('wins').style.display = "none";
		gbi('difficulty').style.display = "block";
		gbi('start').style.display = "block";
	})
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
		if(playerScore == "10"){
			endGame("you");
		}else{
			chance = 1;
			newRound();
		}		
		return;
	}

	//computer paddle
	else if(ballOffset == compContact){
		if(computerHeight < (ballHeight + 9) && computerHeight >= (ballHeight - 5)){
			Xdirection = 1;
			Ydirection = -1;
			Yspeed     = 3;
		}
		if(computerHeight < (ballHeight - 5) && computerHeight >= (ballHeight - 15)){
			Xdirection = 1;
			Ydirection = -1;
			Yspeed     = 2;
		} 
		if(computerHeight < (ballHeight - 15) && computerHeight >= (ballHeight - 25)){
			Xdirection = 1;
			Ydirection = -1;
			Yspeed     = 1;
		}
		if(computerHeight < (ballHeight - 25) && computerHeight >= (ballHeight - 35)){
			Xdirection = 1;
			Ydirection = 1;
			Yspeed     = 1;
		}
		if(computerHeight < (ballHeight - 35) && computerHeight >= (ballHeight - 45)){
			Xdirection = 1;
			Ydirection = 1;
			Yspeed     = 2;
		}
		if(computerHeight < (ballHeight - 45) && computerHeight >= (ballHeight - 59)){
			Xdirection = 1;
			Ydirection = 1;
			Yspeed     = 3;
		}
	}

	// paddle
	else if(ballOffset == paddleContact){
		if(paddleHeight < (ballHeight + 9) && paddleHeight >= (ballHeight - 5)){
			Xdirection = -1;
			Ydirection = -1;
			Yspeed     = 3;
		}
		if(paddleHeight < (ballHeight - 5) && paddleHeight >= (ballHeight - 15)){
			Xdirection = -1;
			Ydirection = -1;
			Yspeed     = 2;
		} 
		if(paddleHeight < (ballHeight - 15) && paddleHeight >= (ballHeight - 25)){
			Xdirection = -1;
			Ydirection = -1;
			Yspeed     = 1;
		}
		if(paddleHeight < (ballHeight - 25) && paddleHeight >= (ballHeight - 35)){
			Xdirection = -1;
			Ydirection = 1;
			Yspeed     = 1;
		}
		if(paddleHeight < (ballHeight - 35) && paddleHeight >= (ballHeight - 45)){
			Xdirection = -1;
			Ydirection = 1;
			Yspeed     = 2;
		}
		if(paddleHeight < (ballHeight - 45) && paddleHeight >= (ballHeight - 59)){
			Xdirection = -1;
			Ydirection = 1;
			Yspeed     = 3;
		}
		chance = (Math.random() * 25) * (Yspeed * Ydirection);
	}
	else if(ballOffset >= 590){
		computerScore += 1;
		gbi('comp-score').innerText = computerScore;
		if(computerScore == "10"){
			endGame("Computer");
		} else {
			chance = 1;
			newRound();
		}
		return;
	}

	// computer paddle 
	var compPerception = ballHeight + chance;
	if(Xdirection == -1){
		if(compPerception < 30) {
			gbi('computer').style.top = '0px';
		} else if (compPerception > 370){
			gbi('computer').style.top = '340px';
		} else {
			gbi('computer').style.top = (compPerception - 30) + 'px';
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


console.log(devise(370));
console.log(devise(570));


function devise(input){
	var out = [];
	for(var i = 0; i < input+1; i++ ){
		if(input % i == 0){
			out.push(i);
		}
	}
	return out;
}

function temp(input, second){
	var out = [];
	var i   =  1;
	do{
		var mult = (second * i) + 10;
		i++
		if((mult < 320 && mult > 280)||(mult == 580)){
			out.push(mult);
		}

	} while(mult < input);
	return out;
}
console.log(temp(571, 2));

console.log(temp(571, 5));

console.log(temp(571, 8))

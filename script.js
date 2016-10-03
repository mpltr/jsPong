function gbi(ID){
	return document.getElementById(ID);
}

gbi('start').addEventListener("click", function(){
	this.style.display = "none";
	play();
})

function play(){
	var verticalSpeed     = 22;
	var verticalDirection = 10;
	setInterval(function(){
		var ballHeight = gbi('ball').offsetTop;
		if(ballHeight == 390){
			verticalDirection = -10;
		} else if (ballHeight == 0){
			verticalDirection = 10;
		}
		gbi('ball').style.top        = ballHeight + verticalDirection + 'px';
	}, verticalSpeed);
	var horizontalSpeed     = 10;
	var horizontalDirection = 10;
	setInterval(function(){
		var ballOffset = gbi('ball').offsetLeft;
		if(ballOffset == 780) {
			var ballheight   = gbi('ball').offsetTop;
			var paddleHeight = gbi('paddle').offsetTop;
			if (paddleHeight >= (ballheight - 60) && paddleHeight <= (ballheight)) {
				horizontalDirection = -10;
			} 
		} else if (ballOffset == 0){
			horizontalDirection = 10;
		} else if(ballOffset == 790){
			return;
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
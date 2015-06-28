var minLengthX = 309;
var maxLengthX = 309+500;
var minLengthY = 79.88;
var maxLengthY = 500+79.88,
	numMachine = 1,
	time = 10,
	tt = [0,200,500,800],
	score = 0,
	IntervalId,
	game = 0;
	var box = new MyObject(x = minLengthX+240,y = minLengthY+240);
	var Mac = new Machine();
	
$(document).ready(function(){
	document.getElementById("counter").value=time;
	box.create();
	$(".box").click(function(){
		startgame();
		IntervalId = window.setInterval(function(){
  		box.checkhit();
		}, 5);
	});
	
});

function startgame(){
	if(!game){
		game = 1;
		$(".text").css('font-size','0px');
		$(".map").css('cursor','none');
		Mac.CreateMac(numMachine);
		setTimeout(function(){
			Mac.Macmove(numMachine);
			settime();
		},500);   	
		$(".map").mousemove(function(e){
			box.moveto(e.pageX,e.pageY);
  		});	
	}
  	
}
function alertbox(word){
	$(".massbox").remove();
	var div = '<div class="massbox">' + word + '</div>';
	$(".textbox").prepend(div);
	$(".textbox").css('display','block');
	
}
function endgame(){
	game = 0;
	window.clearInterval(IntervalId);
	$(".map").css('cursor','default');
	$(".box").remove();
	var scoreText = "Score: " + score;
	alertbox(scoreText);
	$(".textbut").on('click',function(){
	location.reload();	
	});
	
}
function nextstage(){
	score+=5;
 	numMachine++;
 	$(".Mac").remove();
 	var next = "Next Level";
 	alertbox(next);
 	$(".textbut").on('click',function(){
		reset();
	});
}

function reset(){
	window.clearInterval(IntervalId);
	$(".Mac").remove();
	$(".level").remove();
	var div = "<div class = 'level'>" + "Level "+numMachine+"</div>";
	$(".head").before(div);
	$(".textbox").css('display','none');
	document.getElementById("counter").value=time;
	$(".map").css('cursor','default');
	box.moveto(x = minLengthX+240,y = minLengthY+240);
 	$(".text").css('font-size','20px');	
 	$(".map").off();
 	game = 0;
}

function MyObject(x,y){
	this.x = x;
	this.y = y;
	
	this.create = function(){
		var div = '<div class="box"></div>';
		$(".map").append(div);
		$(".box").css("left",x+"px");
		$(".box").css("top",y+"px");
	}
	this.moveto = function(x,y){
		if(y < maxLengthY && y > minLengthY){
 			$(".box").css({'top': y});
 		}
 		if(x < maxLengthX && x > minLengthX){
 			$(".box").css({'left': x});
 		}

	}
	this.checkhit = function(){
		var hit_list = $(".box").collision(".Mac");
		if(hit_list.length){
			endgame();			
		}
	}
} 


function Machine(){

	this.CreateMac = function(n){
		for(var i = 1 ;i <= n ; i++){
			var Class = "Mac" + " " + i;
			var div = "<div class = '" + Class + "'></div>";
			$(".map").append(div);
			do{
				var x = Math.floor((Math.random() * (maxLengthX-minLengthX+1))+minLengthX);
				var y = Math.floor((Math.random() * (maxLengthY-minLengthY+1))+minLengthY);
		 		Class = ".Mac" + "." + i;
				$(Class).css("left",x);
				$(Class).css("top",y);
				var hit_list = $(".box").collision(Class);
			}while(hit_list.length == 1);	
		}
	}
	this.Macmove = function(n){
		for(var i = 1 ;i <= n ; i++){
				move(0,i);
		}
	}
}

function move(s,num){
	do{
		var side =	Math.floor((Math.random() * 4)+1);	
	}while(side == s);

	switch(side){
		case 1: // top
		var x = Math.floor((Math.random() * (maxLengthX-minLengthX+1))+minLengthX);
		var y = minLengthY;
		break;

		case 2: // right
		var x = maxLengthX;
		var y = Math.floor((Math.random() * (maxLengthY-minLengthY+1))+minLengthY);
		break;

		case 3: // bott
		var x = Math.floor((Math.random() * (maxLengthX-minLengthX+1))+minLengthX);
		var y = maxLengthY;
		break;

		case 4: // left
		var x = minLengthX;
		var y = Math.floor((Math.random() * (maxLengthY-minLengthY+1))+minLengthY);
		break;

		}
		var Class = ".Mac" + "." + num;
		var t = Math.floor((Math.random() * 4));
			setTimeout(function(){
				$(Class).animate({top: y+"px" , left: x+"px"},1000,function(){
				move(side,num);
				});
			},tt[t]);		
}

function settime(){
	var seconds=time+1;
	display(time,seconds);
}
function display(time,seconds){
	if(game == 0){
 		return;
 	}
    seconds--;
 	document.getElementById("counter").value=seconds;
 	if(seconds==0){
 		nextstage();
 		return;
 	} 
    score++;
    setTimeout("display("+time+","+seconds+")",1000);
}

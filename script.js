var minLengthX = 309;
var maxLengthX = 309+500;
var minLengthY = 21+44.88;
var maxLengthY = 21+500+44.88;
var numMachine = 1;
var time = 10;
var tt = [0,200,500,800];
var score = 0;
var IntervalId;
var game = 0;
	var box = new MyObject(x = minLengthX+240,y = minLengthY+240,length = 25);
	var Mac = new Machine();
	var map = new MyMap();


$(document).ready(function(){
	
	map.CreateMap();
	Mac.check = 0;
	document.getElementById("counter").value=time;
	
	IntervalId = window.setInterval(function(){
  		box.checkhit();
	}, 5);
	
	$(".box").click(function(){
		startgame();
	});
	
});
function startgame(){
	game = 1;
	$(".text").css('font-size','0px');
	$(".map").css('cursor','none');
	if(Mac.check == 0){
		Mac.CreateMac(numMachine);
    	settime();
		Mac.check = 1;
	}
	$(".map").mousemove(function(e){
		box.moveto(e.pageX,e.pageY);
  	});
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

function MyObject(x,y,length){
	this.x = x;
	this.y = y;
	this.length = length;
	var div = '<div class="box"></div>';
	$(".map").append(div);
	$(".box").css("left",x+"px");
	$(".box").css("top",y+"px");
	
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
		var x = Math.floor((Math.random() * (maxLengthX-minLengthX+1))+minLengthX);
		var y = Math.floor((Math.random() * (maxLengthY-minLengthY+1))+minLengthY);
		 Class = ".Mac" + "." + i;
		 
		$(Class).css("left",x);
		$(Class).css("top",y);
		move(0,i);
		}

		
	}
}

function move(s,num){
		
		do{
			var side =	Math.floor((Math.random() * 4)+1);	
		}while(side == s);
		var x;
		var y;
		switch(side){
			case 1: // top
			 x = Math.floor((Math.random() * (maxLengthX-minLengthX+1))+minLengthX);
			 y = minLengthY;
			 break;

			 case 2: // right
			 x = maxLengthX;
			 y = Math.floor((Math.random() * (maxLengthY-minLengthY+1))+minLengthY);
			 break;

			 case 3: // bott
			 x = Math.floor((Math.random() * (maxLengthX-minLengthX+1))+minLengthX);
			 y = maxLengthY;
			 break;

			 case 4: // left
			 x = minLengthX;
			 y = Math.floor((Math.random() * (maxLengthY-minLengthY+1))+minLengthY);
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




function MyMap(){
	this.map = [
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0]
			  ];

	this.CreateMap = function(){
		var wall = "<div class = 'wall'></div>";
		for(var i = 0,y = this.map.length; i < y ; i++){
			for(var j = 0,x = this.map[0].length; j < x ; j++){
				if(this.map[i][j] == 1){
					$(".map").append(wall);
					$(".wall").last().css("left",j*50);
					$(".wall").last().css("top",i*50);
				}
			}
		}
	}
}


function settime(){

	var seconds=time+1;
	document.getElementById("counter").value=time;

	display(time,seconds);
}
function display(time,seconds){
	if(game == 0){
 		return;
 	}
    seconds-=1;
 	
 	document.getElementById("counter").value=seconds;
 	
 	if(seconds==0){
 		nextstage();
 		return;
 	} 
 	
    score++;
    setTimeout("display("+time+","+seconds+")",1000);
}

function reset(){
	$(".Mac").remove();
	$(".level").remove();
	var div = "<div class = 'level'>Level "+numMachine+"</div>";
	$(".head").before(div);
	$(".textbox").css('display','none');
	document.getElementById("counter").value=time;
	$(".map").css('cursor','default');
	box.moveto(x = minLengthX+240,y = minLengthY+240);
 	$(".text").css('font-size','20px');	
 	$(".map").off();
 	Mac.check = 0;
}
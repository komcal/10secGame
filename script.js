var minLengthX = 309;
var maxLengthX = 309+450;
var minLengthY = 21;
var maxLengthY = 21+450;
var numMachine = 2;
var time = 10;
$(document).ready(function(){
	settime();

	var box = new MyObject(x = minLengthX,y = minLengthY,length = 50);

	var map = new MyMap();
	map.CreateMap();

	var Mac = new Machine();
	
	
	for(var i = 1 ;i <= numMachine ;i++){
		Mac.CreateMac(i);
		move(0,i);
	}

	window.setInterval(function(){
  		box.checkhit()
	}, 50);



	$(document).keydown(function(e) {
		box.position(e.which,map.map);
		box.moveto();
		
	});
	
	
	
});

function Machine(){
	this.CreateMac = function(n){
		var Class = "Mac" + " " + n;
		var div = "<div class = '" + Class + "'></div>";
		$(".map").append(div);
		var x = Math.floor((Math.random() * (maxLengthX-minLengthX+1))+minLengthX);
		var y = Math.floor((Math.random() * (maxLengthY-minLengthY+1))+minLengthY);
		 Class = ".Mac" + "." + n;
		 
		$(Class).css("left",x);
		$(Class).css("top",y);
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
		$(Class).animate({top: y+"px" , left: x+"px"},1000,function(){
			move(side,num);
		});
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



function MyObject(x,y,length){
	this.x = x;
	this.y = y;
	this.length = length;
	$(".box").css("left",x+"px");
	$(".box").css("top",y+"px");
	

	this.position = function(keypress,map){
			var x = (this.x-minLengthX)/this.length;
			var y = (this.y-minLengthY)/this.length;
			
		switch(keypress) {
        case 37: // left
        if(this.x > minLengthX && map[y][x-1] == 0){
        	this.x-=this.length;
    	}
        break;

        case 38: // up
        if(this.y > minLengthY && map[y-1][x] == 0){
        	this.y-=this.length;
    	}
        break;

        case 39: // right
        if(this.x < maxLengthX && map[y][x+1] == 0){
        	this.x+=this.length;
    	}
        break;

        case 40: // down
        if(this.y < maxLengthY && map[y+1][x] == 0){
        	this.y+=this.length;
    	}
        break;   
    	}	
	};
	this.moveto = function(map){
		$(".box").animate({top: this.y+"px" , left: this.x+"px"},10,function(){
			
		});	
		
	}
	this.checkhit = function(){
		var hit_list = $(".box").collision(".Mac");
		
		if(hit_list.length){
			console.log(hit_list.length);
			location.reload();
		}
	}
} 

function settime(){

	var seconds=time+1;
	document.getElementById("counter").value=time;

	display(time,seconds);
}
function display(time,seconds){

    seconds-=1;
 	
 	document.getElementById("counter").value=seconds;
 	if(seconds==0){alert("You WIN!!!");
 		location.reload();
 	} 
    
    setTimeout("display("+time+","+seconds+")",1000);
}
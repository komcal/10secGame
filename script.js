var minLengthX = 309;
var maxLengthX = 309+500;
var minLengthY = 21;
var maxLengthY = 21+500;
var numMachine = 1;
var time = 10;
var tt = [0,200,500,800];
$(document).ready(function(){
	
	var box = new MyObject(x = minLengthX+200,y = minLengthY+200,length = 25);

	var map = new MyMap();
	map.CreateMap();

	
	
	window.setInterval(function(){
  		box.checkhit()
	}, 1);

	/*$(document).keydown(function(e) {
			box.position(e.which,map.map);
			box.moveto();
		});*/
	var e = 0;
	
	$(".box").hover(function(){
		if(e == 0){
			createMachine(numMachine);
			e++;
		}
		$(".map").mousemove(function(e){
		console.log(e.pageY +  " " + e.pageX);
		if(e.pageY < maxLengthY && e.pageY > minLengthY){
			$(".box").css({'top': e.pageY});
		}
		if(e.pageX < maxLengthX && e.pageX > minLengthX){
			$(".box").css({'left': e.pageX});
		}
      
  	});
	});
	
	
});


function createMachine(num){
	var Mac = new Machine();
	
	setTimeout(function(){
    for(var i = 1 ;i <= num ;i++){
		Mac.CreateMac(i);
		move(0,i);
	}
    settime();
	}, 3000);


}

function MyObject(x,y,length){
	this.x = x;
	this.y = y;
	this.length = length;
	var div = '<div class="box"></div>';
	$(".map").append(div);
	$(".box").css("left",x+"px");
	$(".box").css("top",y+"px");
	

	this.position = function(keypress,map){
			var x = (this.x-minLengthX)/this.length;
			var y = (this.y-minLengthY)/this.length;
			
		switch(keypress) {
        case 37: // left
        if(this.x > minLengthX){
        	this.x-=this.length;
    	}
        break;

        case 38: // up
        if(this.y > minLengthY){
        	this.y-=this.length;
    	}
        break;

        case 39: // right
        if(this.x < maxLengthX){
        	this.x+=this.length;
    	}
        break;

        case 40: // down
        if(this.y < maxLengthY){
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
			alert("YOU LOSE!!!");
			location.reload();
		}
	}
} 


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
		var t = Math.floor((Math.random() * 4));
		console.log(tt[t]);
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

    seconds-=1;
 	
 	document.getElementById("counter").value=seconds;
 	if(seconds==0){
 		$(".Mac").remove();
 		numMachine++;
 		$(".map").off();
 		alert("STAGE " + numMachine);
 		createMachine(numMachine);
 		return;
 	} 
    
    setTimeout("display("+time+","+seconds+")",1000);
}
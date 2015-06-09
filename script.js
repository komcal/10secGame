$(document).ready(function(){

	var box = new MyObject(x = 0,y = 0,length = 50);
	var map = new MyMap();
	map.CreateMap();

	var Mac = new Machine();
	Mac.CreateMac();
	

	window.setInterval(function(){
  		box.checkhit()

	}, 50);



	$(document).keydown(function(e) {
		box.position(e.which,map.map);
		box.moveto();
		
	});
	move(0);

});

function Machine(){
	this.CreateMac = function(){
		var div = "<div class = 'Mac'></div>";
		$(".map").append(div);
		var x = Math.floor((Math.random() * 450));
		var y = Math.floor((Math.random() * 450));
		$(".Mac").last().css("left",x+309);
		$(".Mac").last().css("top",y+21);
	}

}

function move(s){
		
		do{
			var side =	Math.floor((Math.random() * 4)+1);	
		}while(side == s);
		var x;
		var y;
		switch(side){
			case 1: // top
			 x = Math.floor((Math.random() * 450));
			 y = 0;
			 break;

			 case 2: // right
			 x = 450;
			 y = Math.floor((Math.random() * 450));
			 break;

			 case 3: // bott
			 x = Math.floor((Math.random() * 450));
			 y = 450;
			 break;

			 case 4: // left
			 x = 0;
			 y = Math.floor((Math.random() * 450));
			 break;

		}
		console.log(x + " " + y);
		$(".Mac").animate({top: y+21+"px" , left: x+309+"px"},1000,function(){
			move(side);
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

		var x = this.x/50;
		var y = this.y/50;
		switch(keypress) {
        case 37: // left
        if(this.x > 0 && map[y][x-1] == 0){
        	this.x-=this.length;
    	}
        break;

        case 38: // up
        if(this.y > 0 && map[y-1][x] == 0){
        	this.y-=this.length;
    	}
        break;

        case 39: // right
        if(this.x < 450 && map[y][x+1] == 0){
        	this.x+=this.length;
    	}
        break;

        case 40: // down
        if(this.y < 450 && map[y+1][x] == 0){
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



/*function maze(x,y) {
    var n=x*y-1;
    if (n<0) {alert("illegal maze dimensions");return;}
    var horiz=[]; for (var j= 0; j<x+1; j++) horiz[j]= [];
    var verti=[]; for (var j= 0; j<y+1; j++) verti[j]= [];
    var here= [Math.floor(Math.random()*x), Math.floor(Math.random()*y)];
    var path= [here];
    var unvisited= [];
    for (var j= 0; j<x+2; j++) {
        unvisited[j]= [];
        for (var k= 0; k<y+1; k++)
            unvisited[j].push(j>0 && j<x+1 && k>0 && (j != here[0]+1 || k != here[1]+1));
    }
    while (0<n) {
        var potential= [[here[0]+1, here[1]], [here[0],here[1]+1],
            [here[0]-1, here[1]], [here[0],here[1]-1]];
        var neighbors= [];
        for (var j= 0; j < 4; j++)
            if (unvisited[potential[j][0]+1][potential[j][1]+1])
                neighbors.push(potential[j]);
        if (neighbors.length) {
            n= n-1;
            next= neighbors[Math.floor(Math.random()*neighbors.length)];
            unvisited[next[0]+1][next[1]+1]= false;
            if (next[0] == here[0])
                horiz[next[0]][(next[1]+here[1]-1)/2]= true;
            else 
                verti[(next[0]+here[0]-1)/2][next[1]]= true;
            path.push(here= next);
        } else 
            here= path.pop();
    }
    return ({x: x, y: y, horiz: horiz, verti: verti});
}

function display(m) {
    var text= [];
    for (var j= 0; j<m.x*2+1; j++) {
        var line= [];
        if (0 == j%2)
            for (var k=0; k<m.y*4+1; k++)
                if (0 == k%4) 
                    line[k]= '+';
                else
                    if (j>0 && m.verti[j/2-1][Math.floor(k/4)])
                        line[k]= ' ';
                    else
                        line[k]= '-';
        else
            for (var k=0; k<m.y*4+1; k++)
                if (0 == k%4)
                    if (k>0 && m.horiz[(j-1)/2][k/4-1])
                        line[k]= ' ';
                    else
                        line[k]= '|';
                else
                    line[k]= ' ';
        if (0 == j) line[1]= line[2]= line[3]= ' ';
        if (m.x*2-1 == j) line[4*m.y]= ' ';
        text.push(line.join('')+'\r\n');
    }
    return text.join('');
}*/














window.onload = function() {
	var a=0,v=1;
	var fx,fy,growth=10,foodsize=5,level=0;
	var count=0,eventcount=0,trans=0,watercount=0;
	var canvas = new Array();
	var ctx = new Array();
	var xsoll,ysoll,xpos=10,ypos=10,xstep,ystep,deltax,deltay,alpha;
	var body=document.getElementsByTagName("body");
	var div=document.getElementById("div");
	var t,t2,tf,tfall,tcolorchange,tboost;
	var control=document.getElementById("control");
	player=document.getElementById("player");
	player2d=player.getContext("2d");
	shadow=document.getElementById("playershadow");
	shadow2d=player.getContext("2d");
	events=document.getElementById("events");
	for (i=0;i<=3;i++) {
		canvas[i]=document.getElementById("canvas"+i);
		ctx[i]=canvas[i].getContext("2d");
	}
	background();
	fplayer(xpos,ypos);
	ctx[0].strokeColor="white";
	ctx[0].strokeRect(19,100,102,20);
	tf=setInterval(ffood,3000);	
	///////////////////fall-game/////////////////////
	function flevel2() {
		
	}
///////////////////fall-game/////////////////////
	control.onclick = function(event) {
		v=1;  
		clearInterval(t);  
		xsoll=event.clientX;
		ysoll=event.clientY;
		deltax=xsoll-xpos; 
		deltay=ysoll-ypos; 
		alpha=Math.abs(Math.atan(deltax/deltay));
		xstep=(v-0.3)*Math.sin(alpha)*Math.abs(deltax)/deltax;
		ystep=(v-0.3)*Math.cos(alpha)*Math.abs(deltay)/deltay;
		t=setInterval(move,5); 
	}
	function move() {
		v+=0.05;
		//ctx[0].fillRect(0,0,300,40);
		//ctx[0].font="30px Arial";
		//ctx[0].strokeText(Math.floor(xpos)+":"+Math.floor(ypos)+":"+fx+":"+fy,0,20);
		xpos+=xstep*v;
		ypos+=ystep*v;  
		fplayer(xpos,ypos); 
		if(xpos-2<=xsoll&&xpos+2>=xsoll&&ypos-2<=ysoll&&ypos+2>=ysoll) {
			clearInterval(t);
		}    
		if(level==0&&xpos-growth<=fx&&xpos+growth-foodsize>=fx&&ypos-growth<=fy&&ypos+growth-foodsize>=fy) {
			ctx[0].fillStyle="white";
			growth++;   
			bigger();
			exp();
			fx=undefined;
			fy=undefined;
			events.width=0;
			events.height=0;
			if(growth==20) {
			clearInterval(tf); 
				level=1;
				events.style.background="black";
				fy=Math.floor(Math.random()*(canvas[0].height/40))*40;
				events.style.top=fy+"px";
				fx=Math.floor(Math.random()*(canvas[0].width/40))*40;  
				events.style.left=fx+"px";
				events.width=40;
				events.height=40;
			}
		}
		if(level==1&&xpos>=fx&&xpos<=fx+40&&ypos>=fy&&ypos<=fy+40) {
			player2d.clearRect(0,0,player.width,player.height);
			xpos=fx+10;
			ypos=fy+10;
			level=2;
			control.width=0;
			control.height=0;
			clearInterval(t);
			player2d.save();
			player2d.translate(10,10);
			tfall=setInterval(fall,20);     
		}
	}
	function fplayer(x,y) {   
		player.style.top=y-growth+"px";
		player.style.left=x-growth+"px"; 
		player2d.beginPath();     
		player2d.fillStyle="yellow";
		player2d.arc(11,11,10,0,Math.PI*2,true);   
		player2d.fill();
		player2d.stroke();
		player2d.beginPath();     
		player2d.fillStyle="black";
		player2d.arc(8,8,1.2,0,Math.PI*2,true);   
		player2d.fill();
		player2d.beginPath();
		player2d.arc(14,8,1.2,0,Math.PI*2,true);   
		player2d.fill();
		count++;
		if(count<=40) {
			player2d.beginPath();
			player2d.arc(11,12,3.3,Math.PI*0.8,Math.PI*0.2,true);
			player2d.stroke();
		}
		else if(count<=80) {
			player2d.beginPath();
			player2d.arc(11,15.8,2.5,0,Math.PI*2,true);
			player2d.fill();    
			count==80?count=0:true;
		}
	}
	function ffood() {
		fx=Math.random()*canvas[0].width;
		fy=Math.random()*canvas[0].height;  
		events.style.top=fy+"px";
		events.style.left=fx+"px";  
		events.width=4;
		events.height=4;
	}
	function bigger() {
		player.width=21+growth*2;
		player.height=21+growth*2;
		player2d.scale(1+(growth-10)/10,1+(growth-10)/10);          
	}
	function background() {
		var bchange=false;
		for(j=0;j<=canvas[0].height;j+=40) {
			for(i=0;i<=canvas[0].width;i+=80) {
				if(bchange) {
					ctx[0].fillStyle="grey";
					ctx[0].fillRect(i,j,40,40);
					ctx[0].fillStyle="brown";
					ctx[0].fillRect(i+40,j,40,40);
				}
				else {
					ctx[0].fillStyle="silver";
					ctx[0].fillRect(i,j,40,60);
					ctx[0].fillStyle="grey";
					ctx[0].fillRect(i+40,j,40,40);            
				}
			}
			bchange?bchange=false:bchange=true;
		}
	}
	function background2() {
		var bchange=false;
		for(j=0;j<=canvas[0].height;j+=320) {
			for(i=0;i<=canvas[0].width;i+=640) {
				if(bchange) {
					ctx[0].fillStyle="green";
					ctx[0].fillRect(i,j,320,320);
					ctx[0].fillStyle="grey";
					ctx[0].fillRect(i+320,j,320,320);
				}
				else {
					ctx[0].fillStyle="gold";
					ctx[0].fillRect(i,j,320,320);
					ctx[0].fillStyle="silver";
					ctx[0].fillRect(i+320,j,320,320);            
				}
			}
			bchange?bchange=false:bchange=true;
		}
	}
	function fall() {
		eventcount++;
		player2d.clearRect(0,0,player.width,player.height);
		xpos+=0.05;
		ypos+=0.05;
		fplayer(xpos,ypos);
		player2d.scale(0.99,0.99);
		if(eventcount==200) {
			clearInterval(tfall);
			eventcount=0;
			player2d.restore();
			fall2();    
			player2d.clearRect(0,0,player.width,player.height);  
		}
	}  
	function fall2() {
		canvas[2].style.display="inline"; 
		control.style.display="none";
		t=setInterval(colorchange,20);
	}
	function colorchange() {
		if(trans<1&&a==0) {
			trans+=0.02;
		}
		else {
			if(a==0) {
				fplayer(xpos,ypos);
				control.width=360;
				control.height=512;       
				background2();
				events.width=0;
				events.height=0;
				t2 = setInterval(water,10);
				canvas[1].style.display="inline";
				ctx[1].fillStyle = "rgba(0,0,255,0.5)"
				ctx[1].fillRect(0,0,canvas[1].width,canvas[1].height);
				a=1;
			} 
			trans-=0.02;
			if(trans<=0) {
				canvas[2].style.display="none";
				control.style.display="inline";
				clearInterval(t);  
			}  
		}
		color="rgba(0,0,0,"+trans+")";
		canvas[2].style.background=color; 
	}
	function exp() {
		ctx[0].fillStyle="green";
		ctx[0].fillRect(20,101,10*(growth-10),18);          
	}
	function water() {   
		ypos++;
		ysoll++;
		fplayer(xpos,ypos);   
	}
}
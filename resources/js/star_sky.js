var WINDOW_WIDTH = document.body.offsetWidth;
var WINDOW_HEIGHT = document.body.offsetHeight;
var canvas,context;
var num = 500;
var stars = [];
var mouseX = WINDOW_WIDTH/2;
var mouseY = WINDOW_HEIGHT/2;
var rnd;

window.onload = function(){
    canvas = document.getElementById('canvas');
    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;

    context = canvas.getContext('2d');

    addStar();
    setInterval(render,33);
    liuxing();

    // render();
    document.body.addEventListener('mousemove',mouseMove);
}

function liuxing(){
    var time = Math.round(Math.random()*3000+33);
    setTimeout(function(){
        rnd = Math.ceil(Math.random()*stars.length)
        liuxing();
    },time)
}

function mouseMove(e){
    //因为是整屏背景，这里不做坐标转换
    mouseX = e.clientX;
    mouseY = e.clientY;
}

function render(){
    context.fillStyle = 'rgba(0,0,0,0.1)';
    context.fillRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
    // context.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT)
    for(var i =0; i<num ; i++){
        var star = stars[i];
        if(i == rnd){
            star.vx = -5;
            star.vy = 20;
            context.beginPath();
            context.strokeStyle = 'rgba(255,255,255,'+star.alpha+')';
            context.lineWidth = star.r;
            context.moveTo(star.x,star.y);
            context.lineTo(star.x+star.vx,star.y+star.vy);
            context.stroke();
            context.closePath();
        }
        star.alpha += star.ra;
        if(star.alpha<=0){
            star.alpha = 0;
            star.ra = -star.ra;
            star.vx = Math.random()*0.2-0.1;
            star.vy = Math.random()*0.2-0.1;
        }else if(star.alpha>1){
            star.alpha = 1;
            star.ra = -star.ra
        }
        star.x += star.vx;
        if(star.x>=WINDOW_WIDTH){
            star.x = 0;
        }else if(star.x<0){
            star.x = WINDOW_WIDTH;
            star.vx = Math.random()*0.2-0.1;
            star.vy = Math.random()*0.2-0.1;
        }
        star.y += star.vy;
        if(star.y>=WINDOW_HEIGHT){
            star.y = 0;
            star.vy = Math.random()*0.2-0.1;
            star.vx = Math.random()*0.2-0.1;
        }else if(star.y<0){
            star.y = WINDOW_HEIGHT;
        }
        context.beginPath();
        var bg = context.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.r);
        bg.addColorStop(0,'rgba(255,255,255,'+star.alpha+')')
        bg.addColorStop(1,'rgba(255,255,255,0)')
        context.fillStyle  = bg;
        context.arc(star.x,star.y, star.r, 0, Math.PI*2, true);
        context.fill();
        context.closePath();
    }
}

function addStar(){
    for(var i = 0; i<num ; i++){
        var aStar = {
            x:Math.round(Math.random()*WINDOW_WIDTH),
            y:Math.round(Math.random()*WINDOW_HEIGHT),
            r:Math.random()*3,
            ra:Math.random()*0.05,
            alpha:Math.random(),
            vx:Math.random()*0.2-0.1,
            vy:Math.random()*0.2-0.1
        }
        stars.push(aStar);
    }
}
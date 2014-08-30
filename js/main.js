var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var log = document.getElementById('log');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//globals
var isDragging = false;
var draggingObj;

//testing drag
function GameObject(imgFile, w, h, point, ctx){
  var self = this;
  var img = new Image();
  this.width = w;
  this.height = h;
  this.location = {x:point.x, y:point.y}
  
  img.onload = function(){
   self.Draw();
  };
  img.src = imgFile;
  
  self.Draw = function(){
    ctx.drawImage(img, this.location.x, this.location.y, this.width, this.height);
  }
  
  self.ContainsPoint = function(p){
    if(p.x > this.location.x && p.x < this.location.x+this.width && p.y > this.location.y && p.y < this.location.y+this.height){
      return true;
    }
    else{
      return false;
    }
  }
}

var cat = new GameObject("img/cat.png", 100, 200, {x:0,y:0}, ctx);


function draw(){
  // clear the canvas
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
  
  cat.Draw();
  
}

canvas.addEventListener('mousedown', function(evt){  
  var mousePos = getMousePos(evt);
  if(cat.ContainsPoint(mousePos)){
    isDragging = true;
    draggingObj = cat;
  }
  log.innerText = 'mousedown';
}, false);

canvas.addEventListener('touchstart', function(evt){  
  var mousePos = getMousePos(evt.touches[0]);
  if(cat.ContainsPoint(mousePos)){
    isDragging = true;
    draggingObj = cat;
  }
  log.innerText = 'touchstart';
}, false);

function Drag(point){
  if(isDragging){
    
    draggingObj.location.x = point.x - draggingObj.width/2;
    draggingObj.location.y = point.y - draggingObj.height/2;
    draw();
  }
  log.innerText = 'moving';
}

canvas.addEventListener('mousemove', function(evt) {
  var mousePos = getMousePos(evt);
  Drag(mousePos);
});

canvas.addEventListener('touchmove', function(evt){
  evt.preventDefault();
  var mousePos = getMousePos(evt.touches[0]);
  Drag(mousePos)
});


canvas.addEventListener("mouseup", function(evt){
  isDragging = false;
  log.innerText = 'mouseup';
});

canvas.addEventListener("touchend", function(evt){
  isDragging = false;
  log.innerText = 'touchend';
});


function getMousePos(evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.pageX - rect.left,
    y: evt.pageY - rect.top
  };
}



// GAME LOOP - might not need this since we could do event based game
// var FPS = 30;
// setInterval(function() {
//   update();
//   draw();
// }, 1000/FPS);
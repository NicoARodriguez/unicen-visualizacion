function Cuadrado(ctx,x,y,rad,sides,startAngle,anticlockwise,color,bool){
  this.ctx = ctx;
  this.bool = bool;
  this.posX = x;
  this.posY = y,
  this.radius = rad;
  this.sides = sides;
  this.angle = startAngle,
  this.anticlock = anticlockwise;
  this.color = color;

  Cuadrado.prototype.dibujar = function() {
   if (this.sides < 3) return;
    let a = (Math.PI * 2)/this.sides;
   a = this.anticlock?-a:a;
   this.ctx.save();
   this.ctx.beginPath();
   this.ctx.translate(this.posX,this.posY);
   this.ctx.rotate(this.angle);
   this.ctx.moveTo(this.radius,0);
   for (let i = 1; i < this.sides; i++) {
     this.ctx.lineTo(this.radius*Math.cos(a*i),this.radius*Math.sin(a*i));
   }
   this.ctx.fillStyle = this.color;
   this.ctx.fill();
   this.ctx.closePath();
   this.ctx.restore();
  }

  Cuadrado.prototype.mover = function(x,y){
    this.posX = x;
    this.posY = y;
    this.dibujar();
  }

  Cuadrado.prototype.getPos = function(){
    let arrPos = new Array();
    arrPos.x = this.posX;
    arrPos.y = this.posY;
    return (arrPos);
  }
}

function Circle(x,y,radio,color,bool,ctx){
   this.posX = x;
   this.posY = y;
   this.radio = radio;
   this.color = color;
   this.ctx = ctx
   this.bool = bool;

 Circle.prototype.dibujar = function(){
   this.ctx.beginPath();
   this.ctx.lineWidth = 30;
   this.ctx.fillStyle = this.color;
   this.ctx.arc(this.posX, this.posY, this.radio, 0, Math.PI * this.radio);
   this.ctx.fill();
   this.ctx.closePath();
 }

 Circle.prototype.mover = function(x,y){
  this.posX = x;
  this.posY = y;
  this.dibujar();
 }

 Circle.prototype.getPos = function(){
   let arrPos = new Array();
   arrPos.x = this.posX;
   arrPos.y = this.posY;
   return (arrPos);
 }
}

function Estrella (x,y,R,L,paso,bool,color,ctx){
    this.posX = x;
    this.posY = y;
    this.R = R;
    this.L = L;
    this.paso = paso;
    this.ctx = ctx;
    this.bool = bool;
    this.color = color;

 Estrella.prototype.dibujar = function() {
               this.ctx.fillStyle = this.color;
               let estrella= L / paso;
               let rad = (2*Math.PI) / estrella;
               this.ctx.beginPath();
                     for( var i = 0; i < L; i++ ){
                     x = this.posX + this.R * Math.cos( rad*i );
                     y = this.posY + this.R * Math.sin( rad*i );
                     this.ctx.lineTo(x, y);
                     }
               this.ctx.closePath();
               this.ctx.fill();
 }

 Estrella.prototype.mover = function(x,y){
  this.posX = x;
  this.posY = y;
  this.dibujar();
 }

 Estrella.prototype.getPos = function(){
   let arrPos = new Array();
   arrPos.x = this.posX;
   arrPos.y = this.posY;
   return (arrPos);
 }

}

function Polygon(x,y,tamanio,lados,paso,color,bool,ctx){
   this.posX = x;
   this.posY = y;
   this.color = color;
   this.R = tamanio;
   this.lados = lados;
   this.paso = paso;
   this.ctx = ctx;
   this.bool = bool;

 Polygon.prototype.dibujar = function(){
   this.ctx.save();
   this.ctx.fillStyle = this.color;
   this.ctx.strokeStyle = "black";
   this.ctx.lineWidth = 3;
   let polygon = lados/paso;
   let rad = (2*Math.PI)/polygon;
   this.ctx.beginPath();
      for(i = 0; i < lados; i++ ){
      x = this.posX + this.R * Math.cos(rad*i);
      y = this.posY + this.R * Math.sin(rad*i);
      this.ctx.lineTo(x, y);
      }
   this.ctx.closePath()
   this.ctx.fill();
   this.ctx.stroke();
 }

 Polygon.prototype.mover = function(x,y){
  this.posX = x;
  this.posY = y;
  this.dibujar();
 }

 Polygon.prototype.getPos = function(){
   let arrPos = new Array();
   arrPos.x = this.posX;
   arrPos.y = this.posY;
   return (arrPos);
 }

 Polygon.prototype.getPos = function(){
   let arrPos = new Array();
   arrPos.x = this.posX;
   arrPos.y = this.posY;
   return (arrPos);
 }

}


function Triangle(x,y,color,bool,ctx){
  this.posX = x;
  this.posY = y;
  this.color = color;
  this.ctx = ctx;
  this.bool = bool;

 Triangle.prototype.dibujar = function(){
  this.ctx.strokeStyle = "#00ff00";
  this.ctx.fillStyle = this.color;
  this.ctx.beginPath();
  this.ctx.moveTo(this.posX,this.posY);
  this.ctx.lineTo(this.posX,this.posY-100);
  this.ctx.lineTo(this.posX-100,this.posY);
  this.ctx.closePath();
  this.ctx.fill();
 }

 Triangle.prototype.mover = function(x,y){
  this.posX = x;
  this.posY = y;
  this.dibujar();
 }

 Triangle.prototype.getPos = function(){
   let arrPos = new Array();
   arrPos.x = this.posX;
   arrPos.y = this.posY;
   return (arrPos);
 }
}

function Color(){
  this.hexadecimal = new Array
  ("0","1","2","3","4","5","6","7",
  "8","9","A","B","C","D","E","F");



 Color.prototype.aleatorio = function(inferior,superior){
    numPosibilidades = superior - inferior
    aleat = Math.random() * numPosibilidades
    aleat = Math.floor(aleat)
    return parseInt(inferior) + aleat
 }


 Color.prototype.dame_color_aleatorio = function(){
   color_aleatorio = "#";
   for (i=0;i<6;i++){
      posarray = aleatorio(0,this.hexadecimal.length)
      color_aleatorio += this.hexadecimal[posarray]
   }
   return color_aleatorio
 }
}

function Tablero(figuras,cantX,cantY){
   this.figuras = new ListFig();
   this.color = new Color();
   this.ctx = document.getElementById('canvasTabFiguras').getContext('2d');
   this.canvas = document.getElementById('canvasTabFiguras');
   this.cantFigX = cantX;
   this.cantFigY = cantY;

   const cuadrado = 0;
   const triangulo = 1;
   const poligono = 2;
   const circulo = 3;

 Tablero.prototype.dibujarFig = function(){
   figura = 1;
   random = 2;
   switch (random) {
     case 1:
        let triangulo = new Triangle(0,0,'#ff0000',this.ctx);
        triangulo.dibujar();
        break;
      case 2:
        break;
     default:
   }
  }
}

function ListFig(){
  this.figuras = [];

 ListFig.prototype.agregar = function(figura){
  this.figuras.push(figura);
 }

 ListFig.prototype.draw = function(){
  for (let i=0; i<this.figuras.length; i++){
    this.figuras[i].dibujar();
  }
 }

 ListFig.prototype.get = function(){
    return this.figuras;
  }
}

let delta = new Object();

function getDivisiones(width,height,cantPiezaX,cantPiezaY,canvas){
   let widthMax = canvas.width - width;
   let heightMax = canvas.height - height;
   let canvasDiv = new Array();
   let pos = 0;
  for (let i=width; i<canvas.width; i+=width/cantPiezaX){
    canvasDiv[pos] = new Array();
    canvasDiv[pos].widthMin = i;
    canvasDiv[pos].widthMax = i + width/cantPiezaX;
    pos+=1;
  }
   pos=0;
  for (let k=70; k<canvas.height; k+=height/cantPiezaY){
    canvasDiv[pos].heightMin = k;
    canvasDiv[pos].heightMax = k + height/cantPiezaY;
    pos+=1;
  }
  return canvasDiv;
}

function divideCanvas(){
  let cantPiezaX = 4;
  let cantPiezaY = 2;
  let canvasAdiv = document.getElementById('canvasTabFiguras');
  let width = canvasAdiv.width/2;
  let height = canvasAdiv.height/2;
  let divisiones = getDivisiones(width,height,cantPiezaX,cantPiezaY,canvasAdiv);
  return divisiones;
}

let arrastrar = false;
let canvas = document.getElementById('canvasTabFiguras');
canvas.addEventListener("mousedown", function(){
  let mx = event.clientX;
  let my = event.clientY;
  for (var i=0; i<figuras.length; i++){
    figuras[i].dibujar();
    if (ctx4.isPointInPath(mx,my)){
       ctx4.clearRect(0,0,canvas.width,canvas.height);
       figuras[i].bool = true;
       arrastrar=true;
    }
    else {
      figuras[i].bool =false;
    }
  }
  ctx4.clearRect(0,0,canvas.width,canvas.height);
  listaFigurasCopy.draw();
  listaFiguras.draw();
});

canvas.addEventListener("mousemove", function() {
  if (arrastrar) {
   for (let i=0; i<figuras.length; i++){
    if (figuras[i].bool){
      ctx4.clearRect(0,0,canvas.width,canvas.height);
      X = event.pageX; Y = event.pageY;
      figuras[i].mover(X,Y);
    }
   }
   listaFigurasCopy.draw();
   listaFiguras.draw();
  }
});


canvas.addEventListener("mouseup", function() {
   arrastrar = false;
   for (let i=0; i<figuras.length; i++){
      if (figuras[i].bool){
        posFig = figuras[i].getPos();
         if ((Math.abs(posFig.x - arregloSolucion[i].x)<15) &&
              (Math.abs(posFig.y - arregloSolucion[i].y)<15)){
                piezasColocadas++;
                ctx4.clearRect(0, 0, canvas.width, canvas.height);
                figuras[i].mover(arregloSolucion[i].x,arregloSolucion[i].y);
              }
      }
   }
   if (piezasColocadas == figuras.length){
     let mensaje = document.getElementById('mensaje');
     mensaje.innerHTML = 'Ganaste';
     listaFigurasCopy.draw();
     listaFiguras.draw();
   }
   listaFigurasCopy.draw();
   listaFiguras.draw();
});

canvas.addEventListener('mouseout', function(evt) {
      arrastrar = false;
      for (let i = 0; i < figuras.length; i++) {
        figuras[i].bool = false
      }
      ctx4.clearRect(0, 0, canvas.width, canvas.height);
      listaFigurasCopy.draw();
      listaFiguras.draw();
});


function dibujarTablero(figuras,divisiones,cantPiezaX,cantPiezaY){
  let py = 70;
  for (let i=0; i<figuras.length; i++){
      figuras[i].dibujar();
  }
}

ctx4 = document.getElementById('canvasTabFiguras').getContext('2d');
listaFiguras = new ListFig();
let circulo = new Circle(230,500, 60,'#0000ff',false,ctx4);
let triangulo2 = new Triangle(300,300,'#0000ff',false,ctx4);
let estrella = new Estrella(230,250,60,5,2,false,'#00ff00',ctx4);
let poligono = new Polygon(110,100,60,3,2,'#ff00ff',false,ctx4);
let poligono2 = new Cuadrado(ctx4,125,125,60,8,-Math.PI/2,false,"rgba(227,11,93,0.75)",false);
let poligono3 = new Cuadrado(ctx4,350,125,60,6,-Math.PI/2,true,"rgba(51,128,255,0.75)",false);
let poligono4 = new Cuadrado(ctx4,125,350,60,7,-Math.PI/2,false,"rgba(11,227,93,0.75)",false);
let poligono5 = new Cuadrado(ctx4,350,350,60,4,-Math.PI/2,true,"rgba(227,11,93,0.75)",false);


listaFiguras.agregar(circulo);
listaFiguras.agregar(triangulo2);
listaFiguras.agregar(estrella);
listaFiguras.agregar(poligono);
listaFiguras.agregar(poligono2);
listaFiguras.agregar(poligono3);
listaFiguras.agregar(poligono4);
listaFiguras.agregar(poligono5);
listaFiguras.draw();
figuras = listaFiguras.get();

listaFigurasCopy = new ListFig();
let circuloCopy = new Circle(700,120, 60,'#ffffff',false,ctx4);
let triangulo2Copy = new Triangle(900,175,'#ffffff',false,ctx4);
let estrellaCopy = new Estrella(1010,130,60,5,2,false,'#ffffff',ctx4);
let poligonoCopy = new Polygon(1140,130,60,3,2,'#ffffff',false,ctx4);
let poligono2Copy = new Cuadrado(ctx4,700,290,60,8,-Math.PI/2,true,"rgba(255,255,255,255)",false);
let poligono3Copy = new Cuadrado(ctx4,850,290,60,6,-Math.PI/2,false,"rgba(255,255,255,255)",false);
let poligono5Copy = new Cuadrado(ctx4,1000,290,60,4,-Math.PI/2,false,"rgba(255,255,255,255)",false);
let poligono4Copy = new Cuadrado(ctx4,1150,290,60,7,-Math.PI/2,false,"rgba(255,255,255,255)",false);

let piezasColocadas = 0;
let arregloSolucion = new Array();
arregloSolucion[0] = new Array();
arregloSolucion[1] = new Array();
arregloSolucion[2] = new Array();
arregloSolucion[3] = new Array();
arregloSolucion[4] = new Array();
arregloSolucion[5] = new Array();
arregloSolucion[6] = new Array();
arregloSolucion[7] = new Array();
arregloSolucion[0].x = 700;
arregloSolucion[0].y = 120;
arregloSolucion[1].x = 900;
arregloSolucion[1].y = 175;
arregloSolucion[2].x = 1010;
arregloSolucion[2].y = 130;
arregloSolucion[3].x = 1140;
arregloSolucion[3].y = 130;
arregloSolucion[4].x = 700;
arregloSolucion[4].y = 290;
arregloSolucion[5].x = 850;
arregloSolucion[5].y = 290;
arregloSolucion[6].x = 1150;
arregloSolucion[6].y = 290;
arregloSolucion[7].x = 1000;
arregloSolucion[7].y = 290;

listaFigurasCopy.agregar(circuloCopy);
listaFigurasCopy.agregar(triangulo2Copy);
listaFigurasCopy.agregar(estrellaCopy);
listaFigurasCopy.agregar(poligonoCopy);
listaFigurasCopy.agregar(poligono2Copy);
listaFigurasCopy.agregar(poligono3Copy);
listaFigurasCopy.agregar(poligono5Copy);
listaFigurasCopy.agregar(poligono4Copy);
figurasCopy = listaFigurasCopy.get();
divisiones = divideCanvas();
dibujarTablero(figurasCopy,divisiones,4,2);

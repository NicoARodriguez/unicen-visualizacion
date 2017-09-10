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


 Color.prototype.getColor = function(){
   color_aleatorio = "#";
   for (i=0;i<6;i++){
      posarray = this.aleatorio(0,this.hexadecimal.length)
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

let piezasColocadas = 0;

function jugar(ctx4,tabFiguras,figurasJuego,cantPiezaY,dificultad){

  function crearFigurasAleatorias(divisiones,cantPiezaX,cantPiezaY){
     let pieza = 0;
     let colorObj = new Color();
     let salio = false;
     for (let px=0; px<cantPiezaX; px++){
       for (let py=0; py<cantPiezaY; py++){
         let color = colorObj.getColor();
         let figuraAzar = Math.round(Math.random() * (4 - 0) +0);
         let posX = Math.round(Math.random() * (500 - 100) + 100);
         let posY = Math.round(Math.random() * (500 - 100) + 100);
         if (figuraAzar == 1 && salio==false){
           let estrella = new Estrella(divisiones[px][py].width,
             divisiones[px][py].height,60,5,2,false,'#ffffff',ctx4);
             tabFiguras.agregar(estrella);
            let estrellaCopy = new Estrella(posX,posY,60,5,2,false,color,ctx4);
            figurasJuego.agregar(estrellaCopy);
            salio=true;
         }
         else if (figuraAzar == 2 && salio==false){
           let circulo = new Circle(divisiones[px][py].width,
             divisiones[px][py].height,60,'#ffffff',false,ctx4);
             tabFiguras.agregar(circulo);
            let circuloCopy = new Circle(posX,posY,60,color,false,ctx4);
            figurasJuego.agregar(circuloCopy);
            salio=true;
         }
         else{
         let lados = Math.round(Math.random() * (12 - 3) + 3);
         let radio = 60;
         let poligono = new Cuadrado(ctx4,divisiones[px][py].width,
           divisiones[px][py].height,radio,lados,-Math.PI/2,true,'#ffffff',false);
           tabFiguras.agregar(poligono);
         let poligonoCopy = new Cuadrado(ctx4,posX,
           posY,radio,lados,-Math.PI/2,true,color,false);
          figurasJuego.agregar(poligonoCopy);
       }
       arregloSolucion[pieza] = new Array();
       arregloSolucion[pieza].x = divisiones[px][py].width;
       arregloSolucion[pieza].y = divisiones[px][py].height;
       pieza++;
       }
     }
  }

  function getDivisiones(width,height,cantPiezaX,cantPiezaY,canvas){
     let canvasDiv = new Array(cantPiezaX);
     let contador = 0;
     for (let k=0; k<cantPiezaX; k++){
       canvasDiv[k] = new Array(cantPiezaY);
       for (let i=0; i<cantPiezaY; i++){
         canvasDiv[k][i] = new Array();
         canvasDiv[k][i].width = width;
         canvasDiv[k][i].height = height;
         width+=150
         contador++;
          if (width > canvas.width/2 + (cantPiezaX-1) * 150){
            width = 700;
          }
          if (contador % cantPiezaX == 0){
            height+=150;
          }
       }
     }
    return canvasDiv;
  }

  function divideCanvas(dificultad){
    let cantPiezaX = 4;
    let cantPiezaY = 0;

    if (dificultad == 'easy'){
      cantPiezaY = 1;
    }
    if (dificultad == 'normal'){
      cantPiezaY = 2;
    }
    if (dificultad == 'hard'){
      cantPiezaY = 3;
    }
    let canvasAdiv = document.getElementById('canvasTabFiguras');
    let width = canvas.width/2;
    let height = 140;
    let divisiones = getDivisiones(width,height,cantPiezaX,cantPiezaY,canvasAdiv);
    return divisiones;
  }

  function colocarFormasAzar(figuras){
   for (let i=0; i<figuras.length; i++){
    let posX = Math.round(Math.random() * (500 - 100) + 100);
    let posY = Math.round(Math.random() * (500 - 100)) + 100;
    figuras[i].dibujar();
    figuras[i].mover(posX,posY);
   }
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
         tabFiguras.draw();

      }
      else {
        figuras[i].bool =false;
      }
    }
    ctx4.clearRect(0,0,canvas.width,canvas.height);
    tabFiguras.draw();
    figurasJuego.draw();
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
     tabFiguras.draw();
     figurasJuego.draw();
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
       tabFiguras.draw();
       figurasJuego.draw();
     }
     ctx4.clearRect(0, 0, canvas.width, canvas.height);
     tabFiguras.draw();
     figurasJuego.draw();
  });

  canvas.addEventListener('mouseout', function() {
        arrastrar = false;
        for (let i = 0; i < figuras.length; i++) {
          figuras[i].bool = false
        }
        ctx4.clearRect(0, 0, canvas.width, canvas.height);
        tabFiguras.draw();
        figurasJuego.draw();
  });


  function dibujarTablero(figuras,divisiones){
    ctx4.clearRect(0, 0, canvas.width, canvas.height);
    for (let i=0; i<figuras.length; i++){
        figuras[i].dibujar();
    }
  }
  let arregloSolucion = new Array();
  let cantPiezaX = 4;
  piezasY = cantPiezaY;
  let divisiones = divideCanvas(dificultad);
  crearFigurasAleatorias(divisiones,cantPiezaX,cantPiezaY);
  ctx4.clearRect(0, 0, canvas.width, canvas.height);
  tabFiguras.draw();
  figurasJuego.draw();
  figurasTab = tabFiguras.get();
  figuras = figurasJuego.get();
}

let selecDificultad = document.getElementById('dificultad');
selecDificultad.addEventListener("change" , setDificultad);

function setDificultad(){
  let tabFiguras = new ListFig();
  let figurasJuego = new ListFig();
  let canvas = document.getElementById('canvasTabFiguras');
  let ctx = document.getElementById('canvasTabFiguras').getContext('2d');
  dificultad = document.getElementById('dificultad').value;
  switch (dificultad) {
    case 'easy':
      cantPiezaY = 1;
      jugar(ctx,tabFiguras,figurasJuego,cantPiezaY,dificultad);
      break;
    case 'normal':
       cantPiezaY = 2;
       jugar(ctx,tabFiguras,figurasJuego,cantPiezaY,dificultad);
      break;
    case 'hard':
      cantPiezaY = 3;
      jugar(ctx,tabFiguras,figurasJuego,cantPiezaY,dificultad);
            break;
    default:
     cantPiezaY = 1;
     jugar(ctx,tabFiguras,cantPiezaY,dificultad);
  }
}

setDificultad();

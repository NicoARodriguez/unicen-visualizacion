let cronometro;
let btn = document.getElementById('restart');

let b = document.getElementsByTagName("body")[0];
b.addEventListener("load",cargaCronometro());
function detener(){
   clearInterval(cronometro);
}

function cargaCronometro(){
 let contador_segundos = 0;
 let contador_minutos = 0;
 let seg = document.getElementById('segundos');
 let min = document.getElementById('minutos');
   cronometro = setInterval(function (){
    if (contador_segundos == 60){
      contador_segundos = 0;
      contador_minutos++;
      min.innerHTML = contador_minuto;
      if (contador_minutos == 60){
        contador_minutos = 0;
      }
    }
    seg.innerHTML = contador_segundos;
    contador_segundos++;
  }
  ,1000);
}

function Polygon(ctx,x,y,rad,sides,startAngle,anticlockwise,color,bool){
  this.ctx = ctx;
  this.bool = bool;
  this.posX = x;
  this.posY = y,
  this.radius = rad;
  this.sides = sides;
  this.angle = startAngle,
  this.anticlock = anticlockwise;
  this.color = color;
  this.colocada = false;

  Polygon.prototype.dibujar = function() {
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

  Polygon.prototype.setColocada = function(){
    this.colocada = true;
  }

  Polygon.prototype.getColocada = function(){
    return this.colocada;
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

 Circle.prototype.setColocada = function(){
   this.colocada = true;
 }

 Circle.prototype.getColocada = function(){
   return this.colocada;
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

 Estrella.prototype.setColocada = function(){
   this.colocada = true;
 }

 Estrella.prototype.getColocada = function(){
   return this.colocada;
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

function isRepeat(usados,lados){
  for (let i=0; i<usados.length; i++){
    if (usados[i] == lados){
      return true;
    }
  }
  return false;
}

let piezasColocadas = 0;

function jugar(ctx4,tabFiguras,figurasJuego,cantPiezaY,dificultad){

  function crearFigurasAleatorias(divisiones,cantPiezaX,cantPiezaY){
     let pieza = 0;
     let colorObj = new Color();
     let salioEstrella = false;
     let salioCircle = false;
     let usados = new Array();
     let repeat = false;
     for (let px=0; px<cantPiezaX; px++){
       for (let py=0; py<cantPiezaY; py++){
         let color = colorObj.getColor();
         let figuraAzar = Math.round(Math.random() * (4 - 0) +0);
         let posX = Math.round(Math.random() * (500 - 100) + 100);
         let posY = Math.round(Math.random() * (500 - 100) + 100);
         if (figuraAzar == 1 && salioEstrella==false){
           let estrella = new Estrella(divisiones[px][py].width,
             divisiones[px][py].height,60,5,2,false,'#ffffff',ctx4);
             tabFiguras.agregar(estrella);
            let estrellaCopy = new Estrella(posX,posY,60,5,2,false,color,ctx4);
            figurasJuego.agregar(estrellaCopy);
            salioEstrella=true;
         }
         else if (figuraAzar == 2 && salioCircle==false){
           let circulo = new Circle(divisiones[px][py].width,
             divisiones[px][py].height,60,'#ffffff',false,ctx4);
             tabFiguras.agregar(circulo);
            let circuloCopy = new Circle(posX,posY,60,color,false,ctx4);
            figurasJuego.agregar(circuloCopy);
            salioCircle=true;
         }
         else{
         let lados = Math.round(Math.random() * (16 - 3) + 3);
                while (isRepeat(usados,lados)){
                  lados = Math.round(Math.random() * (12 - 3) + 3);
                }
                usados.push(lados);
                let radio = 60;
                let poligono = new Polygon(ctx4,divisiones[px][py].width,
                  divisiones[px][py].height,radio,lados,-Math.PI/2,true,'#ffffff',false);
                  tabFiguras.agregar(poligono);
                let poligonoCopy = new Polygon(ctx4,posX,
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
            width = canvas.width/2;
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

function mostrarMensaje(){
  btn.removeAttribute('class');
  let canvas = document.getElementById('canvasTabFiguras');
  let ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "30px Verdana";
  // Create gradient
  let gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
  gradient.addColorStop("0.1", "magenta");
  gradient.addColorStop("0.5", "blue");
  gradient.addColorStop("1.0", "red");
  // Fill with gradient
  ctx.fillStyle = gradient;
  ctx.fillText("GANASTE!!!",canvas.width/2, canvas.height/2);
  let msj = document.getElementById('msj');
  detener();
  msj.innerHTML = 'FELICIDADES GANASTE';
}

  canvas.addEventListener("mouseup", function() {
     arrastrar = false;
     for (let i=0; i<figuras.length; i++){
        if (figuras[i].bool){
          posFig = figuras[i].getPos();
           if ((Math.abs(posFig.x - arregloSolucion[i].x)<5) &&
                (Math.abs(posFig.y - arregloSolucion[i].y)<5)){
                  if (!figuras[i].getColocada()){
                    piezasColocadas++;
                    figuras[i].setColocada();
                  }
                  ctx4.clearRect(0, 0, canvas.width, canvas.height);
                  figuras[i].mover(arregloSolucion[i].x,arregloSolucion[i].y);
                  if (piezasColocadas == figuras.length){
                    mostrarMensaje();
                  }
                }
        }
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
  piezasColocadas = 0;
  btn.setAttribute('class','hidden');
  let mensaje = document.getElementById('msj');
  mensaje.innerHTML = '';
  let tabFiguras = new ListFig();
  let figurasJuego = new ListFig();
  let canvas = document.getElementById('canvasTabFiguras');
  let ctx = document.getElementById('canvasTabFiguras').getContext('2d');
  dificultad = document.getElementById('dificultad').value;
  switch (dificultad) {
    case 'easy':
      cantPiezaY = 1;
      mensaje.innerHTML = '';
      detener();
      cargaCronometro();
      jugar(ctx,tabFiguras,figurasJuego,cantPiezaY,dificultad);
      break;
    case 'normal':
       mensaje.innerHTML = '';
       cantPiezaY = 2;
       detener();
       cargaCronometro();
       jugar(ctx,tabFiguras,figurasJuego,cantPiezaY,dificultad);
      break;
    case 'hard':
      mensaje.innerHTML = '';
      cantPiezaY = 3;
      detener();
      cargaCronometro();
      jugar(ctx,tabFiguras,figurasJuego,cantPiezaY,dificultad);
      break;
    default:
     mensaje.innerHTML = '';
     cantPiezaY = 1;
     detener();
     cargaCronometro();
     jugar(ctx,tabFiguras,cantPiezaY,dificultad);
     break;
  }
}

setDificultad();

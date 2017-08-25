$(document).ready(function() {
let width = 600;
let i=0;
let ctx;
let ctxCopia;
let height = 450;
let filtroAplicado;
let nombreImg;

$("#getFile").on("change", cargarImagen);
$(".original").on("click",original);
$(".grises").on("click",grises);
$(".contraste").on("click",contraste);
$(".sepia").on("click",sepia);
$(".negativo").on("click",negativo);
$(".azul").on("click",azul);
$(".blancoYNegro").on("click",blancoYNegro);
$(".desenfocar").on("click",desenfocar);
$(".binarizacion").on("click",binarizacion);
$(".blur").on("click",blur);
$("#guardar").on("click",guardarImagen);

function getImagen(){
  archivoImagen = document.getElementById("getFile").files[0],
  url=window.URL || window.webkitURL,
  src = url.createObjectURL(archivoImagen);
  return src;
}

function cargarImagen(){
  nombreImg = document.getElementById("getFile").files[0].name;
  ctx = document.getElementById("canvas").getContext("2d");
  ctxCopia = document.getElementById("canvasCopia").getContext("2d");
  ctxCopia.clearRect(0, 0, canvas.width, canvas.height);
  let image = new Image();
  image.src = getImagen();
  image.onload = function (){
    ctx.drawImage(this, 0, 0, width, height);
  }
}

function guardarImagen(){
  let link = window.document.createElement( 'a' );
  let url = canvasCopia.toDataURL();
  let nombreExt = nombreImg.split('.');
  nombre=nombreExt[0];
  let filename = nombre + '(' +filtroAplicado + ')';
    link.setAttribute( 'href', url );
    link.setAttribute( 'download', filename );
    window.document.body.appendChild( link );
    link.click();
    window.document.body.removeChild( link );
}

function calLimit(color){
  if (color < 0)
    return 0;
  else if (color > 255)
    return 255;
  else
    return color;
}

/* Funciones Obetener Colores */
function getRed(imageData,x,y){
  index = (x+y*imageData.width)*4;
  return imageData.data[index];
}

function getGreen(imageData,x,y){
  index = (x+y*imageData.width)*4;
  return imageData.data[index+1];
}

function getBlue(imageData,x,y){
  index = (x+y*imageData.width)*4;
  return imageData.data[index+2];
}

/*-----------------------------*/

/* Modificar Pixel */

function setPixel(imageData,x,y,r,g,b){
  index = (x+y*imageData.width)*4;
  imageData.data[index]=r;
  imageData.data[index+1]=g;
  imageData.data[index+2]=b;
}

/*----------------------------*/

/* Algoritmos para los filtros */
function grises(){
  imageData = ctx.getImageData(0, 0, width, height);
  for (x=0; x < width; x++){
    for (y=0; y < height; y++){
      r = getRed(imageData, x, y);
      g = getGreen(imageData, x, y);
      b = getBlue(imageData, x, y);
      promedio = (r+g+b)/3;
      setPixel(imageData, x, y, promedio, promedio, promedio);
    }
  }
  filtroAplicado = 'grises';
  ctxCopia.putImageData(imageData, 0, 0);
}

function blancoYNegro(){
  imageData = ctx.getImageData(0, 0, width, height);
  rango = $("#gris").val();
  for (x=0; x < width; x++){
    for (y=0; y < height; y++){
      r=getRed(imageData, x, y);
      g=getGreen(imageData, x, y);
      b= getBlue(imageData, x, y);
      prom = (r+g+b)/3;
      if (prom >= rango) {
        prom = 255;
      }
      else {
        prom = 0;
      }
      setPixel(imageData, x, y, prom, prom, prom);
    }
  }
  filtroAplicado = 'bYn';
  ctxCopia.putImageData(imageData, 0, 0);
}

function binarizacion() {
   imageData = ctx.getImageData(0, 0, width, height);
    for (x = 0; x < width; x++) {
    for (y = 0; y < height; y++){
         r=getRed(imageData,x,y);
         g=getGreen(imageData,x,y);
         b=getBlue(imageData,x,y);
         gray =  (0.299 * r + 0.587 * g + 0.114 * b)/3
          if ( gray > 128 ){
            r = 255;
    	      g = 255;
        	  b = 255;
            setPixel(imageData,x,y,r,g,b);
			    }
			    else{
		      	r = 0;
          	g = 0;
            g = 0;
  	        setPixel(imageData,x,y,r,g,b);
			    }
      }
    }
    filtroAplicado='binarizacion';
  ctxCopia.putImageData(imageData, 0, 0);
}

function negativo(){
  imageData = ctx.getImageData(0,0,width,height);
  for (x=0; x<width; x++){
    for (y=0; y<height; y++){
      r=255-getRed(imageData,x,y);
      g=255-getGreen(imageData,x,y);
      b=255-getBlue(imageData,x,y);
      setPixel(imageData,x,y,r,g,b);
    }
  }
  filtroAplicado = 'negativo';
  ctxCopia.putImageData(imageData,0,0);
}

function desenfocar(){
  factor = $("#desenfoque").val();
  let imageData = ctx.getImageData(0,0,width,height);
  let px = imageData.data;
  let tmpPx = new Uint8ClampedArray(px.length);
  tmpPx.set(px);
  for (i=0; i<px.length; i++) {
     if (i % 4 === 3) {
       continue;
     }
     px[i] = ( tmpPx[i]
        + (tmpPx[i - 8] || tmpPx[i])
        + (tmpPx[i + 8] || tmpPx[i])
        + (tmpPx[i - 8 * imageData.width] || tmpPx[i])
        + (tmpPx[i + 8 * imageData.width] || tmpPx[i])
        + (tmpPx[i - 8 * imageData.width - 8] || tmpPx[i])
        + (tmpPx[i + 8 * imageData.width + 8] || tmpPx[i])
        + (tmpPx[i + 8 * imageData.width - 8] || tmpPx[i])
        + (tmpPx[i - 8 * imageData.width + 8] || tmpPx[i])
        )/9;
  }
  filtroAplicado='desenfocar'
  ctxCopia.putImageData(imageData,0,0);
}


function sepia(){
  imageData = ctx.getImageData(0,0,width,height);
  for (x=0; x<width; x++){
    for (y=0; y<height; y++){
      r=getRed(imageData,x,y);
      g=getGreen(imageData,x,y);
      b=getBlue(imageData,x,y);
      r = (r * .393) + (g *.769) + (b * .189);
      r = calLimit(r);
      g = (r * .349) + (g *.686) + (b * .168);
      g = calLimit(g);
      b = (r * .272) + (g *.534) + (b * .131);
      b = calLimit(b);
      setPixel(imageData,x,y,r,g,b);
    }
  }
  filtroAplicado = 'sepia';
  ctxCopia.putImageData(imageData,0,0);
}

function contraste(){
  imageData = ctx.getImageData(0,0,width,height);
  rango = $("#contrast").val();
  let contrast = Math.tan(rango * Math.PI / 180.0);
  for (x=0; x<width; x++){
    for (y=0; y<height; y++){
      r=getRed(imageData,x,y);
      g=getGreen(imageData,x,y);
      b=getBlue(imageData,x,y);
      r=calLimit(128 + (r - 128) * contrast);
      g=calLimit(128 + (g - 128) * contrast);
      b=calLimit(128 + (b - 128) * contrast);
      setPixel(imageData,x,y,r,g,b);
    }
  }
  filtroAplicado = 'contraste';
  ctxCopia.putImageData(imageData,0,0);
}

function azul(){
  imageData = ctx.getImageData(0,0,width,height);
  for (x=0; x<width; x++){
    for (y=0; y<height; y++){
      r=getRed(imageData,x,y);
      g=getGreen(imageData,x,y);
      b=getBlue(imageData,x,y);
      r=g+b/r;
      g=r+b/g;
      b=r+g/b;
      setPixel(imageData,x,y,r,g,b);
    }
  }
  filtroAplicado = 'azul';
  ctxCopia.putImageData(imageData,0,0);
}

function original(){
  let image = new Image();
  image.src = getImagen();
  image.onload = function (){
    ctxCopia.drawImage(this, 0, 0, width, height);
  }
  filtroAplicado = 'original';
}

function blur(){
  sobel = new Array(3);
  for (i=0; i<3; i++){
    sobel[i] = new Array(3);
  }
  sobel[0][0] = -1; sobel[1][0] = -2; sobel[2][0] = -1;
  sobel[0][1] = 0;  sobel[1][1] = 0;  sobel[2][1] = 0;
  sobel[0][2] = 1;  sobel[1][2] = 2;  sobel[2][2] = 1;

  imageData = ctx.getImageData(0,0,width,height);
width -=2;
height -=2;

for (x=0; x<width-2; x++) {
  for (y=0; y<height-2; y++){
    imageData.data[0] = imageData.data[x][y] * sobel[x][y] + imageData.data[x+1][y] * sobel[x+1][y] + imageData.data[x+2][y] * sobel[x+2][y] +
                      imageData.data[x][y+1] * sobel[x][y+1] + imageData.data[x+1][y+1] * sobel[x+1][y+1] + imageData.data[x+2][y+1] * sobel[x+1][y+1] +
                      imageData.data[x][y+2]  * sobel[x][y+2] + imageData.data[x+1][y+2] * sobel[x+1][y+2] + imageData.data[x+2][y+2]* sobel[x+2][y+2];

  }
 }
 ctxCopia.putImageData(imageData,0,0);
}

/*----------------------------*/
});

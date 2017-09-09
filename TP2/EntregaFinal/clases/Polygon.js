function Polygon(x,y,tamanio,lados,color){
  this.posX = x;
  this.posY = y;
  this.color = color;
  this.tamanio = tamanio;
  this.lados = lados;
  this.ctx = document.getElementById("poligono").getContext('2d');
  this.canvas = document.getElementById("poligono");
}

Polygon.prototype.dibujar = function(){
  this.ctx.fillStyle = this.color;
  this.ctx.strokeStyle = "black";
  this.ctx.lineWidth = 3;
  let rad = (2*Math.PI)/this.lados;
  this.ctx.translate(this.canvas.width/2, this.canvas.height/2);
  this.ctx.rotate(3*Math.PI/2);
  this.ctx.beginPath();
      for(i = 0; i < lados; i++ ){
      x = this.posX + this.tamanio * Math.cos( rad*i );
      y = this.posY + this.tamanio * Math.sin( rad*i );
      this.ctx.lineTo(x, y);
      }
  this.ctx.closePath();
  this.ctx.fill();
  this.ctx.stroke();
}

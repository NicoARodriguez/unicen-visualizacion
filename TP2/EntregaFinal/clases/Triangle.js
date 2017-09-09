function Triangle(x,y,color,ctx){
  this.posX = x;
  this.posY = y;
  this.color = color;
  this.nombre = 'Triangulo';
  this.ctx = ctx;
}
Triangle.prototype.dibujar = function(){
  this.ctx.beginPath();
  this.ctx.moveTo(125,125);
  this.ctx.lineTo(125,40);
  this.ctx.lineTo(40,125);
  this.ctx.fillStyle = this.color;
  this.ctx.fill();
  this.ctx.closePath();
  this.ctx.stroke();
}

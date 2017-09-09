function Circle(x,y,radio,color){
   this.posX = x;
   this.posY = y;
   this.radio = radio;
   this.color = color;
   this.nombre = 'Circulo'

 Circle.prototype.dibujar = function(){
   this.ctx.beginPath();
   this.ctx.lineWidth = 30;
   this.ctx.fillStyle = this.color;
   this.ctx.arc(this.posX, this.posY, this.radio, 10, Math.PI * this.radio);
   this.ctx.fill();
   this.ctx.closePath();
 }
}

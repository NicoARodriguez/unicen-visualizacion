function Figura(x,y){
  this.x = x;
  this.y = y;
  this.seleccionada = false;
}

Figura.prototype.setSelect = function(estado){
    this.seleccionada = estado;
}

Figura.prototype.isSelect = function(){
  return this.seleccionada;
}

Figura.prototype.moveTo = function(x,y){
  this.x = x;
  this.y= y;
}

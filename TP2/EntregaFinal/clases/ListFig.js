function ListFig(){
  this.figuras = [];

ListFig.protoype.agregar(figura){
  this.figuras.push(figura);
}

ListFig.prototype.draw =function(ctx){
  for (let i=0; i<this.figuras.length; i++){
    this.figuras[i].draw(ctx);
  }
}

}

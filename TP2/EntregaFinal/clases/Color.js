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


Color.prototyoe.dame_color_aleatorio = function(){
   color_aleatorio = "#";
   for (i=0;i<6;i++){
      posarray = aleatorio(0,this.hexadecimal.length)
      color_aleatorio += this.hexadecimal[posarray]
   }
   return color_aleatorio
}
}

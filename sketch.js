var Dino2;
var Dino;
var camino,suelo;
var pisoinvisible;
var nube,algodon;
var pino;
var c1;
var c2;
var c3;
var c4;
var c5;
var c6;
var saltar;
var puntuacion=0;
var grupopinos;
var gruponubes;
var gamestate=1;
var trexfin,final;
var puntuacionfinal=0;
var gameover, over;
var restart, reset;

function preload(){
 Dino2=loadAnimation("trex10.png","trex20.png","trex30.png")
  camino=loadImage("ground2.png") 
  nube=loadImage("nube0.png")
  c1=loadImage("cactus10.png")
  c2=loadImage("cactus20.png")
  c3=loadImage("cactus30.png")
  c4=loadImage("cactus40.png")
  c5=loadImage("cactus50.png")
  c6=loadImage("cactus60.png")
  over=loadImage("gameover.png")
  reset=loadImage("restart-1.png")
  trexfin=loadImage("trexFin0.png")
  saltar=loadSound("jump.mp3")
  puntos=loadSound("checkPoint.mp3")
}


function setup(){
  createCanvas (windowWidth,windowHeight/2)
  
  suelo=createSprite(300,height-80)
  suelo.addImage("es el fondo",camino)
  suelo.scale=1
  suelo.velocityX=-4
  pisoinvisible=createSprite (40,height-60,100,8)
  pisoinvisible.visible=false
  Dino=createSprite(50,height-80)
 Dino.addAnimation("movimiento",Dino2)
  Dino.scale=0.4
  final=createSprite(50,height-80)
  final.addImage("choque",trexfin)
  final.scale=0.4
  final.visible=false
gameover=createSprite(width/2,height/3)
gameover.addImage ("over",over)
gameover.scale=0.2
gameover.visible=false
restart=createSprite(width/2,height/1.5)
restart.addImage ("over",reset)
restart.scale=0.08
restart.visible=false
grupopinos=new Group()  
gruponubes=new Group()


}


function draw(){
  background("white");
  drawSprites();
  
  if (gamestate==1){
  
  
  nubes();
  cactus();
  puntaje();
  //se utiliza para observar datos del juego 
  //console.log(suelo.velocityX)
 if (suelo.x<200) {
  suelo.x=width/2
 } 
//Salta solo si esta unido al piso invisible
  if (keyDown("space") && Dino.collide(pisoinvisible)){
    Dino.velocityY=-16
  saltar.play();
  }
  Dino.velocityY=Dino.velocityY+0.9
  
if (grupopinos.isTouching(Dino)) {
gamestate=2;
}
}
if (gamestate==2) {
suelo.velocityX=0
pino.velocityX=0
algodon.velocityX=0
grupopinos.setVelocityXEach(0)
gruponubes.setVelocityXEach(0)
grupopinos.setLifetimeEach(-1)
gruponubes.setLifetimeEach(-1)
Dino.velocityY=0
final.y=Dino.y
final.visible=true
Dino.visible=false
fill (148, 57, 147 )
text(puntuacionfinal,width-50,30)
gameover.visible=true
restart.visible=true
if (mousePressedOver(restart)){
gamestate=1
gameover.visible=false
restart.visible=false
suelo.velocityX=-4
gruponubes.destroyEach();
grupopinos.destroyEach();
puntuacion=0
final.visible=false
Dino.visible=true
}
}
Dino.collide(pisoinvisible)
} 

function cactus ()  {
  var tipo;
  tipo=Math.round(random(1,6))
  if (frameCount%60==0){ 
  pino=createSprite(width,random(height-90,height-70))
 //pino.velocityX=-4
pino.velocityX=-(4+puntuacion/100)
suelo.velocityX=-(4+puntuacion/100)
    switch(tipo){
    case 1:
pino.addImage("en el suelo",c1)
pino.scale=1
break;
 case 2:
pino.addImage("en el suelo",c2)
pino.scale=2
break;
 case 3:
pino.addImage("en el suelo",c3)
pino.scale=2.2
break;
 case 4:
pino.addImage("en el suelo",c4)
pino.scale=1
break;
 case 5:
pino.addImage("en el suelo",c5)
pino.scale=1.8
break;
 case 6:
pino.addImage("en el suelo",c6)
pino.scale=3 
break;
} 
grupopinos.add(pino)
grupopinos.setDepthEach(2)
console.log(suelo.velocityX)
pino.lifetime=500
}
}



function nubes()  {
  if (frameCount%90==0){ 
   algodon=createSprite(width,random(20,80))
  algodon.addImage("es el cielo",nube)
  algodon.velocityX=-4
  gruponubes.add(algodon);
  algodon.lifetime=500
}
}


function puntaje() {
puntuacion=puntuacion+Math.round(getFrameRate() / 60 );
puntuacionfinal=puntuacion
fill (148, 57, 147 )
text(puntuacion,width-50,30)
if (puntuacion%100==0&&puntuacion>0)  {
puntos.play()  
}
}
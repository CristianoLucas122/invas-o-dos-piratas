const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world,ground;
var backgroundImg
var torre
var torreImg
var canhao
var angle=20
var bala 
var balas=[]
var barco 
var barcos=[]
var barcoanimation=[]
var barcospritedata,barcospritesheet
var barcoquebradoanimation=[]
var barcoquebradospritedata,barcoquebradospritesheet
var risadadopirata
var bolacaindonaagua
var somdefundo
var explosao 
var isGameover = false
var isRisada = false


function preload() {
 backgroundImg = loadImage("assets/background.gif")
 torreImg = loadImage("assets/tower.png")
 barcospritedata = loadJSON("assets/boat/boat.json")
 barcospritesheet = loadImage("assets/boat/boat.png")
 barcoquebradospritedata = loadJSON("assets/boat/broken_boat.json")
 barcoquebradospritesheet = loadImage("assets/boat/broken_boat.png")
 somdefundo = loadSound("assets/background_music.mp3")
 explosao = loadSound("assets/cannon_explosion.mp3")
 bolacaindonaagua = loadSound("assets/cannon_water.mp3")
 risadadopirata = loadSound("assets/pirate_laugh.mp3")
}
function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES)

 options={
 isStatic:true
 }
 
 ground= Bodies.rectangle(0,height-1, width*2,1,options);
 World.add(world,ground);
 torre= Bodies.rectangle(160,350,160,310,options);
 World.add(world,torre);
 canhao=new Canhao(180,110,130,100,angle)
 var barcoframes= barcospritedata.frames
 for (var I= 0; I<barcoframes.length; I++){
  var pos= barcoframes[I].position
  var img= barcospritesheet.get(pos.x,pos.y,pos.w,pos.h)
  barcoanimation.push(img)
 }
 var barcoquebradoframes= barcoquebradospritedata.frames
 for (var I=0; I<barcoquebradoframes.length;I++){
  var pos= barcoquebradoframes[I].position
  var img= barcoquebradospritesheet.get(pos.x,pos.y,pos.w,pos.h)
  barcoquebradoanimation.push(img)
 }
}

function draw() {
  background(189);
  image(backgroundImg,0,0,1200,600)
  if (!somdefundo.isPlaying()){
    somdefundo.play()
    somdefundo.setVolume(0.1)
  }
  Engine.update(engine);
 
 rect(ground.position.x, ground.position.y,width*2,1);
 push();
 imageMode(CENTER)
 image(torreImg,torre.position.x,torre.position.y,160,310);
 pop();
 canhao.display();
 Showbarcos();
 console.log(barcos)
 for(var I=0; I<balas.length; I++ ){
  showBalas(balas[I],I)
  colisao(I)
  
 }


}
function keyReleased(){
  if (keyCode===DOWN_ARROW){
    balas[balas.length-1].atirar();
    explosao.play()
    explosao.setVolume(0.1)
  }
}
function keyPressed(){
  if (keyCode===DOWN_ARROW){
    bala=new BalaDeCanhao(canhao.x,canhao.y)
    balas.push(bala)
  }
}
function showBalas(bala,index){
if (bala){
  bala.display()
  if (bala.body.position.x >= width || bala.body.position.y >= height-50){
    if (!bala.isSink && !bolacaindonaagua.isPlaying()){
    bala.remove(index)
    bolacaindonaagua.play()
    bolacaindonaagua.setVolume(0.1)
    isSink = true
  }
  }
}
}
function Showbarcos(){
  if(barcos.length>0){
  if (barcos[barcos.length-1] === undefined || barcos[barcos.length-1].body.position.x < width-300){
    var positions=[-40,-60,-70,-20]
    var position= random(positions)
    var barco=new Barco(width,height-100,170,170,position,barcoanimation)
    barcos.push(barco)

  }
    for (var I=0;I<barcos.length;I++){
  if (barcos[I]){
    Matter.Body.setVelocity(barcos[I].body,{x:-0.9,y:0})
    barcos[I].display();
    barcos[I].animate();
    var colision = Matter.SAT.collides(torre,barcos[I].body)
    if (colision.collided && !barcos[I].isbroken){
     if (!isRisada && !risadadopirata.isPlaying()){
      risadadopirata.play()
      isRisada = true
     }
      isGameover = true
      gameover();
    }
  }
}
  } else {
    barco=new Barco(width-75,height-60,170,170,-80,barcoanimation)
    barcos.push(barco)
  
  }
}
function colisao(index){
for (var I=0;I<barcos.length;I++){
  if (balas[index] !== undefined && barcos[I] !== undefined){
    var collisao=Matter.SAT.collides(balas[index].body,barcos[I].body)
    if (collisao.collided){
      barcos[I].remove(I)
      Matter.World.remove(world,balas[index].body)
      delete balas[index]
    }
  }
}
}
function gameover(){
  swal({
    title:`Fim de Jogo!`,
    text:"Obrigado por Jogar",
    imageUrl: "https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/assets/boat.png",
    imageSize:"100X100", 
    confirmButtonText: "Jogar Novamente"
  },
  function (isConfirm){
    if (isConfirm){
      location.reload()
    }
  })
}
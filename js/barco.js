class Barco{
    constructor(x,y,width,height,barcopos,barcoanimation){
        this.width= width;
        this.height= height;
        this.animation= barcoanimation
        this.speed=0.05
        this.body= Bodies.rectangle(x,y,width,height);
        this.barcoPosition= barcopos;
        this.image=loadImage("assets/boat.png");
        this.isbroken = false
        World.add(world,this.body);
    }
    animate(){
        this.speed+=0.05
    }
    remove (index){
    this.animation=barcoquebradoanimation
    this.speed=0.05
    this.width=300
    this.height=300
        setTimeout(()=>{
        Matter.World.remove(world,barcos[index].body)
        delete barcos[index]
    },2000)
    }
     display(){
        var angle= this.body.angle
        var pos= this.body.position
        var index= floor(this.speed%this.animation.length)
        push()
        translate(pos.x,pos.y)
        rotate(angle)
        imageMode(CENTER)
        image (this.animation[index],0,this.barcoPosition,this.width,this.height)
        pop ()
     }
}
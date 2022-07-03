class BalaDeCanhao{
    constructor(x,y){
    var options={
        isStatic:true
    }
    this.r= 30; 
    this.body= Bodies.circle(x,y,this.r,options);
    this.image= loadImage("assets/cannonball.png");
    this.trajectory=[]
    this.isSink=false
    World.add(world,this.body)
    }
    atirar(){
   var newangle=canhao.angle-28
   newangle=newangle*(3.14/180)
   var velocity= p5.Vector.fromAngle(newangle)
   velocity.mult(0.5)
   Matter.Body.setStatic(this.body,false)
   Matter.Body.setVelocity(this.body,{
    x:velocity.x*(180/3.14),
    y:velocity.y*(180/3.14),
   })
    }
    remove (index){
        this.isSink=true
        Matter.Body.setVelocity(this.body,{x:0,y:0})
        setTimeout(()=>{
            Matter.World.remove(world,this.body)
            delete balas[index]
        },1000)
        }
    display(){
        var pos = this.body.position
        push();
        imageMode(CENTER)
        image(this.image,pos.x,pos.y,this.r,this.r)
        pop()
        if (this.body.velocity.x>0&& pos.x>300){
            var position=[pos.x,pos.y]
            this.trajectory.push(position)
        }
        for (var I=0; I<this.trajectory.length; I++){
           image(this.image,this.trajectory[I][0],this.trajectory[I][1],5,5)
        }
    }
}
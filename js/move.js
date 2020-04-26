class Move{
    angle = undefined;
    x = undefined;
    y = undefined;
    z = undefined;
    dir = undefined;
    anim = undefined;

    constructor(x, y, z, dir){
        this.angle = 0;
        this.x = x;
        this.y = y;
        this.z = z;
        this.dir = dir;
        this.anim = false;
    }

    start(){
        this.anim = true;
    }

    update(){
        this.angle+=dir*0.1;
        if(this.angle > HALF_PI){
            this.angle = 0;
            this.anim = false;
        }
    }
}
class Face{
    normal = undefined;
    color = undefined;

    constructor(normal, color){
        this.normal = normal;
        this.color = color;
    }

    turn(axis, angle){
        let v2 = createVector();

        if(axis=='x'){
            v2.y = round(this.normal.y * cos(angle) - this.normal.z * sin(angle));
            v2.z = round(this.normal.y * sin(angle) + this.normal.z * cos(angle));
            v2.x = round(this.normal.x);
            this.normal = v2;
        } else if(axis=='y'){
            v2.x = round(this.normal.x * cos(angle) - this.normal.z * sin(angle));
            v2.z = round(this.normal.x * sin(angle) + this.normal.z * cos(angle));
            v2.y = round(this.normal.y);
            this.normal = v2;
        } else if (axis == 'z') {
            v2.x = round(this.normal.x * cos(angle) - this.normal.y * sin(angle));
            v2.y = round(this.normal.x * sin(angle) + this.normal.y * cos(angle));
            v2.z = round(this.normal.z);
            this.normal = v2;
        }
    }

    show(){
        push();
        fill(this.color);
        noStroke();
        rectMode(CENTER);
        translate(0.5*this.normal.x, 0.5*this.normal.y, 0.5*this.normal.z);
        if (abs(this.normal.x) > 0) rotateY(HALF_PI);
        else if (abs(this.normal.y) > 0) rotateX(HALF_PI);
        square(0, 0, 0.9);
        pop();
    }
}
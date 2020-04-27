class Cube{
    allMoves= undefined;
    cubies = undefined;

    angleAnim = undefined;
    axisAnim = undefined;
    indexAnim = undefined;
    dirAnim = undefined;

    queue = undefined;
    speed = undefined;

    constructor(){
        this.allMoves = ["f", "b", "u", "d", "l", "r",
                         "F", "B", "U", "D", "L", "R"];

        this.cubies = [];
        var index = 0;
        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                for (let z = -1; z <= 1; z++) {
                    let mat = Rematrix.translate3d(x, y, z);
                    this.cubies[index] = new Cubie(mat, x, y, z);
                    index++;
                }
            }
        }

        this.angleAnim = 0;
        this.axisAnim = undefined;
        this.indexAnim = undefined;
        this.dirAnim = undefined;

        this.queue = [];
        this.speed = 1;
    }

    addMove(mov){
        if(this.allMoves.includes(mov)){
            this.queue.push(mov);
        }
    }

    shuffle() {
        if(this.queue.length == 0){
            for (let i = 0; i < 110; i++) {
                let r = floor(random(this.allMoves.length));
                this.addMove(this.allMoves[r]);
            }
            this.speed = 7;
        }
    }

    turn(axis, index, dir) {
        for (let i = 0; i < this.cubies.length; i++) {
            if (axis == 'x' && this.cubies[i].x == index) {
                let m1 = Rematrix.rotate(dir * 90);
                let m2 = Rematrix.translate(this.cubies[i].y, this.cubies[i].z);
                let mt = Rematrix.multiply(m1, m2);
                this.cubies[i].update(this.cubies[i].x, round(mt[3 * 4 + 0]), round(mt[3 * 4 + 1]));
                this.cubies[i].turnFacesX(dir);
            }
            else if (axis == 'y' && this.cubies[i].y == index) {
                let m1 = Rematrix.rotate(dir * 90);
                let m2 = Rematrix.translate(this.cubies[i].x, this.cubies[i].z);
                let mt = Rematrix.multiply(m1, m2);
                this.cubies[i].update(round(mt[3 * 4 + 0]), this.cubies[i].y, round(mt[3 * 4 + 1]));
                this.cubies[i].turnFacesY(dir);
            }
            else if (axis == 'z' && this.cubies[i].z == index) {
                let m1 = Rematrix.rotate(dir * 90);
                let m2 = Rematrix.translate(this.cubies[i].x, this.cubies[i].y);
                let mt = Rematrix.multiply(m1, m2);
                this.cubies[i].update(round(mt[3 * 4 + 0]), round(mt[3 * 4 + 1]), this.cubies[i].z);
                this.cubies[i].turnFacesZ(dir);
            }
        }
    }

    animate(axis, index, dir){
        this.angleAnim += dir * this.speed * 0.08;

        if (abs(this.angleAnim) > HALF_PI) {

            this.turn(axis, index, dir);

            this.angleAnim = 0;
            this.axisAnim = undefined;
            this.indexAnim = undefined;
            this.dirAnim = undefined;
        }
    }

    applyMove(move) {
        switch (move) {
            case 'f':
                this.animate('z', 1, 1);
                this.axisAnim = 'z';
                this.indexAnim = 1;
                this.dirAnim = 1;
                break;
            case 'F':
                this.animate('z', 1, -1);
                this.axisAnim = 'z';
                this.indexAnim = 1;
                this.dirAnim = -1;
                break;
            case 'b':
                this.animate('z', -1, -1);
                this.axisAnim = 'z';
                this.indexAnim = -1;
                this.dirAnim = -1;
                break;
            case 'B':
                this.animate('z', -1, 1);
                this.axisAnim = 'z';
                this.indexAnim = -1;
                this.dirAnim = 1;
                break;
            case 'd':
                this.animate('y', 1, -1);
                this.axisAnim = 'y';
                this.indexAnim = 1;
                this.dirAnim = -1;
                break;
            case 'D':
                this.animate('y', 1, 1);
                this.axisAnim = 'y';
                this.indexAnim = 1;
                this.dirAnim = 1;
                break;
            case 'u':
                this.animate('y', -1, 1);
                this.axisAnim = 'y';
                this.indexAnim = -1;
                this.dirAnim = 1;
                break;
            case 'U':
                this.animate('y', -1, -1);
                this.axisAnim = 'y';
                this.indexAnim = -1;
                this.dirAnim = -1;
                break;
            case 'l':
                this.animate('x', -1, -1);
                this.axisAnim = 'x';
                this.indexAnim = -1;
                this.dirAnim = -1;
                break;
            case 'L':
                this.animate('x', -1, 1);
                this.axisAnim = 'x';
                this.indexAnim = -1;
                this.dirAnim = 1;
                break;
            case 'r':
                this.animate('x', 1, 1);
                this.axisAnim = 'x';
                this.indexAnim = 1;
                this.dirAnim = 1;
                break;
            case 'R':
                this.animate('x', 1, -1);
                this.axisAnim = 'x';
                this.indexAnim = 1;
                this.dirAnim = -1;
                break;
        }
    }

    show(){
        if(this.angleAnim != 0){
            this.animate(this.axisAnim, this.indexAnim, this.dirAnim);
        } else if(this.queue.length > 0){
            this.applyMove(this.queue.shift());
        } else {
            this.speed = 1;
        }

        for (let i = 0; i < this.cubies.length; i++) {
            push();
            if(this.axisAnim == 'x'){
                if (this.indexAnim == this.cubies[i].x){
                    rotateX(this.angleAnim);
                }
            } else if(this.axisAnim == 'y') {
                if (this.indexAnim == this.cubies[i].y) {
                    rotateY(-this.angleAnim);
                }
            } else if (this.axisAnim == 'z') {
                if (this.indexAnim == this.cubies[i].z) {
                    rotateZ(this.angleAnim);
                }
            }
            this.cubies[i].show();
            pop();
        }
    }

    isSolved(){
        for(let i = 0; i<this.cubies.length; i++){
            if(!this.cubies[i].isCorr())
                return false;
        }
        return true;
    }
}
class Cube{
    allMoves= undefined;
    cubies = undefined;

    constructor(){
        this.allMoves = ["f", "b", "u", "d", "l", "r"];

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
        if (axis == 'y' && this.cubies[i].y == index) {
            let m1 = Rematrix.rotate(dir * 90);
            let m2 = Rematrix.translate(this.cubies[i].x, this.cubies[i].z);
            let mt = Rematrix.multiply(m1, m2);
            this.cubies[i].update(round(mt[3 * 4 + 0]), this.cubies[i].y, round(mt[3 * 4 + 1]));
            this.cubies[i].turnFacesY(dir);
        }
        if (axis == 'z' && this.cubies[i].z == index) {
            let m1 = Rematrix.rotate(dir * 90);
            let m2 = Rematrix.translate(this.cubies[i].x, this.cubies[i].y);
            let mt = Rematrix.multiply(m1, m2);
            this.cubies[i].update(round(mt[3 * 4 + 0]), round(mt[3 * 4 + 1]), this.cubies[i].z);
            this.cubies[i].turnFacesZ(dir);
        }
    }
}

    applyMove(move) {
        switch (move) {
            case 'f':
                this.turn('z', 1, 1);
                break;
            case 'F':
                this.turn('z', 1, -1);
                break;
            case 'b':
                this.turn('z', -1, -1);
                break;
            case 'B':
                this.turn('z', -1, 1);
                break;
            case 'd':
                this.turn('y', 1, -1);
                break;
            case 'D':
                this.turn('y', 1, 1);
                break;
            case 'u':
                this.turn('y', -1, 1);
                break;
            case 'U':
                this.turn('y', -1, -1);
                break;
            case 'l':
                this.turn('x', -1, -1);
                break;
            case 'L':
                this.turn('x', -1, 1);
                break;
            case 'r':
                this.turn('x', 1, 1);
                break;
            case 'R':
                this.turn('x', 1, -1);
                break;
        }
    }

    applySequence(seq){
        for(let i = 0; i < seq.length; i++){
            this.applyMove(seq.charAt(i));
        }
    }

    shuffle(){
        let sequence = "";

        for (let i = 0; i < 200; i++) {
            let r = floor(random(this.allMoves.length));
            if (random(1) < 0.5) {
                sequence += allMoves[r];
            } else {
                sequence += allMoves[r].toUpperCase();
            }
        }

        this.applySequence(sequence);
    }

    show(){
        for (let i = 0; i < this.cubies.length; i++) {
            this.cubies[i].show();
        }
    }
}
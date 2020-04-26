const WIDTH = 500;
const HEIGHT = 500;

const dim = 3;
const len = 50;

var cube = [];

const colors = {
    upp: '#009b00', dwn: '#0046ad',
    lft: '#e02000', rgt: '#d55000',
    frt: '#ffffff', bck: '#fff000'
};

const allMoves = ["f", "b", "u", "d", "l", "r"];
var sequence = "";
var counter = 0;
var started = false;

var rot = false;
var rotX = 0;
var rotY = 0;
var actualX = WIDTH*0.5;
var actualY = HEIGHT*0.5;
var clickedX = undefined;
var clickedY = undefined;

function turn(axis, index, dir){
    for (let i = 0; i < cube.length; i++) {
        if (axis == 'x' && cube[i].x == index) {
            let m1 = Rematrix.rotate(dir*90);
            let m2 = Rematrix.translate(cube[i].y, cube[i].z);
            let mt = Rematrix.multiply(m1, m2);
            cube[i].update(cube[i].x, round(mt[3 * 4 + 0]), round(mt[3 * 4 + 1]));
            cube[i].turnFacesX(dir);
        }
        if (axis == 'y' && cube[i].y == index) {
            let m1 = Rematrix.rotate(dir*90);
            let m2 = Rematrix.translate(cube[i].x, cube[i].z);
            let mt = Rematrix.multiply(m1, m2);
            cube[i].update(round(mt[3 * 4 + 0]), cube[i].y, round(mt[3 * 4 + 1]));
            cube[i].turnFacesY(dir);
        }
        if (axis == 'z' && cube[i].z == index) {
            let m1 = Rematrix.rotate(dir*90);
            let m2 = Rematrix.translate(cube[i].x, cube[i].y);
            let mt = Rematrix.multiply(m1, m2);
            cube[i].update(round(mt[3 * 4 + 0]), round(mt[3 * 4 + 1]), cube[i].z);
            cube[i].turnFacesZ(dir);
        }
    }
}

function keyPressed(){
    if(key == ' '){
        started = true;
    }
    applyMove(key);
}

function applyMove(move){
    switch(move){
        case 'f':
            turn('z', 1, 1);
            break;
        case 'F':
            turn('z', 1, -1);
            break;
        case 'b':
            turn('z', -1, -1);
            break;
        case 'B':
            turn('z', -1, 1);
            break;
        case 'd':
            turn('y', 1, -1);
            break;
        case 'D':
            turn('y', 1, 1);
            break;
        case 'u':
            turn('y', -1, 1);
            break;
        case 'U':
            turn('y', -1, -1);
            break;
        case 'l':
            turn('x', -1, -1);
            break;
        case 'L':
            turn('x', -1, 1);
            break;
        case 'r':
            turn('x', 1, 1);
            break;
        case 'R':
            turn('x', 1, -1);
            break;
    }
}

function setup() {
    createCanvas(WIDTH, HEIGHT, WEBGL);
    var index = 0;
    for(let x = -1; x <= 1; x++){
        for(let y = -1; y <= 1; y++){
            for(let z = -1; z <= 1; z++){
                mat = Rematrix.translate3d(x, y, z);
                cube[index] = new Cubie(mat, x, y, z);
                index++;
            }
        }
    }
    for(let i=0; i<50; i++){
        let r = floor(random(allMoves.length));
        if(random(1) < 0.5){
            sequence += allMoves[r];
        } else {
            sequence += allMoves[r].toUpperCase();
        }
    }
    for (let i = sequence.length-1; i >=0; i--) {
        sequence += flipCase(sequence.charAt(i));
    }
}

function flipCase(c){
    var s = String(c);
    if(s === s.toLowerCase()){
        return s.toUpperCase();
    } else {
        return s.toLowerCase();
    }
}

function draw() {
    clear();
    background('#333');
    scale(50);
    if(started){
        if(frameCount % 1 == 0){
            if (counter < sequence.length) {
                var move = sequence.charAt(counter);
                applyMove(move);
                counter++;
            }
            if(counter == sequence.length){
                started = false;
                counter = 0;
            }
        }
    }
    
    if (rot){
        let dX = mouseX - clickedX;
        let dY = mouseY - clickedY;
        rotX = map(actualY+dY, height, 0, -3, 3);
        rotY = map(actualX+dX, width, 0, 3, -3);
    }
    rotateX(rotX);
    rotateY(rotY);

    for (let i = 0; i < cube.length; i++) {
        cube[i].show();
    }
}

function mousePressed(){
    clickedX = mouseX;
    clickedY = mouseY;
    rot = true;
}
function mouseReleased() {
    actualX = actualX + mouseX - clickedX;
    actualY = actualY + mouseY - clickedY;
    rot = false;
}
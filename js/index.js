const WIDTH = 500;
const HEIGHT = 500;

var rot = false;
var rotX = 0;
var rotY = 0;
var actualX = WIDTH * 0.5;
var actualY = HEIGHT * 0.5;
var clickedX = undefined;
var clickedY = undefined;

function setup() {
    createCanvas(WIDTH, HEIGHT, WEBGL);
    cube = new Cube();
}

function draw() {
    clear();
    background('#333');
    scale(50);
    
    if (rot){
        let dX = mouseX - clickedX;
        let dY = mouseY - clickedY;
        rotX = map(actualY+dY, height, 0, -3, 3);
        rotY = map(actualX+dX, width, 0, 3, -3);
    }
    rotateX(rotX);
    rotateY(rotY);

    cube.show();
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

function keyPressed() {
    cube.queue.push(key);
}
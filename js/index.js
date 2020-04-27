function setup() {
    WIDTH = windowWidth * 0.95;
    HEIGHT = windowHeight * 0.95;

    actualX = WIDTH * 0.5;
    actualY = HEIGHT * 0.5;

    rot = false;
    rotX = 0;
    rotY = 0;

    clickedX = undefined;
    clickedY = undefined;

    createCanvas(WIDTH, HEIGHT, WEBGL);
    cube = new Cube();
}

function draw() {
    clear();
    background('#333');
    scale(60);
    
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
    if(key == 's'){
        cube.shuffle();
    } else if(cube.speed == 1){
        cube.addMove(key);
    }
}
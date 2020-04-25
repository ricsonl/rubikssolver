const dim = 3;
var len = 50;

var cube = [];

function setup() {
    createCanvas(500, 500, WEBGL);
    for(let i=0; i < dim; i++){
        cube[i] = [];

        for(let j=0; j < dim; j++){
            cube[i][j] = [];

            for(let k=0; k < dim; k++){
                cube[i][j][k] = new Box(i*len, j*len, k*len, len);
            }
        }
    }
}

function draw() {
    clear();
    background('#333');
    for (let i = 0; i < dim; i++) {
        for (let j = 0; j < dim; j++) {
            for (let k = 0; k < dim; k++) {
                cube[i][j][k].show();
            }
        }
    }
}
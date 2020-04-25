const dim = 3;
const len = 50;
const offset = (dim-1)*len*0.5;

var cube = [];

const colors = {
    upp: '#009b00', dwn: '#0046ad',
    lft: '#e32000', rgt: '#ff5a00',
    frt: '#ffffff', bck: '#ffd300'
};

function setup() {
    createCanvas(500, 500, WEBGL);
    var index = 0;
    for(let x = -1; x <= 1; x++){
        for(let y = -1; y <= 1; y++){
            for(let z = -1; z <= 1; z++){
                mat = [1, 0, 0, 0,
                       0, 1, 0, 0,
                       0, 0, 1, 0,
                       x, y, z, 1];
                cube[index] = new Cubie(mat);
                index++;
            }
        }
    }
    cube[0].highlight = true;
}

function draw() {
    clear();
    background('#333');
    scale(50);
    rotX = map(mouseY, height, 0, -3.2, 3.2);
    rotY = map(mouseX, width, 0, 3.2, -3.2);
    rotateX(rotX);
    rotateY(rotY);
    for (let i = 0; i < cube.length; i++) {
        cube[i].show();
    }
}
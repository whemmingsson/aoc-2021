let data = [
    "1443582148",
    "6553734851",
    "1451741246",
    "8835218864",
    "1662317262",
    "1731656623",
    "1128178367",
    "5842351665",
    "6677326843",
    "7381433267"
];


let matrix;

function setup() {
    createCanvas(400, 400);
    colorMode(HSB);

    matrix = new Matrix();
    data.forEach((r) => {
        matrix.addRow(r);
    });

    matrix.render();

    frameRate(20);
}

function draw() {
    matrix.increseEnergyLevel();
    matrix.flash();
    matrix.reset();

    matrix.render();

    if (matrix.isSyncronized) {
        noLoop();
    }
}
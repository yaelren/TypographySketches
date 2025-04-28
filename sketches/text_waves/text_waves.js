let xPhase = 20;
let yPhase = 0;
let xMagnitude = 0.4;
let yMagnitude = 0.4;
let xPhaseSlider, yPhaseSlider;
let xMagnitudeSlider, yMagnitudeSlider;

function setup() {
    var c = createCanvas(windowWidth, windowHeight);
    c.parent("canvasWrapper");

    // Reference sliders from HTML
    xPhaseSlider = document.getElementById('xPhaseSlider');
    yPhaseSlider = document.getElementById('yPhaseSlider');
    xMagnitudeSlider = document.getElementById('xMagnitudeSlider');
    yMagnitudeSlider = document.getElementById('yMagnitudeSlider');

    // Reference value display elements
    const xPhaseValue = document.getElementById('xPhaseValue');
    const yPhaseValue = document.getElementById('yPhaseValue');
    const xMagnitudeValue = document.getElementById('xMagnitudeValue');
    const yMagnitudeValue = document.getElementById('yMagnitudeValue');

    xPhaseSlider.addEventListener('input', function () {
        xPhase = parseInt(this.value);
        xPhaseValue.textContent = this.value;
        background("blue");
    });

    yPhaseSlider.addEventListener('input', function () {
        yPhase = parseInt(this.value);
        yPhaseValue.textContent = this.value;
        background("blue");
    });

    xMagnitudeSlider.addEventListener('input', function () {
        xMagnitude = parseFloat(this.value);
        xMagnitudeValue.textContent = this.value;
        background("blue");
    });

    yMagnitudeSlider.addEventListener('input', function () {
        yMagnitude = parseFloat(this.value);
        yMagnitudeValue.textContent = this.value;
        background("blue");
    });
}

function draw() {
    background("blue");
    fill(255);
    noStroke();


    let amountOfPoints = 100;
    let widthOfPoints = width / amountOfPoints;


    translate(width / 2, height / 2);

    for(let i = 0; i < amountOfPoints; i++) {
        let waveX = sin(radians(frameCount * xPhase + i)) *  height * xMagnitude;
        let waveY = cos(radians(frameCount * yPhase + i)) *  height * yMagnitude;
        ellipse(waveX, waveY, 5, 5);
    }


    // for (let i = 0; i < 1; i++) {
    //     let waveX = sin(radians(frameCount * xPhase + i)) *  height * xMagnitude;
    //     let waveY = cos(radians(frameCount * yPhase + i)) *  height * yMagnitude;
    //     ellipse(waveX, waveY, 5, 5);
    // }

}
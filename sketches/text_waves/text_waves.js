let xPhase = 20;
let yPhase = 0;
let xMagnitude = 0.1;
let yMagnitude = 0.1;
let xPhaseSlider, yPhaseSlider;
let xMagnitudeSlider, yMagnitudeSlider;
let waveText = 'hello my name is yael';
let waveTypeX = 'sin';
let waveTypeY = 'sin';
let speed = 0.01;
let rotateWithPath = false; // Default to true

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

    // Reference new UI elements
    const waveTextInput = document.getElementById('waveText');
    const waveTypeXSelect = document.getElementById('waveTypeX');
    const waveTypeYSelect = document.getElementById('waveTypeY');

    // Reference new speed slider
    const speedSlider = document.getElementById('speedSlider');
    const speedValue = document.getElementById('speedValue');
    speed = parseFloat(speedSlider.value);

    // Reference the new rotate checkbox
    const rotateCheckbox = document.getElementById('rotateCheckbox');
    rotateWithPath = rotateCheckbox.checked;

    rotateCheckbox.addEventListener('change', function () {
        rotateWithPath = this.checked;
    });

    xPhaseSlider.addEventListener('input', function () {
        xPhase = parseInt(this.value);
        xPhaseValue.textContent = this.value;
        // background("blue");
    });

    yPhaseSlider.addEventListener('input', function () {
        yPhase = parseInt(this.value);
        yPhaseValue.textContent = this.value;
        // background("blue");
    });

    xMagnitudeSlider.addEventListener('input', function () {
        xMagnitude = parseFloat(this.value);
        xMagnitudeValue.textContent = this.value;
        // background("blue");
    });

    yMagnitudeSlider.addEventListener('input', function () {
        yMagnitude = parseFloat(this.value);
        yMagnitudeValue.textContent = this.value;
        // background("blue");
    });

    waveTextInput.addEventListener('input', function () {
        waveText = this.value;
    });

    waveTypeXSelect.addEventListener('change', function () {
        waveTypeX = this.value;
    });

    waveTypeYSelect.addEventListener('change', function () {
        waveTypeY = this.value;
    });

    speedSlider.addEventListener('input', function () {
        speed = parseFloat(this.value);
        speedValue.textContent = this.value;
    });
}

function draw() {
    background("blue");
    fill(255);
    noStroke();

    let amountOfPoints = 100;
    let widthOfPoints = width / amountOfPoints;

    translate(width / 2, height / 2);

    let baseAngleX = radians(frameCount * speed * xPhase);
    let baseAngleY = radians(frameCount * speed * yPhase);
    if (waveText) {
        textSize(16);
        let textWidthValue = textWidth(waveText);
        let textHeightValue = textAscent() + textDescent();

        let spaceBetweenLetters = 2; // Adjust this value for more or less spacing

        for (let i = 0; i < waveText.length; i++) {
            let charAngleX = baseAngleX + (i * spaceBetweenLetters * xMagnitude);
            let charAngleY = baseAngleY + (i * spaceBetweenLetters * yMagnitude);

            let waveX, waveY;

            switch (waveTypeX) {
                case 'sin':
                    waveX = sin(charAngleX) * height * xMagnitude;
                    break;
                case 'cos':
                    waveX = cos(charAngleX) * height * xMagnitude;
                    break;
                case 'tan':
                    waveX = tan(charAngleX) * height * xMagnitude;
                    break;
            }

            switch (waveTypeY) {
                case 'sin':
                    waveY = sin(charAngleY) * height * yMagnitude;
                    break;
                case 'cos':
                    waveY = cos(charAngleY) * height * yMagnitude;
                    break;
                case 'tan':
                    waveY = tan(charAngleY) * height * yMagnitude;
                    break;
            }

            if (rotateWithPath) {
                push();
                translate(waveX, waveY);
                rotate(charAngleX);
                translate(-textWidth(waveText[i]) / 2, textHeightValue / 2);
                text(waveText[i], 0, 0);
                pop();
            } else {
                text(waveText[i], waveX - textWidth(waveText[i]) / 2, waveY + textHeightValue / 2);
            }
        }
    } else {
        ellipse(0, 0, 5, 5);
    }
}
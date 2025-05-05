let xPhase = 20;
let yPhase = 0;
let xMagnitude = 0.1;
let yMagnitude = 0.1;
let xPhaseSlider, yPhaseSlider;
let xMagnitudeSlider, yMagnitudeSlider;
let waveText = '';
let waveTypeX = 'sin';
let waveTypeY = 'sin';
let speed = 0.01;
let rotateWithPath = false; // Default to true
let repeatText = false; // Add a variable to track the repeat state
let reverseAnimation = false; // Variable to track the reverse state
let bgColor = "blue"; // Default background color

let fontSize = 16;
let spaceBetweenLetters = 10;
let pathLength = 0;
let amountOfLetters = 0;
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

    const repeatCheckbox = document.getElementById('repeatCheckbox');
    repeatCheckbox.addEventListener('change', function () {
        repeatText = this.checked;
    });

    rotateCheckbox.addEventListener('change', function () {
        rotateWithPath = this.checked;
    });

    // Reference new font size and space between letters sliders
    const fontSizeSlider = document.getElementById('fontSizeSlider');
    const fontSizeValue = document.getElementById('fontSizeValue');
    fontSize = parseInt(fontSizeSlider.value);

    const spaceBetweenLettersSlider = document.getElementById('spaceBetweenLettersSlider');
    const spaceBetweenLettersValue = document.getElementById('spaceBetweenLettersValue');
    spaceBetweenLetters = parseInt(spaceBetweenLettersSlider.value);

    fontSizeSlider.addEventListener('input', function () {
        fontSize = parseInt(this.value);
        fontSizeValue.textContent = this.value;
    });

    spaceBetweenLettersSlider.addEventListener('input', function () {
        spaceBetweenLetters = parseInt(this.value);
        spaceBetweenLettersValue.textContent = this.value;
    });

    xPhaseSlider.addEventListener('input', function () {
        xPhase = parseInt(this.value);
        xPhaseValue.textContent = this.value;
        pathLength = calculatePathLength();
    });

    yPhaseSlider.addEventListener('input', function () {
        yPhase = parseInt(this.value);
        yPhaseValue.textContent = this.value;
        pathLength = calculatePathLength();
    });

    xMagnitudeSlider.addEventListener('input', function () {
        xMagnitude = parseFloat(this.value);
        xMagnitudeValue.textContent = this.value;
        pathLength = calculatePathLength();
    });

    yMagnitudeSlider.addEventListener('input', function () {
        yMagnitude = parseFloat(this.value);
        yMagnitudeValue.textContent = this.value;
        pathLength = calculatePathLength();
    });

    waveTextInput.addEventListener('input', function () {
        waveText = this.value;
        pathLength = calculatePathLength();
    });

    waveTypeXSelect.addEventListener('change', function () {
        waveTypeX = this.value;
        pathLength = calculatePathLength();
    });

    waveTypeYSelect.addEventListener('change', function () {
        waveTypeY = this.value;
        pathLength = calculatePathLength();
    });

    speedSlider.addEventListener('input', function () {
        speed = parseFloat(this.value);
        speedValue.textContent = this.value;
    });

    // Reference the new reverse checkbox
    const reverseCheckbox = document.getElementById('reverseCheckbox');
    reverseCheckbox.addEventListener('change', function () {
        reverseAnimation = this.checked;
    });

    // Reference the new background color picker
    const bgColorPicker = document.getElementById('bgColorPicker');
    bgColor = bgColorPicker.value;

    bgColorPicker.addEventListener('input', function () {
        bgColor = this.value;
    });

    pathLength = calculatePathLength();
    amountOfLetters = pathLength / (fontSize + spaceBetweenLetters);
}

function calculateWaveValue(angle, magnitude, waveType) {
    switch (waveType) {
        case 'sin':
            return sin(angle) * magnitude;
        case 'cos':
            return cos(angle) * magnitude;
        case 'tan':
            return tan(angle) * magnitude;
        default:
            return 0;
    }
}

function draw() {
    background(bgColor); // Use the selected background color
    noStroke();
    translate(width / 2, height / 2);

    let widthOfPoints = fontSize;
    let amountOfLetters = pathLength / (widthOfPoints + spaceBetweenLetters);
    textSize(fontSize);
    // console.log(amountOfLetters);
    // for (let i = 0; i < amountOfLetters; i++) {
    //     let angleX = radians(frameCount * speed * xPhase + i * spaceBetweenLetters);
    //     let angleY = radians(frameCount * speed * yPhase + i * spaceBetweenLetters);

    //     let waveX = calculateWaveValue(angleX, height * xMagnitude, waveTypeX);
    //     let waveY = calculateWaveValue(angleY, height * yMagnitude, waveTypeY);

    //     push();
    //     translate(waveX, waveY);
    //     let charIndex = i % waveText.length;
    //     let charWidth = textWidth(waveText[charIndex]);
    //     text(waveText[charIndex], -charWidth / 2, 0);
    //     pop();
    // }

    let directionMultiplier = reverseAnimation ? -1 : 1; // Determine direction

    let baseAngleX = radians(frameCount * speed * xPhase * directionMultiplier);
    let baseAngleY = radians(frameCount * speed * yPhase * directionMultiplier);
    if (waveText) {
  
        let textWidthValue = textWidth(waveText);
        let textHeightValue = textAscent() + textDescent();


        // Calculate how many times the text should repeat
        let repetitions = repeatText ? Math.ceil(width / (textWidthValue + spaceBetweenLetters)) : 1;

        for (let r = 0; r < repetitions; r++) {
            for (let i = 0; i < waveText.length; i++) {
                let charAngleX = baseAngleX + ((i + r * waveText.length) * spaceBetweenLetters * xMagnitude);
                let charAngleY = baseAngleY + ((i + r * waveText.length) * spaceBetweenLetters * yMagnitude);

                let waveX = calculateWaveValue(charAngleX, height * xMagnitude, waveTypeX);
                let waveY = calculateWaveValue(charAngleY, height * yMagnitude, waveTypeY);

                // Determine if the letter is on its "back side"
                let angle = degrees(charAngleX) % 360;
                let grayscaleValue = map(angle, 0, 360, 0, 255); // Map angle to grayscale

                fill(grayscaleValue); // Use the mapped grayscale value for fill color

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
        }
    } else {
        ellipse(0, 0, 5, 5);
    }
}

function calculatePathLength() {
    // let totalLength = 0;
    // let previousX = 0;
    // let previousY = 0;
    // let firstPoint = true;
    // let higResPoints=200;
    // for (let i = 0; i < higResPoints; i++) {
    //     let angleX = radians(i * spaceBetweenLetters * xPhase);
    //     let angleY = radians(i * spaceBetweenLetters * yPhase);

    //     let waveX = calculateWaveValue(angleX, height * xMagnitude, waveTypeX);
    //     let waveY = calculateWaveValue(angleY, height * yMagnitude, waveTypeY);

    //     if (!firstPoint) {
    //         let dx = waveX - previousX;
    //         let dy = waveY - previousY;
    //         totalLength += Math.sqrt(dx * dx + dy * dy);
    //     } else {
    //         firstPoint = false;
    //     }

    //     previousX = waveX;
    //     previousY = waveY;
    // }
    // console.log(totalLength);
    // return totalLength;
}
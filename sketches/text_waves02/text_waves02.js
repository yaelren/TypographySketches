// ============= UI Variables =============
//Wave
let showWave = true;
let speed = 1;
let xPhase = 0.5;
let yPhase = 0.5;
let xMagnitude = 0.4;
let yMagnitude = 0.22;
let waveTypeX = 'sin';
let waveTypeY = 'tan';
let reverseAnimation = false;
let rotateOnWave = true;

//Typography
let textInput = "hello how are you";
let fontSize = 50;
let stepBetweenWords=30;
let spaceBetweenWords=0;
let shouldRepeatText = true;
let elements = [];



//=========================================

let padding = 170;

function setup() {
    var c = createCanvas(windowWidth, windowHeight);
    c.parent("canvasWrapper");
    setUpUI();
}

function draw() {
    background(0);
    textAlign(CENTER,CENTER);
    translate(width/2, 0);

    if(showWave){
        drawWave();
    }
    drawText();
    
}


function drawText() {
    let elementWidth = fontSize;

    let numOfElements = elements.length;
    if (shouldRepeatText) {
        numOfElements = 100;
    }

    drawWaveElements(numOfElements, elementWidth, stepBetweenWords, (i) => {
        textSize(elementWidth);
        let element = elements[i % elements.length];

        let angleX = radians(frameCount * speed * xPhase + i * stepBetweenWords);
        let angleY = radians(frameCount * speed * yPhase + i * stepBetweenWords);

        let waveX = calculateWaveValue(angleX, height * xMagnitude, waveTypeX, i, elementWidth);
        let waveY = calculateWaveValue(angleY, height * yMagnitude, waveTypeY, i, elementWidth);

        // Calculate the angle of rotation based on the wave
        let angle = -atan2(waveY, waveX);

        // Apply rotation if rotateOnWave is true
        if (rotateOnWave) {
            rotate(angle);
        }

        text(element, 0, 0);

        // Reset rotation
        if (rotateOnWave) {
            rotate(-angle);
        }
    });
}

function drawWave() {
    let numOfElements = 200;
    let elementWidth = fontSize;

    drawWaveElements(numOfElements, elementWidth, stepBetweenWords, () => {
        fill("green");
        ellipse(0, 0, elementWidth, elementWidth);
    });
}

function drawWaveElements(numOfElements, elementWidth, step, drawElement) {
 
    push();
    let directionMultiplier = reverseAnimation ? -1 : 1;
    let xTranslate = elementWidth / 2;
    let yTranslate = height / 2;
    if(waveTypeX === 'static'){
        xTranslate = -width/2+padding;
    }
    if(waveTypeY === 'static'){
        yTranslate = -height/2+padding*5;
    }
    translate(xTranslate, yTranslate);
    noStroke();
    fill("#f1f1f1");

    for (let i = 0; i < numOfElements; i++) {
        push();
        let angleX = radians(frameCount * speed * xPhase * directionMultiplier + i * step);
        let angleY = radians(frameCount * speed * yPhase * directionMultiplier + i * step);

        let waveX = calculateWaveValue(angleX, height * xMagnitude, waveTypeX, i, 20);
        let waveY = calculateWaveValue(angleY, height * yMagnitude, waveTypeY, i, 20);

        translate(waveX, waveY);
        drawElement(i);
        pop();
    }
    pop();
}



function calculateWaveValue(angle, magnitude, waveType, index, elementWidth) {

    switch (waveType) {
        case 'sin':
            return sin(angle) * magnitude;
        case 'cos':
            return cos(angle) * magnitude;
        case 'tan':
            return tan(angle) * magnitude;
        case 'static':
            return index * elementWidth;
        default:
            return 0;
    }
}


function setUpUI() {
    // Wave Controls
    const showWaveElement = document.getElementById('showWave');
    showWave = showWaveElement.checked;
    showWaveElement.addEventListener('change', function() {
        showWave = this.checked;
    });

    const speedElement = document.getElementById('speed');
    speed = parseFloat(speedElement.value);
    speedElement.addEventListener('input', function() {
        speed = parseFloat(this.value);
    });

    const xPhaseElement = document.getElementById('xPhase');
    xPhase = parseFloat(xPhaseElement.value);
    xPhaseElement.addEventListener('input', function() {
        xPhase = parseFloat(this.value);
    });

    const yPhaseElement = document.getElementById('yPhase');
    yPhase = parseFloat(yPhaseElement.value);
    yPhaseElement.addEventListener('input', function() {
        yPhase = parseFloat(this.value);
    });

    const xMagnitudeElement = document.getElementById('xMagnitude');
    xMagnitude = parseFloat(xMagnitudeElement.value);
    xMagnitudeElement.addEventListener('input', function() {
        xMagnitude = parseFloat(this.value);
    });

    const yMagnitudeElement = document.getElementById('yMagnitude');
    yMagnitude = parseFloat(yMagnitudeElement.value);
    yMagnitudeElement.addEventListener('input', function() {
        yMagnitude = parseFloat(this.value);
    });

    const waveTypeXElement = document.getElementById('waveTypeX');
    waveTypeX = waveTypeXElement.value;
    waveTypeXElement.addEventListener('change', function() {
        waveTypeX = this.value;
    });

    const waveTypeYElement = document.getElementById('waveTypeY');
    waveTypeY = waveTypeYElement.value;
    waveTypeYElement.addEventListener('change', function() {
        waveTypeY = this.value;
    });

    // Typography Controls
    const textInputElement = document.getElementById('textInput');
    textInput = textInputElement.value;
    textInputElement.addEventListener('input', function() {
        textInput = this.value;
    });

    const fontSizeElement = document.getElementById('fontSize');
    fontSize = parseInt(fontSizeElement.value, 10);
    fontSizeElement.addEventListener('input', function() {
        fontSize = parseInt(this.value, 10);
    });

    const stepBetweenWordsElement = document.getElementById('stepBetweenWords');
    stepBetweenWords = parseInt(stepBetweenWordsElement.value, 10);
    stepBetweenWordsElement.addEventListener('input', function() {
        stepBetweenWords = parseInt(this.value, 10);
    });

    const shouldRepeatTextElement = document.getElementById('shouldRepeatText');
    shouldRepeatText = shouldRepeatTextElement.checked;
    shouldRepeatTextElement.addEventListener('change', function() {
        shouldRepeatText = this.checked;
    });

    // Add event listener for reverseAnimation
    const reverseAnimationElement = document.getElementById('reverseAnimation');
    reverseAnimation = reverseAnimationElement.checked;
    reverseAnimationElement.addEventListener('change', function() {
        reverseAnimation = this.checked;
    });

    updateElementsArray();

    // const spaceBetweenWordsElement = document.getElementById('spaceBetweenWords');
    // spaceBetweenWords = parseInt(spaceBetweenWordsElement.value, 10);
    // updateElementsArray();
    // spaceBetweenWordsElement.addEventListener('input', function() {
    //     spaceBetweenWords = parseInt(this.value, 10);
    //     updateElementsArray();
    // });
}

function updateElementsArray() {
    let words = textInput.split(" ");
    elements = words;

    // // Build the list of elements to draw, including spaces
    // words.forEach((word, index) => {
    //     elements.push(word);
    //     if (index < words.length - 1) { // Don't add spaces after the last word
    //         for (let i = 0; i < spaceBetweenWords; i++) {
    //             elements.push(" ");
    //         }
    //     }
    // });
}
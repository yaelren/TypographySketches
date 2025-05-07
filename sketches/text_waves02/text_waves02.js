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

//Typography
let textInput = "hello how are you";
let fontSize = 50;
let spaceBetweenWords=30;
let shouldRepeatText = true;


//=========================================

let padding = 1;

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
    let words = textInput.split(" ");
    let elementWidth = fontSize;
    let numOfElements = words.length;
    if (shouldRepeatText) {
        numOfElements = 200 ;
    }

    drawWaveElements(numOfElements, elementWidth, spaceBetweenWords, (i) => {
        textSize(elementWidth);
        let wordIndex = i % words.length;
        text(words[wordIndex], 0, 0);
    });
}

function drawWave() {
    let numOfElements = 200;
    let elementWidth = fontSize;

    drawWaveElements(numOfElements, elementWidth, spaceBetweenWords, () => {
        fill("green");
        ellipse(0, 0, elementWidth, elementWidth);
    });
}

function drawWaveElements(numOfElements, elementWidth, step, drawElement) {
 
    push();
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
        let angleX = radians(frameCount * speed * xPhase + i * step);
        let angleY = radians(frameCount * speed * yPhase + i * step);

        let waveX = calculateWaveValue(angleX, height * xMagnitude, waveTypeX, i, elementWidth);
        let waveY = calculateWaveValue(angleY, height * yMagnitude, waveTypeY, i, elementWidth);

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

    const spaceBetweenWordsElement = document.getElementById('spaceBetweenWords');
    spaceBetweenWords = parseInt(spaceBetweenWordsElement.value, 10);
    spaceBetweenWordsElement.addEventListener('input', function() {
        spaceBetweenWords = parseInt(this.value, 10);
    });

    const shouldRepeatTextElement = document.getElementById('shouldRepeatText');
    shouldRepeatText = shouldRepeatTextElement.checked;
    shouldRepeatTextElement.addEventListener('change', function() {
        shouldRepeatText = this.checked;
    });
}
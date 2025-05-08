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
let elements = [];

// Color Variables
let backgroundColor = '#000000';
let textColors = ['#FFFFFF', '#FF0000', '#00FF00'];
let fontWeight = 400;
let fontItalic = 0;

// Blend Mode Variable
let currentBlendMode = "BLEND";

// Add this variable at the top with other UI variables
let numRepetitions = 1;
let waveDebugColor = '#00FF00';
let autoPulseWeight = false;
let autoPulseFontSize = false;

let currentFont = 'Wix Madefor Text';

//=========================================

let padding = 100;

async function setup() {
    var c = createCanvas(windowWidth, windowHeight);
    c.parent("canvasWrapper");
    setUpUI();

    // Load both fonts
    await loadGoogleFontSet('https://fonts.googleapis.com/css2?family=Wix+Madefor+Text:ital,wght@0,400..800;1,400..800&display=swap');
    await loadGoogleFontSet('https://fonts.googleapis.com/css2?family=Roboto+Flex:ital,wght@0,400..800;1,400..800&display=swap');
    await loadGoogleFontSet('https://fonts.googleapis.com/css2?family=Playwrite+NZ:wght@100..400&display=swap');

    
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    background(backgroundColor);
    textAlign(CENTER,CENTER);
    translate(width/2-padding, 0);

    // Apply the current blend mode
    blendMode(BLEND);

    if(showWave){
        drawWave();
    }
    drawText();
    // drawVariableText();
}

function drawVariableText() {
    const t = frameCount / 60 * 1000
    background('#E0018D');
    noStroke();
    fill(`rgba(245,100,100,${map(sin(millis() * 0.0025), -1, 1, 0, 1)})`);
    rect(0, 0, width, height);
    
    textAlign(CENTER, CENTER);
    noStroke();
    fill('white');
    textSize(min(width, height) * 0.12);
    
    const numRows = 5;
    for (let row = 0; row < numRows; row++) {
      const x = width/2;
      const y = map(row, 0, numRows-1, height*0.25, height*0.75);
      textFont('Wix Madefor Text', {
        fontVariationSettings: `wght ${map(sin(t * 0.005 - row), -1, 1, 200, 800)}`
      });
    //   console.log(cnv.drawingContext.font)x
      text('p5*js 2.0', x, y);
    }
}

function drawText() {
    let elementWidth = fontSize;
    let numOfElements = elements.length * numRepetitions;
    let widthSize = width / numOfElements;
    let couldIndex = 0;
    const autoPulseWeight = document.getElementById('autoPulseWeight').checked;

    drawWaveElements(numOfElements, widthSize, stepBetweenWords, (i) => {
        // Calculate font size based on wave position if autoPulseFontSize is enabled
        let currentFontSize = fontSize;
        if (autoPulseFontSize) {
            const t = frameCount / 60 * 1000;
            currentFontSize = map(sin(t * 0.001 - i), -1, 1, 50, 150); // Adjust the range as needed
        }

        textSize(currentFontSize);
        let element = elements[i % elements.length];

        // Set the fill color based on the index
        fill(textColors[couldIndex % textColors.length]);
        if (element.trim() !== "") {
            couldIndex++;
        }

        // Apply the current blend mode for each text element
        blendMode(currentBlendMode);

        let angleX = radians(frameCount * speed * xPhase + i * stepBetweenWords);
        let angleY = radians(frameCount * speed * yPhase + i * stepBetweenWords);

        let waveX = calculateWaveValue(angleX, height * xMagnitude, waveTypeX, i, widthSize);
        let waveY = calculateWaveValue(angleY, height * yMagnitude, waveTypeY, i, widthSize);

        // Calculate the angle of rotation based on the wave
        let angle = -atan2(waveY, waveX);

        // Calculate font weight based on wave position if autoPulseWeight is enabled
        let currentFontWeight = fontWeight;
        if (autoPulseWeight) {
            const t = frameCount / 60 * 1000;
            currentFontWeight = map(sin(t * 0.0025 - i), -1, 1, 400, 800);
        }

        // Apply rotation if rotateOnWave is true
        if (rotateOnWave) {
            rotate(angle);
        }

        // Set the font with the current weight and italic values
        textFont(currentFont, {
            fontVariationSettings: `'wght' ${currentFontWeight}`
        });

        text(element, 0, 0);

        // Reset rotation
        if (rotateOnWave) {
            rotate(-angle);
        }

        // Reset blend mode to default after drawing each text element
        blendMode(BLEND);
    });
}

function drawWave() {
    let numOfElements = 200;
    let elementWidth = fontSize;
    let widthSize = width / numOfElements;

    drawWaveElements(numOfElements, widthSize, stepBetweenWords, () => {
        fill(waveDebugColor);
        ellipse(0, 0, elementWidth, elementWidth);
    });
}

function drawWaveElements(numOfElements, elementWidth, step, drawElement) {
    push();
    let directionMultiplier = reverseAnimation ? -1 : 1;
    let xTranslate = elementWidth / 2;
    let yTranslate = height / 2;
    
    let shouldPadding= numRepetitions==1 ? 0 : 1;
    if(waveTypeX === 'static'){
        xTranslate = -width/2+(padding*shouldPadding);
    }
    if(waveTypeY === 'static'){
        yTranslate = -height/2+(padding*shouldPadding*5);
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
    // Initialize colors
    backgroundColor = document.getElementById('backgroundColor').value;
    textColors[0] = document.getElementById('textColor1').value;
    textColors[1] = document.getElementById('textColor2').value;
    textColors[2] = document.getElementById('textColor3').value;
    waveDebugColor = document.getElementById('waveDebugColor').value;

    // Initialize blend mode
    const blendModeElement = document.getElementById('blendModeDropdown');
    currentBlendMode = getBlendMode(blendModeElement.value);
    blendModeElement.addEventListener('change', function() {
        currentBlendMode = getBlendMode(this.value);
    });

    // Add event listener for wave debug color
    document.getElementById('waveDebugColor').addEventListener('input', function() {
        waveDebugColor = this.value;
    });

    // Add event listener for font selection
    const fontSelectionElement = document.getElementById('fontSelection');
    currentFont = fontSelectionElement.value;
    fontSelectionElement.addEventListener('change', function() {
        currentFont = this.value;
    });

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
        updateElementsArray();
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

    // const shouldRepeatTextElement = document.getElementById('shouldRepeatText');
    // shouldRepeatText = shouldRepeatTextElement.checked;
    // shouldRepeatTextElement.addEventListener('change', function() {
    //     shouldRepeatText = this.checked;
    //     document.getElementById('repetitionControls').style.display = this.checked ? 'block' : 'none';
    // });

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

    const rotateOnWaveElement = document.getElementById('rotateOnWave');
    rotateOnWave = rotateOnWaveElement.checked;
    rotateOnWaveElement.addEventListener('change', function() {
        rotateOnWave = this.checked;
    });
    
    // Repetition controls
    document.getElementById('increaseRepetitions').addEventListener('click', function() {
        numRepetitions++;
        document.getElementById('numRepetitions').textContent = numRepetitions;
    });

    document.getElementById('decreaseRepetitions').addEventListener('click', function() {
        if (numRepetitions > 1) {
            numRepetitions--;
            document.getElementById('numRepetitions').textContent = numRepetitions;
        }
    });

    // Add event listeners for color inputs
    document.getElementById('backgroundColor').addEventListener('input', function() {
        backgroundColor = this.value;
    });

    document.getElementById('textColor1').addEventListener('input', function() {
        textColors[0] = this.value;
    });

    document.getElementById('textColor2').addEventListener('input', function() {
        textColors[1] = this.value;
    });

    document.getElementById('textColor3').addEventListener('input', function() {
        textColors[2] = this.value;
    });

    // Space Between Words controls
    document.getElementById('increaseSpaceBetweenWords').addEventListener('click', function() {
        spaceBetweenWords++;
        document.getElementById('spaceBetweenWordsValue').textContent = spaceBetweenWords;
        updateElementsArray();
    });

    document.getElementById('decreaseSpaceBetweenWords').addEventListener('click', function() {
        if (spaceBetweenWords > 0) {
            spaceBetweenWords--;
            document.getElementById('spaceBetweenWordsValue').textContent = spaceBetweenWords;
            updateElementsArray();
        }
    });

    // Add event listener for font weight
    const fontWeightElement = document.getElementById('fontWeight');
    fontWeight = parseInt(fontWeightElement.value, 10);
    fontWeightElement.addEventListener('input', function() {
        fontWeight = parseInt(this.value, 10);
        document.getElementById('fontWeightValue').textContent = fontWeight;
    });

    // Add event listener for autoPulseWeight
    const autoPulseWeightElement = document.getElementById('autoPulseWeight');
    autoPulseWeight = autoPulseWeightElement.checked;
    autoPulseWeightElement.addEventListener('change', function() {
        autoPulseWeight = this.checked;
        document.getElementById('fontWeight').disabled = autoPulseWeight;
    });

    // // Add event listener for font italic
    // const fontItalicElement = document.getElementById('fontItalic');
    // fontItalic = parseFloat(fontItalicElement.value);
    // fontItalicElement.addEventListener('input', function() {
    //     fontItalic = parseFloat(this.value);
    //     document.getElementById('fontItalicValue').textContent = fontItalic;
    // });

    const autoPulseFontSizeElement = document.getElementById('autoPulseFontSize');
    autoPulseFontSize = autoPulseFontSizeElement.checked;
    autoPulseFontSizeElement.addEventListener('change', function() {
        autoPulseFontSize = this.checked;
        document.getElementById('fontSize').disabled = autoPulseFontSize;
    });
}

function updateElementsArray() {
    let words = textInput.split(" ");
    elements = [];

    // Build the list of elements to draw, including spaces
    words.forEach((word, index) => {
        elements.push(word);
        if (index < words.length) { //  add spaces after the last word
            for (let i = 0; i < spaceBetweenWords; i++) {
                elements.push(" ");
            }
        }
    });
}

// Function to map blend mode string to p5.js constant
function getBlendMode(mode) {
    switch (mode) {
        case 'ADD':
            return ADD;
        case 'DARKEST':
            return DARKEST;
        case 'LIGHTEST':
            return LIGHTEST;
        case 'DIFFERENCE':
            return DIFFERENCE;
        case 'EXCLUSION':
            return EXCLUSION;
        case 'MULTIPLY':
            return MULTIPLY;
        case 'SCREEN':
            return SCREEN;
        case 'REPLACE':
            return REPLACE;
        default:
            return BLEND;
    }
}

function updateSketchVariables() {
    // Update global variables from UI elements
    textInput = document.getElementById('textInput').value;
    fontSize = parseInt(document.getElementById('fontSize').value, 10);
    autoPulseFontSize = document.getElementById('autoPulseFontSize').checked;
    fontWeight = parseInt(document.getElementById('fontWeight').value, 10);
    autoPulseWeight = document.getElementById('autoPulseWeight').checked;
    numRepetitions = parseInt(document.getElementById('numRepetitions').textContent, 10);
    spaceBetweenWords = parseInt(document.getElementById('spaceBetweenWordsValue').textContent, 10);
    backgroundColor = document.getElementById('backgroundColor').value;
    textColors = [
        document.getElementById('textColor1').value,
        document.getElementById('textColor2').value,
        document.getElementById('textColor3').value
    ];
    speed = parseFloat(document.getElementById('speed').value);
    rotateOnWave = document.getElementById('rotateOnWave').checked;
    reverseAnimation = document.getElementById('reverseAnimation').checked;
    stepBetweenWords = parseInt(document.getElementById('stepBetweenWords').value, 10);
    waveTypeX = document.getElementById('waveTypeX').value;
    xPhase = parseFloat(document.getElementById('xPhase').value);
    xMagnitude = parseFloat(document.getElementById('xMagnitude').value);
    waveTypeY = document.getElementById('waveTypeY').value;
    yPhase = parseFloat(document.getElementById('yPhase').value);
    yMagnitude = parseFloat(document.getElementById('yMagnitude').value);
    showWave = document.getElementById('showWave').checked;
    waveDebugColor = document.getElementById('waveDebugColor').value;

    // Update elements array
    updateElementsArray();
}
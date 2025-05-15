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
let rotateWithPosition = true;
let rotateWithFlow = false;

//Typography
let textInput = "hello how are you";
let currentFont = 'Wix Madefor Text';
let fontSize = 50;
let stepBetweenWords=30;
let spaceBetweenElements = 0;
let numRepetitions = 1;
let autoPulseWeight = false;
let autoPulseFontSize = false;
let textSplitMode = 'word';

// Color Variables
let backgroundColor = '#000000';
let textColors = ['#FFFFFF', '#FF0000', '#00FF00'];
let fontWeight = 400;
let currentBlendMode = "BLEND";

//Wave
let waveDebugColor = '#00FF00';
let debugWaveType = 'circle';

//Canvas
let canvasWidth = 3000;
let canvasHeight = 3000;

//=========================================

let elements = [];
const mediaKey = "1234567890MEDIA0987654321";
let loadedMedia = null;


async function setup() {
    canvasWidth = windowWidth;
    canvasHeight = windowHeight;
    var c = createCanvas(canvasWidth, canvasHeight);
    c.parent("canvasWrapper");
    setUpUI();

    // Load both fonts
    await loadGoogleFontSet('https://fonts.googleapis.com/css2?family=Wix+Madefor+Text:ital,wght@0,400..800;1,400..800&display=swap');
    await loadGoogleFontSet('https://fonts.googleapis.com/css2?family=Roboto+Flex:ital,wght@0,400..800;1,400..800&display=swap');
    await loadGoogleFontSet('https://fonts.googleapis.com/css2?family=Playwrite+NZ:wght@100..400&display=swap');

    frameRate(60); // Explicitly set to 60 FPS
}

function windowResized() {
    // Only resize if we're using window dimensions
    if (document.getElementById('canvasPreset').value === 'custom') {
        resizeCanvas(canvasWidth, canvasHeight);
    }
}

function draw() {
    checkFPS();
    background(backgroundColor);
    textAlign(CENTER,CENTER);
    translate(width/2, 0);

    // Apply the current blend mode
    blendMode(BLEND);

    if(showWave){
        drawWave();
    }
    drawText();
}

function checkFPS(){
    const fps = frameRate();
    if(fps < 15){
        //MAKE BLEND MODE MORE BLEND

        // MAKE NUM OF REPETITIONS LESS
    }
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
    let colorIndex = 0;
    const autoPulseWeight = document.getElementById('autoPulseWeight').checked;


    drawWaveElements(numOfElements, elementWidth, stepBetweenWords, (i) => {
        // Calculate font size based on wave position if autoPulseFontSize is enabled
        let currentFontSize = fontSize;
        if (autoPulseFontSize) {
            const t = frameCount / 60 * 1000;
            currentFontSize = map(sin(t * 0.001 - i), -1, 1, 50, 150); // Adjust the range as needed
        }

        textSize(currentFontSize);
        let element = elements[i % elements.length];

        // // For sentence mode, we need to adjust the spacing
        if (textSplitMode === 'sentence') {
            // Use the entire width for the sentence
            textAlign(CENTER,CENTER);
        }

        // Handle media element
        if (element === mediaKey && loadedMedia) {
            // Calculate size based on font size
            let mediaSize = currentFontSize * 1.5;
            
            // Apply the current blend mode
            blendMode(currentBlendMode);
            
            // Draw the media (works for both images and videos)
            imageMode(CENTER);
            image(loadedMedia, 0, 0, mediaSize, mediaSize);
            
            // Reset blend mode
            blendMode(BLEND);
            return;
        }

        // Handle text element
        fill(textColors[colorIndex % textColors.length]);
        if (element.trim() !== "") {
            colorIndex++;
        }

        // Apply the current blend mode for each text element
        blendMode(currentBlendMode);

        let angleX = radians(frameCount * speed * xPhase + i * stepBetweenWords);
        let angleY = radians(frameCount * speed * yPhase + i * stepBetweenWords);

        let waveX = calculateWaveValue(angleX, height * xMagnitude, waveTypeX, i, widthSize);
        let waveY = calculateWaveValue(angleY, height * yMagnitude, waveTypeY, i, widthSize);

        // Calculate the angle of rotation based on the wave
        let angle = -atan2(waveY, waveX);

        // Calculate the wave direction angle
        let nextAngleX = radians(frameCount * speed * xPhase + (i + 1) * stepBetweenWords);
        let nextAngleY = radians(frameCount * speed * yPhase + (i + 1) * stepBetweenWords);
        let nextWaveX = calculateWaveValue(nextAngleX, height * xMagnitude, waveTypeX, i + 1, widthSize);
        let nextWaveY = calculateWaveValue(nextAngleY, height * yMagnitude, waveTypeY, i + 1, widthSize);
        let directionAngle = atan2(nextWaveY - waveY, nextWaveX - waveX);

        // Calculate font weight based on wave position if autoPulseWeight is enabled
        let currentFontWeight = fontWeight;
        if (autoPulseWeight) {
            const t = frameCount / 60 * 1000;
            currentFontWeight = map(sin(t * 0.0025 - i), -1, 1, 400, 800);
        }

        // Apply rotation based on the selected mode
        if (rotateWithPosition) {
            rotate(angle);
        } else if (rotateWithFlow) {
            rotate(directionAngle);
        }

        // Set the font with the current weight and italic values
        textFont(currentFont, {
            fontVariationSettings: `'wght' ${currentFontWeight}`
        });

        text(element, 0, 0);

        // Reset rotation
        if (rotateWithPosition || rotateWithFlow) {
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
        // Use different shapes based on debugWaveType
        switch(debugWaveType) {
            case 'circle':
                ellipse(0, 0, elementWidth, elementWidth);
                break;
            case 'square':
                rect(-elementWidth/2, -elementWidth/2, elementWidth, elementWidth);
                break;
            case 'triangle':
                triangle(
                    -elementWidth/2, elementWidth/2,
                    elementWidth/2, elementWidth/2,
                    0, -elementWidth/2
                );
                break;
            case 'line':
                stroke(waveDebugColor);
                strokeWeight(10);
                line(-elementWidth/2, 0, elementWidth/2, 0);
                break;
            case 'cross':
                stroke(waveDebugColor);
                strokeWeight(10);
                line(-elementWidth/2, 0, elementWidth/2, 0);
                line(0, -elementWidth/2, 0, elementWidth/2);
                break;
            case 'rhombus':
                quad(
                    0, -elementWidth/4,           // top
                    elementWidth/2, 0,           // right
                    elementWidth/4, elementWidth/2,           // bottom
                    -elementWidth/2, 0           // left
                );
                break;
            default:
                ellipse(0, 0, elementWidth, elementWidth);
        }
    });
}

function drawWaveElements(numOfElements, elementWidth, step, drawElement) {
    push();
    let directionMultiplier = reverseAnimation ? -1 : 1;
    let xTranslate = elementWidth / 2;
    let yTranslate = height / 2;
    
    let padding = 0.1 *width;
    if(waveTypeX === 'static'){
        xTranslate = -width/2+(padding);
    }
    if(waveTypeY === 'static'){
        yTranslate = -height/2+(padding*2);
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

    const rotateWithPositionElement = document.getElementById('rotateWithPosition');
    rotateWithPosition = rotateWithPositionElement.checked;
    rotateWithPositionElement.addEventListener('change', function() {
        rotateWithPosition = this.checked;
        // Disable rotateWithFlow when rotateWithPosition is enabled
        if (this.checked) {
            document.getElementById('rotateWithFlow').checked = false;
            rotateWithFlow = false;
        }
    });
    
    const rotateWithFlowElement = document.getElementById('rotateWithFlow');
    rotateWithFlow = rotateWithFlowElement.checked;
    rotateWithFlowElement.addEventListener('change', function() {
        rotateWithFlow = this.checked;
        // Disable rotateWithPosition when rotateWithFlow is enabled
        if (this.checked) {
            document.getElementById('rotateWithPosition').checked = false;
            rotateWithPosition = false;
        }
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
        spaceBetweenElements++;
        document.getElementById('spaceBetweenWordsValue').textContent = spaceBetweenElements;
        updateElementsArray();
    });

    document.getElementById('decreaseSpaceBetweenWords').addEventListener('click', function() {
        if (spaceBetweenElements > 0) {
            spaceBetweenElements--;
            document.getElementById('spaceBetweenWordsValue').textContent = spaceBetweenElements;
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



    const autoPulseFontSizeElement = document.getElementById('autoPulseFontSize');
    autoPulseFontSize = autoPulseFontSizeElement.checked;
    autoPulseFontSizeElement.addEventListener('change', function() {
        autoPulseFontSize = this.checked;
        document.getElementById('fontSize').disabled = autoPulseFontSize;
    });

    // Add event listener for text split mode
    const textSplitModeElement = document.getElementById('textSplitMode');
    textSplitMode = textSplitModeElement.value;
    textSplitModeElement.addEventListener('change', function() {
        textSplitMode = this.value;
        updateElementsArray();
    });

    // Add event listener for debug wave type
    const debugWaveTypeElement = document.getElementById('debugWaveType');
    debugWaveType = debugWaveTypeElement.value;
    debugWaveTypeElement.addEventListener('change', function() {
        debugWaveType = this.value;
    });

    // Add event listeners for canvas controls
    document.getElementById('canvasWidth').addEventListener('input', function() {
        updateValueDisplay('canvasWidth', this.value);
        updateCanvasSize();
    });

    document.getElementById('canvasHeight').addEventListener('input', function() {
        updateValueDisplay('canvasHeight', this.value);
        updateCanvasSize();
    });

    document.getElementById('canvasPreset').addEventListener('change', function() {
        const preset = this.value;
        if (preset !== 'custom') {
            const [width, height] = preset.split('x').map(Number);
            let newWidth = width;
            let newHeight = height;
         
            aspectRatio = width / height;
            if(width > window.innerWidth){
                newWidth = window.innerWidth;
                newHeight = window.innerWidth / aspectRatio;
            }
            if(newHeight > window.innerHeight){
                newHeight = window.innerHeight;
                newWidth = window.innerHeight * aspectRatio;
            }
            console.log(newWidth, newHeight);
            
            // Update both the display values and the slider positions
            const canvasWidthSlider = document.getElementById('canvasWidth');
            const canvasHeightSlider = document.getElementById('canvasHeight');
            
            canvasWidthSlider.value = newWidth;
            canvasHeightSlider.value = newHeight;
            
            updateValueDisplay('canvasWidth', newWidth);
            updateValueDisplay('canvasHeight', newHeight);
            updateCanvasSize();
        }
    });

    document.getElementById('canvasControls').style.display = 'block';

    // Add file input handling
    const imageInput = document.getElementById('imageInput');
    imageInput.addEventListener('change', async function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async function(event) {
                try {
                    // Clean up any existing media
                    if (loadedMedia) {
                        // Check if it's a video by checking for video-specific methods
                        if (loadedMedia.elt && loadedMedia.elt.tagName === 'VIDEO') {
                            loadedMedia.remove();
                        }
                        loadedMedia = null;
                    }

                    // Check if the file is a video
                    if (file.type.startsWith('video/')) {
                        loadedMedia = createVideo(event.target.result, () => {
                            loadedMedia.hide(); // Hide the video element
                            loadedMedia.loop(); // Make it loop
                            loadedMedia.volume(0); // Mute it
                            console.log("Video loaded successfully");
                            updateElementsArray();
                        });
                    } else {
                        // It's an image or GIF
                        loadedMedia = await loadImage(event.target.result);
                        console.log("Image/GIF loaded successfully");
                        updateElementsArray();
                    }
                } catch (error) {
                    console.error("Error loading media:", error);
                }
            };
            reader.readAsDataURL(file);
        } else {
            // If no file is selected, remove the media
            if (loadedMedia) {
                // Check if it's a video by checking for video-specific methods
                if (loadedMedia.elt && loadedMedia.elt.tagName === 'VIDEO') {
                    loadedMedia.remove();
                }
                loadedMedia = null;
            }
            updateElementsArray();
        }
    });

    document.getElementById('defaultGifSelect').addEventListener('change', async function() {
        const selectedGif = this.value;
        // Use the handleMedia helper function
        handleMedia(selectedGif);
    });
}

function updateElementsArray() {
    switch(textSplitMode) {
        case 'sentence':
            // For sentence mode, we don't need to add spaces since it's one element
            elements = [textInput];
            break;
        case 'word':
            // Split by words and add spaces between them
            let words = textInput.split(" ");
            elements = [];
            words.forEach((word, index) => {
                elements.push(word);
                if (index < words.length) { // Don't add spaces after the last word
                    for (let i = 0; i < spaceBetweenElements; i++) {
                        elements.push(" ");
                    }
                }
            });
            break;
        case 'char':
            // Split into individual characters and add spaces between them
            let chars = textInput.split("");
            elements = [];
            chars.forEach((char, index) => {
                elements.push(char);
                if (index < chars.length) { // Don't add spaces after the last character
                    for (let i = 0; i < spaceBetweenElements; i++) {
                        elements.push(" ");
                    }
                }
            });
            break;
    }
    

    // Add the media as the last element if it exists
    if (loadedMedia) {
        elements.push(mediaKey);
    }
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

// Helper function to handle all media operations
async function handleMedia(mediaPath = null) {
    // Clean up any existing media
    if (loadedMedia) {
        if (loadedMedia.elt && loadedMedia.elt.tagName === 'VIDEO') {
            loadedMedia.remove();
        }
        loadedMedia = null;
    }

    // Clear the file input
    document.getElementById('imageInput').value = '';

    // If a media path is provided, load it
    if (mediaPath) {
        try {
            loadedMedia = await loadImage(mediaPath);
            console.log("Media loaded successfully");
        } catch (error) {
            console.error("Error loading media:", error);
        }
    }

    // Update elements array after any media changes
    updateElementsArray();
}

function updateSketchVariables() {
    // Update global variables from UI elements
    textInput = document.getElementById('textInput').value;
    fontSize = parseInt(document.getElementById('fontSize').value, 10);
    autoPulseFontSize = document.getElementById('autoPulseFontSize').checked;
    fontWeight = parseInt(document.getElementById('fontWeight').value, 10);
    autoPulseWeight = document.getElementById('autoPulseWeight').checked;
    numRepetitions = parseInt(document.getElementById('numRepetitions').textContent, 10);
    spaceBetweenElements = parseInt(document.getElementById('spaceBetweenWordsValue').textContent, 10);
    backgroundColor = document.getElementById('backgroundColor').value;
    textColors = [
        document.getElementById('textColor1').value,
        document.getElementById('textColor2').value,
        document.getElementById('textColor3').value
    ];
    speed = parseFloat(document.getElementById('speed').value);
    rotateWithPosition = document.getElementById('rotateWithPosition').checked;
    rotateWithFlow = document.getElementById('rotateWithFlow').checked;
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
    debugWaveType = document.getElementById('debugWaveType').value;
    
    // Add blend mode and font updates
    currentBlendMode = getBlendMode(document.getElementById('blendModeDropdown').value);
    currentFont = document.getElementById('fontSelection').value;
    
    // Add text split mode update
    textSplitMode = document.getElementById('textSplitMode').value;

    // Handle media using the helper function
    const defaultGifSelect = document.getElementById('defaultGifSelect');
    handleMedia(defaultGifSelect.value);

    // Update elements array
    updateElementsArray();
}

// Add this function to handle canvas size changes
function updateCanvasSize() {
    const newWidth = parseInt(document.getElementById('canvasWidth').value);
    const newHeight = parseInt(document.getElementById('canvasHeight').value);
    console.log("newWidth", newWidth, "newHeight", newHeight);
    // Update the canvas dimensions
    canvasWidth = newWidth;
    canvasHeight = newHeight;
    resizeCanvas(newWidth, newHeight);
}
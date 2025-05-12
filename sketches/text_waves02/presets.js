// Dictionary to hold presets with preset name as the key
const presetsDictionary = {
    "Simple": {
        "name": "Simple",
        "textInput": "type WAVE TOOL",
        "fontSize": "182",
        "autoPulseFontSize": false,
        "fontWeight": "800",
        "autoPulseWeight": true,
        "numRepetitions": "3",
        "spaceBetweenWords": "3",
        "backgroundColor": "#ffffff",
        "textColors": [
            "#000000",
            "#1b630d",
            "#ff9500"
        ],
        "speed": "1.78",
        "rotateWithPosition": false,
        "rotateWithFlow": false,
        "reverseAnimation": false,
        "stepBetweenWords": "10",
        "waveTypeX": "sin",
        "xPhase": "0.3",
        "xMagnitude": "0.3",
        "waveTypeY": "cos",
        "yPhase": "0.2",
        "yMagnitude": "0.3",
        "showWave": false,
        "waveDebugColor": "#002e0e",
        "currentBlendMode": "BLEND",
        "currentFont": "Wix Madefor Text"
    },
    "Blend Modes": {
        "name": "Blend Modes",
        "textInput": "STUDIO VIDEO :)",
        "fontSize": "221",
        "autoPulseFontSize": false,
        "fontWeight": "629",
        "autoPulseWeight": false,
        "numRepetitions": "6",
        "spaceBetweenWords": "6",
        "backgroundColor": "#000000",
        "textColors": [
            "#8f0000",
            "#b99792",
            "#4f09ec"
        ],
        "speed": "1.04",
        "rotateWithPosition": true,
        "rotateWithFlow": false,
        "reverseAnimation": false,
        "stepBetweenWords": "17",
        "waveTypeX": "sin",
        "xPhase": "1.1",
        "xMagnitude": "0.3",
        "waveTypeY": "cos",
        "yPhase": "1",
        "yMagnitude": "0.2",
        "showWave": false,
        "waveDebugColor": "#b9005c",
        "currentBlendMode": "DIFFERENCE",
        "currentFont": "Wix Madefor Text"
    },
    "Sin Wave": {
        "name": "Sin Wave",
        "textInput": "*****.wix.*****",
        "fontSize": "60",
        "autoPulseFontSize": false,
        "fontWeight": "470",
        "autoPulseWeight": false,
        "numRepetitions": "138",
        "spaceBetweenWords": "0",
        "backgroundColor": "#d8fdde",
        "textColors": [
            "#c875ff",
            "#00c732",
            "#56165a"
        ],
        "speed": "6.32",
        "rotateWithPosition": false,
        "rotateWithFlow": false,
        "reverseAnimation": false,
        "stepBetweenWords": "8",
        "waveTypeX": "static",
        "xPhase": "0.2",
        "xMagnitude": "0.3",
        "waveTypeY": "sin",
        "yPhase": "0.1",
        "yMagnitude": "0.4",
        "showWave": false,
        "waveDebugColor": "#c9f454",
        "currentBlendMode": "BLEND",
        "currentFont": "Roboto Flex"
    },
    "Bouncing Trails": {
        "name": "Bouncing Trails",
        "textInput": "good morning ",
        "fontSize": "300",
        "autoPulseFontSize": false,
        "fontWeight": "800",
        "autoPulseWeight": false,
        "numRepetitions": "5",
        "spaceBetweenWords": "12",
        "backgroundColor": "#40123c",
        "textColors": [
            "#3d0000",
            "#b99792",
            "#4f09ec"
        ],
        "speed": "0.95",
        "rotateWithPosition": false,
        "rotateWithFlow": false,
        "reverseAnimation": false,
        "stepBetweenWords": "9",
        "waveTypeX": "cos",
        "xPhase": "0",
        "xMagnitude": "0",
        "waveTypeY": "cos",
        "yPhase": "1.1",
        "yMagnitude": "0.3",
        "showWave": false,
        "waveDebugColor": "#b9005c",
        "currentBlendMode": "ADD",
        "currentFont": "Wix Madefor Text"
    },
    "Spiral Pattern":
    {
        "name": "Spiral Pattern",
        "textInput": "///////////////////////////---------------------+++++++++++++++++++",
        "fontSize": "165",
        "autoPulseFontSize": false,
        "fontWeight": "100",
        "autoPulseWeight": false,
        "numRepetitions": "51",
        "spaceBetweenWords": "2",
        "backgroundColor": "#000000",
        "textColors": [
            "#ce1c1c",
            "#ffffff",
            "#0400ff"
        ],
        "speed": "1.66",
        "rotateWithPosition": true,
        "rotateWithFlow": false,
        "reverseAnimation": false,
        "stepBetweenWords": "1",
        "waveTypeX": "tan",
        "xPhase": "1",
        "xMagnitude": "0.4",
        "waveTypeY": "sin",
        "yPhase": "0.7",
        "yMagnitude": "0.1",
        "showWave": false,
        "waveDebugColor": "#88582c",
        "currentBlendMode": "SCREEN",
        "currentFont": "Playwrite NZ"
    },
    "Drop": {
        "name": "Drop",
        "textInput": "hello\n*",
        "fontSize": "153",
        "autoPulseFontSize": false,
        "fontWeight": "405",
        "autoPulseWeight": false,
        "numRepetitions": "52",
        "spaceBetweenWords": "4",
        "backgroundColor": "#ff4d4d",
        "textColors": [
            "#75ffe8",
            "#ffebfc",
            "#74ee72"
        ],
        "speed": "4",
        "rotateWithPosition": true,
        "rotateWithFlow": false,
        "reverseAnimation": false,
        "stepBetweenWords": "8",
        "waveTypeX": "static",
        "xPhase": "1",
        "xMagnitude": "0.1",
        "waveTypeY": "tan",
        "yPhase": "0.3",
        "yMagnitude": "0.1",
        "showWave": false,
        "waveDebugColor": "#88582c",
        "currentBlendMode": "BLEND",
        "currentFont": "Roboto Flex"
    },
    "Ring Masked":
    {
        "name": "Ring Masked",
        "textInput": "studio ++ video #",
        "fontSize": "300",
        "autoPulseFontSize": false,
        "fontWeight": "610",
        "autoPulseWeight": false,
        "numRepetitions": "3",
        "spaceBetweenWords": "5",
        "backgroundColor": "#000000",
        "textColors": [
            "#124200",
            "#00bd03",
            "#70cc00"
        ],
        "speed": "0.67",
        "rotateWithPosition": false,
        "rotateWithFlow": false,
        "reverseAnimation": true,
        "stepBetweenWords": "37",
        "waveTypeX": "sin",
        "xPhase": "1.1",
        "xMagnitude": "0.4",
        "waveTypeY": "cos",
        "yPhase": "0.5",
        "yMagnitude": "0.3",
        "showWave": true,
        "waveDebugColor": "#a6ff00",
        "currentBlendMode": "DARKEST",
        "currentFont": "Wix Madefor Text"
    },
    "Tan Swipe": {
        "name": "Tan Swipe",
        "textInput": "studio ++ video #",
        "fontSize": "148",
        "autoPulseFontSize": false,
        "fontWeight": "582",
        "autoPulseWeight": false,
        "numRepetitions": "11",
        "spaceBetweenWords": "1",
        "backgroundColor": "#4db7d0",
        "textColors": [
            "#63e345",
            "#bb1ab0",
            "#45e29a"
        ],
        "speed": "0.2",
        "rotateWithPosition": false,
        "rotateWithFlow": false,
        "reverseAnimation": false,
        "stepBetweenWords": "32",
        "waveTypeX": "tan",
        "xPhase": "0.9",
        "xMagnitude": "0.1",
        "waveTypeY": "static",
        "yPhase": "0.3",
        "yMagnitude": "0.7",
        "showWave": true,
        "waveDebugColor": "#89982f",
        "currentBlendMode": "SCREEN",
        "currentFont": "Wix Madefor Text"
    }


};


document.addEventListener('DOMContentLoaded', function () {
    // First set up all UI elements and event listeners
    updatePresetButtons();

    // Set up the shuffle button event listener
    document.getElementById('shuffleButton').addEventListener('click', shufflePreset);

    // Set up other event listeners
    document.getElementById('savePresetButton').addEventListener('click', function () {
        const presetName = prompt("Enter a name for your preset:");
        if (presetName) {
            savePreset(presetName);
        }
    });

    document.getElementById('loadPresetButton').addEventListener('click', function () {
        document.getElementById('presetFileInput').click();
    });

    // Update the file input element to allow multiple file selections
    document.getElementById('presetFileInput').setAttribute('multiple', '');

    // Modify the event listener to handle multiple files
    document.getElementById('presetFileInput').addEventListener('change', function (event) {
        const files = event.target.files;
        if (files.length > 0) {
            Array.from(files).forEach(file => {
                const reader = new FileReader();
                reader.onload = function (e) {
                    try {
                        const preset = JSON.parse(e.target.result);
                        if (preset && preset.name) {
                            addPreset(preset);
                            applyPreset(preset.name);
                        } else {
                            console.error('Invalid preset file');
                        }
                    } catch (error) {
                        console.error('Error reading preset file:', error);
                    }
                };
                reader.readAsText(file);
            });
        }
    });

    // Apply the Simple preset after all UI elements and event listeners are set up
    setTimeout(() => {
        applyPreset("Simple");
    }, 0);
});

class Preset {
    constructor(name, textInput, fontSize, autoPulseFontSize, fontWeight, autoPulseWeight, numRepetitions, spaceBetweenWords, backgroundColor, textColors, speed, rotateWithPosition, rotateWithFlow, reverseAnimation, stepBetweenWords, waveTypeX, xPhase, xMagnitude, waveTypeY, yPhase, yMagnitude, showWave, waveDebugColor, currentBlendMode, currentFont) {
        this.name = name;
        this.textInput = textInput;
        this.fontSize = fontSize;
        this.autoPulseFontSize = autoPulseFontSize;
        this.fontWeight = fontWeight;
        this.autoPulseWeight = autoPulseWeight;
        this.numRepetitions = numRepetitions;
        this.spaceBetweenWords = spaceBetweenWords;
        this.backgroundColor = backgroundColor;
        this.textColors = textColors;
        this.speed = speed;
        this.rotateWithPosition = rotateWithPosition;
        this.rotateWithFlow = rotateWithFlow;
        this.reverseAnimation = reverseAnimation;
        this.stepBetweenWords = stepBetweenWords;
        this.waveTypeX = waveTypeX;
        this.xPhase = xPhase;
        this.xMagnitude = xMagnitude;
        this.waveTypeY = waveTypeY;
        this.yPhase = yPhase;
        this.yMagnitude = yMagnitude;
        this.showWave = showWave;
        this.waveDebugColor = waveDebugColor;
        this.currentBlendMode = currentBlendMode;
        this.currentFont = currentFont;
    }
}



// Function to add a preset to the dictionary
function addPreset(preset) {
    presetsDictionary[preset.name] = preset;
    updatePresetButtons();

    // Log the preset to the console
    console.log(preset.name + ":" + JSON.stringify(preset, null, 2));
}

// Function to update the UI with buttons for each preset
function updatePresetButtons() {
    const presetContainer = document.getElementById('presetContainer');
    presetContainer.innerHTML = ''; // Clear existing buttons

    Object.keys(presetsDictionary).forEach((presetName) => {
        if (presetName != "Random") {
            const button = document.createElement('button');
            button.textContent = presetName;
            button.addEventListener('click', () => applyPreset(presetName));
            presetContainer.appendChild(button);
        }
    });
}

// Modify the savePreset function to use the Preset class
function savePreset(presetName) {
    const preset = new Preset(
        presetName,
        document.getElementById('textInput').value,
        document.getElementById('fontSize').value,
        document.getElementById('autoPulseFontSize').checked,
        document.getElementById('fontWeight').value,
        document.getElementById('autoPulseWeight').checked,
        document.getElementById('numRepetitions').textContent,
        document.getElementById('spaceBetweenWordsValue').textContent,
        document.getElementById('backgroundColor').value,
        [
            document.getElementById('textColor1').value,
            document.getElementById('textColor2').value,
            document.getElementById('textColor3').value
        ],
        document.getElementById('speed').value,
        document.getElementById('rotateWithPosition').checked,
        document.getElementById('rotateWithFlow').checked,
        document.getElementById('reverseAnimation').checked,
        document.getElementById('stepBetweenWords').value,
        document.getElementById('waveTypeX').value,
        document.getElementById('xPhase').value,
        document.getElementById('xMagnitude').value,
        document.getElementById('waveTypeY').value,
        document.getElementById('yPhase').value,
        document.getElementById('yMagnitude').value,
        document.getElementById('showWave').checked,
        document.getElementById('waveDebugColor').value,
        document.getElementById('blendModeDropdown').value,
        document.getElementById('fontSelection').value
    );

    addPreset(preset);

    // Convert preset to JSON and trigger download
    const presetJSON = JSON.stringify(preset, null, 2);
    const blob = new Blob([presetJSON], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${presetName}.json`;
    a.click();
    URL.revokeObjectURL(url);
}


// Modify the applyPreset function to use the dictionary
function applyPreset(presetName, preset = null) {
    if (preset == null) {
        preset = presetsDictionary[presetName];
    }

    if (preset) {
        document.getElementById('textInput').value = preset.textInput;

        // Update font size and its display
        document.getElementById('fontSize').value = preset.fontSize;
        document.getElementById('fontSizeValue').textContent = preset.fontSize;

        document.getElementById('autoPulseFontSize').checked = preset.autoPulseFontSize;

        // Update font weight and its display
        document.getElementById('fontWeight').value = preset.fontWeight;
        document.getElementById('fontWeightValue').textContent = preset.fontWeight;

        document.getElementById('autoPulseWeight').checked = preset.autoPulseWeight;
        document.getElementById('numRepetitions').textContent = preset.numRepetitions;
        document.getElementById('spaceBetweenWordsValue').textContent = preset.spaceBetweenWords;
        document.getElementById('backgroundColor').value = preset.backgroundColor;
        document.getElementById('textColor1').value = preset.textColors[0];
        document.getElementById('textColor2').value = preset.textColors[1];
        document.getElementById('textColor3').value = preset.textColors[2];

        // Update speed and its display
        document.getElementById('speed').value = preset.speed;
        document.getElementById('speedValue').textContent = preset.speed;

        document.getElementById('rotateWithPosition').checked = preset.rotateWithPosition;
        document.getElementById('rotateWithFlow').checked = preset.rotateWithFlow;
        document.getElementById('reverseAnimation').checked = preset.reverseAnimation;

        // Update step between words and its display
        document.getElementById('stepBetweenWords').value = preset.stepBetweenWords;
        document.getElementById('stepBetweenWordsValue').textContent = preset.stepBetweenWords;

        document.getElementById('waveTypeX').value = preset.waveTypeX;

        // Update X phase and its display
        document.getElementById('xPhase').value = preset.xPhase;
        document.getElementById('xPhaseValue').textContent = preset.xPhase;

        // Update X magnitude and its display
        document.getElementById('xMagnitude').value = preset.xMagnitude;
        document.getElementById('xMagnitudeValue').textContent = preset.xMagnitude;

        document.getElementById('waveTypeY').value = preset.waveTypeY;

        // Update Y phase and its display
        document.getElementById('yPhase').value = preset.yPhase;
        document.getElementById('yPhaseValue').textContent = preset.yPhase;

        // Update Y magnitude and its display
        document.getElementById('yMagnitude').value = preset.yMagnitude;
        document.getElementById('yMagnitudeValue').textContent = preset.yMagnitude;

        document.getElementById('showWave').checked = preset.showWave;
        document.getElementById('waveDebugColor').value = preset.waveDebugColor;
        document.getElementById('blendModeDropdown').value = preset.currentBlendMode || 'BLEND';
        document.getElementById('fontSelection').value = preset.currentFont || 'Wix Madefor Text';

        // Update the sketch variables
        updateSketchVariables();

        // Call toggleInputs to enable/disable sliders based on wave type
        toggleInputs('waveTypeX', 'xPhase', 'xMagnitude');
        toggleInputs('waveTypeY', 'yPhase', 'yMagnitude');
    } else {
        console.error('Preset not found:', presetName);
    }
}

function shufflePreset() {
    console.log("Shuffling preset");
    const randomPreset = new Preset(
        "Random", // Preset name
        document.getElementById('textInput').value, // Keep current text input
        Math.floor(Math.random() * 291) + 10, // Random font size between 10 and 300
        0, // Disable auto pulse font size
        Math.floor(Math.random() * 701) + 100, // Random font weight between 100 and 800
        0, // Disable auto pulse weight
        Math.floor(Math.random() * 10) + 1, // Random number of repetitions between 1 and 10
        Math.floor(Math.random() * 10), // Random space between words between 0 and 9
        `#${Math.floor(Math.random() * 16777215).toString(16)}`, // Random background color
        [
            `#${Math.floor(Math.random() * 16777215).toString(16)}`, // Random text color 1
            `#${Math.floor(Math.random() * 16777215).toString(16)}`, // Random text color 2
            `#${Math.floor(Math.random() * 16777215).toString(16)}`  // Random text color 3
        ],
        (Math.random() * 2).toFixed(2), // Random speed between 0 and 5
        Math.random() < 0.5, // Random boolean for rotate with position
        Math.random() < 0.5, // Random boolean for rotate with flow
        Math.random() < 0.5, // Random boolean for reverse animation
        Math.floor(Math.random() * 101), // Random step between words between 0 and 100
        ["sin", "cos", "tan", "static"][Math.floor(Math.random() * 4)], // Random X wave type
        (Math.random() * 2).toFixed(1), // Random X phase between 0 and 2
        (Math.random() * 1).toFixed(1), // Random X magnitude between 0 and 1
        ["sin", "cos", "tan", "static"][Math.floor(Math.random() * 4)], // Random Y wave type
        (Math.random() * 2).toFixed(1), // Random Y phase between 0 and 2
        (Math.random() * 1).toFixed(1), // Random Y magnitude between 0 and 1
        Math.random() < 0.5, // Random boolean for show wave
        `#${Math.floor(Math.random() * 16777215).toString(16)}`, // Random wave debug color
        ["BLEND", "ADD", "DARKEST", "LIGHTEST", "DIFFERENCE", "EXCLUSION", "MULTIPLY", "SCREEN"][Math.floor(Math.random() * 8)], // Random blend mode
        ["Wix Madefor Text", "Roboto Flex", "Playwrite NZ"][Math.floor(Math.random() * 3)] // Random font selection
    );
    presetsDictionary[randomPreset.name] = randomPreset;
    applyPreset(randomPreset.name);
}

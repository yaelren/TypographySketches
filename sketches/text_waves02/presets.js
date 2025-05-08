// Dictionary to hold presets with preset name as the key
const presetsDictionary = {
    "TEST": {
        "name": "TEST",
        "textInput": "STUDIO +++ VIDEO :)",
        "fontSize": "90",
        "autoPulseFontSize": false,
        "fontWeight": "535",
        "autoPulseWeight": false,
        "numRepetitions": "10",
        "spaceBetweenWords": "2",
        "backgroundColor": "#202004",
        "textColors": [
            "#ed6c44",
            "#e667fc",
            "#3638b1"
        ],
        "speed": "1",
        "rotateOnWave": false,
        "reverseAnimation": false,
        "stepBetweenWords": "8",
        "waveTypeX": "static",
        "xPhase": "0.7",
        "xMagnitude": "0.2",
        "waveTypeY": "cos",
        "yPhase": "0.5",
        "yMagnitude": "0.2",
        "showWave": false,
        "waveDebugColor": "#000000"
    }
};


document.addEventListener('DOMContentLoaded', function () {
    updatePresetButtons();
    applyPreset("TEST");


    document.getElementById('shuffleButton').addEventListener('click', shufflePreset);

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

});

class Preset {
    constructor(name, textInput, fontSize, autoPulseFontSize, fontWeight, autoPulseWeight, numRepetitions, spaceBetweenWords, backgroundColor, textColors, speed, rotateOnWave, reverseAnimation, stepBetweenWords, waveTypeX, xPhase, xMagnitude, waveTypeY, yPhase, yMagnitude, showWave, waveDebugColor) {
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
        this.rotateOnWave = rotateOnWave;
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
        if(presetName != "Random") {
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
        document.getElementById('rotateOnWave').checked,
        document.getElementById('reverseAnimation').checked,
        document.getElementById('stepBetweenWords').value,
        document.getElementById('waveTypeX').value,
        document.getElementById('xPhase').value,
        document.getElementById('xMagnitude').value,
        document.getElementById('waveTypeY').value,
        document.getElementById('yPhase').value,
        document.getElementById('yMagnitude').value,
        document.getElementById('showWave').checked,
        document.getElementById('waveDebugColor').value
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
        document.getElementById('fontSize').value = preset.fontSize;
        document.getElementById('autoPulseFontSize').checked = preset.autoPulseFontSize;
        document.getElementById('fontWeight').value = preset.fontWeight;
        document.getElementById('autoPulseWeight').checked = preset.autoPulseWeight;
        document.getElementById('numRepetitions').textContent = preset.numRepetitions;
        document.getElementById('spaceBetweenWordsValue').textContent = preset.spaceBetweenWords;
        document.getElementById('backgroundColor').value = preset.backgroundColor;
        document.getElementById('textColor1').value = preset.textColors[0];
        document.getElementById('textColor2').value = preset.textColors[1];
        document.getElementById('textColor3').value = preset.textColors[2];
        document.getElementById('speed').value = preset.speed;
        document.getElementById('rotateOnWave').checked = preset.rotateOnWave;
        document.getElementById('reverseAnimation').checked = preset.reverseAnimation;
        document.getElementById('stepBetweenWords').value = preset.stepBetweenWords;
        document.getElementById('waveTypeX').value = preset.waveTypeX;
        document.getElementById('xPhase').value = preset.xPhase;
        document.getElementById('xMagnitude').value = preset.xMagnitude;
        document.getElementById('waveTypeY').value = preset.waveTypeY;
        document.getElementById('yPhase').value = preset.yPhase;
        document.getElementById('yMagnitude').value = preset.yMagnitude;
        document.getElementById('showWave').checked = preset.showWave;
        document.getElementById('waveDebugColor').value = preset.waveDebugColor;
        
        // Update the sketch variables
        updateSketchVariables();
        
        // Call toggleInputs to enable/disable sliders based on wave type
        toggleInputs('waveTypeX', 'xPhase', 'xMagnitude');
        toggleInputs('waveTypeY', 'yPhase', 'yMagnitude');
        
        // toggleInputs();
    } else {
        console.error('Preset not found:', presetName);
    }
}

function shufflePreset() {
    console.log("Shuffling preset");
    const randomPreset = new Preset(
        "Random",
        document.getElementById('textInput').value, // Random text
        Math.floor(Math.random() * 291) + 10, // Random font size between 10 and 300
       0, // Random boolean for autoPulseFontSize
        Math.floor(Math.random() * 701) + 100, // Random font weight between 100 and 800
        0, // Random boolean for autoPulseWeight
        Math.floor(Math.random() * 20) + 1, // Random number of repetitions between 1 and 20
        Math.floor(Math.random() * 10), // Random space between words
        `#${Math.floor(Math.random()*16777215).toString(16)}`, // Random background color
        [
            `#${Math.floor(Math.random()*16777215).toString(16)}`,
            `#${Math.floor(Math.random()*16777215).toString(16)}`,
            `#${Math.floor(Math.random()*16777215).toString(16)}`
        ], // Random text colors
        (Math.random() * 10).toFixed(2), // Random speed between 0 and 10
        Math.random() < 0.5, // Random boolean for rotateOnWave
        Math.random() < 0.5, // Random boolean for reverseAnimation
        Math.floor(Math.random() * 101), // Random step between words
        ["sin", "cos", "tan", "static"][Math.floor(Math.random() * 4)], // Random wave type X
        (Math.random() * 2).toFixed(1), // Random xPhase between 0 and 2
        (Math.random() * 1).toFixed(1), // Random xMagnitude between 0 and 1
        ["sin", "cos", "tan", "static"][Math.floor(Math.random() * 4)], // Random wave type Y
        (Math.random() * 2).toFixed(1), // Random yPhase between 0 and 2
        (Math.random() * 1).toFixed(1), // Random yMagnitude between 0 and 1
        Math.random() < 0.5, // Random boolean for showWave
        `#${Math.floor(Math.random()*16777215).toString(16)}` // Random wave debug color
    );
    presetsDictionary[randomPreset.name] = randomPreset;
    applyPreset(randomPreset.name);
}

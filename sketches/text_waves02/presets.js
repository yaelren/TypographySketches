
// Dictionary to hold presets with preset name as the key
const presetsDictionary = {"TEST":{
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
  }};


document.addEventListener('DOMContentLoaded', function() {
    applyPreset("TEST");
    updatePresetButtons();
    document.getElementById('savePresetButton').addEventListener('click', function() {
        const presetName = prompt("Enter a name for your preset:");
        if (presetName) {
            savePreset(presetName);
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
        const button = document.createElement('button');
        button.textContent = presetName;
        button.addEventListener('click', () => applyPreset(presetName));
        presetContainer.appendChild(button);
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
}


// Modify the applyPreset function to use the dictionary
function applyPreset(presetName) {
    const preset = presetsDictionary[presetName];

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
        updateSketchVariables();
    } else {
        console.error('Preset not found:', presetName);
    }
}

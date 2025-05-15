// Gamepad state
let gamepad = null;
let gamepadConnected = false;

// Controller mapping
const CONTROLS = {
    // Left stick
    LEFT_STICK_X: 0,  // -1 to 1
    LEFT_STICK_Y: 1,  // -1 to 1
    
    // Right stick
    RIGHT_STICK_X: 2, // -1 to 1
    RIGHT_STICK_Y: 3, // -1 to 1
    
    // Buttons
    A: 0,
    B: 1,
    X: 2,
    Y: 3,
    LB: 4,
    RB: 5,
    LT: 6,  // Left Trigger
    RT: 7,  // Right Trigger
    SELECT: 8,
    START: 9,
    LEFT_STICK: 10,
    RIGHT_STICK: 11,
    DPAD_UP: 12,
    DPAD_DOWN: 13,
    DPAD_LEFT: 14,
    DPAD_RIGHT: 15
};

// Parameter selection system
const PARAMETERS = [
    // Text Controls
    {
        id: 'textSplitMode',
        name: 'Text Split Mode',
        element: 'textSplitMode',
        type: 'dropdown',
        options: ['sentence', 'word', 'char'],
        value: 'word'
    },
    {
        id: 'fontSelection',
        name: 'Font',
        element: 'fontSelection',
        type: 'dropdown',
        options: ['Wix Madefor Text', 'Roboto Flex', 'Playwrite NZ'],
        value: 'Wix Madefor Text'
    },
    {
        id: 'fontSize',
        name: 'Font Size',
        element: 'fontSize',
        range: [10, 300],
        step: 1,
        value: 50
    },
    {
        id: 'autoPulseFontSize',
        name: 'Auto Pulse Size',
        element: 'autoPulseFontSize',
        type: 'checkbox',
        value: false
    },
    {
        id: 'fontWeight',
        name: 'Font Weight',
        element: 'fontWeight',
        range: [100, 800],
        step: 1,
        value: 400
    },
    {
        id: 'autoPulseWeight',
        name: 'Auto Pulse Weight',
        element: 'autoPulseWeight',
        type: 'checkbox',
        value: false
    },
    {
        id: 'numRepetitions',
        name: 'Repetitions',
        element: 'numRepetitions',
        range: [1, 50],
        step: 1,
        value: 1
    },
    {
        id: 'spaceBetweenElements',
        name: 'Element Spacing',
        element: 'spaceBetweenWordsValue',
        range: [0, 100],
        step: 1,
        value: 0
    },
    {
        id: 'blendMode',
        name: 'Blend Mode',
        element: 'blendModeDropdown',
        type: 'dropdown',
        options: ['BLEND', 'ADD', 'DARKEST', 'LIGHTEST', 'DIFFERENCE', 'EXCLUSION', 'MULTIPLY', 'SCREEN', 'REPLACE'],
        value: 'BLEND'
    },

    // Animation Controls
    {
        id: 'speed',
        name: 'Speed',
        element: 'speed',
        range: [0, 10],
        step: 0.01,
        value: 1
    },
    {
        id: 'rotateWithFlow',
        name: 'Rotate On Wave Path',
        element: 'rotateWithFlow',
        type: 'checkbox',
        value: false
    },
    {
        id: 'rotateWithPosition',
        name: 'Rotate With Position',
        element: 'rotateWithPosition',
        type: 'checkbox',
        value: false
    },
    {
        id: 'reverseAnimation',
        name: 'Reverse Animation',
        element: 'reverseAnimation',
        type: 'checkbox',
        value: false
    },
    {
        id: 'stepBetweenWords',
        name: 'Frequency',
        element: 'stepBetweenWords',
        range: [0, 100],
        step: 1,
        value: 30
    },

    // X Axis Controls
    {
        id: 'waveTypeX',
        name: 'X Wave Type',
        element: 'waveTypeX',
        type: 'dropdown',
        options: ['sin', 'cos', 'tan', 'static'],
        value: 'sin'
    },
    {
        id: 'xPhase',
        name: 'X Phase',
        element: 'xPhase',
        range: [0, 2],
        step: 0.1,
        value: 0.5
    },
    {
        id: 'xMagnitude',
        name: 'X Width',
        element: 'xMagnitude',
        range: [-1, 1],
        step: 0.1,
        value: 0.4
    },

    // Y Axis Controls
    {
        id: 'waveTypeY',
        name: 'Y Wave Type',
        element: 'waveTypeY',
        type: 'dropdown',
        options: ['sin', 'cos', 'tan', 'static'],
        value: 'sin'
    },
    {
        id: 'yPhase',
        name: 'Y Phase',
        element: 'yPhase',
        range: [0, 2],
        step: 0.1,
        value: 0.5
    },
    {
        id: 'yMagnitude',
        name: 'Y Height',
        element: 'yMagnitude',
        range: [-1, 1],
        step: 0.1,
        value: 0.22
    },

    // Wave Controls
    {
        id: 'showWave',
        name: 'Show Wave',
        element: 'showWave',
        type: 'checkbox',
        value: true
    },
    {
        id: 'debugWaveType',
        name: 'Debug Wave Shape',
        element: 'debugWaveType',
        type: 'dropdown',
        options: ['circle', 'square', 'triangle', 'line', 'cross', 'rhombus'],
        value: 'circle'
    }
];

let currentParameterIndex = 0;
let lastAButtonState = false;
let lastYButtonState = false;
let lastBButtonState = false;
let lastXButtonState = false;
let lastStickYState = false;
let lastStartButtonState = false;
let lastStickXState = false;
let lastBumperState = false;
let lastRightStickYState = false;
let lastParameterChangeTime = 0;
const PARAMETER_CHANGE_DELAY = 200; // milliseconds between changes

function setupGamepad() {
    console.log("Setting up gamepad");
    window.addEventListener("gamepadconnected", (e) => {
        console.log("Gamepad connected:", e.gamepad);
        
        const controlsPopup = document.createElement('div');
        controlsPopup.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 20px;
            border-radius: 10px;
            z-index: 1000;
            font-family: Arial, sans-serif;
            max-width: 80%;
            max-height: 80vh;
            overflow-y: auto;
        `;
        
        controlsPopup.innerHTML = `
            <h2 style="color: #ffeb3b; margin-top: 0;">Controller Controls</h2>
            <div style="margin-bottom: 15px;">
                <strong>Navigation:</strong>
                <ul style="list-style: none; padding-left: 10px;">
                    <li>🔄 A Button: Next Parameter</li>
                    <li>🔄 Y Button: Previous Parameter</li>
                    <li>🔄 Right Stick Up/Down: Navigate Parameters</li>
                </ul>
            </div>
            <div style="margin-bottom: 15px;">
                <strong>Adjustment:</strong>
                <ul style="list-style: none; padding-left: 10px;">
                    <li>🔄 Left Stick Left/Right: Adjust Value</li>
                    <li>🔄 X Button: Toggle Checkbox Parameters</li>
                </ul>
            </div>
            <div style="margin-bottom: 15px;">
                <strong>Special Controls:</strong>
                <ul style="list-style: none; padding-left: 10px;">
                    <li>🔄 B Button: Toggle Wave Display</li>
                    <li>🔄 LT + RT: Trigger Shuffle</li>
                </ul>
            </div>
            <button onclick="this.parentElement.remove()" style="
                background: #ffeb3b;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                cursor: pointer;
                font-weight: bold;
                width: 100%;
            ">Got it!</button>
        `;
        
        document.body.appendChild(controlsPopup);
        
        gamepad = e.gamepad;
        gamepadConnected = true;
    });

    window.addEventListener("gamepaddisconnected", (e) => {
        console.log("Gamepad disconnected:", e.gamepad);
        alert("Gamepad disconnected");
        gamepad = null;
        gamepadConnected = false;
    });
}

function updateGamepadState() {
    if (!gamepadConnected) return;
    
    // Get the latest gamepad state
    const gamepads = navigator.getGamepads();
    gamepad = gamepads[gamepad.index];
    
    if (!gamepad) return;

    // Handle parameter navigation
    handleParameterNavigation();
    
    // Handle parameter adjustment with left stick
    handleParameterAdjustment();
    
    // Handle toggle buttons
    handleToggleButtons();
}

function handleParameterNavigation() {
    const aButtonPressed = gamepad.buttons[CONTROLS.A].pressed;
    const yButtonPressed = gamepad.buttons[CONTROLS.Y].pressed;
    const rightStickY = gamepad.axes[CONTROLS.RIGHT_STICK_Y];
    const currentTime = Date.now();
    
    // A button - Next parameter
    if (aButtonPressed && !lastAButtonState) {
        currentParameterIndex = (currentParameterIndex + 1) % PARAMETERS.length;
        highlightCurrentParameter();
    }
    
    // Y button - Previous parameter
    if (yButtonPressed && !lastYButtonState) {
        currentParameterIndex = (currentParameterIndex - 1 + PARAMETERS.length) % PARAMETERS.length;
        highlightCurrentParameter();
    }

    // Right stick up/down - Navigate parameters with delay
    if (Math.abs(rightStickY) > 0.5) {
        if (currentTime - lastParameterChangeTime >= PARAMETER_CHANGE_DELAY) {
            if (rightStickY < -0.5) { // Up
                currentParameterIndex = (currentParameterIndex - 1 + PARAMETERS.length) % PARAMETERS.length;
                highlightCurrentParameter();
            } else if (rightStickY > 0.5) { // Down
                currentParameterIndex = (currentParameterIndex + 1) % PARAMETERS.length;
                highlightCurrentParameter();
            }
            lastParameterChangeTime = currentTime;
        }
    }
    
    lastAButtonState = aButtonPressed;
    lastYButtonState = yButtonPressed;
}

function handleParameterAdjustment() {
    const currentParam = PARAMETERS[currentParameterIndex];
    const stickX = gamepad.axes[CONTROLS.LEFT_STICK_X];
    const stickY = gamepad.axes[CONTROLS.LEFT_STICK_Y];
    const xButtonPressed = gamepad.buttons[CONTROLS.X].pressed;
    
    // Handle checkbox with X button first, regardless of stick position
    if (currentParam.type === 'checkbox') {
        if (xButtonPressed && !lastXButtonState) {
            updateParameter(currentParam, !currentParam.value);
        }
        lastXButtonState = xButtonPressed;
        return; // Exit early for checkboxes
    }
    
    // Apply deadzone for other controls
    if (Math.abs(stickX) < 0.1 && Math.abs(stickY) < 0.1) return;
    
    if (currentParam.type === 'dropdown') {
        // Handle dropdown selection with up/down stick
        if (stickY < -0.5 && !lastStickYState) { // Up
            const currentIndex = currentParam.options.indexOf(currentParam.value);
            const newIndex = (currentIndex - 1 + currentParam.options.length) % currentParam.options.length;
            updateParameter(currentParam, currentParam.options[newIndex]);
        } else if (stickY > 0.5 && !lastStickYState) { // Down
            const currentIndex = currentParam.options.indexOf(currentParam.value);
            const newIndex = (currentIndex + 1) % currentParam.options.length;
            updateParameter(currentParam, currentParam.options[newIndex]);
        }
        lastStickYState = Math.abs(stickY) > 0.5;
    } else if (currentParam.id === 'numRepetitions' || currentParam.id === 'spaceBetweenElements') {
        // Special handling for repetitions and spacing
        if (stickX > 0.5 && !lastStickXState) { // Right
            // Get current value from UI
            const currentValue = parseInt(document.getElementById(currentParam.id === 'numRepetitions' ? 'numRepetitions' : 'spaceBetweenWordsValue').textContent);
            const newValue = currentValue + currentParam.step;
            if (newValue <= currentParam.range[1]) {
                updateParameter(currentParam, newValue);
            }
        } else if (stickX < -0.5 && !lastStickXState) { // Left
            // Get current value from UI
            const currentValue = parseInt(document.getElementById(currentParam.id === 'numRepetitions' ? 'numRepetitions' : 'spaceBetweenWordsValue').textContent);
            const newValue = currentValue - currentParam.step;
            if (newValue >= currentParam.range[0]) {
                updateParameter(currentParam, newValue);
            }
        }
        lastStickXState = Math.abs(stickX) > 0.5;
    } else {
        // Handle regular numeric parameters with left/right stick
        const step = currentParam.step;
        const currentValue = parseFloat(document.getElementById(currentParam.element).value);
        const newValue = currentValue + (stickX * step);
        const clampedValue = Math.max(currentParam.range[0], Math.min(currentParam.range[1], newValue));
        updateParameter(currentParam, clampedValue);
    }
}

function handleToggleButtons() {
    const bButtonPressed = gamepad.buttons[CONTROLS.B].pressed;
    const ltButtonPressed = gamepad.buttons[CONTROLS.LT].pressed;
    const rtButtonPressed = gamepad.buttons[CONTROLS.RT].pressed;
    
    // B button - Toggle show wave (only when not on a checkbox parameter)
    if (bButtonPressed && !lastBButtonState) {
        const currentParam = PARAMETERS[currentParameterIndex];
        if (currentParam.type !== 'checkbox') {
            showWave = !showWave;
            document.getElementById('showWave').checked = showWave;
        }
    }

    // Both LT and RT buttons - Trigger shuffle
    if (ltButtonPressed && rtButtonPressed && !lastBumperState) {
        document.getElementById('shuffleButton').click();
    }
    
    lastBButtonState = bButtonPressed;
    lastBumperState = ltButtonPressed && rtButtonPressed;
}

function updateParameter(param, value) {
    // Update the parameter value
    const element = document.getElementById(param.element);
    const valueDisplay = document.getElementById(param.element + 'Value');
    
    if (param.type === 'dropdown') {
        element.value = value;
        param.value = value;
    } else if (param.type === 'checkbox') {
        element.checked = value;
        param.value = value;
    } else {
        // For numeric parameters, ensure we're working with numbers
        const numericValue = typeof value === 'number' ? value : parseFloat(value);
        
        if (!isNaN(numericValue)) {
            element.value = numericValue;
            param.value = numericValue;
            
            if (valueDisplay) {
                valueDisplay.textContent = numericValue.toFixed(2);
            }
        }
    }
    
    // Update the global variable
    switch(param.id) {
        case 'speed':
            speed = value;
            break;
        case 'xPhase':
            xPhase = value;
            break;
        case 'yPhase':
            yPhase = value;
            break;
        case 'xMagnitude':
            xMagnitude = value;
            break;
        case 'yMagnitude':
            yMagnitude = value;
            break;
        case 'stepBetweenWords':
            stepBetweenWords = value;
            break;
        case 'fontSize':
            fontSize = value;
            break;
        case 'fontWeight':
            fontWeight = value;
            break;
        case 'numRepetitions':
            numRepetitions = Math.round(param.value); // Ensure integer value
            document.getElementById('numRepetitions').textContent = numRepetitions;
            break;
        case 'spaceBetweenElements':
            spaceBetweenElements = param.value;
            document.getElementById('spaceBetweenWordsValue').textContent = spaceBetweenElements;
            updateElementsArray();
            break;
        case 'textSplitMode':
            textSplitMode = value;
            updateElementsArray();
            break;
        case 'fontSelection':
            currentFont = value;
            break;
        case 'blendMode':
            currentBlendMode = getBlendMode(value);
            break;
        case 'rotateWithFlow':
            rotateWithFlow = value;
            if (value) {
                document.getElementById('rotateWithPosition').checked = false;
                rotateWithPosition = false;
            }
            break;
        case 'rotateWithPosition':
            rotateWithPosition = value;
            if (value) {
                document.getElementById('rotateWithFlow').checked = false;
                rotateWithFlow = false;
            }
            break;
        case 'reverseAnimation':
            reverseAnimation = value;
            break;
        case 'autoPulseFontSize':
            autoPulseFontSize = value;
            document.getElementById('fontSize').disabled = value;
            break;
        case 'autoPulseWeight':
            autoPulseWeight = value;
            document.getElementById('fontWeight').disabled = value;
            break;
        case 'waveTypeX':
            waveTypeX = value;
            toggleInputs('waveTypeX', 'xPhase', 'xMagnitude');
            break;
        case 'waveTypeY':
            waveTypeY = value;
            toggleInputs('waveTypeY', 'yPhase', 'yMagnitude');
            break;
        case 'showWave':
            showWave = value;
            break;
        case 'debugWaveType':
            debugWaveType = value;
            break;
    }
}

function highlightCurrentParameter() {
    // Remove highlight from all parameters
    PARAMETERS.forEach(param => {
        const element = document.getElementById(param.element);
        element.parentElement.style.backgroundColor = '';
    });
    
    // Highlight current parameter
    const currentParam = PARAMETERS[currentParameterIndex];
    const element = document.getElementById(currentParam.element);
    element.parentElement.style.backgroundColor = '#ffeb3b';
    
    // Log current parameter
    console.log('Selected parameter:', currentParam.name);
}



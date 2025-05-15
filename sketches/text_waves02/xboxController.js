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
    {
        id: 'speed',
        name: 'Speed',
        element: 'speed',
        range: [0, 10],
        step: 0.01,
        value: 1
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
        id: 'yPhase',
        name: 'Y Phase',
        element: 'yPhase',
        range: [0, 2],
        step: 0.1,
        value: 0.5
    },
    {
        id: 'xMagnitude',
        name: 'X Magnitude',
        element: 'xMagnitude',
        range: [-1, 1],
        step: 0.1,
        value: 0.4
    },
    {
        id: 'yMagnitude',
        name: 'Y Magnitude',
        element: 'yMagnitude',
        range: [-1, 1],
        step: 0.1,
        value: 0.22
    },
    {
        id: 'stepBetweenWords',
        name: 'Step Between Words',
        element: 'stepBetweenWords',
        range: [0, 100],
        step: 1,
        value: 30
    },
    {
        id: 'fontSize',
        name: 'Font Size',
        element: 'fontSize',
        range: [10, 200],
        step: 1,
        value: 50
    }
];

let currentParameterIndex = 0;
let lastAButtonState = false;
let lastYButtonState = false;
let lastBButtonState = false;
let lastXButtonState = false;

function setupGamepad() {
    console.log("Setting up gamepad");
    // Add event listeners for gamepad connection/disconnection
    window.addEventListener("gamepadconnected", (e) => {
        console.log("Gamepad connected:", e.gamepad);
        gamepad = e.gamepad;
        gamepadConnected = true;
    });

    window.addEventListener("gamepaddisconnected", (e) => {
        console.log("Gamepad disconnected:", e.gamepad);
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
    
    lastAButtonState = aButtonPressed;
    lastYButtonState = yButtonPressed;
}

function handleParameterAdjustment() {
    const currentParam = PARAMETERS[currentParameterIndex];
    const stickX = gamepad.axes[CONTROLS.LEFT_STICK_X];
    
    // Apply deadzone
    if (Math.abs(stickX) < 0.1) return;
    
    // Calculate new value based on stick position
    const range = currentParam.range[1] - currentParam.range[0];
    const step = currentParam.step;
    const currentValue = parseFloat(document.getElementById(currentParam.element).value);
    
    // Adjust value based on stick position
    const newValue = currentValue + (stickX * step);
    
    // Clamp value to range
    const clampedValue = Math.max(currentParam.range[0], Math.min(currentParam.range[1], newValue));
    
    // Update parameter
    updateParameter(currentParam, clampedValue);
}

function handleToggleButtons() {
    const bButtonPressed = gamepad.buttons[CONTROLS.B].pressed;
    const xButtonPressed = gamepad.buttons[CONTROLS.X].pressed;
    
    // B button - Toggle show wave
    if (bButtonPressed && !lastBButtonState) {
        showWave = !showWave;
        document.getElementById('showWave').checked = showWave;
    }
    
    // X button - Toggle rotate with position
    if (xButtonPressed && !lastXButtonState) {
        rotateWithPosition = !rotateWithPosition;
        document.getElementById('rotateWithPosition').checked = rotateWithPosition;
    }
    
    lastBButtonState = bButtonPressed;
    lastXButtonState = xButtonPressed;
}

function updateParameter(param, value) {
    // Update the parameter value
    const element = document.getElementById(param.element);
    const valueDisplay = document.getElementById(param.element + 'Value');
    
    element.value = value;
    valueDisplay.textContent = value.toFixed(2);
    
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



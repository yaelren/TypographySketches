


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

function setup() {
    var c = createCanvas(windowWidth, windowHeight);
    c.parent("canvasWrapper");
    setUpUI();
}

function draw() {
    background(0);
    translate(width/2, 0);

   drawText();
}

function drawText(){
    let words= textInput.split(" ");
    let elementWidth = fontSize;
    let numOfElements = words.length;;
    if(shouldRepeatText){
        numOfElements = elementWidth *xMagnitude;
    }

    let step =spaceBetweenWords;
    push();
    translate(elementWidth/2, height/2);
    fill("#f1f1f1");
    let debugEllipseSize = 20;
    noStroke();
  
  
    for (let i = 0; i < numOfElements; i++) {
      push();
        let angleX = radians(frameCount * speed * xPhase + i * step);
        let angleY = radians(frameCount * speed * yPhase + i * step);

        let waveX = calculateWaveValue(angleX, height * xMagnitude, waveTypeX);
        let waveY = calculateWaveValue(angleY, height * yMagnitude, waveTypeY);
        translate(waveX, waveY);
        textSize(elementWidth);
        let charIndex = i % words.length;
        text(words[charIndex], 0, 0);
        if(showWave){
            fill("green");
            ellipse(0, 0, debugEllipseSize, debugEllipseSize);
        }
      pop();
    }
    pop();
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


function setUpUI(){

}
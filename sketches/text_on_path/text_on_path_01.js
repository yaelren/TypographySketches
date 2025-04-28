var points = [];
var numSamples = 180;

//animation
let speed = 1;
let showCurve = true;
let BGColor = 'white';

// Text
var textStr = "Hello";
let spacing = 5;
let fontSize = 24;
let textColor = 'black';

// Bezier
//bezier(anchorX1, anchorY1, controlX1, controlY1, controlX2, controlY2, anchorX2, anchorY2)
let anchor1 = { x: 100, y: 300 };
let control1 = { x: 150, y: 50 };
let control2 = { x: 450, y: 350 };
let anchor2 = { x: 500, y: 300 };

let curveChanged = false;   
let draggedPoint = null; // Variable to track the currently dragged point

function setup() {
    var c = createCanvas(windowWidth, windowHeight);
    c.parent("canvasWrapper");

    textSize(fontSize);
    textColor = color(textColor);

    setupUI();
}

function setupUI() {    
    // Add event listeners to update variables when inputs change
    document.getElementById("textStr").addEventListener("input", function() {
        textStr = this.value;
    });

    document.getElementById("speed").addEventListener("input", function() {
        speed = parseFloat(this.value);
        console.log(speed);
    });

    document.getElementById("spacing").addEventListener("input", function() {
        spacing = parseInt(this.value);
    });

    document.getElementById("fontSize").addEventListener("input", function() {
        fontSize = parseInt(this.value);
        textSize(fontSize);
    });

    document.getElementById("textColor").addEventListener("input", function() {
        textColor = color(this.value);
    });

    document.getElementById("BGColor").addEventListener("input", function() {
        BGColor = this.value;
    });

    document.getElementById("showCurve").addEventListener("change", function() {
        showCurve = this.checked;
    });

    sampleBezierPoints();
}

function draw() {
    background(BGColor);
    fill(0);
    noStroke();
    if(draggedPoint == null) {
        drawText();
    }

    if (showCurve) {
        
        drawCurve();
    }

}

function checkCurveChanged() {
}

function mouseDragged() {
    if (!showCurve) {
        return;
    }

    if (draggedPoint === null) {
        if (dist(mouseX, mouseY, anchor1.x, anchor1.y) < 10) {
            draggedPoint = anchor1;
        } else if (dist(mouseX, mouseY, control1.x, control1.y) < 10) {
            draggedPoint = control1;
        } else if (dist(mouseX, mouseY, control2.x, control2.y) < 10) {
            draggedPoint = control2;
        } else if (dist(mouseX, mouseY, anchor2.x, anchor2.y) < 10) {
            draggedPoint = anchor2;
        }
    }

    if (draggedPoint !== null) {
        draggedPoint.x = mouseX;
        draggedPoint.y = mouseY;
        curveChanged = true;
    }
}

function mouseReleased() {
    console.log("mouseReleased");
    console.log(curveChanged);
    draggedPoint = null; // Reset the dragged point
    if (!showCurve || !curveChanged) {
        return;
    }

    sampleBezierPoints();
}

function sampleBezierPoints() {
    points = []; // Clear existing points
    for (let t = 0; t <= 1; t += 1 / numSamples) {
        let x = bezierPoint(anchor1.x, control1.x, control2.x, anchor2.x, t);
        let y = bezierPoint(anchor1.y, control1.y, control2.y, anchor2.y, t);
        points.push(createVector(x, y));
    }
}

function drawText() {
    fill(textColor);
    let distanceTravelled = frameCount * speed; // speed
    // console.log(distanceTravelled);
    for (let i = 0; i < textStr.length; i++) {
        let idx = (distanceTravelled + i * spacing) % points.length;
        let pos = points[idx];
        if(pos != null) {
            text(textStr[i], pos.x, pos.y);
        }
        else {
            // console.log("null");
        }
    }
}

function drawCurve() {
    // Draw points and anchor points
    fill(200);
    noStroke();
    ellipse(anchor1.x, anchor1.y, 10, 10);
    ellipse(control1.x, control1.y, 10, 10);
    ellipse(control2.x, control2.y, 10, 10);
    ellipse(anchor2.x, anchor2.y, 10, 10);

    // Draw tangents
    stroke(150);
    strokeWeight(1);
    line(anchor1.x, anchor1.y, control1.x, control1.y); // Tangent from anchor1 to control1
    line(anchor2.x, anchor2.y, control2.x, control2.y); // Tangent from anchor2 to control2

    // Draw the Bezier curve
    noFill();
    stroke(200);
    strokeWeight(1);
    bezier(anchor1.x, anchor1.y, control1.x, control1.y, control2.x, control2.y, anchor2.x, anchor2.y);
}
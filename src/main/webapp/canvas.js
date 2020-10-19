let canvasContainer = document.getElementById("graph-picture");

let backgroundCanvas = document.getElementById("background-canvas");
let bCtx = backgroundCanvas.getContext("2d");

let foregroundCanvas = document.getElementById("foreground-canvas");
let fCtx = foregroundCanvas.getContext("2d");

let rResultValue;

const CANVAS_WH = 500;
const CANVAS_CENTER_X = 250;
const CANVAS_CENTER_Y = 250;
const R_OFFSET = 200;

function drawPointOnGraph(x, y, r, successful) {
    fCtx.fillStyle = successful ? "lawngreen" : "red";
    fCtx.strokeStyle = "#000000";
    fCtx.lineWidth = 3;
    fCtx.beginPath();
    fCtx.arc(
        CANVAS_CENTER_X + x * R_OFFSET / r,
        CANVAS_CENTER_Y - y * R_OFFSET / r, 3, 0, 2 * Math.PI);
    fCtx.stroke();
    fCtx.fill();
    fCtx.closePath();
}

window.onload = () => {
    drawShapes(bCtx);
    drawCoordsSystem(bCtx);
    drawLetters(bCtx);
    if (rResultValue !== undefined) drawPoints(rResultValue);
};

function drawPoints(currentR) {
    erasePoints();
    let xs = Array.from(document.getElementsByClassName("x-td")).map(v => v.innerHTML);
    let ys = Array.from(document.getElementsByClassName("y-td")).map(v => v.innerHTML);
    let success = Array.from(document.getElementsByClassName("success-td"))
        .map(v => v.innerHTML.includes("Попадание"));
    for (let i = 0; i < xs.length; i++) {
        drawPointOnGraph(xs[i], ys[i], currentR, success[i]);
    }
}

function erasePoints() {
    fCtx.clearRect(0, 0, CANVAS_WH, CANVAS_WH);
}

function drawShapes(context) {
    context.fillStyle = "#43b581";
    // прямоугольник
    context.fillRect(150, 250, 100, 200);
    // треугольник
    context.moveTo(CANVAS_CENTER_X, CANVAS_CENTER_Y);
    context.beginPath();
    context.lineTo(CANVAS_CENTER_X, CANVAS_CENTER_Y - R_OFFSET / 2);
    context.lineTo(CANVAS_CENTER_X - R_OFFSET, CANVAS_CENTER_Y);
    context.lineTo(CANVAS_CENTER_X, CANVAS_CENTER_Y);
    context.fill();
    // четверть круга
    context.beginPath();
    context.lineTo(CANVAS_CENTER_X, CANVAS_CENTER_Y - R_OFFSET / 2);
    context.arc(CANVAS_CENTER_X, CANVAS_CENTER_Y, R_OFFSET / 2, 3 / 2 * Math.PI, 0);
    context.lineTo(CANVAS_CENTER_X, CANVAS_CENTER_Y);
    context.fill();
}

function drawCoordsSystem(context) {
    context.beginPath();
    context.strokeStyle = "#ffffff";
    context.lineWidth = 2;
    context.moveTo(0, 250);
    context.lineTo(500, 250);
    context.stroke();
    context.beginPath();
    context.lineWidth = 2;
    context.moveTo(250, 500);
    context.lineTo(250, 0);
    context.stroke();
}

function drawLetters(context) {
    const TEXT_OFFSET = 5; //px
    context.strokeStyle = "#ffffff";
    context.font = "15px Arial"
    // R
    context.textAlign = "center"
    // слева
    context.strokeText("- R", CANVAS_CENTER_X - R_OFFSET, CANVAS_CENTER_Y - TEXT_OFFSET);
    context.strokeText("- R/2", CANVAS_CENTER_X - R_OFFSET / 2, CANVAS_CENTER_Y - TEXT_OFFSET);
    // справа
    context.strokeText("R", CANVAS_CENTER_X + R_OFFSET, CANVAS_CENTER_Y - TEXT_OFFSET);
    context.strokeText("R/2", CANVAS_CENTER_X + R_OFFSET / 2, CANVAS_CENTER_Y - TEXT_OFFSET);
    // сверху
    context.textAlign = "left";
    context.strokeText("R", CANVAS_CENTER_X + TEXT_OFFSET, CANVAS_CENTER_Y - R_OFFSET);
    context.strokeText("R/2", CANVAS_CENTER_X + TEXT_OFFSET, CANVAS_CENTER_Y - R_OFFSET / 2);
    // снизу
    context.strokeText("- R", CANVAS_CENTER_X + TEXT_OFFSET, CANVAS_CENTER_Y + R_OFFSET);
    context.strokeText("- R/2", CANVAS_CENTER_X + TEXT_OFFSET, CANVAS_CENTER_Y + R_OFFSET / 2);
    // X, Y
    context.strokeText("X", 485, 250 - TEXT_OFFSET);
    context.strokeText("Y", 250 + TEXT_OFFSET, 15);
}

function sendData(xVal, yVal, rVal) {
    console.log(`sending data with ${xVal}, ${yVal}, ${rVal}`);
    post(contextPath + "/checkPoints", {
        x: xVal,
        y: yVal,
        r: rVal
    })
}

foregroundCanvas.addEventListener('click', (e) => {
    if (checked_r === undefined && rResultValue === undefined) {
        rNotChosenError(true);
    } else {
        let rValue = checked_r === undefined ? rResultValue : checked_r.value;
        let scale = rValue / R_OFFSET;

        let canvasX = e.pageX - canvasContainer.offsetLeft;
        let canvasY = e.pageY - canvasContainer.offsetTop;

        let x = Math.round((canvasX - CANVAS_CENTER_X) * scale);
        let y = (CANVAS_CENTER_Y - canvasY) * scale;

        sendData(x, y, rValue);
    }
});

function rNotChosenError(enable) {
    let rInputBlock = document.getElementById("r_input_block");
    let error = "r-not-chosen-error";
    if (enable) {
        canvasContainer.classList.add(error);
        rInputBlock.classList.add(error);
    } else {
        canvasContainer.classList.remove(error);
        rInputBlock.classList.remove(error);
    }
}

function post(path, params, method = 'post') {
    let form = document.createElement('form');
    form.method = method;
    form.action = path;

    for (let key in params) {
        if (params.hasOwnProperty(key)) {
            let hiddenField = document.createElement('input');
            hiddenField.type = 'hidden';
            hiddenField.name = key;
            hiddenField.value = params[key];
            form.appendChild(hiddenField);
        }
    }

    document.body.appendChild(form);
    form.submit();
}
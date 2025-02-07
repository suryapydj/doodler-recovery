const canvas = document.getElementById("gameCanvas");
const colourPicker = document.getElementById("colour");
const penBtn = document.getElementById("pen");
const eraserBtn = document.getElementById("eraser");
const fillBtn = document.getElementById("fill");
const weightSlider = document.getElementById("weight");

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

let tool = "pen";

penBtn.addEventListener("click", () => {
    tool = "pen";
});

eraserBtn.addEventListener("click", () => {
    tool = "eraser";
});

fillBtn.addEventListener("click", () => {
    tool = "fill";
});

const ctx = canvas.getContext("2d", { willReadFrequently: true });

ctx.fillStyle = "rgb(255, 255, 255)";
ctx.fillRect(0, 0, canvasWidth, canvasHeight);

function setColour() {
    ctx.fillStyle = colourPicker.value;
}

function setWeight() {
    weight = weightSlider.value;
}

function getPixelColour(x, y) {
    return ctx.getImageData(x, y, 1, 1).data;
}

function setPixelColour(x, y, colour) {
    ctx.fillStyle = colour;
    ctx.fillRect(x, y, 1, 1);
}

colourPicker.addEventListener("input", () => {
    setColour();
});

weightSlider.addEventListener("input", () => {
    setWeight();
});

setWeight();
setColour();

var mouseX = 0;
var mouseY = 0;
var mouseDown = false;

var lastX = 0;
var lastY = 0;

canvas.addEventListener("mousedown", () => {
    mouseDown = true;

    lastX = mouseX;
    lastY = mouseY;

    if (tool == "pen") {
        ctx.fillRect(
            Math.round(mouseX - weight / 2),
            Math.round(mouseY - weight / 2),
            weight,
            weight,
        );
    }

    if (tool == "fill") {
        let arr = getPixelColour(mouseX, mouseY);
        let colour = `rgb(${arr[0]}, ${arr[1]}, ${arr[2]})`;
        fill(mouseX, mouseY, colour);
    }
});

document.addEventListener("mouseup", () => {
    mouseDown = false;
});

document.addEventListener("mousemove", (event) => {
    const rect = canvas.getBoundingClientRect();

    mouseX = Math.round(event.clientX - rect.left);
    mouseY = Math.round(event.clientY - rect.top);

    if (tool == "pen" && mouseDown) {
        ctx.fillRect(
            Math.round(mouseX - weight / 2),
            Math.round(mouseY - weight / 2),
            weight,
            weight,
        );
        drawFrom(lastX, lastY, mouseX, mouseY);
        lastX = mouseX;
        lastY = mouseY;
    }
});

function drawFrom(x1, y1, x2, y2) {
    let dx = x2 - x1;
    let dy = y2 - y1;

    let steps = Math.max(Math.abs(dx), Math.abs(dy));

    for (let i = 0; i < steps; i++) {
        ctx.fillRect(
            Math.round(x1 + (dx / steps) * i - weight / 2),
            Math.round(y1 + (dy / steps) * i - weight / 2),
            weight,
            weight,
        );
    }
}

function inArray(value, arr) {
    let found = false;
    arr.forEach((element) => {
        if (value[0] == element[0] && value[1] == element[1]) {
            found = true;
        }
    });
    return found;
}

function fill(start_x, start_y, target_colour) {
    let queue = [[start_x, start_y]];
    let visited = new Array(canvasHeight)
        .fill(null)
        .map(() => new Array(canvasWidth).fill(false));

    console.log(start_x, start_y);

    visited[start_y][start_x] = true;

    while (queue.length > 0) {
        let x = queue[0][0];
        let y = queue[0][1];

        setPixelColour(x, y, ctx.fillStyle);

        queue.shift();

        dx = [-1, 1, 0, 0];
        dy = [0, 0, -1, 1];

        for (let i = 0; i < dx.length; i++) {
            if (
                x + dx[i] >= 0 &&
                x + dx[i] < canvasWidth &&
                y + dy[i] >= 0 &&
                y + dy[i] < canvasHeight &&
                !visited[y + dy[i]][x + dx[i]]
            ) {
                let arr = getPixelColour(x + dx[i], y + dy[i]);
                let colour = `rgb(${arr[0]}, ${arr[1]}, ${arr[2]})`;
                if (colour == target_colour) {
                    queue.push([x + dx[i], y + dy[i]]);
                    visited[y + dy[i]][x + dx[i]] = true;
                }
            }
        }
    }
}

export default { Infinity, setTool, setColour, setWeight };

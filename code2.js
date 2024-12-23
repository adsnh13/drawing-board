const colorPicker = document.getElementById("color-picker");
const canvasColor = document.getElementById("canvas");
const canvas = document.getElementById("myCanvas");
const clearButton = document.getElementById("clear");
const saveButton = document.getElementById("save");
const retButton = document.getElementById("retrieve");
const fontPicker = document.getElementById("fontPicker");

const ctx = canvas.getContext('2d');
let isDrawing = false;
let lastX = 0;
let lastY = 0;

// Set initial line properties for smooth drawing
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = parseInt(fontPicker.value);

// Update color on change
colorPicker.addEventListener('change', (e) => {
    ctx.strokeStyle = e.target.value;
    ctx.fillStyle = e.target.value;
});

// Update line width based on font size selection
fontPicker.addEventListener('change', (e) => {
    ctx.lineWidth = parseInt(e.target.value);
});

// Function to start drawing
function startDrawing(x, y) {
    isDrawing = true;
    lastX = x;
    lastY = y;
}

// Function to draw lines
function draw(x, y) {
    if (!isDrawing) return;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();
    lastX = x;
    lastY = y;
}

// Stop drawing
function stopDrawing() {
    isDrawing = false;
}

// Mouse events
canvas.addEventListener('mousedown', (e) => startDrawing(e.offsetX, e.offsetY));
canvas.addEventListener('mousemove', (e) => draw(e.offsetX, e.offsetY));
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseleave', stopDrawing);

// Touch events
canvas.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    startDrawing(touch.clientX - rect.left, touch.clientY - rect.top);
});

canvas.addEventListener('touchmove', (e) => {
    e.preventDefault(); // Prevent scrolling while drawing
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    draw(touch.clientX - rect.left, touch.clientY - rect.top);
});

canvas.addEventListener('touchend', stopDrawing);
canvas.addEventListener('touchcancel', stopDrawing);

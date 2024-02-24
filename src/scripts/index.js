const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d"); // obtener contexto

canvas.width = 448;
canvas.height = 448;

//VARIABLES DE LA PALETA 🧠

const paddleHeight = 11;
const paddleWidth = 100;

let paddleX = (canvas.width - paddleWidth) / 2; //centrar la paleta
let paddleY = canvas.height - paddleHeight - 10;

let rightPressed = false;
let leftPressed = false;

const PADDLE_SENSIVITY = 8;

// VARIABLES DE LA PELOTA

const ballRadius = 4;

//posicion de la pelota
let x = canvas.width / 2;
let y = canvas.height - 30;

//velocidad de la pelota
let dx = 2;
let dy = -2; // negativo va hacia arriba

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2); // math.pi * 2 da un circulo perfecto
  ctx.fillStyle = "#fff";
  ctx.fill();
  ctx.closePath(); // Mejora el rendimiento, cerrando el trazado
}

function drawPaddle() {
  ctx.fillStyle = "#09f";
  ctx.fillRect(paddleX, paddleY, paddleWidth, paddleHeight);
}

// MOVIMIENTOS Y COLISIONES 💻

function ballMovement() {
  // condicion que valida la colision en los laterales
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }

  // condicion que valida la colision en el alto
  if (y + dy < ballRadius) {
    dy = -dy;
  }

  // condicion que valida la colision en la zona baja de la pantalla
  const isBallSameXAsPaddle = x > paddleX && x < paddleX + paddleWidth;

  const isBallTouchingPaddle = y + dy > paddleY;

  if (isBallSameXAsPaddle && isBallTouchingPaddle) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    console.log("game over");
    document.location.reload();
  }

  // Mover la pelota: posicion x le suma la posicion dx
  x += dx;
  y += dy;
}

function paddleMovement() {
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += PADDLE_SENSIVITY;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= PADDLE_SENSIVITY;
  }
}

// CLEAN CANVAS 🚀

function cleanCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// INIT EVENTS 👑

function initEvents() {
  document.addEventListener("keydown", keyDownHandler);
  document.addEventListener("keyup", keyUpHandler); // evento que suelta la tecla

  function keyDownHandler(event) {
    const { key } = event;

    if (key === "Right" || key === "ArrowRight") {
      rightPressed = true;
    } else if (key === "Left" || key === "ArrowLeft") {
      leftPressed = true;
    }
  }

  function keyUpHandler(event) {
    const { key } = event;

    if (key === "Right" || key === "ArrowRight") {
      rightPressed = false;
    } else if (key === "Left" || key === "ArrowLeft") {
      leftPressed = false;
    }
  }
}

function draw() {
  // clean canvas para limpiar la pantalla
  cleanCanvas();

  // 1. dibujar los elementos
  drawBall();
  drawPaddle();

  //2. colisiones y movimientos
  ballMovement();
  paddleMovement();

  window.requestAnimationFrame(draw); // Permite renderizar con un loop infinito (base de cualquier videojuego)
}

draw();
initEvents();

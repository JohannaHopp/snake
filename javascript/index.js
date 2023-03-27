console.clear();

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let rows = 20;
let columns = 20;
let snake = [{ x: 9, y: 9 }];
let food;
let cellWidth = canvas.width / columns;
let cellHeight = canvas.height / rows;
let direction = "LEFT";

let foodCollected = false;

placeFood();

setInterval(gameLoop, 200);

document.addEventListener("keydown", keyDown);

draw();

function draw() {
  ctx.fillStyle = "grey";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "white";
  snake.forEach((part) => add(part.x, part.y));

  ctx.fillStyle = "green";
  add(food.x, food.y); // food

  requestAnimationFrame(draw);
}

function add(x, y) {
  ctx.fillRect(x * cellWidth, y * cellHeight, cellWidth - 1, cellHeight - 1);
}

function shiftSnake() {
  for (let index = snake.length - 1; index > 0; index--) {
    const part = snake[index];
    const lastPart = snake[index - 1];
    part.x = lastPart.x;
    part.y = lastPart.y;
  }
}

function gameLoop() {
  testGameOver();

  if (foodCollected) {
    snake = [
      {
        x: snake[0].x,
        y: snake[0].y,
      },
      ...snake,
    ];

    foodCollected = false;
  }

  shiftSnake();

  if (direction == "LEFT") {
    snake[0].x--;
  }
  if (direction == "UP") {
    snake[0].y--;
  }
  if (direction == "RIGHT") {
    snake[0].x++;
  }
  if (direction == "DOWN") {
    snake[0].y++;
  }

  if (snake[0].x == food.x && snake[0].y == food.y) {
    foodCollected = true; // collect food
    placeFood(); // replace food
  }
}

function keyDown(event) {
  if (event.keyCode == 37) {
    direction = "LEFT";
  }
  if (event.keyCode == 38) {
    direction = "UP";
  }
  if (event.keyCode == 39) {
    direction = "RIGHT";
  }
  if (event.keyCode == 40) {
    direction = "DOWN";
  }
}

function testGameOver() {
  let firstPart = snake[0];
  let otherParts = snake.slice(1);
  let duplicatePart = otherParts.find(
    (part) => part.x == firstPart.x && part.y == firstPart.y
  );

  // Treffer der Wand
  if (
    snake[0].x < 0 ||
    snake[0].x > columns - 1 ||
    snake[0].y < 0 ||
    snake[0].y > rows - 1 ||
    duplicatePart
  ) {
    placeFood();
    snake = [
      {
        x: 9,
        y: 9,
      },
    ];

    direction = "LEFT";
  }
}

function placeFood() {
  let randomX = Math.floor(Math.random() * columns);
  let randomY = Math.floor(Math.random() * rows);

  food = { x: randomX, y: randomY };
}

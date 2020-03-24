
//ceshi   0324.............................

import Snake from "./Snake.js";

const snake = new Snake();

document.addEventListener("keydown", e => {

	//游戏开始之前不能更改direction的值
  if (!snake.timer) return;
  switch (e.keyCode) {
    case 37:
      if (snake.direction != "right") {
        snake.direction = "left";
      }
      break;
    case 38:
      if (snake.direction != "down") {
        snake.direction = "up";
      }
      break;
    case 39:
      if (snake.direction != "left") {
        snake.direction = "right";
      }
      break;
    case 40:
      if (snake.direction != "up") {
        snake.direction = "down";
      }
      break;
    default:
      return;
  }
});

document.addEventListener("click", _ => {
  if (snake.timer) {
    snake.stop();
  } else {
    snake.start();
  }
});


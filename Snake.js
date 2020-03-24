import {config} from "./tool.js";

import Factory from "./SquareFactory.js";

import Ground from "./Ground.js";

const ground = Ground.getInstance(20, 20, document.body);

class Snake {
  constructor() {
    this.head = null;
    this.tail = null;
    this.sqArr = new Array(); //记录组成蛇的所有方块坐标
    this.direction = "right"; //记录蛇头前进的方向
    this.food = null;
    this.isEat = false;

    this.timer = null; //计时器

    this.init();
  }

  init() {
    const newHead = Factory.create("snakeHead", 3, 1);
    this.head = newHead;
    this.sqArr.push(newHead);

    const Body1 = Factory.create("snakeBody", 2, 1);
    this.sqArr.push(Body1);

    const Body2 = Factory.create("snakeBody", 1, 1);
    this.tail = Body2;
    this.sqArr.push(Body2);

    this.setFoodPosi();

    this.render();
  }

  render() {
    this.sqArr.forEach(el => {
      ground.remove(el.x, el.y);
      ground.add(el);
    });
  }

  /**
   * 位移后判断(吃食物 , 撞墙/自身 , 继续移动)
   */
  move() {
    const {x, y} = this.getNextposi();
    if (x < 1 || x > config.col - 2 || y > config.row - 2 || y < 1) {
      //撞墙
      console.log("你撞墙了");
      this.die.call(this);
      return true;
    }

    const flag1 = this.sqArr.some(el => {
      return el.x == x && el.y == y;
    });
    if (flag1) {
      //撞到自身
      console.log("你撞到了自己");
      this.stepResolve.die.call(this);
      return true;
    }

    if (this.food.x == x && this.food.y == y) {
      //撞到食物
      console.log("吃");
      this.isEat = true;
    }
    // console.log("继续");

    this.next(x, y);
    return false;
  }

  /**
   * 判断下一步的坐标
   */
  getNextposi() {
    switch (this.direction) {
      case "right":
        return {
          x: this.head.x + 1,
          y: this.head.y
        };
      case "down":
        return {
          x: this.head.x,
          y: this.head.y + 1
        };
      case "left":
        return {
          x: this.head.x - 1,
          y: this.head.y
        };
      case "up":
        return {
          x: this.head.x,
          y: this.head.y - 1
        };
      default:
        return;
    }
  }

  start() {
    if (this.timer) return;
    this.timer = setInterval(_ => {
      this.move();
    }, 500);
  }

  stop() {
    clearInterval(this.timer);
    this.timer = null;
  }

  /**
   * 死亡,清空计时器
   */
  die() {
    clearInterval(this.timer);
    this.timer = null;
  }
  /**
   * 下一步移动操作(吃到食物或继续走)
   * @param {*} x
   * @param {*} y
   */
  next(x, y) {
    var newX = this.head.x;
    var newY = this.head.y;
    //在原来蛇头的位置创建新的蛇身
    var newBody = Factory.create("snakeBody", newX, newY);
    ground.add(newBody);
    this.sqArr.splice(1, 0, newBody);

    //更新snakeHead坐标
    ground.remove(x, y);
    var newHead = Factory.create("snakeHead", x, y);
    ground.add(newHead);
    this.head = newHead;

    if (this.isEat) {
      //吃到食物,tail 不 往前移动
      console.dir(ground.squareArr);

      this.setFoodPosi();
      this.isEat = false;
    } else {
      //继续移动
      var len = this.sqArr.length;
      var newFloor = Factory.create("floor", this.sqArr[len - 1].x, this.sqArr[len - 1].y);
      ground.add(newFloor);
      this.sqArr.pop();
    }
    console.dir(this.sqArr);
  }

  setFoodPosi() {
    if (this.food) {
      var {x, y} = this.food;
      var newFloor = Factory.create("floor", x, y);
      ground.add(newFloor);
    }
    var flag = true;
    var foodX, foodY;
    //确保食物的坐标不落在snake 和 wall 上
    while (flag) {
      foodX = Math.round(Math.random() * (config.col - 3) + 1);
      foodY = Math.round(Math.random() * (config.row - 3) + 1);

      flag = this.sqArr.every(el => {
        return el.x == foodX && el.y == foodY;
      });
    }

    this.food = Factory.create("food", foodX, foodY);
    console.log(this.food.x, this.food.y);
    ground.remove(foodX, foodY);
    ground.add(this.food);
  }
}
export default Snake;

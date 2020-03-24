import {Floor, Wall, SnakeBody, SnakeHead, Food} from "./tool.js";

class Factory {
  constructor() {}
  /**
   * @param {object} square 方块实例
   * @param {string} color 颜色值
   */
  init(square) {
    square.dom.style.width = square.width + "px";
    square.dom.style.height = square.height + "px";
    square.dom.style.position = "absolute";
    square.dom.style.left = square.x * square.width + "px";
    square.dom.style.top = square.y * square.height + "px";
    square.dom.style.backgroundColor = square.color;
  }

  /**
   * 创建地板生产线
   * @param {*} x
   * @param {*} y
   */
  createFloor(x, y) {
    var floor = new Floor(x, y);
    floor.color = "orange";
    this.init(floor);

    return floor;
  }

  /**
   * 创建围墙生产线
   * @param {*} x
   * @param {*} y
   */
  createWall(x, y) {
    var wall = new Wall(x, y);
    wall.color = "#6d4c41";
    this.init(wall);
    return wall;
  }

  /**
   * 创建蛇头(单例)生产线
   * @param {*} x
   * @param {*} y
   */
  createSnakeHead(x, y) {
    var snakeHead = SnakeHead.getInstance(x, y);
    snakeHead.color = "deeppink";
    this.init(snakeHead);
    return snakeHead;
  }

  /**
   * 创建蛇身生产线
   * @param {*} x
   * @param {*} y
   */
  createSnakeBody(x, y) {
    var snakeBody = new SnakeBody(x, y);
    snakeBody.color = "#00897b";
    this.init(snakeBody);
    return snakeBody;
  }

  /**
   * 创建食物(单例)生产线
   * @param {*} x
   * @param {*} y
   */
  createFood(x, y) {
    var food = Food.getInstance(x, y);
    food.color = "#ff3d00";
    this.init(food);
    return food;
  }

  /**
   * 通过Factory.create()调用;返回实例对象
   * @param {string} type 实例类型 : ['floor','wall','food','snakeHead','snakeBody','food']
   * @param {number} x x坐标
   * @param {number} y y坐标
   */
  static create(type, x, y) {
    Factory.product = new Factory();
    switch (type) {
      case "floor":
        return Factory.product.createFloor(x, y);
      case "wall":
        return Factory.product.createWall(x, y);
      case "snakeHead":
        return Factory.product.createSnakeHead(x, y);

      case "snakeBody":
        return Factory.product.createSnakeBody(x, y);

      case "food":
        return Factory.product.createFood(x, y);

      default:
        throw new Error("需要给定type参数");
    }
  }
}

export default Factory;

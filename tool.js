/* 
	1. 创建基础方块类
	2. 根据基础方块创建各个元素类   snakeHead , snakeBody ,snakeFood , wall , ground;
	3. 

*/

const config = {
  // 游戏区域的大小
  row: 35,
  col: 50,

  //每个小方块的宽度
  sW: 20,

  //蛇移动间隔  ms
  direction: 300
};
/**
 * 基础类Square
 */
class Square {
  static sW = config.sW;
  static col = config.col;
  static row = config.row;
  /**
   *
   * @param {number} x x坐标
   * @param {number} y y坐标
   */
  constructor(x, y) {
    if (new.target == Square) {
      throw new Error("不能直接通过Square创建实例");
    }
    this.x = x;
    this.y = y;
    this.width = Square.sW;
    this.height = Square.sW;
    this.dom = document.createElement("div");
  }
}

/**
 * 游戏区域地板实例
 */
class Floor extends Square {
  constructor(x, y) {
    super(x, y);
  }
}

/**
 * 游戏区域围墙实例
 */
class Wall extends Square {
  constructor(x, y) {
    super(x, y);
  }
}

/**
 * 蛇身体实例
 */
class SnakeBody extends Square {
  constructor(x, y) {
    super(x, y);
    this.color = "#1b5e20";
  }
}

/**
 * 蛇头实例(单例)
 */
class SnakeHead extends Square {
  static getInstance(x,y) {
    if (!SnakeHead.instance) {
      SnakeHead.instance = new SnakeHead(x,y);
      return SnakeHead.instance;
    }
    return SnakeHead.instance;
  }
  constructor(x, y) {
    super(x, y);
  }
}

export {config, Floor, Wall, SnakeBody,SnakeHead};

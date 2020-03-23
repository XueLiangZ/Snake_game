import {config} from "./tool.js";

import Factory from "./SquareFactory.js";

/**
 * 游戏区域
 */
class Ground {
  // 单例模式
  /**
   *
   * @param {number} x x坐标
   * @param {number} y y坐标
   * @param {elemnt} el 要挂载到的Dom元素
   */
  static getInstance(x, y, el) {
    if (!Ground.instance) {
      Ground.instance = new Ground(x, y, el);
      return Ground.instance;
    }
    return Ground.instance;
  }

  constructor(x, y, el) {
    this.x = x;
    this.y = y;
    this.width = config.sW * config.col;
    this.height = config.sW * config.row;
    this.el = el;
    this.dom = document.createElement("div");
    //存储场景中每一个小方块信息 ,数组类型[[],[],[]...]
    this.squareArr = [];
  }
  init() {
    this.dom.style.position = "absolute";
    this.dom.style.left = this.x + "px";
    this.dom.style.top = this.y + "px";
    this.dom.style.width = this.width + "px";
    this.dom.style.height = this.height + "px";
    this.dom.style.border = "1px solid #ccc";
    this.dom.style.backgroundColor = "#b3e5fc";

    this.el.appendChild(this.dom);
    console.log("init");
    this.getSquareArr();
  }
  /**
   * 记录每一个小方块的位置信息
   */
  getSquareArr() {
    var {col, row} = config;
    for (var j = 0; j < row; j++) {
      //列==>j
      // 每一行是一个长度为row的数组
      this.squareArr[j] = new Array(row);
      for (var i = 0; i < col; i++) {
        //行==>i
        if (i == 0 || i == col - 1 || j == 0 || j == row - 1) {
          var newSquare = Factory.create("wall", i, j);
        } else {
          var newSquare = Factory.create("floor", i, j);
          // this.squareArr[i][j].push(floor);
        }

        this.squareArr[j][i] = newSquare;
        this.dom.appendChild(newSquare.dom);
      }
    }
  }
  /**
   * 在场景中添加小方块
   * @param {*} square 实例
   */
  add(square) {
    // dom中添加

    this.dom.appendChild(square.dom);

    //数组中添加
    this.squareArr[square.y][square.x] = square;
  }

  /**
   * 在场景中移除小方块
   * @param {*} square 实例
   * @param {number} x x坐标
   * @param {number} y y坐标
   */
  remove(x, y) {
    // dom中移除
    var sq = this.squareArr[y][x];
    sq.dom.remove();

    //数组中移除
    this.squareArr[y][x] = null;
  }
}

const ground = Ground.getInstance(20, 20, document.body);

ground.init();

/* 
var snakeHead = Factory.create("snakeHead", 3, 1);
var body1 = Factory.create("snakeBody", 2, 1);
var body2 = Factory.create("snakeBody", 1, 1);

ground.remove(snakeHead.x, snakeHead.y);
ground.add(snakeHead);

ground.remove(body1.x, body1.y);
ground.add(body1);

ground.remove(body2.x, body2.y);
ground.add(body2);
 */
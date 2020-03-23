## 开发设计模式 
面向对象 实现 贪吃蛇小游戏


### tool.js
#### 创建基础方块类

1. 根据基础方块创建各个元素类   SnakeHead(单例) , SnakeBody ,SnakeFood(单例),Floor,Wall...


### SquareFactory.js
1. 方块生产工厂,用于产生各类的实例:(floor , wall...)


### Ground.js
1. Ground类 生成游戏区域(单例)
2. 通过for循环嵌套由工厂生成floor和wall的实例(ground整个区域都由floor和wall铺满);
3. ground.squareArr上记录每个坐标点处的实例对象; 
   `ground.squareArr[i][j]`可调用查看
4. ground.add(square) , ground.remove(i,j) 方法可以添加和移除指定位置的实例;

### Snake.js
1. Snake类 生成一条蛇,包含snakeBody,snakeHead实例;
2. 通过ground上的方法将实例snake添加到ground中;
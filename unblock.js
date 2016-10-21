const level1 = require('./levels/level1.js');
const level2 = require('./levels/level2.js');

class Game {
  constructor(blocks){
    this.blocks = blocks;
    this.stage = new createjs.Stage("canvas");
    this.dragging = {};
    this.grid = 100;
    this.moveCount = 0;

    this.drag = this.drag.bind(this);
  }

  init() {
    this.blocks.forEach( (block) => {
      this.stage.addChild(block);
      this.enableDrag(block);
    });
    this.stage.update();
  }

  checkCollision(nextX, nextY, block1, block2) {
    if ( nextX >= block2.x + block2._bounds.width ||
         nextX + block1._bounds.width <= block2.x ||
         nextY >= block2.y + block2._bounds.height ||
         nextY + block1._bounds.height <= block2.y ) {
         return false;
    }
    return true;
  }

  dragLimits(target, move) {
    const moveX = Math.round(move.x / this.grid) * this.grid;
    const moveY = Math.round(move.y / this.grid) * this.grid;

    if(target.getBounds().width > 100 && Math.abs(moveX - target.x) === 100) {
      if(target.x - 100 >= 0 && target.x + target.getBounds().width < 600){
        target.x = moveX;
      } else if(target.x - 100 < 0 && move.x > target.x){
        target.x = moveX;
      } else if(target.x + target.getBounds().width >= 600 && move.x < target.x){
        target.x = moveX;
      } else if(moveX === 500 && moveY === 200) {
        target.x = moveX;
        this.gameOver();
      }
    } else if(target.getBounds().height > 100 && Math.abs(moveY - target.y) === 100){
      if(target.y - 100 >= 0 && target.y + target.getBounds().height < 600){
        target.y = moveY;
      } else if(target.y - 100 < 0 && move.y > target.y){
        target.y = moveY;
      } else if(target.y + target.getBounds().height >= 600 && move.y < target.y){
        target.y = moveY;
      }
    }
  }

  enableDrag(obj) {
    obj.on("mousedown", this.dragStart);
    obj.on("pressmove", this.drag);
  };

  dragStart(e) {
    this.dragging = false;
  }

  drag(e) {
    if (!this.dragging || !this.dragging.startCoords || !this.dragging.stageCoords) {
      this.dragging = e.currentTarget;
      this.dragging.startCoords = {x: this.dragging.x, y: this.dragging.y};
      this.dragging.stageCoords = {x: e.stageX, y: e.stageY};
    }

    this.dragging.stageMove = {x: this.dragging.stageCoords.x - e.stageX, y: this.dragging.stageCoords.y - e.stageY};
    this.dragging.objectMove = {x: this.dragging.startCoords.x - this.dragging.stageMove.x, y: this.dragging.startCoords.y - this.dragging.stageMove.y};

    let collision = false;
    const move = this.dragging.objectMove;
    const nextX = Math.round(move.x / this.grid) * this.grid;
    const nextY = Math.round(move.y / this.grid) * this.grid;

    for(let i = 0; i < this.blocks.length; i++){
      if(this.blocks[i].x === e.currentTarget.x && this.blocks[i].y === e.currentTarget.y){
        continue;
      } else if(this.checkCollision(nextX, nextY, e.currentTarget, this.blocks[i])){

        collision = true;
      }
    }

    if(!collision){
      this.dragLimits(e.currentTarget, this.dragging.objectMove);
    }
    this.stage.update();
  }

  gameOver() {
    alert(`YOU WON!!!`);
    this.stage.removeAllChildren();
    this.blocks = level2;
    this.init();
  }

}

const play = () => {
  const game = new Game(level1);
  game.init();
}

document.addEventListener("DOMContentLoaded", () => play());

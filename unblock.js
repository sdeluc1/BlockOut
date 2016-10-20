
class Game {
  constructor(blocks){
    this.blocks = blocks;
    this.stage = new createjs.Stage("canvas");
    this.dragging = {};
    this.grid = 100;

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

  // checkCollision(nextX, nextY, target, block) {
  //   if(target._bounds.height > 100 && this.inPath(target, block, 'vertical')){
  //     if(target.y < nextY && nextY + target._bounds.height <= block.y){
  //       return true;
  //     } else if(target.y > nextY && block.y + block._bounds.height < target.y){
  //       return true;
  //     }
  //   } else if(target._bounds.width > 100 && this.inPath(target, block, 'horizontal')) {
  //     if(target.x < nextX && nextX <= block.x){
  //       if(target.x + target._bounds.width >= block.x){
  //         debugger
  //         return true;
  //       }
  //     } else if(target.x > nextX && block.x + block._bounds.width < target.x){
  //       if(target.x <= block.x + block._bounds.width){
  //         debugger
  //         return true;
  //       }
  //     }
  //   }
  //   return false;
  // }

  // inPath(target, block, orientation) {
  //   debugger
  //   if(orientation === 'vertical'){
  //     if(block.x === target.x) {
  //       return true;
  //     } else if(block.x > target.x) {
  //       return false;
  //     } else if(block.x < target.x && block._bounds.width > 100) {
  //       if(block.x + block._bounds.width < target.x) {
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     }
  //   } else {
  //     if(block.y === target.y) {
  //       return true;
  //     } else if(block.y > target.y) {
  //       return false;
  //     } else if(block.y < target.y && block._bounds.height > 100) {
  //       if(block.y + block._bounds.height < target.y) {
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     }
  //   }
  // }

  dragLimits(target, move) {
    const moveX = Math.round(move.x / this.grid) * this.grid;
    const moveY = Math.round(move.y / this.grid) * this.grid;

    if(target.getBounds().width > 100 ) {
      if(target.x - 100 >= 0 && target.x + target.getBounds().width < 600){
        target.x = moveX;
      } else if(target.x - 100 < 0 && move.x > target.x){
        target.x = moveX;
      } else if(target.x + target.getBounds().width >= 600 && move.x < target.x){
        target.x = moveX;
      }
    } else if(target.getBounds().height > 100 ){
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
      console.log(this.blocks[0].y);
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

}

let block1 = new createjs.Shape();
let block2 = new createjs.Shape();
let block3 = new createjs.Shape();
let block4 = new createjs.Shape();
let block5 = new createjs.Shape();
let block6 = new createjs.Shape();
let block7 = new createjs.Shape();
let block8 = new createjs.Shape();

block1.graphics.setStrokeStyle(3).beginStroke("black").beginFill("red").drawRoundRect(0, 0, 200, 100, 10);
block2.graphics.setStrokeStyle(3).beginStroke("black").beginFill("blue").drawRoundRect(0, 0, 100, 200, 10);
block3.graphics.setStrokeStyle(3).beginStroke("black").beginFill("green").drawRoundRect(0, 0, 100, 200, 10);
block4.graphics.setStrokeStyle(3).beginStroke("black").beginFill("yellow").drawRoundRect(0, 0, 200, 100, 10);
block5.graphics.setStrokeStyle(3).beginStroke("black").beginFill("pink").drawRoundRect(0, 0, 100, 300, 10);
block6.graphics.setStrokeStyle(3).beginStroke("black").beginFill("lightblue").drawRoundRect(0, 0, 100, 300, 10);
block7.graphics.setStrokeStyle(3).beginStroke("black").beginFill("orange").drawRoundRect(0, 0, 100, 300, 10);
block8.graphics.setStrokeStyle(3).beginStroke("black").beginFill("purple").drawRoundRect(0, 0, 300, 100, 10);


block1.x = 0;
block1.y = 200;

block2.x = 0;
block2.y = 0;

block3.x = 100;
block3.y = 0;

block4.x = 0;
block4.y = 400;

block5.x = 300;
block5.y = 0;

block6.x = 400;
block6.y = 0;

block7.x = 500;
block7.y = 0;

block8.x = 300;
block8.y = 300;

block1.setBounds(0, 0, 200, 100);
block2.setBounds(0, 0, 100, 200);
block3.setBounds(0, 0, 100, 200);
block4.setBounds(0, 0, 200, 100);
block5.setBounds(0, 0, 100, 300);
block6.setBounds(0, 0, 100, 300);
block7.setBounds(0, 0, 100, 300);
block8.setBounds(0, 0, 300, 100);

const blocks = [block1, block2, block3, block4, block5, block6, block7, block8];

const play = () => {
  const game = new Game(blocks);
  game.init();
}

document.addEventListener("DOMContentLoaded", () => play());

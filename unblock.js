const LEVELS = require('./levels/all_levels.js');

class Game {
  constructor(stage, blocks){
    this.blocks = blocks;
    this.stage = stage;
    this.dragging = {};
    this.grid = 80;
    this.moveCount = 0;
    this.currentLevel = 0;

    this.drag = this.drag.bind(this);
    this.reset = this.reset.bind(this);
  }

  init() {
    debugger
    LEVELS[0](this.stage);
    this.blocks.forEach( (block) => {
      this.stage.addChild(block);
      this.enableDrag(block);
    });
    this.stage.update();
    document.getElementById('choose-level').addEventListener("click", this.chooseLevelOpen);
    document.getElementById('modal-background').addEventListener("click", this.modalClose);
    document.getElementById('reset-level').addEventListener("click", this.reset);
    const buttons = document.getElementsByClassName('level-box');
    for(let i = 0; i < buttons.length; i++){
      buttons[i].addEventListener("click", (e) => {
        this.loadLevel(parseInt(e.currentTarget.id));
      });
    }

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

    if(target.getBounds().width > 80 &&
      (Math.abs(moveX - target.x) === 80 || Math.abs(moveX - target.x) === 160 )) {
      if(target.x - 80 >= 0 && target.x + target.getBounds().width < 480){
        moveX < target.x ? target.x -= 80 : target.x += 80;
      } else if(target.x - 80 < 0 && moveX > target.x){
        target.x += 80;
      } else if(target.x + target.getBounds().width >= 480 && moveX < target.x){
        target.x -= 80;
      } else if(moveX >= 400 && moveY === 160 || this.blocks[0].x === 320) {
        target.x = moveX;
        this.gameOver();
      }
    } else if(target.getBounds().height > 80 &&
      (Math.abs(moveY - target.y) === 80 || Math.abs(moveY - target.y) === 160) ){
      if(target.y - 80 >= 0 && target.y + target.getBounds().height < 480){
        moveY < target.y ? target.y -= 80 : target.y += 80;
      } else if(target.y - 80 < 0 && moveY > target.y){
        target.y += 80;
      } else if(target.y + target.getBounds().height >= 480 && moveY < target.y){
        target.y -= 80;
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
    let nextX, nextY;

    if(e.currentTarget.getBounds().width > 80){
      move.x > e.currentTarget.x ? nextX = e.currentTarget.x + 80 : nextX = e.currentTarget.x - 80;
      nextY = e.currentTarget.y;
    } else {
      move.y > e.currentTarget.y ? nextY = e.currentTarget.y + 80 : nextY = e.currentTarget.y - 80;
      nextX = e.currentTarget.x;
    }

    for(let i = 0; i < this.blocks.length; i++){
      if(this.blocks[i].x === e.currentTarget.x && this.blocks[i].y === e.currentTarget.y){
        continue;
      } else if(this.checkCollision(nextX, nextY, e.currentTarget, this.blocks[i])){
        collision = true;
        break;
      }
    }

    if(!collision){
      this.dragLimits(e.currentTarget, this.dragging.objectMove);
    }
    this.stage.update();
  }

  gameOver() {
    document.getElementById('win-modal').style.display = "block";
    document.getElementById('modal-background').style.display = "block";
    setTimeout( () => {
      document.getElementById('win-modal').style.display = "none";
      document.getElementById('modal-background').style.display = "none";
    }, 2000);
    this.stage.removeAllChildren();
    this.currentLevel += 1;
    this.blocks = LEVELS[this.currentLevel](this.stage);
    this.init();
  }

  chooseLevelOpen() {
    document.getElementById('menu-modal').style.display = "block";
    document.getElementById('modal-background').style.display = "block";
  }

  modalClose() {
    document.getElementById('menu-modal').style.display = "none";
    document.getElementById('modal-background').style.display = "none";
    document.getElementById('win-modal').style.display = "none";
  }

  loadLevel(id) {
    this.stage.removeAllChildren();
    this.currentLevel = id;
    this.blocks = LEVELS[this.currentLevel](this.stage);
    this.modalClose();
    this.init();
  }

  reset() {
    this.loadLevel(this.currentLevel);
  }

}
const play = () => {
  const stage = new createjs.Stage("canvas");
  const game = new Game(stage, LEVELS[0](stage));
  game.init();

}

document.addEventListener("DOMContentLoaded", () => play());

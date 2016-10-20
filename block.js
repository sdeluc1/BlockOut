
class Block {
  constructor(startX, startY, direction, size){
    this.startX = startX;
    this.startY = startY;
    this.direction = direction;
    this.size = size;
  }

  draw() {
    let width, height;
    if(this.direction === 'vertical'){
      width = this.size;
      height = 100;
    } else {
      width = 100;
      height = this.size;
    }
    let block = new createjs.Shape();
    block.graphics.beginFill("red").drawRect(
      this.startX, this.startY, width, height
    );
  }
}

module.exports = Block;

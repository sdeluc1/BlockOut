/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	
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
	  //   if(target._bounds.height > 100){
	  //     if(target.y < nextY){
	  //       if(target.y + target._bounds.height >= block.y){
	  //         return true;
	  //       }
	  //     } else if(target.y > nextY){
	  //       if(target.y <= block.y + block._bounds.height){
	  //         return true;
	  //       }
	  //     }
	  //   } else {
	  //     if(target.x < nextX){
	  //       if(target.x + target._bounds.width >= block.x){
	  //         return true;
	  //       }
	  //     } else if(target.x > nextX){
	  //       if(target.x <= block.x + block._bounds.width){
	  //         return true;
	  //       }
	  //     }
	  //   }
	  //   return false;
	  // }

	  dragLimits(target, move) {
	    const moveX = Math.round(move.x / this.grid) * this.grid;
	    const moveY = Math.round(move.y / this.grid) * this.grid;
	    console.log(moveX);
	    console.log(moveY);
	    if(target.getBounds().width > 100 && Math.abs(target.x - moveX <= 100)){
	      if(target.x - 100 >= 0 && target.x + target.getBounds().width < 600){
	        target.x = moveX;
	      } else if(target.x - 100 < 0 && move.x > target.x){
	        target.x = moveX;
	      } else if(target.x + target.getBounds().width >= 600 && move.x < target.x){
	        target.x = moveX;
	      }
	    } else if(target.getBounds().height > 100 && Math.abs(target.y - moveY <= 100)){
	      if(target.y - 100 >= 0 && target.y + target.getBounds().height < 600){
	        target.y = moveY;
	      } else if(target.y - 100 < 0 && move.y > target.y){
	        target.y = moveY;
	      } else if(target.y + target.getBounds().height >= 600 && move.y < target.y){
	        debugger
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

	    // this.blocks.forEach( (block) => {
	    //   if(block.x === e.currentTarget.x && block.y === e.currentTarget.y){
	    //     console.log("failed");
	    //     console.log(this.checkCollision(nextX, nextY, e.currentTarget, block));
	    //     console.log(`nextX: ${nextX}, nextY: ${nextY}`);
	    //     console.log(`blockX: ${block.x}, blockY: ${block.y}`);
	    //     // continue;
	    //   } else if(this.checkCollision(nextX, nextY, e.currentTarget, block)){
	    //
	    //     collision = true;
	    //   }
	    // });

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

	let block = new createjs.Shape();
	let block2 = new createjs.Shape();
	let block3 = new createjs.Shape();
	block.graphics.beginFill("red").drawRect(0, 0, 100, 200);
	block2.graphics.beginFill("blue").drawRect(0, 0, 200, 100);
	block3.graphics.beginFill("green").drawRect(0, 0, 100, 300);

	block2.x = 100;
	block2.y = 400;
	block3.x = 100;
	block3.y = 0;

	block.setBounds(0, 0, 100, 200);
	block2.setBounds(0, 0, 200, 100);
	block3.setBounds(0, 0, 100, 300);

	const blocks = [block, block2, block3];

	const play = () => {
	  const game = new Game(blocks);
	  game.init();
	}
	// game.init();

	document.addEventListener("DOMContentLoaded", () => play());

	// const init = () => {
	//   stage = new createjs.Stage("canvas");
	//   block.graphics.beginFill("red").drawRect(0, 0, 100, 200);
	//   block2.graphics.beginFill("blue").drawRect(0, 0, 200, 100);
	//   block2.x = 100;
	//   block2.y = 400;
	//   block2.setBounds(0, 0, 200, 100);
	//   block.setBounds(0, 0, 100, 200);
	//   stage.addChild(block);
	//   stage.addChild(block2);
	//
	//   enableDrag(block);
	//   enableDrag(block2);
	//
	//   stage.update();
	// }
	//
	// const dragLimits = (target, move) => {
	//
	//   if(target.getBounds().width > 100){
	//     if(target.x - 100 >= 0 && target.x + target.getBounds().width < 600){
	//       target.x = Math.round(move.x / grid) * grid;
	//     } else if(target.x - 100 < 0 && move.x > target.x){
	//       target.x = Math.round(move.x / grid) * grid;
	//     } else if(target.x + target.getBounds().width >= 600 && move.x < target.x){
	//       target.x = Math.round(move.x / grid) * grid;
	//     }
	//   } else if(target.getBounds().height > 100){
	//     if(target.y - 100 >= 0 && target.y + target.getBounds().height < 600){
	//       target.y = Math.round(move.y / grid) * grid;
	//     } else if(target.y - 100 < 0 && move.y > target.y){
	//       target.y = Math.round(move.y / grid) * grid;
	//     } else if(target.y + target.getBounds().height >= 600 && move.y < target.y){
	//       target.y = Math.round(move.y / grid) * grid;
	//     }
	//   }
	// }
	//
	// const enableDrag = (obj) => {
	//   obj.on("mousedown", dragstart);
	//   obj.on("pressmove", drag);
	// };
	//
	// const dragstart = (e) => {
	//   dragging = false;
	// }
	//
	// const drag = (e) => {
	//   if (!dragging || !dragging.startCoords || !dragging.stageCoords) {
	//     dragging = e.currentTarget;
	//     dragging.startCoords = {x: dragging.x, y: dragging.y};
	//     dragging.stageCoords = {x: e.stageX, y: e.stageY};
	//   }
	//
	//   dragging.stageMove = {x: dragging.stageCoords.x - e.stageX, y: dragging.stageCoords.y - e.stageY};
	//   dragging.objectMove = {x: dragging.startCoords.x - dragging.stageMove.x, y: dragging.startCoords.y - dragging.stageMove.y};
	//
	//   dragLimits(e.currentTarget, dragging.objectMove);
	//
	//   stage.update();
	// }


/***/ }
/******/ ]);
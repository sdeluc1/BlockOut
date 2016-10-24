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
/***/ function(module, exports, __webpack_require__) {

	const LEVELS = __webpack_require__(1);

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


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const level1 = __webpack_require__(2);
	const level2 = __webpack_require__(3);
	const level3 = __webpack_require__(4);
	const level4 = __webpack_require__(5);

	const LEVELS = [
	  level1,
	  level2,
	  level3,
	  level4
	];

	module.exports = LEVELS;


/***/ },
/* 2 */
/***/ function(module, exports) {

	const loadLevel1 = (stage) => {

	  let block1 = new createjs.Shape();
	  let block2 = new createjs.Shape();
	  let block3 = new createjs.Shape();
	  let block4 = new createjs.Shape();
	  let block5 = new createjs.Shape();
	  let block6 = new createjs.Shape();
	  let block7 = new createjs.Shape();
	  let block8 = new createjs.Shape();

	  const imgV = new Image();
	  imgV.src = "./images/oak-v.jpg";
	  imgV.onload = () => {

	    block2.graphics.setStrokeStyle(3).beginStroke("black").beginBitmapFill(imgV).drawRoundRect(0, 0, 80, 160, 10);
	    block3.graphics.setStrokeStyle(3).beginStroke("black").beginBitmapFill(imgV).drawRoundRect(0, 0, 80, 160, 10);
	    block5.graphics.setStrokeStyle(3).beginStroke("black").beginBitmapFill(imgV).drawRoundRect(0, 0, 80, 240, 10);
	    block6.graphics.setStrokeStyle(3).beginStroke("black").beginBitmapFill(imgV).drawRoundRect(0, 0, 80, 240, 10);
	    block7.graphics.setStrokeStyle(3).beginStroke("black").beginBitmapFill(imgV).drawRoundRect(0, 0, 80, 240, 10);

	    stage.update();
	  }

	  const imgH = new Image();
	  imgH.src = "./images/oak-h.jpg";
	  imgH.onload = () => {
	    block1.graphics.setStrokeStyle(3).beginStroke("black").beginFill("red").drawRoundRect(0, 0, 160, 80, 10);
	    block4.graphics.setStrokeStyle(3).beginStroke("black").beginBitmapFill(imgH).drawRoundRect(0, 0, 160, 80, 10);
	    block8.graphics.setStrokeStyle(3).beginStroke("black").beginBitmapFill(imgH).drawRoundRect(0, 0, 240, 80, 10);

	    stage.update();
	  }

	  block1.x = 0;
	  block1.y = 160;

	  block2.x = 0;
	  block2.y = 0;

	  block3.x = 80;
	  block3.y = 0;

	  block4.x = 0;
	  block4.y = 320;

	  block5.x = 240;
	  block5.y = 0;

	  block6.x = 320;
	  block6.y = 0;

	  block7.x = 400;
	  block7.y = 0;

	  block8.x = 240;
	  block8.y = 240;

	  block1.setBounds(0, 0, 160, 80);
	  block2.setBounds(0, 0, 80, 160);
	  block3.setBounds(0, 0, 80, 160);
	  block4.setBounds(0, 0, 160, 80);
	  block5.setBounds(0, 0, 80, 240);
	  block6.setBounds(0, 0, 80, 240);
	  block7.setBounds(0, 0, 80, 240);
	  block8.setBounds(0, 0, 240, 80);

	  const blocks = [block1, block2, block3, block4, block5, block6, block7, block8];
	  return blocks;
	}

	module.exports = loadLevel1;


/***/ },
/* 3 */
/***/ function(module, exports) {

	const loadLevel2 = (stage) => {

	  let block1 = new createjs.Shape();
	  let block2 = new createjs.Shape();
	  let block3 = new createjs.Shape();
	  let block4 = new createjs.Shape();
	  let block5 = new createjs.Shape();
	  let block6 = new createjs.Shape();
	  let block7 = new createjs.Shape();
	  let block8 = new createjs.Shape();
	  let block9 = new createjs.Shape();
	  let block10 = new createjs.Shape();
	  let block11 = new createjs.Shape();
	  let block12 = new createjs.Shape();

	  const imgV = new Image();
	  imgV.src = "./images/oak-v.jpg";
	  imgV.onload = () => {

	    block2.graphics.setStrokeStyle(3).beginStroke("black").beginBitmapFill(imgV).drawRoundRect(0, 0, 80, 160, 10);
	    block7.graphics.setStrokeStyle(3).beginStroke("black").beginBitmapFill(imgV).drawRoundRect(0, 0, 80, 160, 10);
	    block12.graphics.setStrokeStyle(3).beginStroke("black").beginBitmapFill(imgV).drawRoundRect(0, 0, 80, 160, 10);
	    stage.update();
	  }

	  const imgH = new Image();
	  imgH.src = "./images/oak-h.jpg";
	  imgH.onload = () => {
	    block1.graphics.setStrokeStyle(3).beginStroke("black").beginFill("red").drawRoundRect(0, 0, 160, 80, 10);
	    block3.graphics.setStrokeStyle(3).beginStroke("black").beginBitmapFill(imgH).drawRoundRect(0, 0, 160, 80, 10);
	    block4.graphics.setStrokeStyle(3).beginStroke("black").beginBitmapFill(imgH).drawRoundRect(0, 0, 240, 80, 10);
	    block5.graphics.setStrokeStyle(3).beginStroke("black").beginBitmapFill(imgH).drawRoundRect(0, 0, 240, 80, 10);
	    block6.graphics.setStrokeStyle(3).beginStroke("black").beginBitmapFill(imgH).drawRoundRect(0, 0, 160, 80, 10);
	    block8.graphics.setStrokeStyle(3).beginStroke("black").beginBitmapFill(imgH).drawRoundRect(0, 0, 240, 80, 10);
	    block9.graphics.setStrokeStyle(3).beginStroke("black").beginBitmapFill(imgH).drawRoundRect(0, 0, 160, 80, 10);
	    block10.graphics.setStrokeStyle(3).beginStroke("black").beginBitmapFill(imgH).drawRoundRect(0, 0, 160, 80, 10);
	    block11.graphics.setStrokeStyle(3).beginStroke("black").beginBitmapFill(imgH).drawRoundRect(0, 0, 160, 80, 10);
	    stage.update();
	  }



	  block1.x = 0;
	  block1.y = 160;

	  block2.x = 0;
	  block2.y = 0;

	  block3.x = 0;
	  block3.y = 240;

	  block4.x = 80;
	  block4.y = 80;

	  block5.x = 80;
	  block5.y = 320;

	  block6.x = 160;
	  block6.y = 0;

	  block7.x = 240;
	  block7.y = 160;

	  block8.x = 240;
	  block8.y = 400;

	  block9.x = 320;
	  block9.y = 0;

	  block10.x = 320;
	  block10.y = 80;

	  block11.x = 320;
	  block11.y = 320;

	  block12.x = 400;
	  block12.y = 160;

	  block1.setBounds(0, 0, 160, 80);
	  block2.setBounds(0, 0, 80, 160);
	  block3.setBounds(0, 0, 160, 80);
	  block4.setBounds(0, 0, 240, 80);
	  block5.setBounds(0, 0, 240, 80);
	  block6.setBounds(0, 0, 160, 80);
	  block7.setBounds(0, 0, 80, 160);
	  block8.setBounds(0, 0, 240, 80);
	  block9.setBounds(0, 0, 160, 80);
	  block10.setBounds(0, 0, 160, 80);
	  block11.setBounds(0, 0, 160, 80);
	  block12.setBounds(0, 0, 80, 160);

	  const blocks = [block1, block2, block3, block4,
	    block5, block6, block7, block8,
	    block9, block10, block11, block12];
	  return blocks;
	}

	module.exports = loadLevel2;


/***/ },
/* 4 */
/***/ function(module, exports) {

	const loadLevel3 = (stage) => {

	  let block1 = new createjs.Shape();
	  let block2 = new createjs.Shape();
	  let block3 = new createjs.Shape();
	  let block4 = new createjs.Shape();
	  let block5 = new createjs.Shape();
	  let block6 = new createjs.Shape();
	  let block7 = new createjs.Shape();
	  let block8 = new createjs.Shape();
	  let block9 = new createjs.Shape();
	  let block10 = new createjs.Shape();
	  let block11 = new createjs.Shape();

	  const imgV = new Image();
	  imgV.src = "./images/oak-v.jpg";
	  imgV.onload = () => {

	    block3.graphics.setStrokeStyle(3).beginStroke("black").beginBitmapFill(imgV).drawRoundRect(0, 0, 80, 160, 10);
	    block4.graphics.setStrokeStyle(3).beginStroke("black").beginBitmapFill(imgV).drawRoundRect(0, 0, 80, 160, 10);
	    block5.graphics.setStrokeStyle(3).beginStroke("black").beginBitmapFill(imgV).drawRoundRect(0, 0, 80, 160, 10);
	    block6.graphics.setStrokeStyle(3).beginStroke("black").beginBitmapFill(imgV).drawRoundRect(0, 0, 80, 160, 10);
	    block8.graphics.setStrokeStyle(3).beginStroke("black").beginBitmapFill(imgV).drawRoundRect(0, 0, 80, 160, 10);
	    block9.graphics.setStrokeStyle(3).beginStroke("black").beginBitmapFill(imgV).drawRoundRect(0, 0, 80, 160, 10);
	    block10.graphics.setStrokeStyle(3).beginStroke("black").beginBitmapFill(imgV).drawRoundRect(0, 0, 80, 240, 10);
	    block11.graphics.setStrokeStyle(3).beginStroke("black").beginBitmapFill(imgV).drawRoundRect(0, 0, 80, 160, 10);

	    stage.update();
	  }

	  const imgH = new Image();
	  imgH.src = "./images/oak-h.jpg";
	  imgH.onload = () => {
	    block1.graphics.setStrokeStyle(3).beginStroke("black").beginFill("red").drawRoundRect(0, 0, 160, 80, 10);
	    block2.graphics.setStrokeStyle(3).beginStroke("black").beginBitmapFill(imgH).drawRoundRect(0, 0, 160, 80, 10);
	    block7.graphics.setStrokeStyle(3).beginStroke("black").beginBitmapFill(imgH).drawRoundRect(0, 0, 160, 80, 10);
	    stage.update();
	  }

	  block1.x = 0;
	  block1.y = 160;

	  block2.x = 0;
	  block2.y = 240;

	  block3.x = 0;
	  block3.y = 320;

	  block4.x = 80;
	  block4.y = 320;

	  block5.x = 160;
	  block5.y = 0;

	  block6.x = 160;
	  block6.y = 160;

	  block7.x = 160;
	  block7.y = 320;

	  block8.x = 240;
	  block8.y = 0;

	  block9.x = 240;
	  block9.y = 160;

	  block10.x = 320;
	  block10.y = 160;

	  block11.x = 400;
	  block11.y = 80;

	  block1.setBounds(0, 0, 160, 80);
	  block2.setBounds(0, 0, 160, 80);
	  block3.setBounds(0, 0, 80, 160);
	  block4.setBounds(0, 0, 80, 160);
	  block5.setBounds(0, 0, 80, 160);
	  block6.setBounds(0, 0, 80, 160);
	  block7.setBounds(0, 0, 160, 80);
	  block8.setBounds(0, 0, 80, 160);
	  block9.setBounds(0, 0, 80, 160);
	  block10.setBounds(0, 0, 80, 240);
	  block11.setBounds(0, 0, 80, 160);

	  const blocks = [block1, block2, block3, block4,
	                  block5, block6, block7, block8,
	                  block9, block10, block11];
	  return blocks;
	}

	module.exports = loadLevel3;


/***/ },
/* 5 */
/***/ function(module, exports) {

	const loadLevel4 = (stage) => {

	  let block1 = new createjs.Shape();
	  let block2 = new createjs.Shape();
	  let block3 = new createjs.Shape();
	  let block4 = new createjs.Shape();
	  let block5 = new createjs.Shape();
	  let block6 = new createjs.Shape();
	  let block7 = new createjs.Shape();
	  let block8 = new createjs.Shape();
	  let block9 = new createjs.Shape();
	  let block10 = new createjs.Shape();
	  let block11 = new createjs.Shape();
	  let block12 = new createjs.Shape();
	  let block13 = new createjs.Shape();

	  const imgV = new Image();
	  imgV.src = "./images/oak-v.jpg";
	  imgV.onload = () => {

	    block3.graphics.setStrokeStyle(3).beginStroke("black").beginBitmapFill(imgV).drawRoundRect(0, 0, 80, 240, 10);
	    block6.graphics.setStrokeStyle(3).beginStroke("black").beginBitmapFill(imgV).drawRoundRect(0, 0, 80, 160, 10);
	    block7.graphics.setStrokeStyle(3).beginStroke("black").beginBitmapFill(imgV).drawRoundRect(0, 0, 80, 160, 10);
	    block10.graphics.setStrokeStyle(3).beginStroke("black").beginBitmapFill(imgV).drawRoundRect(0, 0, 80, 240, 10);
	    block12.graphics.setStrokeStyle(3).beginStroke("black").beginBitmapFill(imgV).drawRoundRect(0, 0, 80, 160, 10);
	    block13.graphics.setStrokeStyle(3).beginStroke("black").beginBitmapFill(imgV).drawRoundRect(0, 0, 80, 160, 10);

	    stage.update();
	  }

	  const imgH = new Image();
	  imgH.src = "./images/oak-h.jpg";
	  imgH.onload = () => {
	    block1.graphics.setStrokeStyle(3).beginStroke("black").beginFill("red").drawRoundRect(0, 0, 160, 80, 10);
	    block2.graphics.setStrokeStyle(3).beginStroke("black").beginBitmapFill(imgH).drawRoundRect(0, 0, 240, 80, 10);
	    block4.graphics.setStrokeStyle(3).beginStroke("black").beginBitmapFill(imgV).drawRoundRect(0, 0, 160, 80, 10);
	    block5.graphics.setStrokeStyle(3).beginStroke("black").beginBitmapFill(imgV).drawRoundRect(0, 0, 160, 80, 10);
	    block8.graphics.setStrokeStyle(3).beginStroke("black").beginBitmapFill(imgV).drawRoundRect(0, 0, 160, 80, 10);
	    block9.graphics.setStrokeStyle(3).beginStroke("black").beginBitmapFill(imgV).drawRoundRect(0, 0, 160, 80, 10);
	    block11.graphics.setStrokeStyle(3).beginStroke("black").beginBitmapFill(imgV).drawRoundRect(0, 0, 160, 80, 10);

	    stage.update();
	  }

	  block1.x = 160;
	  block1.y = 160;

	  block2.x = 0;
	  block2.y = 80;

	  block3.x = 0;
	  block3.y = 160;

	  block4.x = 0;
	  block4.y = 400;

	  block5.x = 80;
	  block5.y = 0;

	  block6.x = 80;
	  block6.y = 160;

	  block7.x = 160;
	  block7.y = 320;

	  block8.x = 240;
	  block8.y = 320;

	  block9.x = 320;
	  block9.y = 0;

	  block10.x = 320;
	  block10.y = 80;

	  block11.x = 320;
	  block11.y = 400;

	  block12.x = 400;
	  block12.y = 80;

	  block13.x = 400;
	  block13.y = 240;

	  block1.setBounds(0, 0, 160, 80);
	  block2.setBounds(0, 0, 240, 80);
	  block3.setBounds(0, 0, 80, 240);
	  block4.setBounds(0, 0, 160, 80);
	  block5.setBounds(0, 0, 160, 80);
	  block6.setBounds(0, 0, 80, 160);
	  block7.setBounds(0, 0, 80, 160);
	  block8.setBounds(0, 0, 160, 80);
	  block9.setBounds(0, 0, 160, 80);
	  block10.setBounds(0, 0, 80, 240);
	  block11.setBounds(0, 0, 160, 80);
	  block12.setBounds(0, 0, 80, 160);
	  block13.setBounds(0, 0, 80, 160);

	  const blocks = [block1, block2, block3, block4,
	                  block5, block6, block7, block8,
	                  block9, block10, block11, block12, block13];
	  return blocks;
	}

	module.exports = loadLevel4;


/***/ }
/******/ ]);
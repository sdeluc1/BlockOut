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

block1.graphics.setStrokeStyle(3).beginStroke("black").beginFill("red").drawRoundRect(0, 0, 200, 100, 10);
block2.graphics.setStrokeStyle(3).beginStroke("black").beginFill("blue").drawRoundRect(0, 0, 100, 200, 10);
block3.graphics.setStrokeStyle(3).beginStroke("black").beginFill("green").drawRoundRect(0, 0, 200, 100, 10);
block4.graphics.setStrokeStyle(3).beginStroke("black").beginFill("yellow").drawRoundRect(0, 0, 300, 100, 10);
block5.graphics.setStrokeStyle(3).beginStroke("black").beginFill("pink").drawRoundRect(0, 0, 300, 100, 10);
block6.graphics.setStrokeStyle(3).beginStroke("black").beginFill("lightblue").drawRoundRect(0, 0, 200, 100, 10);
block7.graphics.setStrokeStyle(3).beginStroke("black").beginFill("orange").drawRoundRect(0, 0, 100, 200, 10);
block8.graphics.setStrokeStyle(3).beginStroke("black").beginFill("purple").drawRoundRect(0, 0, 300, 100, 10);
block9.graphics.setStrokeStyle(3).beginStroke("black").beginFill("purple").drawRoundRect(0, 0, 200, 100, 10);
block10.graphics.setStrokeStyle(3).beginStroke("black").beginFill("purple").drawRoundRect(0, 0, 200, 100, 10);
block11.graphics.setStrokeStyle(3).beginStroke("black").beginFill("purple").drawRoundRect(0, 0, 200, 100, 10);
block12.graphics.setStrokeStyle(3).beginStroke("black").beginFill("purple").drawRoundRect(0, 0, 100, 200, 10);


block1.x = 0;
block1.y = 200;

block2.x = 0;
block2.y = 0;

block3.x = 0;
block3.y = 300;

block4.x = 100;
block4.y = 100;

block5.x = 100;
block5.y = 400;

block6.x = 200;
block6.y = 0;

block7.x = 300;
block7.y = 200;

block8.x = 300;
block8.y = 500;

block9.x = 400;
block9.y = 0;

block10.x = 400;
block10.y = 100;

block11.x = 400;
block11.y = 400;

block12.x = 500;
block12.y = 200;

block1.setBounds(0, 0, 200, 100);
block2.setBounds(0, 0, 100, 200);
block3.setBounds(0, 0, 200, 100);
block4.setBounds(0, 0, 300, 100);
block5.setBounds(0, 0, 300, 100);
block6.setBounds(0, 0, 200, 100);
block7.setBounds(0, 0, 100, 200);
block8.setBounds(0, 0, 300, 100);
block9.setBounds(0, 0, 200, 100);
block10.setBounds(0, 0, 200, 100);
block11.setBounds(0, 0, 200, 100);
block12.setBounds(0, 0, 100, 200);

const blocks = [block1, block2, block3, block4,
                block5, block6, block7, block8,
                block9, block10, block11, block12];

module.exports = blocks;

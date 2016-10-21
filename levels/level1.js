
let block1 = new createjs.Shape();
let block2 = new createjs.Shape();
let block3 = new createjs.Shape();
let block4 = new createjs.Shape();
let block5 = new createjs.Shape();
let block6 = new createjs.Shape();
let block7 = new createjs.Shape();
let block8 = new createjs.Shape();

const img = new Image();
img.src = "./oak.jpg";
block1.graphics.setStrokeStyle(3).beginStroke("black").beginFill("red").drawRoundRect(0, 0, 200, 100, 10);
block2.graphics.setStrokeStyle(3).beginStroke("black").beginFill("#DEB887").drawRoundRect(0, 0, 100, 200, 10);
block3.graphics.setStrokeStyle(3).beginStroke("black").beginFill("#DEB887").drawRoundRect(0, 0, 100, 200, 10);
block4.graphics.setStrokeStyle(3).beginStroke("black").beginFill("#DEB887").drawRoundRect(0, 0, 200, 100, 10);
block5.graphics.setStrokeStyle(3).beginStroke("black").beginFill("#DEB887").drawRoundRect(0, 0, 100, 300, 10);
block6.graphics.setStrokeStyle(3).beginStroke("black").beginFill("#DEB887").drawRoundRect(0, 0, 100, 300, 10);
block7.graphics.setStrokeStyle(3).beginStroke("black").beginFill("#DEB887").drawRoundRect(0, 0, 100, 300, 10);
block8.graphics.setStrokeStyle(3).beginStroke("black").beginFill("#DEB887").drawRoundRect(0, 0, 300, 100, 10);


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

module.exports = blocks;

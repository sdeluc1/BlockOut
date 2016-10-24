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

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
  imgV.src = "./oak-v.jpg";
  imgV.onload = () => {

    block2.graphics.setStrokeStyle(3).beginStroke("black").beginBitmapFill(imgV).drawRoundRect(0, 0, 80, 160, 10);
    block3.graphics.setStrokeStyle(3).beginStroke("black").beginBitmapFill(imgV).drawRoundRect(0, 0, 80, 160, 10);
    block5.graphics.setStrokeStyle(3).beginStroke("black").beginBitmapFill(imgV).drawRoundRect(0, 0, 80, 240, 10);
    block6.graphics.setStrokeStyle(3).beginStroke("black").beginBitmapFill(imgV).drawRoundRect(0, 0, 80, 240, 10);
    block7.graphics.setStrokeStyle(3).beginStroke("black").beginBitmapFill(imgV).drawRoundRect(0, 0, 80, 240, 10);

    stage.update();
  }

  const imgH = new Image();
  imgH.src = "./oak-h.jpg";
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

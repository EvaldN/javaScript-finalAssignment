let endScreen = new Application({
    width: 1000,
    height: 1200,
    transparent: false,
});
const victory = new PIXI.Text("VICTORY");
victory.x = 100;
victory.y = 200;
victory.width = 750;
victory.height = 60;
victory.style = {fill: 0xffffff};
endScreen.stage.addChild(victory);

const score = new PIXI.Text("Your score: " + game.turnCounter);
score.x = 200;
score.y = 720;
score.width = 550;
score.height = 60;
score.style = {fill: 0xffffff};
endScreen.stage.addChild(score);
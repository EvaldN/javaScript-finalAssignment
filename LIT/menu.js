let mainMenu = new Application({
    width: 1000,
    height: 1200,
    transparent: false,
});
document.body.appendChild(mainMenu.view);
const title = new PIXI.Text("LITHUANIA\nBUILDER");
title.x = 100;
title.y = 200;
title.width = 750;
title.height = 60;
title.style = {fill: 0xffffff};
mainMenu.stage.addChild(title);

const start = new PIXI.Text("START GAME");
start.x = 200;
start.y = 720;
start.width = 550;
start.height = 60;
start.style = {fill: 0xffffff};
start.interactive = true;
start.on("click", function (){document.body.removeChild(mainMenu.view);document.body.appendChild(app.view);})
const rules = new PIXI.Text("RULES");
rules.x = 200;
rules.y = 820;
rules.width = 550;
rules.height = 60;
rules.style = {fill: 0xffffff};
rules.interactive = true;
rules.on("click",function(){document.body.removeChild(mainMenu.view); document.body.appendChild(ruleMenu.view)});
mainMenu.stage.addChild(rules);
mainMenu.stage.addChild(start);
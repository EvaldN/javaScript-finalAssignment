let ruleMenu = new Application({
    width: 1000,
    height: 1200,
    transparent: false,
});
const rulesDesc = new PIXI.Text("RULES\n\nThe goal of the game is to conquer all of Lithuania\nas soon as possible.\n" +
    "                        For that one has to manage their military and economy.\nProvinces provide income for which units can be bought.\n" +
    "                          Unit cost gold per turn and if gold drops below zero, the game is over\n" +
    "                           In battle, a formation of 6 units fights the other formation.\n The attacker attacks first after which defenders attack\n" +
    "                           If a unit has nothing to attack it will seek enemies on other rows.");
rulesDesc.x = 150;
rulesDesc.y = 720;
rulesDesc.width = 700;
rulesDesc.style = {fill: 0xffffff};
ruleMenu.stage.addChild(rulesDesc);

const back = new PIXI.Text("Back");
back.x = 800;
back.y = 100;
back.width = 50;
back.style = {fill: 0xffffff};
back.interactive = true;
back.on("click", function(){document.body.removeChild(ruleMenu.view);document.body.appendChild(mainMenu.view);});
ruleMenu.stage.addChild(back);
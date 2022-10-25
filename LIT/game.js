let game = new Engine();
let app = new Application({
    width: 1000,
    height: 1200,
    transparent: false,
});
//Setting up the game
//province objects and military units
let lithuania  = new Province("lithuania", 9,"Lithuania\nGlorious capital of our duchy.", true,25, 0,0);
let polotsk    = new Province("polotsk",8, "Polotsk\nDeep forests rich in iron.\nGood place to set up mines.", false,50, 1, 0);
let toropets   = new Province("toropets",7, "Toropets\nDeep forests with no specialty.", false,10, 2, 0);
let palenke    = new Province("palenke",6, "Palenke\nFlatlands rich with wool.\nGood place to trade with Poles.", false,75, 0, 1);
let minsk      = new Province("minsk",5,"Minsk\nFlatlands with rich food output.\nGreat to feed the populus.",false,50,1,1);
let smolensk   = new Province("smolensk",4,"Smolensk\nGreat castle of the Ruthenians.\nReduces unit prices.",false,10,2,1);
let volhynia   = new Province("volhynia",3,"Volhynia\nForested cattle heards.\nAdditional trade with Poles.",false,75,0,2);
let zaporizhia = new Province("zaporizhia",2,"Zaporizhia and Hajibey\nGreat lands of the cossacks.\nBlack sea ports.", false,80,1,2);
let ukraine    = new Province("ukraine",1,"Ukrainian grasslands\nEndless farmlands.\nEnough to feed the entire Europe.",false,100,2,2);
let selectedProvince;
let ifFoughtThisTurn = false;
let militia = new Unit("Lithuanian militia", 1, 0,10, 5);
let cavalry = new Unit("Lithuanian cavalry", 2, 2,20, 15);
let spearman = new Unit("Medieval spearman", 1, 6,30, 15);
//setting up Lithuania is not necessary, its a player position.

//set up Polotsk.
polotsk.addDefender({...militia});
polotsk.addDefender({...militia});
polotsk.addDefender({...militia});
polotsk.addDefender({...militia});
polotsk.calculateDefenders();
//set up Toropets
toropets.addDefender({...militia});
toropets.addDefender({...militia});
toropets.addDefender({...militia});
toropets.addDefender({...militia});
toropets.addDefender({...militia});
toropets.addDefender({...militia});
toropets.calculateDefenders();
//set up Palenke
palenke.addDefender({...spearman});
palenke.addDefender({...spearman});
palenke.addDefender({...spearman});
palenke.addDefender({...militia});
palenke.addDefender({...militia});
palenke.addDefender({...militia});
palenke.calculateDefenders();
//set up Minsk
minsk.addDefender({...militia});
minsk.addDefender({...militia});
minsk.addDefender({...cavalry});
minsk.addDefender({...cavalry});
minsk.addDefender({...spearman});
minsk.addDefender({...spearman});
minsk.calculateDefenders();
//set up Smolensk
smolensk.addDefender({...spearman});
smolensk.addDefender({...spearman});
smolensk.addDefender({...spearman});
smolensk.addDefender({...spearman});
smolensk.addDefender({...spearman});
smolensk.addDefender({...spearman});
smolensk.calculateDefenders();
//set up Volhynia
volhynia.addDefender({...spearman});
volhynia.addDefender({...spearman});
volhynia.addDefender({...spearman});
volhynia.addDefender({...spearman});
volhynia.addDefender({...cavalry});
volhynia.addDefender({...cavalry});
volhynia.calculateDefenders();
//set up Zaporizhia
zaporizhia.addDefender({...cavalry});
zaporizhia.addDefender({...cavalry});
zaporizhia.addDefender({...cavalry});
zaporizhia.addDefender({...cavalry});
zaporizhia.addDefender({...cavalry});
zaporizhia.addDefender({...cavalry});
zaporizhia.calculateDefenders();
//set up Ukraine

ukraine.addDefender({...cavalry});
ukraine.addDefender({...cavalry});
ukraine.addDefender({...cavalry});
ukraine.addDefender({...cavalry});
ukraine.addDefender({...spearman});
ukraine.addDefender({...spearman});
ukraine.calculateDefenders();

provinces = [lithuania,polotsk,toropets,palenke,minsk,smolensk,volhynia,zaporizhia,ukraine];


lithuania.generateProvince();
polotsk.generateProvince();
toropets.generateProvince();
palenke.generateProvince();
minsk.generateProvince();
smolensk.generateProvince();
volhynia.generateProvince();
zaporizhia.generateProvince();
ukraine.generateProvince();
const Graphics = PIXI.Graphics;
//Exit buttons

const xButton = new PIXI.Text("X");
xButton.x = 750;
xButton.y = 325;
xButton.interactive = true;
xButton.on('click',function(){container.visible = false})

const xButtonNotification = new PIXI.Text("X");
xButtonNotification.x = 850;
xButtonNotification.y = 720;
xButtonNotification.interactive = true;
xButtonNotification.on('click',function(){notificationContainer.visible = false})

const xButtonEco = new PIXI.Text("X");
xButtonEco.x = 750;
xButtonEco.y = 325;
xButtonEco.interactive = true;
xButtonEco.on('click',function(){economyContainer.visible = false})

const xButtonMil = new PIXI.Text("X");
xButtonMil.x = 750;
xButtonMil.y = 325;
xButtonMil.interactive = true;
xButtonMil.on('click',function(){militaryContainer.visible = false})

//Bottom menu
const bottomContainer = new PIXI.Container();

const bottomMenu = new Graphics();
bottomMenu.beginFill(0xA57549);
bottomMenu.lineStyle(10, 0x866648, 1)
bottomMenu.drawRect(5, 939, 990, 293);
bottomMenu.endFill();
bottomContainer.addChild(bottomMenu);

const economyButton = new Graphics();
economyButton.beginFill(0x866648);
economyButton.lineStyle(10, 0x000000, 1);
economyButton.drawRect(50, 1000, 300, 150);
economyButton.interactive = true;
economyButton.on('click', function(){economyContainer.visible = true; militaryContainer.visible = false});
bottomContainer.addChild(economyButton);

const economyText = new PIXI.Text("ECONOMY");
economyText.x = 75;
economyText.y = 1050;
economyText.width = 250;
economyText.height = 50;
bottomContainer.addChild(economyText);

//Economy screen
const economyContainer = new PIXI.Container();

const economyMenu = new Graphics();
economyMenu.beginFill(0xA57549);
economyMenu.lineStyle(10, 0x866648, 1)
economyMenu.drawRect(200, 300, 600, 600);
economyMenu.endFill();
economyContainer.addChild(economyMenu);
economyContainer.addChild(xButtonEco);
economyContainer.interactive = true;

const ecoDescription = new PIXI.Text("");
ecoDescription.x = 250;
ecoDescription.y = 350;
economyContainer.addChild(ecoDescription);
ecoDescription.text = "Treasury: " + game.getGold + "\nIncome: " + game.getIncome + "\nUnit price: " + game.getUnitUpkeep;
app.stage.addChild(economyContainer);

economyContainer.visible = false;
//
const turnText = new PIXI.Text("Turn : " + game.turnCounter);
turnText.x = 450;
turnText.y = 950;
bottomContainer.addChild(turnText);

const nextTurnButton = new Graphics();
nextTurnButton.beginFill(0x866648);
nextTurnButton.lineStyle(10, 0x000000, 1);
nextTurnButton.drawRect(450, 1000, 100, 100);
bottomContainer.addChild(nextTurnButton);
nextTurnButton.interactive = true;
nextTurnButton.on("click", function(){game.nextTurn()});

const nextTurnText = new PIXI.Text("NEXT");
nextTurnText.x = 465;
nextTurnText.y = 1035;
bottomContainer.addChild(nextTurnText);

const militaryButton = new Graphics();
militaryButton.beginFill(0x866648);
militaryButton.lineStyle(10, 0x000000, 1);
militaryButton.drawRect(650, 1000, 300, 150);
militaryButton.interactive = true;
militaryButton.on('click', function(){militaryContainer.visible = true; economyContainer.false = false;});
bottomContainer.addChild(militaryButton);

//Military screen
const militaryContainer = new PIXI.Container();

const militaryMenu = new Graphics();
militaryMenu.beginFill(0xA57549);
militaryMenu.lineStyle(10, 0x866648, 1)
militaryMenu.drawRect(200, 300, 600, 600);
militaryMenu.endFill();
militaryContainer.addChild(militaryMenu);
militaryContainer.addChild(xButtonMil);
militaryContainer.interactive = true;

let milSummary = new PIXI.Text("Militia: " + game.militiaCount + " Spearmen: " + game.spearmanCount + " Cavalry: " + game.cavalryCount);
milSummary.x = 250;
milSummary.y = 350;
militaryContainer.addChild(milSummary);

const buyMilitia = new PIXI.Text("Recruit militia: cost 10, upkeep 5");
buyMilitia.x = 250;
buyMilitia.y = 450;
buyMilitia.interactive = true;
militaryContainer.addChild(buyMilitia);
buyMilitia.on("click", function(){game.addUnit({...militia});game.calculateUnits();milSummary.text = "Militia: " + game.militiaCount + " Spearmen: " + game.spearmanCount + " Cavalry: " + game.cavalryCount});

const buyCavalry = new PIXI.Text("Recruit cavalry: cost 20, upkeep 15");
buyCavalry.x = 250;
buyCavalry.y = 500;
buyCavalry.interactive = true;
militaryContainer.addChild(buyCavalry);
buyCavalry.on("click", function(){game.addUnit({...cavalry});game.calculateUnits();milSummary.text = "Militia: " + game.militiaCount + " Spearmen: " + game.spearmanCount + " Cavalry: " + game.cavalryCount});

const buySpearman = new PIXI.Text("Recruit spearman: cost 30, upkeep 15");
buySpearman.x = 250;
buySpearman.y = 550;
buySpearman.interactive = true;
militaryContainer.addChild(buySpearman);
buySpearman.on("click", function(){game.addUnit({...spearman});game.calculateUnits();milSummary.text = "Militia: " + game.militiaCount + " Spearmen: " + game.spearmanCount + " Cavalry: " + game.cavalryCount});


app.stage.addChild(militaryContainer);
militaryContainer.visible = false;
//
const militaryText = new PIXI.Text("MILITARY");
militaryText.x = 675;
militaryText.y = 1050;
militaryText.width = 250;
militaryText.height = 50;
bottomContainer.addChild(militaryText);


app.stage.addChild(bottomContainer);
//Province menu
const container = new PIXI.Container();

const onClickMenu = new Graphics();
onClickMenu.beginFill(0xA57549);
onClickMenu.lineStyle(10, 0x866648, 1)
onClickMenu.drawRect(200, 300, 600, 600);
onClickMenu.endFill();

const description = new PIXI.Text("");
description.x = 250;
description.y = 350;

const attemptConquestButton = new Graphics();
attemptConquestButton.beginFill(0xA57549);
attemptConquestButton.lineStyle(10, 0x866648, 1)
attemptConquestButton.drawRect(400, 700, 200, 100);
attemptConquestButton.endFill();
attemptConquestButton.interactive = true;
attemptConquestButton.on("click", function (){if(eval(selectedProvince).ifConquered == false){let battle = new Battle(game.military, eval(selectedProvince).defenders, eval(selectedProvince)); battle.fightBattle()}});

const attemptConquestText = new PIXI.Text("ATTACK");
attemptConquestText.x = 450;
attemptConquestText.y = 720;
attemptConquestText.width = 100;
attemptConquestText.height = 60;

container.addChild(onClickMenu);
container.addChild(xButton);
container.addChild(description);
container.addChild(attemptConquestButton);
container.addChild(attemptConquestText);
const notificationContainer = new PIXI.Container();

const gameMessage = new PIXI.Text("");
gameMessage.x = 250;
gameMessage.y = 720;
gameMessage.width = 550;
gameMessage.height = 60;

const NotificationBox = new Graphics();
NotificationBox.beginFill(0xA57549);
NotificationBox.lineStyle(10, 0x866648, 1)
NotificationBox.drawRect(200, 700, 700, 100);
NotificationBox.endFill();


notificationContainer.addChild(NotificationBox);
notificationContainer.addChild(gameMessage);
notificationContainer.addChild(xButtonNotification);
app.stage.addChild(notificationContainer);
notificationContainer.visible = false;

app.stage.addChild(container);

container.visible = false;


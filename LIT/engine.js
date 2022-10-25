let Application = PIXI.Application;
class Engine
{
    //initializing the economy;
    gold = 100;
    //initializing income from provinces
    income = 25;
    spending = 0;
    //initializing unit prices so that later it can be reduced
    unitUpkeep = 1;
    //setting up an array of our current military
    military = [];
    militiaCount = 0;
    spearmanCount = 0;
    cavalryCount = 0;

    constructor() {
    }
    addUnit(unit) {
        if(this.gold > unit.price && this.military.length !== 6) {
            this.military.push(unit);
            this.gold -= unit.price * this.unitUpkeep;
            this.spending +=unit.upkeep * this.unitUpkeep;
            this.calculateIncome();
            ecoDescription.text = "Treasury: " + game.getGold + "\nIncome: " + game.getIncome + "\nUnit price: " + game.getUnitUpkeep;
        }
    }
    calculateUnits() {
        this.militiaCount = 0;
        this.spearmanCount = 0;
        this.cavalryCount = 0;
        for(let counter = 0; counter < this.military.length; counter++)
        {
            if (this.military[counter].name == "Lithuanian militia") {
                this.militiaCount++;
            } else if (this.military[counter].name == "Lithuanian cavalry") {
                this.cavalryCount++;
            } else if (this.military[counter].name == "Medieval spearman") {
                this.spearmanCount++;
            }
            milSummary.text = "Militia: " + game.militiaCount + " Spearmen: " + game.spearmanCount + " Cavalry: " + game.cavalryCount;
        }
    }
    //Getters and setters
    get getGold()
    {
        return this.gold;
    }
    set setGold(gold)
    {
        this.gold = gold;
    }
    get getIncome()
    {
        return this.income;
    }
    set setIncome(income)
    {
        this.income = income;
    }
    get getUnitUpkeep()
    {
        return this.unitUpkeep * 100 + "%";
    }
    set setUnitUpkeep(unitUpkeep)
    {
        this.unitUpkeep = unitUpkeep;
    }
    turnCounter = 1;
    nextTurn()
    {
        this.calculateIncome()
        this.turnCounter++;
        turnText.text = "Turn : " + this.turnCounter;
        this.gold += this.income;
        if(this.gold < 0)
        {
            document.body.removeChild(app.view);
            document.body.appendChild(endScreen.view);
            victory.text = "You are bankrupt...";
        }
        ecoDescription.text = "Treasury: " + game.getGold + "\nIncome: " + game.getIncome + "\nUnit price: " + game.getUnitUpkeep;
        ifFoughtThisTurn = false;
    }
    calculateIncome()
    {
        this.income = 0;
        for(let provCounter = 0; provCounter < provinces.length; provCounter++)
        {
            if(provinces[provCounter].ifConquered === true)
            {
                this.income += provinces[provCounter].income;
            }
        }
        this.income -= this.spending;
        ecoDescription.text = "Treasury: " + game.getGold + "\nIncome: " + game.getIncome + "\nUnit price: " + game.getUnitUpkeep;
    }
}
class Unit
{
    name;
    power;
    defense;
    upkeep;
    price
    constructor(name, power, defense, price, upkeep)
    {
        this.name = name;
        this.power = power;
        this.defense = defense;
        this.price = price;
        this.upkeep = upkeep;
    }
    get getName()
    {
        return this.name;
    }
}
provinceTextures = [];
provinceSprites = [];
class Province
{
    name;
    defenders = []
    pathNumber;
    path;
    desc;
    ifConquered;
    posX;
    posY;
    income;
    constructor(name, path, desc, ifConquered, income, posX, posY)
    {
        this.name = name;
        this.pathNumber = path;
        this.path = "Textures/Map/" + path + ".png";
        this.desc = desc;
        this.ifConquered = ifConquered;
        this.income = income;
        this.posX = posX;
        this.posY = posY;
    }
    countMilitia = 0;
    countCav = 0;
    countSpear = 0;
    calculateDefenders()
    {
        for(let i=0; i<this.defenders.length; i++) {
            if (this.defenders[i].name == "Lithuanian militia") {
                this.countMilitia++;
            } else if (this.defenders[i].name == "Lithuanian cavalry") {
                this.countCav++;
            } else {
                this.countSpear++;
            }
        }
    }
    generateProvince()
    {
        let provinceName = this.name;
        let conquestStatus = this.ifConquered;
        let provText = this.desc + "\nIncome this province provides: " + this.income + " ducats." + "\nDefenders:\n" + "Militia: " + this.countMilitia + "\nCavalry: " +
            this.countCav + "\nSpearmen: " + this.countSpear;
        provinceTextures[this.pathNumber] = new PIXI.Texture.from(this.path);
        provinceSprites[this.pathNumber] = new PIXI.Sprite(provinceTextures[this.pathNumber]);
        provinceSprites[this.pathNumber].x = this.posX*313;
        provinceSprites[this.pathNumber].y = this.posY*313;
        provinceSprites[this.pathNumber].interactive = true;
        provinceSprites[this.pathNumber].on('click', function openMenu() {selectedProvince = provinceName; description.text = provText ;container.visible = true;
            if(conquestStatus == true){attemptConquestButton.visible = false; attemptConquestText.visible = false}
            else{attemptConquestButton.visible = true; attemptConquestText.visible = true;}});
        app.stage.addChild(provinceSprites[this.pathNumber]);
    }
    addDefender(defender)
    {
        this.defenders.push(defender);
    }

}
class Battle {
    attackers = [];
    defenders = [];
    bufferDefenders = [];
    exportCounter;
    tempAttackers;
    tempDefenders;

    constructor(attackers, defenders, province) {
        this.attackers = attackers;
        this.defenders = defenders;
        this.bufferDefenders = defenders;
        this.province = province;
    }

    fightBattle() {
        if (game.military.length > 0 && ifFoughtThisTurn == false) {
            let counter = 0;
            while (true) {
                if(this.attackers != null) {
                    this.attackers = this.attackers.filter(unit => unit != null);
                }
                if(this.defenders != null) {
                    this.defenders = this.defenders.filter(unit => unit != null);
                }
                if (this.attackers.length !== 0 && this.defenders.length !== 0) {
                    for (let attackRow = 0; attackRow < 6; attackRow++) {
                        if (this.attackers[attackRow] !== null && this.attackers[attackRow] !== undefined) {
                            if (this.defenders[attackRow] !== null && this.defenders[attackRow] !== undefined) {
                                this.defenders[attackRow].defense -= this.attackers[attackRow].power;
                                if (this.defenders[attackRow].defense < 0) {
                                    this.defenders[attackRow] = null;
                                }
                            } else {
                                for (let attackForwards = attackRow; attackForwards < 6; attackForwards++) {
                                    if (this.defenders[attackForwards] !== null && this.defenders[attackForwards] !== undefined) {
                                        this.defenders[attackForwards].defense -= this.attackers[attackRow].power;
                                        if (this.defenders[attackForwards].defense < 0) {
                                            this.defenders[attackForwards] = null;
                                        }
                                    }
                                    for (let attackBackwards = attackRow; attackBackwards > 0; attackBackwards--) {
                                        if (this.defenders[attackBackwards] !== null && this.defenders[attackBackwards] !== undefined) {
                                            this.defenders[attackBackwards].defense -= this.attackers[attackRow].power;
                                            if (this.defenders[attackBackwards].defense < 0) {
                                                this.defenders[attackBackwards] = null;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    console.log(this.attackers);
                    counter++;
                    this.exportCounter = counter;
                    this.tempAttackers = this.attackers;
                    this.tempDefenders = this.defenders;
                    this.attackers = this.tempDefenders;
                    this.defenders = this.tempAttackers;
                }
                else
                {
                    console.log(this.exportCounter);
                    if(this.exportCounter % 2 == 0 || this.exportCounter == 0)
                    {
                        //killing all troops and resetting economy
                        console.log("L");
                        game.militiaCount = 0;
                        game.cavalryCount = 0;
                        game.spearmanCount = 0;
                        game.spending = 0;
                        milSummary.text = "Militia: " + game.militiaCount + " Spearmen: " + game.spearmanCount + " Cavalry: " + game.cavalryCount;
                        game.calculateIncome();
                        game.military = [];
                        container.visible = false;
                        gameMessage.text = "You lost and your troops are dead.";
                        notificationContainer.visible = true;
                        //resetting enemy troops
                        eval(this.province).defenders = this.bufferDefenders;
                        for(let unitCount = 0; unitCount < eval(this.province).defenders.length; unitCount++)
                        {
                            if(eval(this.province).defenders.name === "Lithuanian militia")
                            {
                                eval(this.province).defenders.defense = 0;
                            }
                            else if(eval(this.province).defenders.name === "Lithuanian cavalry")
                            {
                                eval(this.province).defenders.defense = 2;
                            }
                            else if(eval(this.province).defenders.name === "Medieval spearman")
                            {
                                eval(this.province).defenders.defense = 6;
                            }
                        }
                        ifFoughtThisTurn = true;
                        break;
                    }
                    else
                    {
                        console.log("W");
                        this.attackers.filter(unit => unit != null);
                        game.military = this.defenders;
                        game.calculateUnits();
                        game.spending = 0;
                        for(let unitCount = 0; unitCount < game.military.length; unitCount++)
                        {
                            if(game.military[unitCount].name === "Lithuanian militia")
                            {
                                game.military[unitCount].defense = 0;
                                game.spending += 5;
                            }
                            else if(game.military[unitCount].name === "Lithuanian cavalry")
                            {
                                game.military[unitCount].defense = 2;
                                game.spending += 15;
                            }
                            else if(game.military[unitCount].name === "Medieval spearman")
                            {
                                game.military[unitCount].defense = 6;
                                game.spending += 15;
                            }
                        }
                        eval(this.province).ifConquered = true;
                        let newPath = "Textures/Map/" + eval(this.province).pathNumber + "C.png";
                        let newTexture = new PIXI.Texture.from(newPath);
                        provinceSprites[eval(this.province).pathNumber].texture = newTexture;
                        game.calculateIncome();
                        container.visible = false;
                        gameMessage.text = "Province conquered successfully!";
                        notificationContainer.visible = true;
                        let provinceCount = 0;
                        for(let counter = 0; counter < provinces.length; counter++)
                        {
                            if(provinces[counter].ifConquered == true)
                            {
                                provinceCount++;
                            }
                        }
                        if(provinceCount == 9)
                        {
                            document.body.removeChild(app.view);
                            document.body.appendChild(endScreen.view);
                            score.text = "Your score: " + game.turnCounter;
                        }
                        ifFoughtThisTurn = true;
                        break;
                    }
                }
            }
        }
        else
        {
            container.visible = false;
            gameMessage.text = "You either have no troops or they are tired from recent fight.";
            notificationContainer.visible = true;
        }
    }
}

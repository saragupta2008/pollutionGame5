var start,startImage;
var human,humanImage,tree;
var gameState="start";
var road,roadImage,invisibleGround;
var factory,factory1,factory2,factory3;
var treesGroup,factoriesGroup,fruitsGroup,smokeGroup,randomArrowGroup;
var orangeImage,mangoImage,appleImage,bananaImage;
var reset;
var gameOverImage,resetImage;
var smoke,smoke1,smoke2,smoke3;
var bg,backgroundImage,backgroundImage2,backgroundImage3,backgroundImage4,backgroundImage5;
var score,pollutionLevel;
var youlost,youwin;
var info,infoImg;
var jumpSound,gameOverSound,achievementSound,victorySound,negativeSound;
var arrow,arrowScore;
var randomArrow;
var level;
function preload(){
    
    tree1=loadImage("tree1.png");
    tree2=loadImage("tree2.png");
    tree3=loadImage("tree3.png");
    tree4=loadImage("tree4.png");
    tree5=loadImage("tree5.png");

    deadtree1=loadImage("deadtree1.png");
    deadtree2=loadImage("deadtree2.png");
    deadtree3=loadImage("deadtree3.png");

    startImage=loadImage("start1.jpg");

    roadImage=loadImage("road1.png");

    factory1=loadImage("factory1.png");
    factory2=loadImage("factory2.png");
    factory3=loadImage("factory3.png")

    orangeImage=loadImage("orange.png");
    mangoImage=loadImage("mango.png");
    appleImage=loadImage("apple.png");
    bananaImage=loadImage("banana.png");

    //gameOverImage=loadImage("gameover.png");
    resetImage=loadImage("reset.png");
    youwinImg=loadImage("youwin.jpg");
    youlostImg=loadImage("youlost.jpeg");

    smoke1=loadImage("smoke1.png");
    smoke2=loadImage("smoke2.png");
    smoke3=loadImage("smoke3.png");

    backgroundImage=loadImage("bg1.jpg");
    backgroundImage2=loadImage("bg2.jpg");
    backgroundImage3=loadImage("bg3.jpg");
    backgroundImage4=loadImage("bg4.jpg");
    backgroundImage5=loadImage("bg5.jpg");
    backgroundImage6=loadImage("bg6.jpg")
    humanImage=loadImage("humanImage.png")
    infoImg=loadImage("info.png")

    arrowImage = loadImage("arrow.png");

    jumpSound=loadSound("jumpSound.mp3");
    gameOverSound=loadSound("gameoverSound.aac");
    achievementSound=loadSound("achieveSound.mp3");
    victorySound=loadSound("victorySound.mp3");
    negativeSound=loadSound("negativeSound.mp3")
}
function setup(){
    canvas = createCanvas(displayWidth - 20, displayHeight-30);

     
    bg=createSprite(650,200,400,200);
   // bg.addImage(backgroundImage)
    
   // bg.visible=false
   
   // bg.x=bg.width/2

    road = createSprite(600,650,200,100);
    road.addImage(roadImage);
    road.x=road.width/2
    road.visible=false
  
    start=createSprite(600,600,50,50)
    start.addImage(startImage)
    start.scale=0.2
    start.visible=false

    info=createSprite(700,300,100,100);
    info.addImage(infoImg);
    info.visible=false
    info.scale=0.6

    human=createSprite(400,580,40,40);
    human.addImage(humanImage);
    human.scale=0.1
    human.visible=false

   
   
    invisibleGround = createSprite(200,630,1800,50);
    invisibleGround.visible = false;

    score=5
    pollutionLevel=45
    arrowScore=5
    level=1

    treesGroup =createGroup();
    factoriesGroup =createGroup();
    fruitsGroup = createGroup();
    smokeGroup = createGroup();
    arrowGroup = createGroup();
    randomArrowGroup= createGroup();
}
function draw(){
    background(0);
    if(gameState=="start"){
        start.visible=true
        info.visible=true
        bg.addImage(backgroundImage6)
       // bg.scale=
    if(mousePressedOver(start)){
        gameState="play"
        
    }
}
    if(gameState=="play"){
        
        spawnTrees();
        spawnFactories();
        spawnFruits();
        spawnSmoke();
        spawnArrows();
        bg.velocityX=-2
        bg.scale=1.3
        if(keyDown("UP_ARROW")&& human.y>=500){
            human.velocityY = -12;
            jumpSound.play();
        }

        if(keyDown("LEFT_ARROW")){
            human.x=human.x-10
        }
        if(keyDown("RIGHT_ARROW")){
            human.x=human.x+10
        }
        human.velocityY = human.velocityY + 0.8

        start.visible=false
        human.visible=true
        road.visible=true
        //bg.visible=true
        info.visible=false
        
        human.collide(invisibleGround);
        
        if(pollutionLevel>40){
            bg.addImage(backgroundImage)
        }
        if(pollutionLevel<=40){
            bg.addImage(backgroundImage2)
            level=2
        }
        if(pollutionLevel<=30){
            bg.addImage(backgroundImage3);
            level=3
            if (frameCount % 379 === 0){
            var rand = Math.round(random(1,3));
            switch(rand) {
              case 1: tree.addImage(tree1);
                      break;
              case 2: tree.addImage(tree2);
                      break;
              case 3: tree.addImage(tree3);
                      break;
              case 4: tree.addImage(tree4);
                      break;
              case 5: tree.addImage(tree5);
                      break;
              default: break;
            }
        }
        
        }
        if(pollutionLevel<=20){
            bg.addImage(backgroundImage4)
            level=4
        }
        if(pollutionLevel<=10){
            bg.addImage(backgroundImage5)
            level=5
        }
      // console.log(frameCount)
       road.velocityX=-2
       if(road.x<0){
        road.x=road.width/2
       }

       if(bg.x<0){
        bg.x=bg.width/2
       }
  
        if(fruitsGroup.isTouching(human)){
            score=score+1
            fruitsGroup.destroyEach();
            achievementSound.play();
        }
        if(smokeGroup.isTouching(human)){
            score=score-1
            pollutionLevel=pollutionLevel+1
            smokeGroup.destroyEach();
            negativeSound.play();
            
        }
        if(keyDown("space")&&arrowScore>0){
           createArrow();
           arrowScore=arrowScore-1
        }

        if(arrowGroup.isTouching(factoriesGroup)){
            factoriesGroup.destroyEach();
            arrowGroup.destroyEach();
            score=score+1
            pollutionLevel=pollutionLevel-1
            achievementSound.play();
          }

          if(randomArrowGroup.isTouching(human)){
              randomArrowGroup.destroyEach()
              arrowScore=arrowScore+1
          }
        if(pollutionLevel<=0||score>=50){
          gameState="end"

          youwin=createSprite(400,400,40,40);
          youwin.addImage(youwinImg);
          youwin.scale=0.5
          
          victorySound.play()

          reset=createSprite(800,600,20,20);
          reset.addImage(resetImage);
          reset.scale=0.1
        }
        if(pollutionLevel>=50||score<=0){
            gameState="end"
            youlost=createSprite(400,300,40,40);
            youlost.addImage(youlostImg);
            youlost.scale=0.2

            gameOverSound.play();

            reset=createSprite(800,600,20,20);
            reset.addImage(resetImage);
            reset.scale=0.1
        }
       
    }
     if(gameState=="end"){

        road.visible=false
        human.visible=false
        start.visible=false
        bg.visible=false

        factoriesGroup.destroyEach()
        treesGroup.destroyEach();
        smokeGroup.destroyEach();
        fruitsGroup.destroyEach();
        arrowGroup.destroyEach();
         if(mousePressedOver(reset)){
            restart()
             
         }
     }
    

    //console.log(gameState)
    drawSprites();
    if(gameState=="play"){
    

    if(pollutionLevel>40){
        fill("red")
    }
    if(pollutionLevel<=40){
       fill("orange")
    }
    if(pollutionLevel<=30){
        fill("yellow")
    }
    if(pollutionLevel<=20){
       fill("green")
    }
    if(pollutionLevel<=10){
        fill("blue")
    }
   
    strokeWeight(4)
    stroke("black")
    textSize(30);
    text("Health: "+ score, 70,200);
    text("Pollution Level : "+pollutionLevel,70,250);
    text("Number of Arrows : "+arrowScore,70,300);

    fill("black");
    text("LEVEL "+level,300,100);
}
}

function restart(){
  gameState="start"

  if(pollutionLevel<=0||score>=50){
  youwin.visible=false
  reset.visible=false
}
if(pollutionLevel>=50||score<=0){
  youlost.visible=false
  reset.visible=false
}
  score=5
  pollutionLevel=45
  if(mousePressedOver(start)){
    human.visible=true
    
    road.visible=true
    human.x=400
    human.y=580
  }
  }
  function createArrow() {
    arrow= createSprite(100, 100, 60, 10);
    arrow.addImage(arrowImage);
    arrow.x = human.x;
    arrow.y=human.y;
    arrow.velocityX = 4;
    arrow.lifetime = 300;
    arrow.scale = 0.03;
     arrowGroup.add(arrow);
    return arrow;
     
  }
function spawnTrees(){
    if (frameCount % 379 === 0){
    tree=createSprite(800,530,70,30);
    
    tree.velocityX=-2
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: tree.addImage(deadtree1);
              break;
      case 2: tree.addImage(deadtree2);
              break;
      case 3: tree.addImage(deadtree3);
              break;
      default: break;
    }
    tree.scale=0.3
    tree.lifetime =400
    treesGroup.add(tree);
    tree.depth = human.depth;
    human.depth = human.depth + 1;
    }
}

function spawnFactories(){
    if(frameCount % 297 ==0){
    factory=createSprite(800,530,40,40);
    factory.velocityX=-2
   
    var rand =Math.round(random(1,3))
    switch(rand){
        case 1 :factory.addImage(factory1);
        break;
        case 2 :factory.addImage(factory2);
        break;
        case 3 :factory.addImage(factory3);
        break;
        default: break;
    }
    factory.lifetime =400
    factory.scale=0.3
    factoriesGroup.add(factory);
    factory.depth = human.depth;
    human.depth = human.depth + 1;
    }
}

function spawnFruits(){
    if(frameCount % 379 ==0){
    fruit=createSprite(770,500,100,100);
    fruit.velocityX=-2

    var rand=Math.round(random(1,4))
    switch(rand){
        case 1 :fruit.addImage(mangoImage);
        break;
        case 2: fruit.addImage(orangeImage);
        break;
        case 3: fruit.addImage(appleImage);
        break;
        case 4: fruit.addImage(bananaImage);
        break;
        default:break;
    }
    fruit.scale=0.06
    fruit.lifetime =  400
    fruitsGroup.add(fruit);
    fruit.depth = human.depth;
    human.depth = human.depth + 1;
    }
}

function spawnSmoke(){
    if(frameCount % 250 == 0){
        smoke=createSprite(random(100,800),200,30,30);
        var rand =Math.round(random(1,3))
        switch(rand){
            case 1 :smoke.addImage(smoke1);
            break;
            case 2 :smoke.addImage(smoke2);
            break;
            case 3 :smoke.addImage(smoke3);
            break;
            default: break;
        }
        smoke.velocityY=2
        smoke.velocityX=-2
        smoke.scale=0.1
        smoke.lifetime=300
        smokeGroup.add(smoke);
        smoke.depth = human.depth;
        human.depth = human.depth + 1;
       
    }
}

function spawnArrows(){
    if (frameCount % 183 === 0){
        randomArrow=createSprite(800,590,70,30);
        randomArrow.velocityX=-2
        randomArrow.addImage(arrowImage);
        randomArrow.scale=0.03
        randomArrow.lifetime =400
        randomArrowGroup.add(randomArrow);
    }
}

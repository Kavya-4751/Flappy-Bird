var bird,birdImg,birdDyingImg, balloon1,balloon2, balloon3, balloon4
var restart,restartImg,scene,sceneImg,gameOver,gameOverImg
var score=0;
var PLAY=1;
var END=0;
var gameState=PLAY;
var obstaclesGroup;


function preload(){
  birdImg = loadAnimation("tile000.png","tile004.png","tile004.png","tile006.png","tile009.png")
  birdDyingImg=loadImage("tile009.png");
  sceneImg = loadImage("Background.png")
  balloon1 = loadAnimation("redBalloon.png","redBalloon.png","redBalloon.png");
  balloon2 = loadAnimation("blueBalloon2.png","blueBalloon2.png","blueBalloon2.png");
  balloon3 = loadAnimation("purpleBalloon.png","purpleBalloon.png","purpleBalloon.png");
  balloon4 = loadAnimation("yellowBalloon.png","yellowBalloon.png","yellowBalloon.png");
  gameOverImg=loadImage("gameOver.png")
  restartImg = loadImage("Restart_button2.png")
}

function setup() {
  createCanvas(900,600);

  scene= createSprite(600,400,100,100)
  scene.addImage(sceneImg)
  scene.scale=2
  scene.velocityX=-4
  bird=createSprite(100,300,50,50)
bird.debug=true
  bird.addAnimation("flyingBird",birdImg)
  bird.scale=0.5
  restart=createSprite(400,160)
  gameOver=createSprite(360,60)
  gameOver.scale = 0.5;
  restart.scale  = 0.05;
  restart.addImage(restartImg)
  gameOver.addImage(gameOverImg)
  restart.visible=false
gameOver.visible=false

  obstaclesGroup=new Group()
 
  redBalloonGroup= new Group();
}

function draw() {
  background(255,255,255);  
  
 

  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/120);
  restart.visible=false
  gameOver.visible=false
  scene.velocityX=-4
if(scene.x<0){
  scene.x=scene.width/2;
}
    
    if(keyDown("space") && bird.y >= 159) {
      bird.velocityY = -12;
    }
  
    bird.velocityY = bird.velocityY + 0.8
  
 

   redB();
  
    if(redBalloonGroup.isTouching(bird) || bird.y>600 ){
        gameState = END;
        bird.x=100
        bird.y=300
        bird.addImage("dyingBird", birdDyingImg)
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
   
    bird.velocityY = 0;
    scene.velocityX=0;
 
    obstaclesGroup.setVelocityXEach(0);
 
    
   
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
  
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
 

 

  drawSprites();
  textSize(30)
  stroke(0)
  fill("black")
  text("SCORE: "+score, 700,80)
  
 
  text(mouseX+ "," +mouseY,mouseX,mouseY)
}

function reset(){
gameState=PLAY;
score=0;

redBGroup.destroyEach();
restart.visible=true;
gameOver.visible=true;
}
function redB(){
  if(World.frameCount%100=== 0){
  var redBalloon=createSprite(600,Math.round(random(100,500)),10,40);
  redBalloon.addAnimation("redflying",balloon1)
  redBalloon.velocityX = -(6 + 3*score/100);
  redBalloon.scale =0.1 ;
  redBalloon.lifetime = 300;
  //add each obstacle to the group
  redBalloonGroup.add( redBalloon);
}
}
/*function spawnObstacle(){
  if(World.frameCount % 100 ===0){
   
      var obstacle = createSprite(600,Math.round(random(100,500)),10,40);
      //obstacle.debug = true;
      obstacle.velocityX = -(6 + 3*score/100);
      
      //generate random obstacles
      var rand = Math.round(random(1,4));
      switch(rand) {
        case 1: obstacle.addAnimation("balloonFlying",balloon1);
        
                break;
       case 2: obstacle.addAnimation("balloonFlying",balloon2);
      
                break;
        case 3: obstacle.addAnimation("balloonFlying",balloon3);
        
                break;
               
        case 4: obstacle.addAnimation("balloonFlying",balloon4);
     
                break;
        default: break;
      }
      
      //assign scale and lifetime to the obstacle           
      obstacle.scale = 0.1;
      obstacle.lifetime = 300;
      //add each obstacle to the group
      obstaclesGroup.add(obstacle);
  }

}*/
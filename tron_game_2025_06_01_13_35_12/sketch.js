let players=[]
let cam1, font, playBt
let speed=3
let hitbox = 20
let trails=[]
let begin=false

// change trails to use a long rectangle/line so that the amount of drawings is less
// Make trails take player colour
// make it look like a pretty little princess :)


function preload(){
  font = loadFont('Techno.otf')
}

function setup() {
  createCanvas(600, 600, WEBGL);
  cam1=createCamera()
  cam1.setPosition(width/2, height/2, 900)
  playBt=createButton("Play some Tron")
  playBt.position(-width/2, -width/2)
  
}

function draw() {

  background(220);
  if(begin==false){
    mainScreen()
  } else if(begin==true){
    playBt.position(-width/2,-width/2)
    playGame()
  }
  
}

function changeBegin(){
  if(begin==true){
    begin=false
    begin=true

  } else{
    begin=true
  }
  
  players.length=0
  trails.length=0
  players.push( new Player(60,height/2, 1))
  players.push( new Player(width-60,height/2, -1))
}

function mainScreen(){
  playBt.position(width/2-50,width/2)
  playBt.mousePressed(changeBegin)
}

function playGame(){
  players.forEach(play=>{
    play.show()
    if(players[0].alive==true && players[1].alive==true){
    play.move()
    play.controller()
    play.edges()
    }    
    play.colWPlayer()
  })
  trails.forEach(trail=>{
    trail.show()
    if(players[0].alive==true && players[1].alive==true){
    trail.collision()
    }
  })

  postGame()
  
    push()
    fill(80)
    rect(0,0, width)
  pop()
}

function postGame(){
  if(players[0].alive==false || players[1].alive==false){
      playBt.position(width/2-50,width/2)  
      playBt.mousePressed(changeBegin)
    push()
    //     text 
    textAlign(CENTER, CENTER)
    fill(0)
    textFont(font)
    textSize(50)
    translate(0,0,50)
//     which player wins
    if(players[0].alive==false && players[1].alive==false){
         text('BOTH', width/2,height/4)
        text('PLAYERS', width/2,height/3)
        text('LOSE', width/2,height/2.35)
       }else if(players[0].alive==true){
        text('PLAYER', width/2,height/4)
        text('ONE', width/2,height/3)
        text('WINS', width/2,height/2.35)
    }else if(players[1].alive==true){
        text('PLAYER', width/2,height/4)
        text('TWO', width/2,height/3)
        text('WINS', width/2,height/2.35)
    }
  
//     display the score
    
//     rect for the menu
        rectMode(CENTER)
      translate(width/2,width/2,-5)
        fill(180)
        rect(0, 0, width/1.5)
      
       
  
      pop()
    }
}

class Player{
  constructor(X,Y, playerNum){
    this.x=X
    this.y=Y
    this.ySpeed=0
    this.playerNum=playerNum
    this.xSpeed=playerNum*speed
    this.direction=playerNum+1
    this.rotation=0
    this.active=false
    
    this.alive=true
  }
  
  show(){
    push()
    rectMode(CENTER)
    if(this.playerNum==1){ fill(256,0,0)} else{ fill(0,0, 256)}
    translate(this.x, this.y)
    rotate(this.rotation)
    box(30, 15, 25)
    pop()
  }
  
  move(){
    this.x+=this.xSpeed
    this.y+=this.ySpeed
    
    if(frameCount%4==1){
      
      trails.push( new Trail(this.x,this.y,this.rotation, 90))
    }
  }
  
//   this controller caused me so much pain. future me pls don't touch it :(
  controller(){
    switch (this.playerNum){
      case 1: // player 1
        
        
    if((keyIsDown(65)) && this.active==true){ //a
       this.direction+=1
      this.active=false
    }if((keyIsDown(68)) && this.active==true){ //d
       this.direction-=1
      this.active=false
    }
    
        
    if(this.direction <0 ){
      this.direction=3
    } 
    if(this.direction>3 ){
      this.direction=0
    }
        
    if(this.direction ==0){ // left
      this.xSpeed=-1*speed
      this.ySpeed=0*speed
      this.rotation=3.14159
    }
   
    if(this.direction ==1){ // down
     this.xSpeed=0*speed
      this.ySpeed=1*speed
      this.rotation=1.5708
    }
    if(this.direction ==2){ // right
      this.xSpeed=1*speed
      this.ySpeed=0*speed
      this.rotation=0
    }
    if(this.direction ==3){ // up
      this.xSpeed=0*speed
      this.ySpeed=-1*speed
      this.rotation=4.71239
    }        
        
        break; 
      case -1: // player 2
        if((keyIsDown(37)) && this.active==true){ //L_arrow
       this.direction+=1
      this.active=false
    }if((keyIsDown(39)) && this.active==true){ //R_arrow
       this.direction-=1
      this.active=false
    }
    
            
    if(this.direction <0 ){
      this.direction=3
    } 
    if(this.direction>3 ){
      this.direction=0
    }
        
    if(this.direction ==0){ // left
      this.xSpeed=-1*speed
      this.ySpeed=0*speed
      this.rotation=3.14159
    }
   
    if(this.direction ==1){ // down
     this.xSpeed=0*speed
      this.ySpeed=1*speed
      this.rotation=1.5708
    }
    if(this.direction ==2){ // right
      this.xSpeed=1*speed
      this.ySpeed=0*speed
      this.rotation=0
    }
    if(this.direction ==3){ // up
      this.xSpeed=0*speed
      this.ySpeed=-1*speed
      this.rotation=4.71239
    }        
   
        
        break; 
    }
  }
  
  edges(){
    if(this.x<0 || this.x>width){
      this.alive=false
    }
    if(this.y<0 || this.y>height){
      this.alive=false
    }
  }
  
  colWPlayer(){
    let d=dist(players[0].x, players[0].y, players[1].x, players[1].y)
    if(d<hitbox){
      this.alive=false
    }
    
  }
  
}

// make trail class, hopefully find a way to reduce the amount of objects. use rect or line maybe?
class Trail{
  constructor(X,Y, dirc, col){
    this.direction=dirc
    this.active=false
    this.intframe=frameCount
    this.x=X
    this.y=Y
    this.col=col
  }
  show(){
    push()
    translate(this.x,this.y,12)
    rotate(this.direction)
    strokeWeight(10)
    stroke(this.col, 0, 0)
    line(0,0, speed, 0)
    pop()
  }
  
  collision(){
    if(frameCount ==this.intframe+30){
      this.active=true
    }
    for(let i=0; i<2; i++){
      let dis=dist(this.x, this.y, players[i].x, players[i].y)
      if(dis<hitbox/2 && this.active==true ){
        players[i].alive=false
      }
    }
  }
}

// used to make controller work. I do not like the way that I made it work but it was the method i found
function keyPressed(){
  if(keyCode == 65 || keyCode == 68){
  if((keyIsDown(65)) || (keyIsDown(68))){
    players[0].active=true
  }}
  if(keyCode == 37 || keyCode == 39){
  if((keyIsDown(37)) || (keyIsDown(39))){
    players[1].active=true
  }}
}
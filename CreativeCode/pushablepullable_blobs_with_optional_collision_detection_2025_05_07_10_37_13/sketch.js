let blob=[]
let numBlob=40
let size=100
let easing=50
let collisionButton, pushPullButton, backgroundButton, btOnOff1=false, btOnOff2=false, bgOnOff=true


function setup() {
  createCanvas(windowWidth, windowHeight);
  //creating blob objects equal to the value numBlob 
  for(let i=0; i<numBlob; i++){
    blob.push( new pushableBlob(random(width), random(height), size, random(360), i))
    
  }
  
  // creating the optional collison detector
  collisionButton=createButton('Collision')
  collisionButton.position(10,10)
  pushPullButton=createButton('Push/Pull')
  pushPullButton.position(80,10)
  backgroundButton=createButton('Background')
  backgroundButton.position(160, 10)
  //when collisionButton is pressed it will run the onOff function, allowing us to track states
  collisionButton.mousePressed(onOff1)
  pushPullButton.mousePressed(onOff2)
  backgroundButton.mousePressed(bgOnOffbt)
  
}

function draw() {
  if(bgOnOff){
  background(200)
  }
  // for each blob object it will run the following functions
  blob.forEach(function (bl){
    bl.update()
    bl.collision()
    bl.show()
    bl.move()
    bl.edge()
    // bl.textShow()
  })
  
  // noCursor()
  fill(0)
  // circle(mouseX, mouseY, 10)
}

//other method of changing the mode
function keyPressed(){
  if(key =="p"){
    onOff2()
  }
  if(key =="c"){
    onOff1()
  }
  if(key =="b"){
  bgOnOffbt()
}
  
}

//collision toggle
function onOff1(){
//  allowing on & off modes for collisionButton
  if(btOnOff1){
    btOnOff1=false
  } else{
    btOnOff1=true
  }
}

//push/pull toggle
function onOff2(){
//  allowing on & off modes for collisionButton
  if(btOnOff2){
    btOnOff2=false
  } else{
    btOnOff2=true
  }
}

// Background toggle
function bgOnOffbt(){
  if(bgOnOff){
    bgOnOff=false
  } else{
    bgOnOff=true
  }

}
  
class pushableBlob{
  constructor(x, y, s,c, n){
    this.x=x
    this.y=y
    this.s=s
    this.tx=x
    this.ty=y
    this.hover=false
    this.colX=undefined
    this.colY=undefined
    this.colN=0
    this.d=0
    this.r=0
    this.c=c
    this.num=n
  }
  // colX and colY are used as local variables that track the cords of the collision allowing the move() method to work with both mouse and other blobs
  
  //this will make the blob move away/towards the mouse,
   move(){
    if(this.hover){
      if(btOnOff2){  //pull/push mode
        this.r=(atan2(this.x-this.colX, this.y-this.colY))+PI/2
      } else{
          this.r=(atan2(this.x-this.colX, this.y-this.colY))-PI/2
      }
      let rotation = PI-this.r
      this.tx+= (cos(rotation))*50
      this.ty+= (sin(rotation))*50
    }

  }
  
  edge(){
    //makes them bounce off the edge by 50 pixels, means they won't get stuck
    if(this.x<=5){
      this.tx+=50
    }
    if(this.x>=width-5){
      this.tx-=50
    }
    if(this.y<=5){
      this.ty+=50
    }
    if(this.y>=height-5){
      this.ty-=50
    }
  }
  
   collision(){
     //checks if collision should be on or off
    if(btOnOff1){
      //checks the distance between itself and every other instance of a blob
       for(let i=0; i< numBlob; i++){
        let col=dist(this.x, this.y, blob[i].x, blob[i].y)
        if(col==0){
      
        } else if(col <= this.s){
          this.colX=blob[i].x
          this.colY=blob[i].y
          this.colN=[i]
          this.hover = true
          }
        
    }
    
  
  }
  }
  
  show(){
     colorMode(HSB)
  fill(this.c, 100, 100, 0.3)
  noStroke()
  ellipse(this.x, this.y, this.s)
    fill(0)
  }
  
  update(){
    //Adds easing and makes it so that if the mouse hovers over the blob hover turns true
    this.x+=(this.tx-this.x)/easing
    this.y+=(this.ty-this.y)/easing
    this.d=dist(this.x, this.y, mouseX, mouseY)
      this.colX=mouseX
      this.colY=mouseY
    this.hover = this.d < this.s/2
    
    if(mouseIsPressed){
      this.tx=random(width)
      this.ty=random(height)
    }
  }
  
  textShow(){
    textAlign(CENTER, CENTER)
    let selection = this.colN
    let number= this.num+blob[selection].num
    text(number, this.x, this.y)
    this.colN=0
  }
  
}
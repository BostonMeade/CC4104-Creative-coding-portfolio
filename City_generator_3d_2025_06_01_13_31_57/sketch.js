let numSteps=17, step, style, cam1
let elements=[]
let x=[], z=[]

// add a preset camera and way to switch to it using doubleclick function

function setup() {
  createCanvas(600, 600, WEBGL);
  
  
  // creating the cordaniates. 
  step=width/floor(numSteps)
    for(let j=0; j<numSteps*1; j++){
    for(let i=0; i<numSteps*1; i++){
      x[i]=step*i-width/2
      z[j]=step*j-height/2
      style=round(random(0,3))
      elements.push( new Building(x[i], z[j], i+1, j+1, style))
    }
  }

  cam1 = createCamera()
  cam1.setPosition(400,-400,800)
  cam1.lookAt(0,0,0)
}

function doubleClicked(){
  cam1.setPosition(400,-400,800)
  cam1.lookAt(0,0,0)
}

function draw() {
  strokeWeight(0.3)
  background(220);
  // normalMaterial()
  orbitControl()
  // ambientLight(256,256,256)
  // directionalLight(100,100,100,0,0,-1)
  
  // drawing BG grid
  rotateY(frameCount/200)
  push()
    box(width, 2, width)
  pop()
  
  elements.forEach(function (element){
    if(element.bType==0){
    element.showB1()
    } else if(element.bType==1){
      element.showB2()
    } else if(element.bType==2){
      element.showB3()
    } else if(element.bType==3){
      element.showB4()
    } 
    
    
  })
 
}


class Building{
  constructor(X, Z, i,j, sty){
    this.x=X+step/2
    this.z=Z+step/2
    this.size=noise(i*j)*50
    // this.colour=random(20, 50)
    this.colour=this.size*3
    this.bType=sty
    this.rot=random(-PI,PI)
  }
  
  showB1(){
    push()
    colorMode(HSB)
    fill(100,10,this.colour)
      translate(this.x, -(this.size/2)-1 , this.z)
      box(20, this.size, 20)
    pop()
  }
  
  showB2(){
    push()
    colorMode(HSB)
    fill(100,10,this.colour)
      translate(this.x, -(this.size/2)-1 , this.z)
      box(20, this.size, 20)
      translate(0, -(this.size/4) , 0)
    fill(100,15,this.colour+20)
      box(15, this.size, 15)
    pop()
  }
  
  showB3(){
    push()
    colorMode(HSB)
    fill(100,10,this.colour-30)
      translate(this.x, -(this.size)-1 , this.z)
      box(20, (this.size*2), 20)
    pop()
  }
  
  showB4(){
    push()
    noStroke()
    colorMode(HSB)
    fill(100,60,100)
      translate(this.x, 0 , this.z)
      box(20, 3, 20)
    fill(21,38,27)
    rotateY(this.rot)
      translate(5, -this.size/4 , 2)
      cylinder(2, this.size/2)
    fill(104, 54, 45)
      translate(0, -this.size/4 , 0)
      ellipsoid(this.size/4,this.size/4,this.size/4)
    pop()
  }


}


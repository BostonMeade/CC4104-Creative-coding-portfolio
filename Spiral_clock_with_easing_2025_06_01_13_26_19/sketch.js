let angle=0
let r=150
let x=[]
let y=[]
let px=[0,0,0]
let py=[0,0,0]


function setup() {
  createCanvas(400, 400);
  colorMode(HSB)
  translate(width/2, height/2)
  x[0]=0
  y[0]=0
  
  for(let i=1; i<61; i++){
    x[i]=r*cos(angle)
    y[i]=r*sin(angle)
    angle+=0.15
    r-=2.6
  }
}

function draw() {
  background(220);
  translate(width/2, height/2)
  push()
  rotate(frameCount/300)
  spiral(0)
  spiral(radians(60))
  spiral(radians(120))
  let secs=second()
  let Hours=hour()-1
  let mins=minute()
  Hours=Hours*2
  console.log(secs)
  
  timeDot(secs, 0, 0)
  timeDot(mins, 1, radians(60))
  timeDot(Hours, 2, radians(120))
  pop()
  
}

function spiral(rotation){
  push()
    rotate(PI/rotation)
    for(let i=2; i<60; i++){
      stroke(i*5.3, i*15, 100)
      strokeWeight(10)
       line(x[i-1],y[i-1], x[i], y[i])
    }
  pop()
}

function timeDot(timeType, pType, rotation){
  push()
  rotate(PI/rotation)
  px[pType]+=(x[timeType]-px[pType])/10
  py[pType]+=(y[timeType]-py[pType])/10
push()
  circle(px[pType], py[pType], 10)
pop()
  pop()
}
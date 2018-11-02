var pattyImg, explodeImg;
function preload(){
  pattyImg = loadImage("/images/patty.png");
  explodeImg = loadImage("/images/explode.png");  
}

var patties = [];
var timer = 0;
var back=0, foreground=0;
var personalHighscore;
var countdown = "";
var gameStarted = false;
var gameEnded = false;
var titleFlip = true;
var name = "";
var date, dayVar;

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  x = width/2;
  y = height/2;
  date = new Date;
  dayVar = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
  imageMode(CENTER);
}

function keyPressed() {
    if(gameEnded){
      if(name.length > 0 && (keyCode === DELETE || keyCode === BACKSPACE)){
            name = name.slice(0, -1);
      }
      if(keyCode === ENTER){
        setCookie("highscore", personalHighscore, 1);
        setCookie("username", name, 1);
        gameStarted = false;
        gameEnded = false;
        countdown = "";
        patties = [];
      }
    }
}

function keyTyped(){
  if(gameEnded && name.length < 3){
    name += key.toUpperCase();
  }
}

function draw() {
  var colorChange = false;
  if(millis() - timer > 1000){
    timer = millis();
    back = color(random(255),random(255),random(255));
    colorChange = true;
    if(titleFlip){
      titleFlip = false;
    }else{
      titleFlip = true;
    }
  }
  background(back);

  for(i=0; i<patties.length; i++){
    push();
    if(patties[i].move()){
      patties[i].display();
    }
    pop();
  }

  //count
  var text_h = height/30;
  textSize(width/60);
  textAlign(LEFT);
  fill(0);
  text('Count: ' + patties.length,30,text_h);

  if(patties.length >  personalHighscore && !gameEnded){
      personalHighscore = patties.length;
  }
  text('Personal Highscore: ' + personalHighscore, 30, text_h + 30);



  //title text
  textSize(width/9);
  textAlign(CENTER);
  textStyle(BOLD);
  if(colorChange){
    foreground = color(random(255),random(255),random(255));
    colorChange = false;
  }
  fill(foreground);
  if(!gameStarted){
    if(titleFlip){
      text("HAPPY " + dayVar[date.getDay()], width/2, height/2);
    }else{
      text("BURGTOWN", width/2, height/2);
    }
  }else if(!gameEnded){
    text(countdown, width/2, height/2);
  }else{
    textSize(width/10);
    text("Enter your initials:", width/2, height*0.3);
    textSize(width/8);
    text(name, width/2, height*0.6);
  }

  if(patties.length > 0 && !gameStarted){
    gameStarted=true;
    startTimer(60);
  }
}

function mouseClicked(){

    patties.push(new patty(mouseX, mouseY,random(sizes)));
    console.log("clicked");
    console.log(patties.length);
}

var sizes = [50,100,100,200,200,200,300,400];

function patty(x,y,size){
  this.x = x;
  this.y = y;
  this.r = 0;
  this.size = size;
  this.speed = 200/this.size;
  this.safe = 60;
  this.exploding = false;

  this.move = function(){
    if(this.size < 1){
      let index = patties.indexOf(this);
      patties.splice(index, 1);
      return false;
    }

    if(this.exploding){
      this.size-=this.size/4;
      return true;
    }
    //check if in object bounds
    if(this.safe == 0 &&
      mouseX > this.x-this.size/2 &&
      mouseX < this.x+this.size/2 &&
      mouseY > this.y-this.size/2 &&
      mouseY < this.y+this.size/2){
          this.exploding = true;
          return true;
      }

    if(mouseX > this.x){
      this.x +=this.speed;
    }else{
      this.x-=this.speed;
    }

    if(mouseY > this.y){
      this.y +=this.speed;
    }else{
      this.y-=this.speed;
    }

    this.r = atan2(mouseY-this.y, mouseX - this.x);
    if(this.safe >0){
      this.safe -=1;
    }

    return true;
  }

  this.display = function(){
    translate(this.x, this.y);
    if(this.exploding){
      image(explodeImg, 0, 0, this.size, this.size);
      return;
    }

    if(mouseX <this.x){
      rotate(this.r-PI/6);
      scale(1,-1);
    }else{
      rotate(this.r+PI/6);
    }
    image(pattyImg, 0, 0, this.size, this.size);
  }
}

function windowResized(){
  resizeCanvas(windowWidth,windowHeight);
}

window.onbeforeunload = function(evt) {
    setCookie("highscore", personalHighscore, 1);
}

window.onload = function(){
    var score = getCookie("highscore");
    if(score == "" || score=="NaN"){
      personalHighscore = 0;
    }else{
      personalHighscore = parseInt(score);
    }
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function startTimer(duration) {
    var timer = duration, minutes, seconds;
    var intervalID = setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        seconds = seconds < 10 ? "0" + seconds : seconds;

        countdown = minutes + ":" + seconds;

        if (--timer < 0) {
          clearInterval(intervalID);
          gameEnded = true;
        }
    }, 1000);
}
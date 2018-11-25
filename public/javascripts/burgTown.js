var pattyImg, explodeImg;
var game;

function preload() {
  pattyImg = loadImage("/images/patty.png");
  explodeImg = loadImage("/images/explode.png");
}

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  // x = width / 2;
  // y = height / 2;
  imageMode(CENTER);
  game = new BurgTown(10);
}

function draw() {
  game.display();
  // var colorChange = false;
  // if (millis() - timer > 1000) {
  //   timer = millis();
  //   back = color(random(255), random(255), random(255));
  //   colorChange = true;
  //   if (titleFlip) {
  //     titleFlip = false;
  //   } else {
  //     titleFlip = true;
  //   }
  // }
  // background(back);

  // for (i = 0; i < patties.length; i++) {
  //   push();
  //   if (patties[i].move()) {
  //     patties[i].display();
  //   }
  //   pop();
  // }

  //count
  // var text_h = height / 30;
  // textSize(width / 60);
  // textAlign(LEFT);
  // fill(0);
  // text('Count: ' + patties.length, 30, text_h);

  // if (patties.length > personalHighscore && !gameEnded) {
  //   personalHighscore = patties.length;
  // }
  // text('Personal Highscore: ' + personalHighscore, 30, text_h + 30);



  //title text
  // textSize(width / 9);
  // textAlign(CENTER);
  // textStyle(BOLD);
  // if (colorChange) {
  //   foreground = color(random(255), random(255), random(255));
  //   colorChange = false;
  // }
  // fill(foreground);
  // if (!gameStarted) {
    // if (titleFlip) {
    //   text("HAPPY " + dayVar[date.getDay()], width / 2, height / 2);
    // } else {
    //   text("BURGTOWN", width / 2, height / 2);
    // }
  // } else if (!gameEnded) {
  //   text(countdown, width / 2, height / 2);
  // } else {
  //   textSize(width / 10);
  //   text("Enter your initials:", width / 2, height * 0.3);
  //   textSize(width / 8);
  //   text(name, width / 2, height * 0.6);
  // }

  // if (patties.length > 0 && !gameStarted) {
  //   gameStarted = true;
  //   startTimer(60);
  // }
}


// var sizes = [50, 100, 100, 200, 200, 200, 300, 400];

// function patty(x, y, size) {
//   this.x = x;
//   this.y = y;
//   this.r = 0;
//   this.size = size;
//   this.speed = 200 / this.size;
//   this.safe = 60;
//   this.exploding = false;

//   this.move = function () {
//     if (this.size < 1) {
//       let index = patties.indexOf(this);
//       patties.splice(index, 1);
//       return false;
//     }

//     if (this.exploding) {
//       this.size -= this.size / 4;
//       return true;
//     }
//     //check if in object bounds
//     if (this.safe == 0 &&
//       mouseX > this.x - this.size / 2 &&
//       mouseX < this.x + this.size / 2 &&
//       mouseY > this.y - this.size / 2 &&
//       mouseY < this.y + this.size / 2) {
//       this.exploding = true;
//       return true;
//     }

//     if (mouseX > this.x) {
//       this.x += this.speed;
//     } else {
//       this.x -= this.speed;
//     }

//     if (mouseY > this.y) {
//       this.y += this.speed;
//     } else {
//       this.y -= this.speed;
//     }

//     this.r = atan2(mouseY - this.y, mouseX - this.x);
//     if (this.safe > 0) {
//       this.safe -= 1;
//     }

//     return true;
//   }

//   this.display = function () {
//     translate(this.x, this.y);
//     if (this.exploding) {
//       image(explodeImg, 0, 0, this.size, this.size);
//       return;
//     }

//     if (mouseX < this.x) {
//       rotate(this.r - PI / 6);
//       scale(1, -1);
//     } else {
//       rotate(this.r + PI / 6);
//     }
//     image(pattyImg, 0, 0, this.size, this.size);
//   }
// }


// window.onbeforeunload = function (evt) {
//   setCookie("highscore", personalHighscore, 1);
// }

// window.onload = function () {
//   var score = getCookie("highscore");
//   if (score == "" || score == "NaN") {
//     personalHighscore = 0;
//   } else {
//     personalHighscore = parseInt(score);
//   }
// }

// function setCookie(cname, cvalue, exdays) {
//   var d = new Date();
//   d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
//   var expires = "expires=" + d.toUTCString();
//   document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
// }

// function getCookie(cname) {
//   var name = cname + "=";
//   var decodedCookie = decodeURIComponent(document.cookie);
//   var ca = decodedCookie.split(';');
//   for (var i = 0; i < ca.length; i++) {
//     var c = ca[i];
//     while (c.charAt(0) == ' ') {
//       c = c.substring(1);
//     }
//     if (c.indexOf(name) == 0) {
//       return c.substring(name.length, c.length);
//     }
//   }
//   return "";
// }

// function startTimer(duration) {
//   let time = duration
//   let minutes, seconds;

//   let intervalID = setInterval(function () {
//     minutes = parseInt(time / 60, 10)
//     seconds = parseInt(time % 60, 10);

//     seconds = seconds < 10 ? "0" + seconds : seconds;

//     countdown = minutes + ":" + seconds;

//     if (--time < 0) {
//       clearInterval(intervalID);
//       gameEnded = true;
//     }
//   }, 1000);
// }

const DAYS_ARRAY = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
const GAME_STATES = { NOT_STARTED: 0, STARTED: 1, OVER: 2 };

class BurgTown {

  constructor(duration = 60){
    this.duration = duration;
    this.patties = [];
    this.timer = 0;
    this.back = 0;
    this.foreground = 0;
    this.personalHighscore = 0;
    this.countdown = "";
    this.titleFlip = true;
    this.colorChange = false;
    this.name = "";
    this.day = new Date().getDay();
    this.state = GAME_STATES.NOT_STARTED;
  }

  addPatty(x, y){
    if(this.state !== GAME_STATES.OVER && this.personalHighscore <= this.patties.length){
      this.personalHighscore++;
    }
    this.patties.push(new patty(x, y, random(sizes)));
  }

  //####### Go to next state #######
  next(){
    switch(this.state){
      case GAME_STATES.NOT_STARTED:
        this.state = GAME_STATES.STARTED;
        this._startTimer();
        break;
      case GAME_STATES.STARTED:
        this.state = GAME_STATES.OVER;
        break;
      case GAME_STATES.OVER:
        this.state = GAME_STATES.NOT_STARTED;
        this.countdown = '';
        this.patties = [];
        this.day = new Date().getDay();
        break;
      default:
        console.log('how tho');
    }

  }

  display(){
    //####### set background color #######
    if (millis() - this.timer > 1000) {
      this.timer = millis();
      this.back = color(random(255), random(255), random(255));
      this.colorChange = true;
      if (this.titleFlip) {
        this.titleFlip = false;
      } else {
        this.titleFlip = true;
      }
    }
    background(this.back);

    //####### set the size and color of foreground text #######
    textSize(width / 9);
    textAlign(CENTER);
    textStyle(BOLD);
    if (this.colorChange) {
      this.foreground = color(random(255), random(255), random(255));
      this.colorChange = false;
    }
    fill(this.foreground);

    //####### draw current state #######
    switch(this.state){
      case GAME_STATES.NOT_STARTED:
        this._displayStartScreen();
        break;
      case GAME_STATES.STARTED:
        this._displayGame();
        break;
      case GAME_STATES.OVER:
        this._displayEndScreen();
        break;
      default:
        console.log('how tho');
    }

    //######## draw game info #######
    let text_h = height / 30;
    textSize(width / 60);
    textAlign(LEFT);
    fill(0);
    text('Count: ' + this.patties.length, 30, text_h);
    text('Personal Highscore: ' + this.personalHighscore, 30, text_h + 30);

  }

  //Private functions
  _displayStartScreen(){
    if (this.titleFlip) {
      text('HAPPY ' + DAYS_ARRAY[this.day], width / 2, height / 2);
    } else {
      text('BURGTOWN', width / 2, height / 2);
    }
  }
  
  _displayGame(){
    this._displayPatties();
    text(this.countdown, width / 2, height / 2);
  }

  _displayEndScreen(){
    this._displayPatties();
    textSize(width / 10);
    text('Enter your initials:', width / 2, height * 0.3);
    textSize(width / 8);
    text(this.name, width / 2, height * 0.6);
  }

  _displayPatties(){
    //remove dead patties
    this.patties = this.patties.filter(patty =>{
      return patty.state !== PATTY_STATES.DEAD;
    });

    this.patties.forEach(patty => {
      push(); //p5
        patty.display();
      pop(); //p5
    });
  }

  _startTimer() {
    let time = this.duration
    let minutes, seconds;

    let handler = () => {
      minutes = parseInt(time / 60, 10)
      seconds = parseInt(time % 60, 10);

      seconds = seconds < 10 ? '0' + seconds : seconds;

      this.countdown = minutes + ':' + seconds;

      if (--time < 0) {
        clearInterval(intervalID);
        this.next();
      }
    }

    let intervalID = setInterval(handler, 1000);
  }
}

const sizes = [50, 100, 100, 200, 200, 200, 300, 400];
const PATTY_STATES = {SAFE:0, DEFAULT:1, EXPLODING:2, DEAD:3};

class patty{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.r = 0;
    this.size = random(sizes);
    this.speed = 200 / this.size;
    this.state = PATTY_STATES.SAFE;
    this.safe = 60;
    this.img = pattyImg;
  }

  display(){
    translate(this.x, this.y);

    switch(this.state){
      case PATTY_STATES.SAFE:
        this._move();
        this.safe > 0 ? this.safe-- : this.next();
        break;
      case PATTY_STATES.DEFAULT:
        this._move();
        break;
      case PATTY_STATES.EXPLODING:
        this._explode();
        break;
      case PATTY_STATES.DEAD:
        //do nothing
        break;
      default:
        console.log('how tho');
    }
  }

  next(){
    switch(this.state){
      case PATTY_STATES.SAFE:
        this.state = PATTY_STATES.DEFAULT;
        break;
      case PATTY_STATES.DEFAULT:
        this.state = PATTY_STATES.EXPLODING;
        this.img = explodeImg;
        break;
      case PATTY_STATES.EXPLODING:
        this.state = PATTY_STATES.DEAD;
        break;
      case PATTY_STATES.DEAD:
        break;
      default:
        console.log('how tho');
    }
  }

  _move(){
    //determine if patty has hit cursor
    if (this.state !== PATTY_STATES.SAFE &&
        mouseX > this.x - this.size / 2 &&
        mouseX < this.x + this.size / 2 &&
        mouseY > this.y - this.size / 2 &&
        mouseY < this.y + this.size / 2) {
      this.next();
      return;
    }

    //set vectors
    this.x = mouseX > this.x ? this.x + this.speed : this.x - this.speed;

    this.y = mouseY > this.y ? this.y + this.speed : this.y - this.speed;

    this.r = atan2(mouseY - this.y, mouseX - this.x);

    if (mouseX < this.x) {
      rotate(this.r - PI / 6);
      scale(1, -1);
    } else {
      rotate(this.r + PI / 6);
    }
    image(this.img, 0, 0, this.size, this.size);
  }

  _explode(){
      if(this.size < 1) return this.next();

      this.size -= this.size / 4;

      image(this.img, 0, 0, this.size, this.size);
  }
}

//########## P5 Event Listeners ##########

function keyPressed() {
  console.log(keyCode);
  if (game.state === GAME_STATES.OVER) {
    if (game.name.length > 0 && (keyCode === DELETE || keyCode === BACKSPACE)) {
      game.name = game.name.slice(0, -1);
    }else if (keyCode === ENTER || keyCode === RETURN) {
      game.next();
    }else if (game.name.lenth < 3 && 
            (keyCode > 97 && keyCode < 122) ||
            (keyCode > 65 && keyCode < 90) ){
      game.name += String.fromCharCode(keyCode).toUpperCase();
    }
  }
}

function mouseClicked() {
  if(game.state === GAME_STATES.NOT_STARTED){
    game.next();
  }
  game.addPatty(mouseX, mouseY)
  // patties.push(new patty(mouseX, mouseY, random(sizes)));
  // console.log("clicked");
  // console.log(patties.length);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
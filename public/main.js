var canvas = document.createElement("canvas");
console.log(canvas)
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);



// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";
// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "https://github.com/lostdecade/simple_canvas_game/blob/master/images/hero.png?raw=true";
// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = 'images/monster.png';
// Monster image
var monster2Ready = false;
var monster2Image = new Image();
monster2Image.onload = function () {
	monster2Ready = true;
};
monster2Image.src = "https://github.com/lostdecade/simple_canvas_game/blob/master/images/monster.png?raw=true";

// Game objects
var hero = {
	speed: 256, // movement in pixels per second
	x: 0,
	y: 0
};
var monster = {
  speed: 75,
  x: 0,
	y: 0
};
var monster2 = {
	x: 0,
	y: 0
};
var monstersCaught = 0;
var both = 0;
var monsterAlive = true;
var monster2Alive = true;
// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a monster
var reset = function () {
  monsterAlive = true;
  monster2Alive = true;
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	// Throw the monster somewhere on the screen randomly
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));
  monster2.x = 32 + (Math.random() * (canvas.width - 64));
  monster2.y = 32 + (Math.random() * (canvas.height - 64));
};
// Update game objects
var update = function (modifier) {
  if (38 in keysDown) { // Player holding up
		if(hero.y > 0){
      hero.y -= hero.speed * modifier;}
    monster.x -= monster.speed * modifier;
	}
	if (40 in keysDown) { // Player holding down
    if(hero.y < 450){
    hero.y += hero.speed * modifier;}
    monster.x += monster.speed * modifier;
	}
	if (37 in keysDown) { // Player holding left
    if(hero.x > 0){
  	hero.x -= hero.speed * modifier;}
    monster.y -= monster.speed * modifier;

	}
	if (39 in keysDown) { // Player holding right
    if(hero.x < canvas.height){
    hero.x += hero.speed * modifier;}
    monster.y += monster.speed * modifier;

	}

	// Are they touching?

	if (
		hero.x <= (monster.x + 32)
		&& monster.x <= (hero.x + 32)
		&& hero.y <= (monster.y + 32)
		&& monster.y <= (hero.y + 32)
	) {
		++monstersCaught;
    ++both;
    monsterAlive = false;
    monster.x = -500;
  }
  if(
    hero.x <= (monster2.x + 32)
    && monster2.x <= (hero.x + 32)
    && hero.y <= (monster2.y + 32)
    && monster2.y <= (hero.y + 32)
  ) {
    ++monstersCaught;
    ++both;
    monster2Alive = false
    monster2.x = -500
  }
if(both >= 2){
    both = 0
    reset();
	}
};

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (monsterReady && monsterAlive) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}

  if (monster2Ready && monster2Alive) {
    ctx.drawImage(monster2Image, monster2.x, monster2.y);
  }
	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Monsterrs caught: " + monstersCaught, 32, 32);
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};
// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();
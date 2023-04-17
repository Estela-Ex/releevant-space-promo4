/**
 * Variables used during the game.
 */
let bullet = 10;
let player;

let enemigos = [];
let cursors;
let background;
let background2;
let spacebar;
let bullets = [];
let BULLET_VELOCITY = 6;
let elapsedFrames = 0;
let posicionRandom = 0;

/**
 * It prelaods all the assets required in the game.
 */
function preload() {
  this.load.image("sky", "assets/backgrounds/blue.png");
  this.load.image("player", "assets/characters/player.png");
  this.load.image("enemy1", "assets/characters/alien1.png");
  this.load.image("enemy2", "assets/characters/alien2.png");
  this.load.image("enemy3", "assets/characters/alien3.png");
  this.load.image("enemy4", "assets/characters/alien4.png");
}

/**
 * It creates the scene and place the game objects.
 */
function create() {
  // scene background
  background = this.add.image(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, "sky");
  background2 = this.add.image(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, "sky");
  background2.setY(background2.y - background.height);

  // playet setup
  player = this.add.image(SCREEN_WIDTH / 2, SCREEN_HEIGHT, "player");
  player.setX((SCREEN_WIDTH - player.width * PLAYER_SCALE) / 2);
  player.setY(SCREEN_HEIGHT - (player.height * PLAYER_SCALE) / 2);
  player.setScale(PLAYER_SCALE);

  // enemy setup

  for (let i = 0; i < 4; i++) {
    posicionRandom = Math.floor(Math.random() * 800 + 1);

    enemigos[i] = this.add.image(
      SCREEN_WIDTH / 2,
      SCREEN_HEIGHT,
      `enemy${i + 1}`
    );
    enemigos[i].setX(posicionRandom);
    enemigos[i].setY((enemigos[i].height * ENEMY_SCALE) / 2);
    enemigos[i].setScale(ENEMY_SCALE);
  }

  //cursors map into game engine
  cursors = this.input.keyboard.createCursorKeys();
  spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
}

/**
 * Updates each game object of the scene.
 */
function update() {
  posicionRandom = Math.floor(Math.random() * 800 + 1);
  elapsedFrames++;

  //MOVIMIENTO DE CURSOR
  if (cursors.left.isDown && player.x > 0 + (player.width / 2) * PLAYER_SCALE) {
    player.setX(player.x - 5);
  }
  if (
    cursors.right.isDown &&
    player.x < SCREEN_WIDTH - PLAYER_SCALE * (player.width / 2)
  ) {
    player.setX(player.x + 5);
  }
  if (cursors.up.isDown && player.y > 0 + PLAYER_SCALE * (player.height / 2)) {
    player.setY(player.y - 5);
  }
  if (
    cursors.down.isDown &&
    player.y < SCREEN_HEIGHT - PLAYER_SCALE * (player.height / 2)
  ) {
    player.setY(player.y + 5);
  }

  console.log(player.x);
  console.log(player.y);

  //DISPAROS

  if (spaceBar.isDown && elapsedFrames > 20) {
    bullets.push(
      this.add.ellipse(
        player.x,
        player.y - (player.height / 2) * PLAYER_SCALE,
        5,
        10,
        0xf50a0a
      )
    );

    elapsedFrames = 10;
  }

  // mover balas
  for (const bullet of bullets) {
    bullet.setY(bullet.y - BULLET_VELOCITY);
    for (let i = 0; i < enemigos.length; i++) {
      if (
        bullet.y >= enemigos[i].y - (enemigos[i].height * ENEMY_SCALE) / 2 &&
        bullet.y <= enemigos[i].y + (enemigos[i].height * ENEMY_SCALE) / 2 &&
        bullet.x >= enemigos[i].x - (enemigos[i].width * ENEMY_SCALE) / 2 &&
        bullet.x <= enemigos[i].x + (enemigos[i].width * ENEMY_SCALE) / 2
      ) {
        enemigos[i].destroy();
        // bullet.destroy();
        enemigos[i] = this.add.image(
          SCREEN_WIDTH / 2,
          SCREEN_HEIGHT,
          `enemy${i + 1}`
        );
        enemigos[i].setX(posicionRandom);
        enemigos[i].setY((enemigos[i].height * ENEMY_SCALE) / 2);
        enemigos[i].setScale(ENEMY_SCALE);
      }
    }
  }

  // SETEO ENEMIGO 1

  //Persecucion

  for (let i = 0; i < 4; i++) {
    enemigos[i].setY(enemigos[i].y + 2);
    if (enemigos[i].x < player.x) {
      enemigos[i].setX(enemigos[i].x + 2);
    }
    if (enemigos[i].x > player.x) {
      enemigos[i].setX(enemigos[i].x - 2);
    }

    //Colision y destroy
    if (
      player.y >= enemigos[i].y - (enemigos[i].height * ENEMY_SCALE) / 2 &&
      player.y <= enemigos[i].y + (enemigos[i].height * ENEMY_SCALE) / 2 &&
      player.x >= enemigos[i].x - (enemigos[i].width * ENEMY_SCALE) / 2 &&
      player.x <= enemigos[i].x + (enemigos[i].width * ENEMY_SCALE) / 2
    ) {
      enemigos[i].destroy();
      enemigos[i] = this.add.image(
        SCREEN_WIDTH / 2,
        SCREEN_HEIGHT,
        `enemy${i + 1}`
      );
      enemigos[i].setX(posicionRandom);
      enemigos[i].setY((enemigos[i].height * ENEMY_SCALE) / 2);
      enemigos[i].setScale(ENEMY_SCALE);
    } else if (enemigos[i].y >= 600) {
      enemigos[i].destroy();
      enemigos[i] = this.add.image(
        SCREEN_WIDTH / 2,
        SCREEN_HEIGHT,
        `enemy${i + 1}`
      );
      enemigos[i].setX(posicionRandom);
      enemigos[i].setY((enemigos[i].height * ENEMY_SCALE) / 2);
      enemigos[i].setScale(ENEMY_SCALE);
    }
  }

  //SETEO DE BACKGROUND
  background.setY(background.y + 5);
  background2.setY(background2.y + 5);

  if (background.y >= SCREEN_HEIGHT / 2 + background.height) {
    background.setY(background2.y - background.height);
    const copiaBackground = background;
    background = background2;
    background2 = copiaBackground;
  }
  console.log(SCREEN_WIDTH);
}

//Variables that control waves
var baddieNumber = 3;
var doggyNumber = 3;
var waveLimit = 3;
//Counters for enemy kills
var baddieKills = 0;
var doggyKills = 0;

var scoreMultiplyer = 1;

var waveCounter = 1;

var levelState = {
  create: function() {

    //Adds background
    game.add.sprite(0,0,'bg');
    //The controls for the game
    this.controls = game.input.keyboard.addKeys(
      {
        'Up' : Phaser.KeyCode.W,
        'Down' : Phaser.KeyCode.S,
        'Left' : Phaser.KeyCode.A,
        'Right' : Phaser.KeyCode.D,
        'aimUp' : Phaser.KeyCode.UP,
        'aimDown' : Phaser.KeyCode.DOWN,
        'aimRight' : Phaser.KeyCode.RIGHT,
        'aimLeft' : Phaser.KeyCode.LEFT,
        'Use' : Phaser.KeyCode.SPACEBAR,
        'dropWeapon' : Phaser.KeyCode.SHIFT
      }
    );

    //Create the player
    player = game.add.sprite(game.world.centerX, game.world.centerY, 'weapon')
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.anchor.setTo(0.5, 0.5)
    player.MoveSpeed = 300
    player.hacking = 0
    player.facing = 90;
    player.invincibleFrames = 500;
    player.scale.setTo(0.75, 0.75);
    //player.alpha = 0;

    //Add player weapon
    playerWeapon = player.addChild(game.make.sprite(0, 0, 'Player'));
    playerWeapon.anchor.setTo(0.5, 0.5)

    //
    USB = this.add.weapon(100, 'USB');
    USB.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    USB.bulletKillType = Phaser.Weapon.KILL_DISTANCE;
    USB.bulletKillDistance = 80;
    USB.bulletAngleOffset = 0;
    USB.bulletSpeed = 400;
    USB.fireRate = 450
    USB.trackSprite(playerWeapon, (playerWeapon / 2), 0, true);
    USB.bulletRotateToVelocity;
    weaponType = USB;

    //
    playerRifle = game.add.weapon(10,'playerBullet');
    playerRifle.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    playerRifle.bulletSpeed = 400;
    playerRifle.fireRate = 200;
    playerRifle.bulletAngleVariance = 5;
    playerRifle.trackSprite(playerWeapon, (playerWeapon / 2), 0, true);  //Fire from enemy position

    //
    playerCharge = game.add.weapon(3,'playerPointyBullet');
    playerCharge.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    playerCharge.bulletKillType = Phaser.Weapon.KILL_DISTANCE;
    playerCharge.bulletKillDistance = 30;
    playerCharge.bulletAngleOffset = 0;
    playerCharge.bulletSpeed = player.MoveSpeed + 75;
    playerCharge.trackSprite(playerWeapon, 16, 0, true);

    //Creates ranged enmey group and creates an array for ranged weapons
    rangedEnemies = game.add.group(); //A group to hold the enemy objects
    rangedEnemies.enableBody = true;
    weapon = []; //An array to hold the weapon objects

    //Creates melee enmey group and creates an array for melee weapons
    meleeEnemies = game.add.group(); //A group to hold the enemy objects
    meleeEnemies.enableBody = true;
    melee = []; //An array to hold the weapon objects

    //Function that generates enemies
    this.generateEnemy();

    //Score text
    scoreText = game.add.text(16, 16, 'Score: ' + game.global.score, { fontSize: '32px', fill: '#ff0000' });

  },

  update: function() {  //This function runs every frame

    //Movement code for player and enemies
    this.PlayerMovement();
    this.EnemyController();
    //Collision detection
    this.CollisionDetect();
    //Function that controls waves and checks how many enemies are alive
    this.waveControler();

  },

  waveControler: function(){
    if(waveCounter <= waveLimit){

      if(baddie.alive == false && doggy.alive == false){
        baddieKills = 0;
        doggyKills = 0;
        waveCounter ++;
        this.generateEnemy();
        //console.log(waveCounter);
        console.log(waveCounter);
      }
    }else if(waveCounter == waveLimit){
      baddieKills = 0;
      doggyKills = 0;
      waveCounter ++;
      //console.log(waveCounter);
      console.log(waveCounter);
      //generateBoss();
    }else if (waveCounter > waveLimit) {
      game.state.start('win');
    }

  },

  generateEnemy: function(){
    for(i = 0; i < (baddieNumber + waveCounter); i++){
      //Create an enemy in a random position
      baddieSpawnLocation = Math.floor((Math.random() * 4) + 1);
      if(baddieSpawnLocation == 1){
        baddie = rangedEnemies.create(0, this.game.world.randomY, 'Baddie');
      }else if (baddieSpawnLocation == 2) {
        baddie = rangedEnemies.create(game.world.width, this.game.world.randomY, 'Baddie');
      }else if (baddieSpawnLocation == 3) {
        baddie = rangedEnemies.create(this.game.world.randomX, 0, 'Baddie');
      }else if (baddieSpawnLocation == 4) {
        baddie = rangedEnemies.create(this.game.world.randomX, game.world.height, 'Baddie');
      }
      //Set atrabuts for ranged enemies
      baddie.anchor.setTo(0.5, 0.5);
      game.physics.arcade.enable(baddie);
      baddie.body.collideWorldBounds = true;
      baddie.hacked = false;
      baddie.facing = Math.floor((Math.random() * 360) + 1);
      baddie.MoveSpeed = 250;
      baddie.body.bounce.setTo(1,1);

    //Add a weapon to each enemy
      Rifle = game.add.weapon(1,'bullet');
      Rifle.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
      Rifle.bulletSpeed = 200;
      Rifle.fireRate = 300;
      Rifle.bulletAngleVariance = 0;
      Rifle.trackSprite(baddie, (baddie.width / 2), 0, true);  //Fire from enemy position
      weapon[i] = Rifle;  //Add weapon to array

    }
    for(i = 0; i < (doggyNumber + waveCounter); i++){
      //Create an enemy in a random position
      doggySpawnLocation = Math.floor((Math.random() * 4) + 1);
      if(doggySpawnLocation == 1){
        doggy = meleeEnemies.create(0, this.game.world.randomY, 'Doggy');
      }else if (doggySpawnLocation == 2) {
        doggy = meleeEnemies.create(game.world.width, this.game.world.randomY, 'Doggy');
      }else if (doggySpawnLocation == 3) {
        doggy = meleeEnemies.create(this.game.world.randomX, 0, 'Doggy');
      }else if (doggySpawnLocation == 4) {
        doggy = meleeEnemies.create(this.game.world.randomX, game.world.hight, 'Doggy');
      }
      //Set atrabuts for melee enemies
      doggy.anchor.setTo(0.5, 0.5);
      game.physics.arcade.enable(doggy);
      doggy.body.collideWorldBounds = true;
      doggy.hacked = false;
      doggy.alive = true;
      doggy.facing = Math.floor((Math.random() * 8) + 1) * 45;
      doggy.MoveSpeed = 400;
      doggy.body.immovable = true;

      //Add a weapon for each enemey
      Charge = game.add.weapon(3, 'PointyBullet')
      Charge.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
      Charge.bulletKillType = Phaser.Weapon.KILL_DISTANCE;
      Charge.bulletKillDistance = 30;
      Charge.bulletAngleOffset = 0;
      Charge.bulletSpeed = player.MoveSpeed + 20;
      Charge.trackSprite(doggy, (doggy.width / 2), 0, true);
      melee[i] = Charge;
    }

  },

  CollisionDetect : function(){
    game.physics.arcade.collide(player, rangedEnemies);
    game.physics.arcade.collide(player, meleeEnemies);
    game.physics.arcade.collide(rangedEnemies);
    game.physics.arcade.collide(meleeEnemies);
    game.physics.arcade.overlap(USB.bullets, rangedEnemies, this.rangeHack, null, this);
    game.physics.arcade.overlap(USB.bullets, meleeEnemies, this.meleeHack, null, this);
    game.physics.arcade.overlap(playerRifle.bullets, rangedEnemies, this.rangeHack, null, this);
    game.physics.arcade.overlap(playerRifle.bullets, meleeEnemies, this.meleeHack, null, this);
    game.physics.arcade.overlap(playerCharge.bullets, rangedEnemies, this.rangeHack, null, this);
    game.physics.arcade.overlap(playerCharge.bullets, meleeEnemies, this.meleeHack, null, this);
    for(i = 0; i < weapon.length; i++){
      game.physics.arcade.overlap(weapon[i].bullets, player, this.Hit, null, this);
    }
    for(i = 0; i < melee.length; i++){
      game.physics.arcade.overlap(melee[i].bullets, player, this.Hit, null, this);
    }
  },
  //Fire each weapon stored in the array at the player
  EnemyController: function() {
    for(i = 0; i < weapon.length; i++){
      rangedEnemies.forEach(function(baddie){
        fireAngle = game.physics.arcade.angleBetween(player, baddie);
        baddie.rotation = fireAngle;
        if(baddie.alive == true){
          weapon[i].fireAtSprite(player);
        }
        this.wallCheck(baddie);
        game.physics.arcade.velocityFromAngle(baddie.facing, baddie.MoveSpeed, baddie.body.velocity);
      }, this);
    }
    for(i = 0; i < melee.length; i++){
      meleeEnemies.forEach(function(doggy){

        if (typeof timerGateOpen === 'undefined') {
            var timerGateOpen = false;
        }

        //var timerGateOpen = false;
        if (game.rnd.integerInRange(1, 1000) == 1000) {
          timerGateOpen = !timerGateOpen;
        }

        if(doggy.body.velocity != 0){
          melee[i].fire();
        }
        if(doggy.alive == true){
          //stop = setTimeout(this.TimerGate1, 3000);

          if(timerGateOpen == true){
                doggy.angle = (Math.round(((game.physics.arcade.angleBetween(player, doggy)) * 180/Math.PI) / 45) * 45) - 180;
                doggy.facing = doggy.angle
                game.physics.arcade.velocityFromAngle(doggy.facing, doggy.MoveSpeed, doggy.body.velocity);
              }
          }else{
            clearInterval(stop);
          }
      }, this);
     }
  },

  TimerGate : function(){
      timerGateOpen = true;
    },

  PlayerMovement : function(){
    //Movement controls for player
    if(this.controls.Up.isDown && this.controls.Left.isDown){
      player.going = -135;
      game.physics.arcade.velocityFromAngle(player.going, player.MoveSpeed, player.body.velocity);
    }else if(this.controls.Up.isDown && this.controls.Right.isDown){
      player.going = -45;
      game.physics.arcade.velocityFromAngle(player.going, player.MoveSpeed, player.body.velocity);
    }else if(this.controls.Down.isDown && this.controls.Right.isDown){
      player.going = 45;
      game.physics.arcade.velocityFromAngle(player.going, player.MoveSpeed, player.body.velocity);
    }else if(this.controls.Down.isDown && this.controls.Left.isDown){
      player.going = 135;
      game.physics.arcade.velocityFromAngle(player.going, player.MoveSpeed, player.body.velocity);
    }else if(this.controls.Up.isDown){
      player.going = -90;
      game.physics.arcade.velocityFromAngle(player.going, player.MoveSpeed, player.body.velocity);
    }else if(this.controls.Down.isDown){
      player.going = 90;
      game.physics.arcade.velocityFromAngle(player.going, player.MoveSpeed, player.body.velocity);
    }else if(this.controls.Right.isDown){
      player.going = 0;
      game.physics.arcade.velocityFromAngle(player.going, player.MoveSpeed, player.body.velocity);
    }else if(this.controls.Left.isDown){
      player.going = 180;
      game.physics.arcade.velocityFromAngle(player.going, player.MoveSpeed, player.body.velocity);
    }else{
      player.body.velocity.y = 0;
      player.body.velocity.x = 0;
    }
    //Weapon controls for player
    if(weaponType == playerCharge){
      playerWeapon.angle = player.going;
      playerCharge.fire();
      if(player.body.velocity.x < 0 || player.body.velocity.x > 0 ||player.body.velocity.y < 0 ||player.body.velocity.y > 0){
        this.toggleInvincible();
      }
    }else{
      this.aim();
    }
    if(this.controls.dropWeapon.isDown){
      //Player gets bonus points if they drop weapon
      game.global.score =+ 300
      weaponType = USB;
    }


  },

  aim : function(){
    //Aiming controls for player
    if(this.controls.aimUp.isDown && this.controls.aimLeft.isDown){
      player.facing = -135
    }else if(this.controls.aimUp.isDown && this.controls.aimRight.isDown){
      player.facing = -45
    }else if(this.controls.aimDown.isDown && this.controls.aimRight.isDown){
      player.facing = 45
    }else if(this.controls.aimDown.isDown && this.controls.aimLeft.isDown){
      player.facing = 135
    }else if(this.controls.aimUp.isDown){
      player.facing = -90
    }else if(this.controls.aimDown.isDown){
      player.facing = 90
    }else if(this.controls.aimRight.isDown){
      player.facing = 0
    }else if(this.controls.aimLeft.isDown){
      player.facing = 180
    }
    playerWeapon.angle = player.facing;
    if (this.controls.Use.isDown){
      //console.log("bang");
      (weaponType).fire();
    }

  },



  Hit: function(player, bullet){
    //function for when the player gets hit
    //console.log("ouch");
    bullet.kill();
    if (!player.invincible) { //We only damage the player if not invincible
      player.tint = 0xff0000;
      playerWeapon.tint = 0xff0000;
      this.invincibility_tint();
      this.toggleInvincible();
      game.time.events.add(player.invincibleFrames, this.invincibility_untint, this);
      game.time.events.add(player.invincibleFrames, this.toggleInvincible, this);//and then we add a timer to restore the player to a vulnerable state
      scoreMultiplyer = 1;
      game.global.score = game.global.score - 10;
    }
  },
  toggleInvincible: function() {
    player.invincible = !player.invincible;
  },

  invincibility_tint: function()  {
    player.tint = 0xff0000;
    playerWeapon.tint = 0xff0000;
  },

  invincibility_untint: function()  {
    player.tint = 0xffffff;
    playerWeapon.tint = 0xffffff;
  },

  rangeHack: function(bullet, enemy){
    //Function for when ranged enemy gets hit
    game.global.score += (50 * scoreMultiplyer);
    scoreText.destroy();
    scoreText = game.add.text(16, 16, 'Score: ' + game.global.score, { fontSize: '32px', fill: '#ff0000' });
    scoreMultiplyer += 0.1;
  //  console.log("hit");
    baddieKills ++;
    bullet.kill();
    //If the player is using starting weapon then the player gains enemy weapon
      if(weaponType == USB){
        player.body.x = enemy.body.x;
        player.body.y = enemy.body.y;
        weaponType = playerRifle;
      }
      //Remove enemy and weapon from array
    enemyid = rangedEnemies.getIndex(enemy);
    enemy.kill();
    enemy.alive = false;
    weapon.splice(enemyid, 1);
    //console.log(baddie.alive);
  },

  meleeHack: function(bullet, enemy){
    //Function for when ranged enemy gets hit
    game.global.score += (50 * scoreMultiplyer);
    scoreMultiplyer += 0.1;
    doggyKills ++;
  //  console.log("hit");
    bullet.kill();
    //If the player is using starting weapon then the player gains enemy weapon
      if(weaponType == USB){
        player.body.x = enemy.body.x;
        player.body.y = enemy.body.y;
        weaponType = playerCharge;
        player.MoveSpeed = 700;
      }
    //Remove enemy and weapon from array
    enemyid = meleeEnemies.getIndex(enemy);
    enemy.kill();
    enemy.alive = false;
    melee.splice(enemyid, 1);
    //console.log(doggy.alive);
  },

  wallCheck: function(enemy){
    //If a ranged enemy hits any wall they will choose a random direction and start traveling that way
    if(enemy.body.x >= (game.world.width - enemy.width) || enemy.body.x <= 0 || enemy.body.y >= (game.world.height - enemy.width - 10) || enemy.body.y <= 0){
      enemy.facing = Math.floor((Math.random() * 360) + 1);
    }
  }

};

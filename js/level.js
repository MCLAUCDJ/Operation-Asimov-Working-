<<<<<<< HEAD
var jumpforce = -350
var gravityforce = 400
var runspeed = 150
var jumpmultiplyer = 0
var levelState = {
  create: function() {
    //Some basic controls for the game
    this.controls = game.input.keyboard.addKeys(
      {
        'left': Phaser.KeyCode.A,
        'right': Phaser.KeyCode.D,
        'jump' : Phaser.KeyCode.W
      }
    );
    //Add a background
    game.add.sprite(0,0,'bg');

    platforms = game.add.group();  //A group can help organise sprites within the game
    platforms.enableBody = true;  //All objects in the group will have physics bodies (hitbox, gravity, velocity etc)
    var ground = platforms.create(0, game.world.height - 64, 'ground'); //Create a platform called ground at the bottom of the screen
    ground.scale.setTo(2,2);  //Scale the ground object to fill the bottom of the screen
    ground.body.immovable = true;  //The ground will not move when another object collides with it
    var ledge = platforms.create(400, 400, 'ground'); //Create another platform called ledge
    ledge.body.immovable = true;
    var ledge = platforms.create(-150, 250, 'ground'); //Create another platform, also called ledge
    ledge.body.immovable = true;

    baddie = game.add.sprite(90,218,'baddie')
    game.physics.arcade.enable(baddie);
    baddie.body.bounce.y = 0.2;
    baddie.body.gravity.y = gravityforce;
    baddie.body.collideWorldBounds = true;

    baddie.animations.add('left', [0,1], 10, true)
    baddie.animations.add('right', [2,3], 10, true)

    player = game.add.sprite(32, game.world.height - 150, 'player');
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.2;
    player.body.gravity.y = gravityforce;
    player.body.collideWorldBounds = true;

    player.animations.add('left', [0,1,2,3], 10, true);
    player.animations.add('right', [5,6,7,8], 10, true);
    player.animations.add('still', [4], 1, false);


    //Add any other objects that need to exist
    stars = game.add.group();
    game.physics.arcade.enable(stars);
    stars.enableBody = true;
    for (var i = 0; i < 12; i++) {
      newStar = stars.create(i * 70, 0, 'star');
      newStar.body.gravity.y = 6 + Math.random() * 1.1;
      newStar.body.bounce.y = 0.7 + Math.random() * 0.5;
      newStar.body.collideWorldBounds = true;
    }

    gems = game.add.group();
    game.physics.arcade.enable(gems);
    gems.enableBody = true;
    randX = game.rnd.integerInRange(1, 11);
    newGem = gems.create((randX * 70 + 32) , 0, 'gem');
    newGem.body.gravity.y = 6;
    newGem.body.bounce.y = 0.99;

    //Add any display elements (score, lives etc)
    scoreText = game.add.text(16, 16, 'Score: ' + game.global.score, { fontSize: '32px', fill: '#ff0000' });
    livesText = game.add.text(16, 42, 'Lives: ' + game.global.lives, { fontSize: '32px', fill: '#ff0000' });


  },

  update: function() {  //This function runs every frame
    //Collision detection
    var hitPlatform = game.physics.arcade.collide(player, platforms);

    game.physics.arcade.collide(stars, platforms);
    game.physics.arcade.collide(gems, platforms);
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(baddie, platforms);
    game.physics.arcade.overlap(player, platforms);
    game.physics.arcade.overlap(player, stars, this.CollectStar, null, this);
    game.physics.arcade.overlap(player, gems, this.CollectGem, null, this);
    game.physics.arcade.overlap(player, baddie, this.Bump, null, this);

    if (player.body.touching.down && hitPlatform){
      jumpmultiplyer = 0;
    }

    //Movement code

    if(player.x < baddie.x){
      baddie.body.velocity.x = -runspeed - 50;
      baddie.animations.play('left');
    }else if (player.x > baddie.x) {
      baddie.body.velocity.x = runspeed - 50;
      baddie.animations.play('right')
    }
    if(this.controls.left.isDown){
      player.body.velocity.x = -runspeed;
      player.animations.play('left');
    }else if (this.controls.right.isDown) {
      player.body.velocity.x = runspeed;
      player.animations.play('right')
    }else{
      player.animations.play('still')
      player.body.velocity.x = 0;
    }
    if(this.controls.jump.isDown && player.body.touching.down){
      player.body.velocity.y = jumpforce;
    }
    //Other code
  },


  CollectStar: function(player, star) {
    game.global.score += jumpmultiplyer * 10 +10;  //Increase the score by 10
    stars.remove(star);  //Remove the star from the group and the game
    scoreText.text = 'Score: ' + game.global.score;  //Update the UI display
    //  play.audio('point')
    jumpmultiplyer += 1;
    if(stars.total < 1) { //Has the player collected all the stars?
      game.state.start('end');
    }
  },

  CollectGem: function(player, gem) {
    game.global.score += jumpmultiplyer * 10 + 50;  //Increase the score by 50
    gems.remove(gem);
    scoreText.text = 'Score: ' + game.global.score;  //Update the UI display
    //  play.audio('point')
  },


  Win: function() {
    game.state.start('end');  //Go to the win state
  },

  toggleInvincible: function() {
    player.invincible = !player.invincible
  },

  invincibility_tint: function()  {
    player.tint = 0xff0000
  },

  invincibility_untint: function()  {
    player.tint = 0xffffff
  },

  Bump: function(player, baddie) {
    if (!player.invincible) { //We only damage the player if not invincible
      game.global.lives -= 1;      //we start damage flashing and toggle invincibility
      if (game.global.lives <= 0){
        game.state.start('end');
      }
      this.invincibility_tint();
      game.time.events.add(250, this.invincibility_untint, this);
      livesText.text = 'Lives: ' + game.global.lives;
      this.toggleInvincible();             //and then we add a timer to restore the player to a vulnerable state
      game.time.events.add(1500, this.toggleInvincible, this);
    }
  }

};
=======
var levelState = {
  create: function() {

    //Some basic controls for the game
    game.add.sprite(0,0,'bg');
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
        'Use' : Phaser.KeyCode.SPACEBAR
      }
    );

    //Create the player
    player = game.add.sprite(game.world.centerX, game.world.centerY, 'Player')
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.anchor.setTo(0.5, 0.5)
    player.MoveSpeed = 300
    player.hacking = 0
    player.facing = 90;

    playerWeapon = player.addChild(game.make.sprite(0, 0, 'weapon'));
    playerWeapon.anchor.setTo(0.5, 0.5)

    USB = this.add.weapon(100, 'USB');
    USB.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    USB.bulletKillType = Phaser.Weapon.KILL_DISTANCE;
    USB.bulletKillDistance = 80;
    USB.bulletAngleOffset = 0;
    USB.bulletSpeed = 400;
    USB.fireRate = 450
    USB.trackSprite(playerWeapon, 16, 0, true);
    USB.bulletRotateToVelocity;
    weaponType = USB;

    playerRifle = game.add.weapon(10,'playerBullet');
    playerRifle.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    playerRifle.bulletSpeed = 400;
    playerRifle.fireRate = 200;
    playerRifle.bulletAngleVariance = 5;
    playerRifle.trackSprite(playerWeapon, 16, 0, true);  //Fire from enemy position

    playerCharge = game.add.weapon(3,'playerPointyBullet');
    playerCharge.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    playerCharge.bulletKillType = Phaser.Weapon.KILL_DISTANCE;
    playerCharge.bulletKillDistance = 30;
    playerCharge.bulletAngleOffset = 0;
    playerCharge.bulletSpeed = player.MoveSpeed + 20;
    playerCharge.trackSprite(playerWeapon, 16, 0, true);


    enemies = game.add.group(); //A group to hold the enemy objects
    enemies.enableBody = true;
    weapons = []; //An array to hold the weapon objects

    this.generateEnemy();

  },

  update: function() {  //This function runs every frame

    //Movement code
    this.PlayerMovement();
    this.EnemyController();
    this.CollisionDetect();

  },

  generateEnemy: function(){
    for(i = 0; i < 5; i++){
      //Create an enemy in a random position

      baddie = enemies.create(this.game.world.randomX, this.game.world.randomY, 'Baddie');
      baddie.anchor.setTo(0.5, 0.5);
      game.physics.arcade.enable(baddie);
      baddie.body.collideWorldBounds = true;
      baddie.hacked = false;
      baddie.facing = 0
      baddie.MoveSpeed

      //Add a weapon to each enemy
      Rifle = game.add.weapon(5,'bullet');
      Rifle.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
      Rifle.bulletSpeed = 200;
      Rifle.fireRate = 200;
      Rifle.bulletAngleVariance = 20;
      Rifle.trackSprite(baddie, 0, 0, true);  //Fire from enemy position
      weapons[i] = Rifle;  //Add weapon to array
    }
    //enemies.setAll(baddie.tint, 0xff0000);
  },

  CollisionDetect : function(){
    game.physics.arcade.collide(player, enemies);
    game.physics.arcade.collide(enemies);
    game.physics.arcade.overlap(USB.bullets, enemies, this.Hack, null, this);
    game.physics.arcade.overlap(playerRifle.bullets, enemies, this.Hack, null, this);
    game.physics.arcade.overlap(playerCharge.bullets, enemies, this.Hack, null, this);
    for(i = 0; i < weapons.length; i++){
      game.physics.arcade.overlap(weapons[i].bullets, player, this.Hit, null, this);
    }
  },
  //Fire each weapon stored in the array at the player
  EnemyController: function() {
    for(i = 0; i < weapons.length; i++){
      enemies.forEach(function(baddie){
        goAngle = game.physics.arcade.angleBetween(player, baddie);
        //  goAngle = (goAngle * (180/Math.PI)) - 180;
        baddie.rotation = goAngle;
        if(baddie.alive == true){
          weapons[i].fireAtSprite(player);
        }
        //game.time.events.loop(Phaser.Timer.SECOND, this.randomAngle(), this);

        //if(baddie.body.x > (game.world.x - 30)){
          game.physics.arcade.velocityFromAngle(baddie.facing, 0, baddie.body.velocity);
        //}else{
          game.physics.arcade.velocityFromAngle(baddie.facing, 100, baddie.body.velocity);
      //  }
      }, this);
    }
  },

  PlayerMovement : function(){
    if(this.controls.Up.isDown && this.controls.Left.isDown){
      game.physics.arcade.velocityFromAngle(-135, player.MoveSpeed, player.body.velocity);
    }else if(this.controls.Up.isDown && this.controls.Right.isDown){
      game.physics.arcade.velocityFromAngle(-45, player.MoveSpeed, player.body.velocity);
    }else if(this.controls.Down.isDown && this.controls.Right.isDown){
      game.physics.arcade.velocityFromAngle(45, player.MoveSpeed, player.body.velocity);
    }else if(this.controls.Down.isDown && this.controls.Left.isDown){
      game.physics.arcade.velocityFromAngle(135, player.MoveSpeed, player.body.velocity);
    }else if(this.controls.Up.isDown){
      game.physics.arcade.velocityFromAngle(-90, player.MoveSpeed, player.body.velocity);
    }else if(this.controls.Down.isDown){
      game.physics.arcade.velocityFromAngle(90, player.MoveSpeed, player.body.velocity);
    }else if(this.controls.Right.isDown){
      game.physics.arcade.velocityFromAngle(0, player.MoveSpeed, player.body.velocity);
    }else if(this.controls.Left.isDown){
      game.physics.arcade.velocityFromAngle(180, player.MoveSpeed, player.body.velocity);
    }else{
      player.body.velocity.y = 0;
      player.body.velocity.x = 0;
    }
    this.aim();

  },

  aim : function(){
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
      console.log("bang");
      (weaponType).fire();
    }

  },



  Hit: function(player, bullet){
    console.log("ouch");
    bullet.kill();
  },

  Hack: function(bullet, enemy){
    console.log("hit");
    bullet.kill();
      if(weaponType == USB){
        player.body.x = enemy.body.x;
        player.body.y = enemy.body.y;
      }
    horse = enemies.getIndex(enemy);
    enemy.kill();
    enemy.alive = false;
    weapons.splice(horse, 1);
    weaponType = playerRifle;

  }

};
>>>>>>> dc7ba191ca234d217974246454c8d76611988b78

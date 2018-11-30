var loadState = {
  preload: function() {
    //Add a line of text to the screen
    loadingLabel = game.add.text(80, 150, 'loading...', {font: '30px Courier', fill: '#ffffff'});

    //Load all the assets
    //(the size and number of assets will slow this process down)
    game.load.image('bg', 'assets/background.png');
	  game.load.image('USB', 'assets/missile.png');
	  game.load.image('bullet', 'assets/missile_Mk1.png');
	  game.load.image('weapon', 'assets/Weapon.png');
    game.load.image('playerBullet', 'assets/Lazer.png');
    game.load.image('playerPointyBullet', 'assets/Pointy_Blue_Lazer.png');
    game.load.image('PointyBullet', 'assets/Pointy_Red_Lazer.png');
    game.load.image('button', 'assets/button.png');
    game.load.spritesheet('Player', 'assets/Player_Spritesheat-sheet.png', 60, 50);
    game.load.spritesheet('Baddie', 'assets/Robot.png', 44, 46);
    game.load.spritesheet('Doggy', 'assets/Doggy_Spritesheet.png', 88, 32);
  },

  create: function() {
    game.state.start('menu'); //Load the menu
  }

};

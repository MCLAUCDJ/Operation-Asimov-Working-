var loadState = {
  preload: function() {
    //Add a line of text to the screen
    loadingLabel = game.add.text(80, 150, 'Loading...', {font: '30px Courier', fill: '#ffffff'});

    //Load all the assets
    //(the size and number of assets will slow this process down)
    game.load.image('bg', 'assets/background.png');
    game.load.image('healthpack', 'assets/firstaid.png')
    game.load.image('gem', 'assets/diamond.png')
    game.load.image('star', 'assets/star.png')
    game.load.image('button', 'assets/button.png')
    game.load.image('ground', 'assets/platform.png')
    game.load.spritesheet('player', 'assets/Good_Guy_v2.png', 64, 64)
    game.load.spritesheet('baddie', 'assets/Robot.png', 44, 46)
    game.load.audio('point','assets/point.mp3')
  },

  create: function() {
    game.state.start('menu'); //Load the menu
  }

};

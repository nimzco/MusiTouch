var Sound = new Class({

    Implements: [Options, Events],

    options: {
        instrument: 'piano', // Distance between squares in %
    },
    
    initialize: function(nbSquare, paper, options){
        this.setOptions(options);
    },
    
    playSound: function() {
      var sound = document.getElementById('audio');
      var sound1 = document.getElementById('audio1');
      sound.play();
      sound1.play();
    }
});
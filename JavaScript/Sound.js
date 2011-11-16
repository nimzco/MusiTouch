var Sound = new Class({

    Implements: [Options, Events],

    options: {
        instrument: 'piano'
    },
    
    initialize: function(audio_id, options){
        this.setOptions(options);
        this.audio_id = audio_id;
        console.log(this);
    },
    
    playSound: function() {
      var sound = document.getElementById(this.audio_id);
      sound.play();
    }
});
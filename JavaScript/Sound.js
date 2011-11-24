var Sound = new Class({

    Implements: [Options, Events],

    options: {
        instrument: 'piano'
    },
    
    initialize: function(audio_id, options){
        this.setOptions(options);
        this.audio_id = audio_id;
        this.first    = true;
    },
    
    playSound: function() {
      var sound = document.getElementById(this.audio_id);
      if (!this.first) { sound.currentTime = 0; } else { this.first = false }
      sound.play();
    }
});
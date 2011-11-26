var Sound = new Class({

    Implements: [Options, Events],

    options: {
        instrument: 'piano'
    },
    
    initialize: function(note, options){
        this.setOptions(options);
        this.numNote = note;
        this.first   = true;
    },
    
    playSound: function() {
      if (!this.first) { 
        EPPIC.set("currentTime", this.numNote * 2);
      } else {
        this.first = false
      }
      EPPIC.play();
    }
});
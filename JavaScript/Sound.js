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
      if (window.timerID) {
        clearTimeout(window.timerID);
      }
      if (!this.first) { 
        EPPIC.set("currentTime", this.numNote * 2);
      } else {
        this.first = false
      }
      EPPIC.play();
      window.timerID = setTimeout(function() {
        EPPIC.pause();
      }.bind(this), 1500);
    }
});
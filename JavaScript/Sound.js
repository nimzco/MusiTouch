var Sound = new Class({

    Implements: [Options, Events],

    options: {
        instrument: 'piano'
    },
    
    initialize: function(note, options){
        this.setOptions(options);
        this.numNote = note;
    },
    
    playSound: function() {
      if (window.timerID) {
        clearTimeout(window.timerID);
      }
      EPPIC.set("currentTime", this.numNote * 2);
      EPPIC.play();
      window.timerID = setTimeout(function() {
        EPPIC.pause();
      }.bind(this), 1500);
    }
});
var Sound = new Class({

    Implements: [Options, Events],

    options: {
        instrument: 'piano'
    },
    
    initialize: function(note, options){
        this.setOptions(options);
        /*
this.sound = new buzz.sound( "sounds/" + note, {
          formats: [ "mp3" ],
          preload: true
        });
*/
        this.numNote = note;
        
    },
    
    playSound: function() {
      //console.log(this.numNote); 
      //EPPIC.setPercent((this.numNote + 1));
      EPPIC.play();
      EPPIC.set("currentTime", this.numNote * 2);
      EPPIC.play();
    }
});
var Sound = new Class({

    Implements: [Options, Events],

    options: {
        instrument: 'piano'
    },
    
    initialize: function(note, options){
        this.setOptions(options);
        this.note = note.contains('#') ? note.substr(0,2) + "_d" : note;
        this.sound = new buzz.sound( "sounds/" + this.note, {
          formats: [ "mp3" ],
          preload: true
        });
    },
    
    playSound: function() {
      this.sound.play();
    }
});
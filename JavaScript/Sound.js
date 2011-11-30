var Sound = new Class({

    Implements: [Options, Events],

    options: {
        instrument: 'piano'
    },
    
    initialize: function(note, options){
        this.setOptions(options);
        this.note = note.contains('#') ? note.substr(0, note.length - 1) + "_d" : note;
        this.sound = new buzz.sound( "sounds/" + this.note, {
          formats: [ "mp3", "wav"],
          preload: true
        });
        this.first = true;
    },
    
    playSound: function() {
      //buzz.all().pause();
      if(!this.first) {this.sound.set('currentTime', 0);} else {this.first = false;}
      this.sound.play();
    }
});
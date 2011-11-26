var Case = new Class({

    Implements: [Options, Events],

    options: {
        color : '#ce168e'
    }, 
    initialize: function(paper, note, options) {
        this.setOptions(options);
        var audioWrapper = document.getElementById('audio_wrapper');
        var numNote = Math.round((Math.random()*9)+1);
        this.note = (note ? note : NOTES[numNote]);
        this.paper = paper;
        this.rect = this.paper.rect(0,0,0,0,3);
        this.el = this.rect[0];
        this.rect.attr('fill', this.options.color);        

        var sound = new Sound(numNote);
        this.sound = sound;
        this.rect[0].addEvent('click', sound.playSound.bind(sound));
        this.rect[0].addEvent('touchstart', sound.playSound.bind(sound));
        this.rect.attr('fill', this.options.color);
    },
    
    getRect: function() {
      return this.rect;
    },

    play: function() {
        this.sound.playSound();
    }
  
});
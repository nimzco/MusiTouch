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
        this.rect.attr('fill', this.options.color);        
/*         var sound = new Sound(this.note); */
        var sound = new Sound(numNote);
        this.rect[0].addEvent('click', sound.playSound.bind(sound));
        this.rect[0].addEvent('touchstart', sound.playSound.bind(sound));
    },
    
    getRect: function() {
      return this.rect;
    },
    
    guidGenerator: function() {
      var S4 = function() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
      };
      return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }
  
});
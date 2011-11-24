var Case = new Class({

    Implements: [Options, Events],

    options: {
        color : '#ce168e'
    }, 
    initialize: function(paper, note, options) {
        this.setOptions(options);
        var audioWrapper = document.getElementById('audio_wrapper');
        this.note = (note ? note : NOTES[Math.round((Math.random()*10)+1)]);
        this.uuid = this.guidGenerator();
        audioWrapper.innerHTML += "<audio id=" + this.uuid + " src=\"sounds/"+ this.note + ".mp3\" preload=\"auto\" autobuffer hidden=\"true\">";
        this.paper = paper;
        this.rect = this.paper.rect(0,0,0,0,3);
        this.rect.attr('fill', this.options.color);
        this.el = this.rect[0];
        this.sound = new Sound(this.uuid);
        //this.rect.click();
        //$(this.rect[0]).addEvent('click', sound.playSound.bind(sound));
        // $(this.rect[0]).addEvent('touchstart', function() {console.log("Tap")});
    },
    
    getRect: function() {
      return this.rect;
    },
    
    guidGenerator: function() {
      var S4 = function() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
      };
      return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    },

    play: function() {
        this.sound.playSound();
    }
  
});
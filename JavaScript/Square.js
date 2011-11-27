var Square = new Class({

    Implements: [Options, Events],

    options: {
        color         : '#ce168e',
        fontSize      : .6,
        animationTime : 200
    }, 
    initialize: function(paper, numNote, nbNote, options) {
        this.setOptions(options);
        var audioWrapper = document.getElementById('audio_wrapper');
        this.note = NOTES[nbNote][numNote];
        this.paper = paper;
        this.rect = this.paper.rect(0,0,0,0,3);
        this.el = this.rect[0];
        this.pattenURL = (numNote + 1);
        this.rect.attr('fill', 'url(patterns/pat' + this.pattenURL + '.png)');        
        this.rect.hover(function(){
          this.attr('stroke-width', "10");
        },function (){
          this.attr('stroke-width', "1");        
        }, this.rect, this.rect);

        this.sound = new Sound(NOTES[nbNote][numNote]);
        // this.rect[0].addEvent('click', this.sound.playSound.bind(this.sound));
        // this.rect[0].addEvent('touchstart', this.sound.playSound.bind(this.sound));
        this.rect.attr('fill', this.options.color);
    },
    drawTextInsideRect: function() {
        var x      = this.el.x.baseVal.value;
        var y      = this.el.y.baseVal.value;
        var width  = this.el.width.baseVal.value;
        var height = this.el.height.baseVal.value;
        
        this.text = this.paper.text(x + width / 2, y + height / 2, this.note.contains('_g') ? this.note.contains('_g#') ? this.note.substr(0,this.note.length - 3) + '#' : this.note.substr(0,this.note.length - 2) : this.note );
        this.text.attr('font-size', height * this.options.fontSize);
        this.text.attr('opacity', 0);
        this.text.attr('fill', "#00F");
        this.text.attr('stroke', "#000");
        this.text.attr('stroke-width', "3");
        this.text.hover(function(){
          this.attr('stroke-width', "10");
        },function (){
          this.attr('stroke-width', "1");        
        }, this.rect, this.rect);
    },
    
    getRect: function() {
      return this.rect;
    },

    play: function() {
        this.text.attr('opacity', "1");
        //this.text.animate({opacity: 1}, this.options.animationTime)        
        this.rect.attr('fill', 'url(patterns/white.png)');        
        setTimeout(function() {
            this.rect.animate({fill: this.options.color}, this.options.animationTime);
            this.text.animate({opacity: 0}, this.options.animationTime - 150)
            this.rect.attr('fill', 'url(patterns/pat' + this.pattenURL + '.png)');   
            }.bind(this), this.options.animationTime);

        this.sound.playSound();
    }
  
});
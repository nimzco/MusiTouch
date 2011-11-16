var Case = new Class({

    Implements: [Options, Events],

    options: {
        color : '#AAE'
    }, 
    initialize: function(paper, options){
        this.setOptions(options);
        var audioWrapper = document.getElementById('audio_wrapper');
        audioWrapper.innerHTML += "<audio id=" + "kjh" + " src=\"sounds/"+ "lkjh" + "\" preload=\"auto\" autobuffer>";
        this.paper = paper;
        this.rect = this.paper.rect(0,0,0,0,3);
        this.rect.attr('fill', this.options.color);
        //this.rect.click(sound.playSound);        
    },
    
    getRect: function() {
      return this.rect;
    }
});
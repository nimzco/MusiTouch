var Game = new Class({

    Implements: [Options, Events],

    options: {
        squareMargin    : 0.04, // Distance between squares in %
        squareColor     : '#AAE',
        timeBetweenNotes: 500, // in ms
        freegame        : false,
        totalTime       : 0,
        nextTime        : 0,
        noticeTime      : 1000
    }, 
    initialize: function(nbSquare, paper, options){
        $(document.body).removeEvent('keydown', musiTouch.menu.keyDownFunctionEvent);
        window.NOTES = {
            4 : ['Sol', 'La', 'Si', 'Fa'],
            6 : ['Sol_g', 'Si_g', 'Do', 'Fa_g', 'Fa_g#', 'La'],
            12: ['Do', 'Re_g#', 'Mi_g', 'Re_g', 'Mi', 'Fa_g', 'Fa_g#','Sol_g', 'Si_g', 'La_g', 'La_g#', 'Si_g'], 
            0: ['Do', 'Do#', 'Re', 'Re#', 'Mi', 'Fa', 'Fa#', 'Sol', 'Sol#', 'La', 'La#', 'Si']
        };
        window.MELODIES = {
            4 : [['Sol', 'Sol', 'Sol', 'La', 'Si+', 'La+', 'Sol', 'Si', 'La', 'La', 'Sol*', 'Sol', 'Sol', 'Sol', 'La', 'Si+', 'La+', 'Sol', 'Si', 'La', 'La', 'Sol*' ] /* AU clair de la lune*/
                 ],
            6 : [['Sol_g', 'Sol_g' , 'Si_g', 'Do-', 'Sol_g', 'Sol_g', 'Fa_g', 'Fa_g#-', 'Sol_g', 'Sol_g', 'Si_g', 'Do-', 'Sol_g', 'Sol_g', 'Fa_g', 'Fa_g#-', 'Sol_g']  /* Mission impossible */ 
                ],
            12: [['Re_g#-', 'Mi_g*', 'Fa_g#-', 'Sol_g*', 'Re_g#-', 'Mi_g', 'Fa_g#-', 'Sol_g', 'Do-', 'Si_g+', 'Mi_g', 'Sol_g', 'Si_g-', 'La_g#*', 'La_g-', 'Sol_g-', 'Mi_g-', 'Re_g-', 'Mi_g*'],
                 ['Mi', 'Re#', 'Si_g', 'Re', 'Mi', 'Do', 'La_g', 'Do-', 'Si_g', 'Fa_g#']]
        };


/*
        window.MELODIES = [['Do', 'Re', 'Mi', 'Re', 'Mi', 'Fa', 'Do', 'Re', 'Mi'],
                           ['Si', 'Sol', 'Mi', 'Sol', 'Si', 'Sol', 'Mi', 'Sol', 'Si']];
*/

        // Refers to a table
        this.melodyNumber = 0 /* Math.floor(Math.random() * MELODIES[nbSquare].length); */
        // Refers where it has stopped in the melody
        this.first = true;
        switch(nbSquare) {
            case 4: this.progression = 1; break
            case 6: this.progression = 2; break
            case 12:this.progression = 3; break
        }
        window.COLORS = ["#FF0000", "#FF9900", "#FFFF00", "#00EE00", "#2200CC", "#8800CC", "#009E00", "#00BFFF", "#ff0d9a", "#0060e6", "#bfff00", "#0000FF"];
        //window.COLORS.sort(Math.round(Math.random()) - 0.5);
        this.setOptions(options);
        this.nbSquare = nbSquare;
        this.paper    = paper;
        this.paper.clear();
        this.squares = []
        for (var i = 0; i < this.nbSquare; i += 1) {
            var tmpSquare = new Square(this.paper, i, this.nbSquare, {color: COLORS[i], freegame: this.options.freegame});
            this.squares.push(tmpSquare);
        }
        this.draw();
        window.onresize = this.draw.bind(this);
        if (this.options.freegame) {
            this.handleClick();
        } else {
            this.play();            
        }
        this.lastSelectedIndex = 0;
        this.squares[this.lastSelectedIndex].select();
        this.handleKeyboard();
    }, 
    
    giveMeTheNote: function(note) {
        if (note.contains('+') || note.contains('*') || note.contains('-')) {
            return note.substr(0, note.length - 1);
        } else {
            return note;
        }
    },
    
    // Play the song that the gamer will have to reproduce
    play: function() {
        // This variable tells that the user cannnot click. He will be able to do so after the song has been played.
        this.isPlaying = true;
        setTimeout(function() { this.isPlaying = false; }.bind(this), this.progression * this.options.timeBetweenNotes);
        this.options.totalTime = 0;
        for (var i = 0; i < this.progression; i += 1) {
            var noteToPlay = NOTES[this.nbSquare].indexOf(this.giveMeTheNote(MELODIES[this.nbSquare][this.melodyNumber][i]));
            this.options.totalTime += this.options.timeBetweenNotes;
            setTimeout(this.squares[noteToPlay].play.bind(this.squares[noteToPlay]), this.options.totalTime);
            if (MELODIES[this.nbSquare][this.melodyNumber][i].contains('+')) {
              this.options.totalTime += 250;
            }
            if (MELODIES[this.nbSquare][this.melodyNumber][i].contains('*')) {
              this.options.totalTime += 500;
            }
            if (MELODIES[this.nbSquare][this.melodyNumber][i].contains('-')) {
              this.options.totalTime -= 250;
            }
        }
        this.listen();   
    },

    listen: function() {
        this.currentAdvance = 0;
        if (this.first) {
            // For all squares
            for (var i = 0; i < this.squares.length; i += 1) {
                // Add an event to listen the click
                // The 'this' reference has been passed as the 'Game'
                var onClickFunction = function(i) {
                    // Only if the game is not playing sounds
                    if (!this.isPlaying) {
                        // Play the sound when clicked
                        this.squares[i].play();
                        this.amIRight(i);
                    }
                }.bind(this, i);
                this.squares[i].el.     addEvent('click',       onClickFunction);
                this.squares[i].el.     addEvent('touchstart',  onClickFunction);
                this.squares[i].text[0].addEvent('click',       onClickFunction);
                this.squares[i].text[0].addEvent('touchstart',  onClickFunction);
            }
        }
        this.first = false;
    },
    
    amIRight: function(squareIndex) {
        // Check if the player has touched the right square
        // Note that has to be played
        var indexOfNoteToBePlayed = NOTES[this.nbSquare].indexOf(this.giveMeTheNote(MELODIES[this.nbSquare][this.melodyNumber][this.currentAdvance]))
        if (this.squares[squareIndex] === this.squares[indexOfNoteToBePlayed]) {
            this.currentAdvance += 1;
            // Then the user has finished the song.
            if (this.currentAdvance === this.progression && this.progression == MELODIES[this.nbSquare][this.melodyNumber].length) {
                setTimeout(this.showNotice.pass('Vous avez gagné !', this), 500);
                var sound = new buzz.sound( "sounds/mission2", {
                  formats: [ "mp3" ],
                  preload: true
                });
                sound.play();
                setTimeout(window.musiTouch.menu.reinitialize.bind(window.musiTouch.menu), 60000);
            } // Else, if he has just played correctly the notes
            else if (this.currentAdvance === this.progression) {
                switch(this.nbSquare) {
                    case 4: this.progression += 1; break
                    case 6: this.progression += 2; break
                    case 12:this.progression += 3; break
                }
                
                setTimeout(this.play.bind(this), this.options.noticeTime + 500);
                this.currentAdvance = 0;
                setTimeout(this.showNotice.pass("Bien joué !", this), 400);
                // TODO Show "Well done"
            }
        } else {
            this.currentAdvance = 0;
            this.isPlaying = true;
            setTimeout(this.play.bind(this), this.options.noticeTime + 500);
            setTimeout(this.showNotice.pass("Recommence", this), 400);
            // TODO Show "Try Again"
        }  
    },
    
    showNotice: function (text) {
        var noticeScreen = paper.rect(0,0,window.innerWidth, window.innerHeight);
        noticeScreen.attr('fill', '#ddd');
        var notice = paper.text(window.innerWidth / 2, window.innerHeight / 2, text);
        notice.attr('font-size', 100);
        setTimeout(function() {
            noticeScreen.remove();
            notice.remove();
        }, this.options.noticeTime);
    },
    
    /*
     * Adapt the size of the canvas regarding the window size.
    */
    draw: function() {
       // Set new Height and Width of the browser's window
       var windowHeight = window.innerHeight;
       var windowWidth  = window.innerWidth;
       // Compute size of the Canvas again
       var canvasHeight = windowHeight * .99; // 99% to prevent scrollbars
       var canvasWidth  = windowWidth * .99; 
    
       var nbLines = Math.round(Math.sqrt(this.nbSquare))
    
       // Compute all sizes again
       var squareMarginHeight = this.options.squareMargin * canvasHeight
       var squareMarginWidth  = this.options.squareMargin * canvasWidth
       var squareHeight       = (canvasHeight - (nbLines + 1) * squareMarginHeight) / nbLines;
       var nbSquarePerLine    = this.nbSquare / nbLines
       var squareWidth        = (canvasWidth  - (nbSquarePerLine + 1) * squareMarginWidth) / nbSquarePerLine;
       
       this.paper.setSize(canvasWidth, canvasHeight);
       for (var i = 0; i < nbLines; i += 1) {
           var y0 = (squareHeight + squareMarginHeight) * i + squareMarginHeight;
           for (var j = 0; j < nbSquarePerLine; j+= 1) {
               var currentSquare = j + i * nbSquarePerLine
               this.squares[currentSquare].getRect().attr('x', j * (squareWidth + squareMarginWidth) + squareMarginWidth);
               this.squares[currentSquare].getRect().attr('y', y0);
               this.squares[currentSquare].getRect().attr('width', squareWidth);
               this.squares[currentSquare].getRect().attr('height', squareHeight);
               this.squares[currentSquare].drawTextInsideRect();
           }
       }
       this.handleClick();
    },
    
    handleClick: function() {
        for (var i = 0; i < this.squares.length; i += 1) {
            this.squares[i].el.     addEvent('click',       function(i) {this.squares[i].play();}.bind(this,i));
            this.squares[i].el.     addEvent('touchstart',  function(i) {this.squares[i].play();}.bind(this,i));
            this.squares[i].text[0].addEvent('click',       function(i) {this.squares[i].play();}.bind(this,i));
            this.squares[i].text[0].addEvent('touchstart',  function(i) {this.squares[i].play();}.bind(this,i));
        }
    },
    
    handleKeyboard: function() {
        $(document.body).addEvent('keydown', function(event) {
            if (event.key == 'space' || event.key == 'enter') {
                if (this.options.freegame) {
                    this.squares[this.lastSelectedIndex].play();
                } else if (!this.options.freegame && !this.isPlaying){
                    this.squares[this.lastSelectedIndex].play();
                    this.amIRight(this.lastSelectedIndex);
                }
            } else {
                var nbOfSquarePerLines = this.nbSquare / Math.round(Math.sqrt(this.nbSquare))
                var newIndex = this.lastSelectedIndex;
                if        (event.key == 'down') {
                    newIndex += nbOfSquarePerLines;
                } else if (event.key == 'up') {
                    newIndex -= nbOfSquarePerLines;
                    if (newIndex < 0) {
                        newIndex = this.nbSquare + newIndex;
                    }
                } else if (event.key == 'right') {
                    newIndex += 1;
                } else if (event.key == 'left') {
                    if (newIndex == 0) {
                        newIndex = this.nbSquare - 1;
                    } else {
                        newIndex -= 1;                        
                    }
                }
                newIndex = newIndex % this.nbSquare;
                if (event.key == 'down' || event.key == 'up' || event.key == 'right' || event.key == 'left') {
                    this.squares[this.lastSelectedIndex].deselect();
                    this.lastSelectedIndex = newIndex;
                    this.squares[this.lastSelectedIndex].select();
                }
            }
        }.bind(this));
    }
});
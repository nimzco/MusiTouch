var Game = new Class({

    Implements: [Options, Events],

    options: {
        squareMargin: 0.02, // Distance between squares in %
        squareColor : '#AAE'
    }, 
    initialize: function(nbSquare, paper, menu, options){
        this.menu = menu;
/*
        window.NOTES = { do:"Do", 
                         re:"Re", 
                         mi: "Mi", 
                         fa: "Fa", 
                         sol: "Sol", 
                         la: "La", 
                         si: "Si"}
*/
        window.NOTES = ["Do", 
                        "Do_d",
                        "Re",
                        "Re_d", 
                        "Mi", 
                        "Fa", 
                        "Fa_d",
                        "Sol", 
                        "Sol_d",
                        "La",
                        "La_d", 
                        "Si"];
                        
        window.EPPIC = new buzz.sound( "sounds/NOTESA", {
          formats: [ "mp3" ],
          preload: true
        });
        var iTime = 0;
        window.EPPIC.bind("play", function(e) {
          iTime = new Date().getTime();
          window.first = false;  
        });
        
        window.first = true;
        
        window.EPPIC.bind("timeupdate", function(e) {
          //var timer = buzz.toTimer(this.getTime());
          var time = new Date().getTime();
          //console.log(time - iTime); 
          //console.log(time - iTime >= 1500);
          if (time - iTime >= 1500) {
            window.EPPIC.pause();
          }
        });
        
        
        
        
        window.COLORS = ["#FF0000", "#FF9900", "#FFFF00", "#00EE00", "#2200CC", "#8800CC", "#009E00", "#00BFFF", "#ff0d9a", "#0060e6", "#bfff00", "#0000FF"];
        window.COLORS.sort(Math.round(Math.random())-0.5);
        this.setOptions(options);
        this.nbSquare = nbSquare;
        this.paper    = paper;
        this.paper.clear();
        this.squares = []
        for (var i = 0; i < this.nbSquare; i += 1) {
            var tmpCase = new Case(this.paper, NOTES[i], {color: COLORS[i]});
            this.squares.push(tmpCase);
        }
        this.draw();
        window.onresize = this.draw.bind(this);
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
           }
       }
    }
});
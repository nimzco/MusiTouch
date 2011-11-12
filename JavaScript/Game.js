var Game = new Class({

    Implements: [Options, Events],

    options: {
        squareMargin: 0.02, // Distance between squares in %
        squareColor : '#AAE'
    }, 
    initialize: function(nbSquare, paper, options){
        this.setOptions(options);
        this.nbSquare = nbSquare;
        this.paper    = paper;
        this.paper.clear();
        this.squares = []
        for (var i = 0; i < this.nbSquare; i += 1) {
            this.squares.push(this.paper.rect(0,0,0,0,3));
            this.squares[i].attr('fill', this.options.squareColor);
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
                 this.squares[currentSquare].attr('x', j * (squareWidth + squareMarginWidth) + squareMarginWidth);
                 this.squares[currentSquare].attr('y', y0);
                 this.squares[currentSquare].attr('width', squareWidth);
                 this.squares[currentSquare].attr('height', squareHeight);
             }
         }
     }
    

});
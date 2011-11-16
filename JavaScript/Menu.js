var Menu = new Class({

    Implements: [Options, Events],

    options: {
        // Following variables are in percent
        menuSpacing   : .05, // Vertical spacing between menus
        menuWidth     : .9,  // Width of a menu
        fontSize      : .8,  // Font size regarding the height of a menu.
        // Colors
        menuColor     : '#AAE',
        menuHoverColor: '#A00',
        // Time
        menuIntervalTime: 1500 // ms
    },
    /*
     * menuNames: ["Menu 1", "Menu 2", "Option", ...]
     * canvasID: "canvas"
     */
    initialize: function(menuNames, paper, options){
        this.setOptions(options);
        this.changeMenuTimeoutID;
        this.menuNames = menuNames;
        this.nbMenu    = menuNames.length;
        this.paper     = paper; 
        this.paper.clear();
        this.menuRects = []; this.menuTexts = [];
        for (var i = 0; i < this.nbMenu; i += 1) {
            this.menuRects.push(this.paper.rect(0,0,0,0,3));
            this.menuRects[i].attr('fill', this.options.menuColor);
            this.menuTexts.push(this.paper.text(0,0, this.menuNames[i]));
        }
        this.draw();

        window.onresize = this.draw.bind(this);

        this.handleMouseOver();

        this.launchChangeMenuSelection();
        
        this.musiTouchClickHandler();
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

        // Compute all sizes again
        var menuSpacing = canvasHeight  * this.options.menuSpacing;
        var menuHeight  = (canvasHeight - (this.nbMenu + 1) * menuSpacing) / this.nbMenu;
        var menuWidth   = canvasWidth   * this.options.menuWidth;
        var menuX       = (canvasWidth  - menuWidth) / 2;
        this.fontSize   = menuHeight    * this.options.fontSize;
        this.paper.setSize(canvasWidth, canvasHeight);

        for (var i = 0; i < this.nbMenu; i += 1) {
            this.menuRects[i].attr('x', menuX);
            this.menuRects[i].attr('y', menuSpacing + (i * (menuHeight + menuSpacing)));
            this.menuRects[i].attr('width', menuWidth);
            this.menuRects[i].attr('height', menuHeight);
            this.menuTexts[i].attr('x', canvasWidth / 2);
            this.menuTexts[i].attr('y', menuSpacing + (menuHeight / 2) + i * (menuHeight + menuSpacing));
            this.menuTexts[i].attr('font-size', this.fontSize);
        }
    },

    /*
     * /!\ Quite confusing because of the 'this'...
     * Handle the mouse In et and the mouse Out functions
     */
    handleMouseOver: function() {
        // The two following functions take 'Menu' as parameter.
        // It refers to the current Menu Object.
        // Hereafter, 'this' refers to the menu rectangle itselfs (Raphael's element)
        var hoverIn = function(Menu) {
            Menu.clearMenuColor();
            this.attr('fill', Menu.options.menuHoverColor);
            clearInterval(Menu.changeMenuTimeoutID)
        };
        var hoverOut = function(Menu) {
            this.attr('fill', Menu.options.menuColor);
            Menu.launchChangeMenuSelection();
        };
        // Mouse hover handler
        for (var i = 0; i < this.nbMenu; i += 1) {
            this.menuRects[i].hover(hoverIn.bind(this.menuRects[i], this), hoverOut.bind(this.menuRects[i], this));
            // In order that the menu keep the right color when the mouse is over the text
            this.menuTexts[i].hover(hoverIn.bind(this.menuRects[i], this), hoverOut.bind(this.menuRects[i], this)); // Passing menuRects as context in order as THEY change color
        }
    },

    /*
     * Clear the 'hover color' of all the menus
     */
    clearMenuColor: function () {
        for (var i = 0; i < this.nbMenu; i += 1) { 
            this.menuRects[i].attr('fill', this.options.menuColor);
        }
    },
    /*
     * Make the menu selection change automatically
     */
    launchChangeMenuSelection: function () {
        var currentMenuSelection = 0;
        var changeMenuSelection = function () {
            this.clearMenuColor();
            this.menuRects[currentMenuSelection].attr('fill', this.options.menuHoverColor);
            currentMenuSelection = (currentMenuSelection == this.nbMenu - 1 ? 0 : currentMenuSelection + 1);
        }.bind(this);
        this.changeMenuTimeoutID = setInterval(changeMenuSelection, this.options.menuIntervalTime);
    },
    
    musiTouchClickHandler: function() {
        this.menuRects[0].click(function() { var game = new Game(6, this.paper); });
        this.menuTexts[0].click(function() { var game = new Game(6, this.paper); });

        this.menuRects[1].click(function() { var game = new Game(4, this.paper); });
        this.menuTexts[1].click(function() { var game = new Game(4, this.paper); });

        this.menuRects[2].click(function() { var game = new Game(6, this.paper); });
        this.menuTexts[2].click(function() { var game = new Game(6, this.paper); });

        this.menuRects[3].click(function() { var game = new Game(12, this.paper); });
        this.menuTexts[3].click(function() { var game = new Game(12, this.paper); });

    }

});
var Menu = new Class({

    Implements: [Options, Events],

    options: {
        // Following variables are in percent
        menuSpacing   : .05, // Vertical spacing between menus
        menuWidth     : .9,  // Width of a menu
        fontSize      : .8,  // Font size regarding the height of a menu.
        // Colors
        menuColor     : '#bfff00',
        menuHoverColor: '#15007d',
        // Time
        menuIntervalTime: 1300 // ms
    },
    /*
     * menuNames: ["Menu 1", "Menu 2", "Option", ...]
     * paper    : Raphael Object
     */
    initialize: function(menuNames, paper, options){
        this.setOptions(options);
        this.changeMenuTimeoutID;
        this.menuNames = menuNames;
        this.nbMenu    = menuNames.length;
        this.paper     = paper; 
        this.draw();
        this.currentSelectedMenu = 0;
        window.onresize = this.draw.bind(this);

        this.handleMouseOver();

        this.launchChangeMenuSelection();
        
        this.musiTouchClickHandler();
        
    },
    
    reinitialize: function() {
        window.location.reload();
    },
    
    /*
     * Adapt the size of the canvas regarding the window size.
     */
    draw: function() {
        this.paper.clear();
        this.menuRects = []; this.menuTexts = [];
        for (var i = 0; i < this.nbMenu; i += 1) {
            this.menuRects.push(this.paper.rect(0,0,0,0,3));
            this.menuRects[i].attr('fill', this.options.menuColor);
            this.menuTexts.push(this.paper.text(0,0, this.menuNames[i]));
        }
        
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
            this.menuTexts[i].attr('fill', '#000');
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
        var hoverIn = function(menuIndex) {
            this.clearMenuColor();
            this.menuRects[menuIndex].attr('fill', this.options.menuHoverColor);
            this.menuTexts[menuIndex].attr('fill', '#fff');
            clearInterval(this.changeMenuTimeoutID)
        };
        var hoverOut = function(menuIndex) {
            this.clearMenuColor();
            this.launchChangeMenuSelection();
        };
        // Mouse hover handler
        for (var i = 0; i < this.nbMenu; i += 1) {
            this.menuRects[i].hover(hoverIn.bind(this, i), hoverOut.bind(this, i));
            // In order that the menu keep the right color when the mouse is over the text
            this.menuTexts[i].hover(hoverIn.bind(this, i), hoverOut.bind(this, i));
        }
    },

    /*
     * Clear the 'hover color' of all the menus
     */
    clearMenuColor: function () {
        for (var i = 0; i < this.nbMenu; i += 1) { 
            this.menuRects[i].attr('fill', this.options.menuColor);
            this.menuTexts[i].attr('fill', '#000');
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
            this.menuTexts[currentMenuSelection].attr('fill', '#fff');
            currentMenuSelection = (currentMenuSelection == this.nbMenu - 1 ? 0 : currentMenuSelection + 1);
            this.currentSelectedMenu = (currentMenuSelection === 0 ? 4 : currentMenuSelection - 1); // Some problems due to the setInterval
        }.bind(this);
        this.changeMenuTimeoutID = setInterval(changeMenuSelection, this.options.menuIntervalTime);
    },
    
    musiTouchClickHandler: function() {
        var paper = this.paper;
        
        $(this.menuRects[0][0]).addEvent('click',      function() { new Game(12, paper, {freegame: true}); });
        $(this.menuTexts[0][0]).addEvent('click',      function() { new Game(12, paper, {freegame: true}); });
        $(this.menuRects[0][0]).addEvent('touchstart', function() { new Game(12, paper, {freegame: true});});
        $(this.menuTexts[0][0]).addEvent('touchstart', function() { new Game(12, paper, {freegame: true}); });

        $(this.menuRects[1][0]).addEvent('click',      function() { new Game(4, paper); });
        $(this.menuTexts[1][0]).addEvent('click',      function() { new Game(4, paper); });
        $(this.menuRects[1][0]).addEvent('touchstart', function() { new Game(4, paper);});
        $(this.menuTexts[1][0]).addEvent('touchstart', function() { new Game(4, paper); });
        
        $(this.menuRects[2][0]).addEvent('click',      function() { new Game(6, paper); });
        $(this.menuTexts[2][0]).addEvent('click',      function() { new Game(6, paper); });
        $(this.menuRects[2][0]).addEvent('touchstart', function() { new Game(6, paper);});
        $(this.menuTexts[2][0]).addEvent('touchstart', function() { new Game(6, paper); });

        $(this.menuRects[3][0]).addEvent('click',      function() { new Game(12, paper); });
        $(this.menuTexts[3][0]).addEvent('click',      function() { new Game(12, paper); });
        $(this.menuRects[3][0]).addEvent('touchstart', function() { new Game(12, paper);});
        $(this.menuTexts[3][0]).addEvent('touchstart', function() { new Game(12, paper); });

        $(document.body).addEvent('keydown', function(event) {
            if (event.key == 'space') {
                switch(this.currentSelectedMenu) {
                    case 0: 
                        new Game(12, paper, {freegame: true});
                        break;
                    case 1: 
                        new Game(4, paper);
                        break;
                    case 2: 
                        new Game(6, paper);
                        break;
                    case 3: 
                        new Game(12, paper);
                        break;
                }
            }
        }.bind(this));


    }

});
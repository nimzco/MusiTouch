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
    initialize: function(menuNames, canvasID, options){
        this.setOptions(options);
        this.changeMenuTimeoutID;
        this.menuNames = menuNames;
        this.nbMenu    = menuNames.length;
        this.paper     = Raphael(canvasID, 0, 0);
        this.menuRects = []; this.menuTexts = [];
        for (var i = 0; i < this.nbMenu; i += 1) {
            this.menuRects.push(this.paper.rect(0,0,0,0,3));
            this.menuRects[i].attr('fill', this.options.menuColor);
            this.menuTexts.push(this.paper.text(0,0, this.menuNames[i]));
        }
        this.refreshSize();

        window.onresize = this.refreshSize.bind(this);

        this.handleMouseOver();

        this.launchChangeMenuSelection();
    },

    /*
     * Adapt the size of the canvas regarding the window size.
     */
    refreshSize: function() {
        // Set new Height and Width of the browser's window
        this.windowHeight = window.innerHeight;
        this.windowWidth  = window.innerWidth;
        // Compute size of the Canvas again
        this.canvasHeight = this.windowHeight * .99; // 99% to prevent scrollbars
        this.canvasWidth  = this.windowWidth * .99; 

        // Compute all sizes again
        this.menuSpacing = this.canvasHeight  * this.options.menuSpacing;
        this.menuHeight  = (this.canvasHeight - (this.nbMenu + 1) * this.menuSpacing) / this.nbMenu;
        this.menuWidth   = this.canvasWidth   * this.options.menuWidth;
        var menuX        = (this.canvasWidth  - this.menuWidth) / 2;
        this.fontSize    = this.menuHeight    * this.options.fontSize;
        this.paper.setSize(this.canvasWidth, this.canvasHeight);

        for (var i = 0; i < this.nbMenu; i += 1) {
            this.menuRects[i].attr('x', menuX);
            this.menuRects[i].attr('y', this.menuSpacing + (i * (this.menuHeight + this.menuSpacing)));
            this.menuRects[i].attr('width', this.menuWidth);
            this.menuRects[i].attr('height', this.menuHeight);
            this.menuTexts[i].attr('x', this.canvasWidth / 2);
            this.menuTexts[i].attr('y', this.menuSpacing + (this.menuHeight / 2) + i * (this.menuHeight + this.menuSpacing));
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
    }

});
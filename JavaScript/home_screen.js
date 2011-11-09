// Height and Width of the browser window and the Canvas
var WINDOW_HEIGH = window.innerHeight, WINDOW_WIDTH = window.innerWidth;
var canvasHeight = WINDOW_HEIGH * .99, canvasWidth  = WINDOW_WIDTH * .99; // 99% to prevent scrollbars

// Menu
var nbMenu = 5;
var menuSpacing;
var menuHeight, menuWidth;
var menuX;
var fontSize;
var paper;
var menuRects = [], menuTexts = []

var createMenu = function() {
  // Creation of the menu
  for (var i = 0; i < nbMenu; i += 1) {
    menuRects.push(paper.rect(0,0,0,0,3));
    menuRects[i].attr('fill', '#AAE');
    menuTexts.push(paper.text(0,0,''));
  }  
}

var refreshSize = function() {
  // Recalculating all size
  // Height and Width of the browser window and the Canvas
  WINDOW_HEIGH = window.innerHeight, WINDOW_WIDTH = window.innerWidth;
  canvasHeight = WINDOW_HEIGH * .99, canvasWidth  = WINDOW_WIDTH * .99; // 99% to prevent scrollbars

  // Menu
  menuSpacing = canvasHeight  * .05;                                  // 5% of the canvasHeight
  menuHeight  = (canvasHeight - (nbMenu + 1) * menuSpacing) / nbMenu; // Menu Height
  menuWidth   = canvasWidth   * .8;                                   // 80% of the Canvas
  menuX       = (canvasWidth  - menuWidth) / 2;                       // X coordinate of the menu
  fontSize    = menuHeight    * .8;
  paper.setSize(canvasWidth, canvasHeight);

  for (var i = 0; i < nbMenu; i += 1) {
    menuRects[i].attr('x', menuX)
    menuRects[i].attr('y', menuSpacing + (i * (menuHeight + menuSpacing)));
    menuRects[i].attr('width', menuWidth);
    menuRects[i].attr('height', menuHeight);
    menuTexts[i].attr('x', canvasWidth / 2);
    menuTexts[i].attr('y', menuSpacing + (menuHeight / 2) + i * (menuHeight + menuSpacing));
    menuTexts[i].attr('font-size', fontSize);
  }
}

window.onresize = refreshSize;
var changeMenuTimeout;
var launchChangeMenuSelection;
$(document).ready(function() {
  // Defining the Canvas with Raphael
  paper = Raphael('canvas', canvasWidth, canvasHeight);
  createMenu();
  refreshSize();
  var clearRectangleColor = function () {
    for (var i = 0; i < nbMenu; i += 1) { menuRects[i].attr('fill', '#AAE');}
  }
  var hoverIn = function(mouseEvent, x, y) {
    clearRectangleColor();
    this.attr('fill', '#A00');
    clearInterval(changeMenuTimeout)
  };
  var hoverOut = function(mouseEvent, x, y) {
    this.attr('fill', '#AAE');
    launchChangeMenuSelection();//, 800);;
  }
  // Hover handler
  for (var i = 0; i < nbMenu; i += 1) {
    menuRects[i].hover(hoverIn, hoverOut)
    menuTexts[i].hover(hoverIn, hoverOut, menuRects[i], menuRects[i]) // Passing menuRects as context in order as THEY change color
  }
  menuTexts[0].attr('text', 'Libre');
  menuTexts[1].attr('text', 'Facile');
  menuTexts[2].attr('text', 'Moyen');
  menuTexts[3].attr('text', 'Difficile');
  menuTexts[4].attr('text', 'Instructions');
  launchChangeMenuSelection = function () {
    var currentMenuSelection = 0;
    var changeMenuSelection = function () {
      clearRectangleColor();
      menuRects[currentMenuSelection].attr('fill', '#A00');
      currentMenuSelection = (currentMenuSelection == nbMenu - 1 ? 0 : currentMenuSelection + 1);
    };
    changeMenuTimeout = setInterval(changeMenuSelection, 1500);
  }
  launchChangeMenuSelection();  
  
});

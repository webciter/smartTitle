(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define('Title', [], function () {
      return (root['Title'] = factory());
    });
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    root['Title'] = factory();
  }
}(this, function () {

/* smartTitle.js 1.0.0
 * Copyright © 2017 David Clews
 * Free to use under MIT license.
 */
/**
 * Description
 *
 * @module Title
 */
var Title = {
  version: '1.0.0'
};

(function (window, document, Title) {
  'use strict';


    /* 
     * Title
     * 
     * Page title scrolling and flashing class
     * @para object options the options for the class
     */


	/* set defualt options */
        Title.options = {
		flashSpeed: 250,
		scrollSpeed: 50
	};

        /* 0 = original, 1 = new title */
        Title.currentState = 0;

        Title.states = {
            original: document.getElementsByTagName("title")[0].textContent,
            new: "",
        };

        Title.toggle = function(){
            if(Title.currentState === 0){
                document.title = Title.states.new;
                Title.currentState = 1;
            }else{
                document.title = Title.states.original;
                Title.currentState = 0;
            }
        }


        /* flash
         * 
         * start a flashing title action
         * 
         * @param {string} newTitle The title to scroll
         * @param {integer} duration The duration of the scrolling action
         * @return {void}
         * */
        Title.flash = function(newTitle, duration = 10000){
            if(typeof Title.scrollInterval === "undefined" && typeof Title.toggleInterval === "undefined"){

                Title.states.new = newTitle;

                var i = 0;
                var speed = (typeof Title.options.flashSpeed === "undefined" ? 1000 : Title.options.flashSpeed);

                Title.toggleInterval = setInterval(function(){
                   Title.toggle();
                   i += speed;
                   if(i >= duration){
                        /* stop timer */
                        clearInterval(Title.toggleInterval);

                        /* put page back to original state */
                        document.title = Title.states.original;
                   }
                }, speed);
            }
        }

        /* scroll
         * 
         * @param {string} newTitle The title to scroll
         * @param {integer} duration The duration of the scrolling action
         * @return {void}
         *   */
        Title.scroll = function(newTitle, duration = 10000){
            if(typeof newTitle !== "undefined"){
                /* no new title set for scroll use existing */
                if(typeof Title.toggleInterval === "undefined" && typeof Title.scrollInterval === "undefined"){
                    /* no flash running */
                    Title.doScroll(newTitle);
                }
            }else{
                /* use current title */
                if(typeof Title.toggleInterval === "undefined" && typeof Title.scrollInterval === "undefined"){
                    /* no flash running */
                    Title.doScroll(document.title = Title.states.original);
                }
            }
        }

        /* doScroll
         * 
         * @param {string} text The Text To Scroll
         * @param {integer} duration The duration of the scrolling action
         * @return {void}
         * */
        Title.doScroll = function(text, duration = 10000) {
            document.title = text;
            var i = 0;
            var speed = (typeof Title.options.scrollSpeed === "undefined" ? 1000 : Title.options.scrollSpeed);
            var position = 0;
            Title.scrollInterval = setInterval(function () {
                document.title = text.substr(position) + text.substr(0, position);

                position += 1;

                if(position >= text.length){
                    position = 0;
                }

                i += speed;

                if(i >= duration){
                    clearInterval(Title.scrollInterval);

                    /* put page back to original state */
                    document.title = Title.states.original;
                }
            }, speed);
        }



	
}(window, document, Title));

return Title;

})); 

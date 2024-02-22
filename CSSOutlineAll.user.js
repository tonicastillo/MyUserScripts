// ==UserScript==
// @version     0.1
// @name        CSS Outline All
// @namespace   
// @match       http://localhost:*/*
//
// @updateURL		https://github.com/tonicastillo/MyUserScripts/raw/main/CSSOutlineAll.user.js
// @icon        https://github.com/tonicastillo/MyUserScripts/raw/main/assets/CSSOutlineAll.user.js.png
// @grant       none
// @author      Toni Castillo
// @description Add a Outline to all elements in the page
// ==/UserScript==

(function() {
    'use strict';

    function addOutline() {
      console.log('Adding outline to all elements')
      var style = document.createElement('style');
      style.innerHTML = '* { outline: 1px solid red !important; }';
      document.head.appendChild(style);
    }
    // We add an event listener when the user press command + shift + o
    document.addEventListener('keydown', function(e) {
      console.log(e.key, e.shiftKey)
      if (e.key === 'o' && e.shiftKey) {
        addOutline();
      }
    });
})();
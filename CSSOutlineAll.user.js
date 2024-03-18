// ==UserScript==
// @version     0.3
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

(function () {
  "use strict";
  var style = document.createElement("style");
  style.id = "outlineAll";
  style.innerHTML = "* { outline: 1px solid rgba(0,0,0,0.1) !important; }";
  document.head.appendChild(style);
})();

// ==UserScript==
// @version     0.0.1
// @description 
// @name        OwnTone more Features
// @namespace   Violentmonkey Scripts
// @match       http://macbookserver.local:3699/
// @match       http://macbookserver.local:3689/
// @match       http://192.168.1.151:3699/
// @match       http://192.168.1.151:3689/
// @match       http://192.168.1.152:3689/
// @match       http://192.168.1.152:3699/
// @updateURL   https://github.com/tonicastillo/MyUserScripts/raw/main/TikTokListUserVideoPageLinks.user.js
// @icon        https://github.com/tonicastillo/MyUserScripts/raw/main/assets/TikTokListUserVideoPageLinks.svg
// @grant       none
// @author      -
// ==/UserScript==


(function () {
    "use strict";



// Select all anchor tags in the document
const anchors = document.querySelectorAll('a');

// Filter out the URLs that match the TikTok pattern
const tiktokURLs = Array.from(anchors)
  .map(anchor => anchor.href)
  .filter(href => href.match(/^https:\/\/www\.tiktok\.com\/@\w+\/video\/\d+$/));

// Log the URLs to the console
console.log(tiktokURLs);

// To also show this on the page, we create a pre element and append it to the body
const pre = document.createElement('pre');
pre.textContent = tiktokURLs.join('\n');
document.body.appendChild(pre);


})();

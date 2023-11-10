// ==UserScript==
// @version     0.0.1
// @description
// @name        TikTok List User Video Page Links
// @namespace
// @match       https://www.tiktok.com/@
// @updateURL   https://github.com/tonicastillo/MyUserScripts/raw/main/TikTokListUserVideoPageLinks.user.js
// @icon        https://github.com/tonicastillo/MyUserScripts/raw/main/assets/TikTokListUserVideoPageLinks.svg
// @grant       none
// @author      -
// ==/UserScript==

(function () {
  "use strict";

  const getLinks = () => {
    // Select all anchor tags in the document
    const anchors = document.querySelectorAll("a");

    // Filter out the URLs that match the TikTok pattern
    const tiktokURLs = Array.from(
      new Set(
        Array.from(anchors)
          .map((anchor) => anchor.href)
          .filter((href) =>
            href.match(/^https:\/\/www\.tiktok\.com\/@\w+\/video\/\d+$/)
          )
      )
    );
    // Crear un elemento flotante en la parte inferior derecha con una lista de todas las URLs de TikTok, con un tamaño de letra de 4px
    const floatingDiv = document.createElement("div");
    floatingDiv.style.position = "fixed";
    floatingDiv.style.bottom = "0";
    floatingDiv.style.right = "0";
    floatingDiv.style.backgroundColor = "white";
    floatingDiv.style.padding = "10px";
    floatingDiv.style.border = "1px solid black";
    floatingDiv.style.maxHeight = "200px";
    floatingDiv.style.overflow = "auto";
    floatingDiv.style.fontSize = "4px";
    floatingDiv.textContent = tiktokURLs.join("\n");
    document.body.appendChild(floatingDiv);


  };

  setTimeout(getLinks, 2000);
})();

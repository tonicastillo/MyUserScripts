// ==UserScript==
// @version     1.0.1
// @name        OwnTone more Features
// @namespace   
// @match       http://macbookserver.local:3699/
// @match       http://macbookserver.local:3689/
// @match       http://192.168.1.151:3699/
// @match       http://192.168.1.151:3689/
// @match       http://192.168.1.152:3689/
// @match       http://192.168.1.152:3699/
// @updateURL		https://github.com/tonicastillo/MyUserScripts/raw/main/OwnToneSomeFeatures.user.js
// @icon        https://owntone.github.io/owntone-server/assets/favicon.ico
// @grant       none
// @author      -
// @description 16/05/2023, 10:08:37
// ==/UserScript==

const AUTO_RANDOM_ALBUMS = true;

(function () {
  "use strict";

  //helpers
  const isInAlbumPage = () =>
    document.querySelector("li.is-active")?.innerText === "Albums";
  const getAlbumList = (asArray) => {
    const mediaLi = document.querySelectorAll("div.media");
    return asArray ? Array.from(mediaLi) : mediaLi;
  };

  var intv = setInterval(function () {
    // console.log("Intervalo");
    //   ____  _  _  ____   ___   __   ____
    //  (  _ \/ )( \/ ___) / __) / _\ (  _ \
    //   ) _ () \/ (\___ \( (__ /    \ )   /
    //  (____/\____/(____/ \___)\_/\_/(__\_)
    //
    //Botón buscar autor en DiscoGS
    if (!document.querySelector("a.discogslink")) {
      const authorLink = document.querySelector(
        "#app > div.fd-page > section.hero.is-light.is-bold.fd-content > div > div > div > div > div > div.column.is-three-fifths.has-text-centered-mobile > h2 > a"
      );
      const artistName = authorLink?.innerText;
      if (artistName) {
        const discoGSLink = document.createElement("a");
        discoGSLink.target = "_blank";
        discoGSLink.className = "discogslink";
        discoGSLink.innerHTML = "Buscar en Discogs";
        discoGSLink.style.marginLeft = "16px";
        discoGSLink.setAttribute(
          "href",
          "https://www.discogs.com/search/?type=artist&title=" + artistName
        );
        authorLink.insertAdjacentElement("afterend", discoGSLink);
      }
    }

    //   ____  __     __   _  _    __  __ _    __    __  ____  ____
    //  (  _ \(  )   / _\ ( \/ )  (  )(  ( \  (  )  (  )/ ___)(_  _)
    //   ) __// (_/\/    \ )  /    )( /    /  / (_/\ )( \___ \  )(
    //  (__)  \____/\_/\_/(__/    (__)\_)__)  \____/(__)(____/ (__)
    //
    // Play buttons in albums list view
    //WIP!!
    // const addPlayButtonsInList = () => {
    //   const mediaLi = getAlbumList(false);
    //   for (let i = 0; i < mediaLi.length; i++) {
    //     //console.log(mediaLi[i])
    //   }
    //   //api/queue/items/add?uris=library:album:1167953289073954383&shuffle=false&clear=true&playback=start
    // };

    //   ____   __   __ _  ____   __   _  _
    //  (  _ \ / _\ (  ( \(    \ /  \ ( \/ )
    //   )   //    \/    / ) D ((  O )/ \/ \
    //  (__\_)\_/\_/\_)__)(____/ \__/ \_)(_/
    //
    // Random button in album list view
    const randomSort = (selector) => {
      const parent = document.querySelector(selector).parentNode;
      const elements = Array.from(document.querySelectorAll(selector));
      
      const shuffledElements = elements.sort(() => Math.random() - 0.5);
      
      shuffledElements.forEach(el => parent.appendChild(el));
    };
    const randomAlbums = () => {
      var elementosLiABorrar = [];
      var elements = document.querySelectorAll('[id^="index_"]');
      for (var i = 0; i < elements.length; i++) {
        elementosLiABorrar.push(elements[i].parentNode);
      }
      // //Remove elements not necesary
      // const elementosLiABorrar = document.querySelectorAll(
      //   "div.fd-page-with-tabs > section > div > div > div > div > div:not(.media)"
      // );

      for (let i = 0; i < elementosLiABorrar.length; i++) {
        elementosLiABorrar[i].remove();
      }
      randomSort('.media.is-align-items-center')
    };

    if (!document.querySelector(".albumrandombutton") && isInAlbumPage()) {
      const randomize = document.createElement("span");
      randomize.target = "_blank";
      randomize.className = "albumrandombutton";
      randomize.innerHTML = "Randomize!";
      randomize.style.display = "block";
      randomize.style.border = "0.5px solid rgb(74, 74, 74)";
      randomize.style.padding = "8px 16px";
      randomize.style.cursor = "pointer";

      randomize.onclick = () => {
        randomAlbums();
      };
      //discoGSLink.setAttribute('href', 'https://www.discogs.com/search/?type=artist&title=' + artistName)

      const referenceEl = document.querySelector(
        "#top > div.level-left > div > div > p.heading"
      );

      referenceEl.insertAdjacentElement("afterend", randomize);

      if (AUTO_RANDOM_ALBUMS) {
        randomAlbums();
      }
    }
  }, 500);
})();

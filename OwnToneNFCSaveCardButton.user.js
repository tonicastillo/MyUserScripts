// ==UserScript==
// @name         OwnTone NFC Save Card Button
// @namespace    
// @version      0.4
// @description  
// @author       Toni Castillo
// @match        http://192.168.1.152:3679/*
// @match        http://192.168.1.152:3689/*
// @match        http://192.168.1.152:3699/*
// @updateURL    https://github.com/tonicastillo/MyUserScripts/raw/main/OwnToneNFCSaveCardButton.user.js
// @icon         https://owntone.github.io/owntone-server/assets/favicon.ico
// @grant        none
// ==/UserScript==

const servers = {
    '192.168.1.152:3679': {
        musicboxUrl: 'http://musicboxsalon.local/'
    },
    '192.168.1.152:3689': {
        musicboxUrl: 'http://musicboxestudio.local/'
    },
    '192.168.1.152:3699': {
        musicboxUrl: 'http://musicboxchildren.local/'
    }'
}


    (function () {
        'use strict';
        let musicboxUrl = ''
        for (let server in servers) {
            if (window.location.host === server) musicboxUrl = servers[server].musicboxUrl
        }


        var intv = setInterval(function () {
            var hash = window.location.hash
            var container = document.querySelector('h1.title')
            var button = document.querySelector('a.nfcmusicboxbutton')
            if (hash.substr(0, 15) === '#/music/albums/' && container && !button) {
                var albumId = hash.substr(15)

                var b = document.createElement('a');
                b.href = musicboxUrl + "#" + albumId
                b.target = "_blank"
                b.className = "nfcmusicboxbutton"
                b.innerHTML = "Save NFC"
                b.style.display = 'block'
                b.style.color = '#485fc7'
                b.style.fontSize = '10px'
                b.style.paddingBottom = '16px'
                container?.appendChild(b);
                //clearInterval(intv);
            }

        }, 500);

    })();
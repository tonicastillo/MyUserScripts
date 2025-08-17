// ==UserScript==
// @name         GitHub: Download Folder
// @namespace    https://github.com/tonicastillo
// @version      1.1
// @description  Download GitHub folders using download-directory.github.io (run from menu)
// @author       @tonicq
// @match        https://github.com/*/*/tree/*/**
// @grant        GM_registerMenuCommand
// @downloadURL  https://raw.githubusercontent.com/tonicastillo/MyUserScripts/refs/heads/main/src/github_io_download_folder.user.js
// @updateURL    https://raw.githubusercontent.com/tonicastillo/MyUserScripts/refs/heads/main/src/github_io_download_folder.user.js
// ==/UserScript==

(function() {
    'use strict';
    
    // Function to download the current folder
    function downloadCurrentFolder() {
        // Detect the current directory URL
        const url = window.location.href;
        // Create the download link
        const downloadUrl = `https://download-directory.github.io/?url=${url}`;
        // Open the download page in a new tab
        window.open(downloadUrl, '_blank');
    }
    
    // Register the command in the UserScript menu
    GM_registerMenuCommand("Download current folder", downloadCurrentFolder);
})();

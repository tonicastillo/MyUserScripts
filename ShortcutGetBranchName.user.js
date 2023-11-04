// ==UserScript==
// @name        Get branch name from story - shortcut.com
// @namespace   Violentmonkey Scripts
// @match       https://app.shortcut.com/*
// @grant       none
// @version     1.0
// @author      Toni Castillo
// @icon        https://app.shortcut.com/static/images/apple-touch-icon-11622bc99c.png
// @description Add custom branch name
// ==/UserScript==


const getBranchName = async () => {
  const currentUrl = window.location.href;
  const storyIdAndSlug = currentUrl.split("story/")[1].replace("/", "-");
  let storyType = null;
  while (storyType === null) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    storyType = document.querySelector(
      "#story-dialog-story-type-dropdown > span.value"
    );
  }
  let storyTypeText = storyType.innerText.toLowerCase();
  const branchName = storyTypeText + "/" + decodeAndRemoveAccents(storyIdAndSlug);
  addBranchNameAttribute(branchName)
};

const addBranchNameAttribute = (branchName) => {
  const storyIdAttributeEl = document.querySelector("#story-dialog-parent > div > div.content.story-container > div.scrollable-content > div > div > div.right-column > div > div.attribute.story-id")
  const branchNameAttributeEl = storyIdAttributeEl.cloneNode(true);
  branchNameAttributeEl.className = "attribute branch-name";
  branchNameAttributeEl.innerHTML = `<span class="name">Branch name</span><span class="value">${branchName}</span>`
  branchNameAttributeEl.addEventListener('click', () => {
    copyToClipboard(branchName);
  });
  storyIdAttributeEl.parentNode.insertBefore(branchNameAttributeEl, storyIdAttributeEl.nextSibling);
}

const existsBranchNameAttribute = () => {
  const branchNameAttributeEl = document.querySelector("#story-dialog-parent > div > div.content.story-container > div.scrollable-content > div > div > div.right-column > div > div.attribute.branch-name")
  return !!branchNameAttributeEl
}
const isStoryPage = () => {
  const storyIdAttributeEl = document.querySelector("#story-dialog-parent > div > div.content.story-container > div.scrollable-content > div > div > div.right-column > div > div.attribute.story-id")
  return !!storyIdAttributeEl
}

const copyToClipboard = (text) => {
  const el = document.createElement('textarea');
  el.value = text;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}


(async function () {
  setInterval(() => {
    const isStory = isStoryPage()
    const existsAttribute = existsBranchNameAttribute()
    if(isStory && !existsAttribute){
      getBranchName()
    }
  }, 500);
})();


//helpers


function decodeAndRemoveAccents(encodedStr) {
  const decodedStr = decodeURIComponent(encodedStr);
  const strWithNoAccents = decodedStr.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  return strWithNoAccents;
}


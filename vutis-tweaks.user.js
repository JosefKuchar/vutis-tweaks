// ==UserScript==
// @name         VUTIS tweaks
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Various VUTIS tweaks
// @author       Josef Kuchař
// @match        https://*.vut.cz/*
// @match        https://vut.cz/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=vut.cz
// @grant        none
// ==/UserScript==

// Removes subjects in menu from previous years
const cleanupMoodleMenu = () => {
  if (location.hostname === "moodle.vut.cz") {
    // Get current year (last two digits)
    const year = (new Date().getFullYear() % 100).toString();
    // Get all menu items
    const menuItems = document.querySelectorAll(
      "a.list-group-item.list-group-item-action"
    );
    for (const menuItem of menuItems) {
      const text = menuItem.textContent.trim();
      // Find only subject menu items
      const re = /\w+\s(\d+)\/(\w+)\s\(\d*\)/;
      const match = text.match(re);
      // Remove all subjects from non-current year
      if (match && match[1] !== year) {
        menuItem.parentElement.remove();
      }
    }
  }
};

// Remove teacher tab from upper menu
const removeTeacher = () => {
  const links = document.querySelectorAll(
    'a[href="https://www.vut.cz/teacher2/"]'
  );
  for (const link of links) {
    link.parentElement.remove();
  }
};

(function () {
  "use strict";
  cleanupMoodleMenu();
  removeTeacher();
})();

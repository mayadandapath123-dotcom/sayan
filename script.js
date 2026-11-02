// SAYAN — gradient name site. Small, dependency-free, theme-aware.
(function () {
  "use strict";

  var root = document.documentElement;
  var name = document.getElementById("name");
  var toggle = document.getElementById("theme");

  // Persist theme choice; fall back to the system preference.
  var saved = localStorage.getItem("sayan.theme");
  var prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
  root.setAttribute("data-theme", saved || (prefersLight ? "light" : "dark"));

  toggle.addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    toggle.textContent = next === "light" ? "🌙" : "☀️";
    localStorage.setItem("sayan.theme", next);
  });

  // Clicking the name re-seeds the gradient's hue offset for a little life.
  var hue = 0;
  name.addEventListener("click", function () {
    hue = (hue + 55) % 360;
    name.style.setProperty("--hue", hue + "deg");
  });
  name.style.setProperty("--hue", "0deg");
  name.style.setProperty("background-position", "0 center");

  // Spacebar also cycles the gradient.
  document.addEventListener("keydown", function (e) {
    if (e.code === "Space" && document.activeElement !== name) {
      e.preventDefault();
      name.click();
    }
  });
})();
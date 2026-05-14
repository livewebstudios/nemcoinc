/* NEMCO site interactions — vanilla JS, no framework. */
(function () {
  "use strict";

  /* -------------------------------------------------------------------
     Mobile nav toggle
     ------------------------------------------------------------------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* -------------------------------------------------------------------
     Services dropdown — click/tap support for touch devices
     ------------------------------------------------------------------- */
  document.querySelectorAll(".main-nav .has-dropdown > a").forEach(function (link) {
    link.addEventListener("click", function (e) {
      if (window.innerWidth <= 900) {
        e.preventDefault();
        link.parentElement.classList.toggle("open");
      }
    });
  });

  /* -------------------------------------------------------------------
     Hero auto-rotating slider
     ------------------------------------------------------------------- */
  var slider = document.querySelector(".hero-slider");
  if (slider) {
    var slides = slider.querySelectorAll(".hero-slide");
    var dotsContainer = document.querySelector(".hero-slider-dots");
    var current = 0;
    var timer;

    function go(i) {
      slides[current].classList.remove("is-active");
      current = (i + slides.length) % slides.length;
      slides[current].classList.add("is-active");
      if (dotsContainer) {
        dotsContainer.querySelectorAll("button").forEach(function (b, idx) {
          b.classList.toggle("is-active", idx === current);
        });
      }
    }

    function next() { go(current + 1); }

    function start() {
      stop();
      timer = setInterval(next, 6000);
    }

    function stop() { if (timer) clearInterval(timer); }

    if (slides.length > 1) {
      if (dotsContainer) {
        slides.forEach(function (_, i) {
          var b = document.createElement("button");
          b.type = "button";
          b.setAttribute("aria-label", "Show slide " + (i + 1));
          if (i === 0) b.classList.add("is-active");
          b.addEventListener("click", function () {
            go(i);
            start();
          });
          dotsContainer.appendChild(b);
        });
      }
      slider.addEventListener("mouseenter", stop);
      slider.addEventListener("mouseleave", start);
      start();
    }
  }

  /* -------------------------------------------------------------------
     Footer year
     ------------------------------------------------------------------- */
  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();
})();

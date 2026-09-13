/* Портфолио — Анна Шульцева: мобильное меню и просмотр изображений */

(function () {
  "use strict";

  /* ---------------------------------------------------- мобильное меню */

  var burger = document.querySelector(".burger");
  var nav = document.getElementById("nav");

  if (burger && nav) {
    burger.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        nav.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* -------------------------------------------------------- лайтбокс */

  var box = document.getElementById("lightbox");
  if (!box) return;

  var boxImg = box.querySelector("img");
  var boxCap = box.querySelector(".lightbox__cap");
  var closeBtn = box.querySelector(".lightbox__close");
  var triggers = Array.prototype.slice.call(document.querySelectorAll(".tile__frame[data-full]"));
  var current = -1;
  var lastFocused = null;

  function show(index) {
    if (index < 0) index = triggers.length - 1;
    if (index >= triggers.length) index = 0;

    var trigger = triggers[index];
    var img = trigger.querySelector("img");

    current = index;
    boxImg.src = trigger.getAttribute("data-full");
    boxImg.alt = img ? img.alt : "";
    boxCap.textContent = trigger.getAttribute("data-cap") || "";
  }

  function open(index) {
    lastFocused = document.activeElement;
    show(index);
    box.setAttribute("open", "");
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }

  function close() {
    box.removeAttribute("open");
    boxImg.removeAttribute("src");
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  triggers.forEach(function (trigger, index) {
    trigger.addEventListener("click", function () {
      open(index);
    });
  });

  closeBtn.addEventListener("click", close);

  box.addEventListener("click", function (e) {
    if (e.target === box) close();
  });

  document.addEventListener("keydown", function (e) {
    if (!box.hasAttribute("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") show(current + 1);
    if (e.key === "ArrowLeft") show(current - 1);
  });
})();

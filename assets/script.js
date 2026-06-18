(function () {
  var el = document.getElementById("year");
  if (el) el.textContent = String(new Date().getFullYear());

  var btn     = document.getElementById("menu-btn");
  var sidebar = document.getElementById("sidebar");
  var overlay = document.getElementById("sidebar-overlay");

  if (btn && sidebar && overlay) {
    btn.addEventListener("click", function () {
      var isOpen = sidebar.classList.toggle("open");
      overlay.classList.toggle("open", isOpen);
      btn.textContent = isOpen ? "\u2715 Close" : "\u2630 Menu";
      btn.setAttribute("aria-expanded", String(isOpen));
    });
    overlay.addEventListener("click", function () {
      sidebar.classList.remove("open");
      overlay.classList.remove("open");
      btn.textContent = "\u2630 Menu";
      btn.setAttribute("aria-expanded", "false");
    });
    sidebar.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        sidebar.classList.remove("open");
        overlay.classList.remove("open");
        btn.textContent = "\u2630 Menu";
        btn.setAttribute("aria-expanded", "false");
      });
    });
  }
})();

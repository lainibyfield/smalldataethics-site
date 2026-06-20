// Small Data Ethics — script.js
// Year stamp + mobile sidebar drawer + desktop sidebar toggle. No tracking.

(function () {

  // ── Year stamp ──
  var yr = document.getElementById("year");
  if (yr) yr.textContent = String(new Date().getFullYear());

  // ── Desktop sidebar toggle (push/compress) ──
  var toggleBtn = document.getElementById("sidebar-toggle");
  var STORAGE_KEY = "sde-sidebar-collapsed";

  function applyCollapsed(collapsed, animate) {
    if (!animate) document.body.classList.add("no-transition");
    if (collapsed) {
      document.body.classList.add("sidebar-collapsed");
    } else {
      document.body.classList.remove("sidebar-collapsed");
    }
    if (toggleBtn) {
      toggleBtn.setAttribute("aria-pressed", String(collapsed));
      toggleBtn.setAttribute("aria-label", collapsed ? "Expand sidebar" : "Collapse sidebar");
      toggleBtn.textContent = collapsed ? "\u203a" : "\u2039";
    }
    if (!animate) {
      document.body.offsetHeight;
      document.body.classList.remove("no-transition");
    }
  }

  var savedCollapsed = localStorage.getItem(STORAGE_KEY) === "true";
  applyCollapsed(savedCollapsed, false);

  if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
      var nowCollapsed = !document.body.classList.contains("sidebar-collapsed");
      applyCollapsed(nowCollapsed, true);
      try { localStorage.setItem(STORAGE_KEY, String(nowCollapsed)); } catch(e) {}
    });
  }

  var sidebar = document.getElementById("sidebar");
  if (sidebar) {
    sidebar.addEventListener("click", function (e) {
      if (document.body.classList.contains("sidebar-collapsed")) {
        applyCollapsed(false, true);
        try { localStorage.setItem(STORAGE_KEY, "false"); } catch(e) {}
      }
    });
  }

  // ── Mobile sidebar drawer ──
  var menuBtn = document.getElementById("menu-btn");
  var overlay = document.getElementById("sidebar-overlay");

  if (menuBtn && sidebar && overlay) {
    menuBtn.addEventListener("click", function () {
      var isOpen = sidebar.classList.toggle("open");
      overlay.classList.toggle("open", isOpen);
      menuBtn.textContent = isOpen ? "\u2715 Close" : "\u2630 Menu";
      menuBtn.setAttribute("aria-expanded", String(isOpen));
      // Reset scroll to top every time drawer opens
      if (isOpen) { sidebar.scrollTop = 0; }
    });
    overlay.addEventListener("click", function () {
      sidebar.classList.remove("open");
      overlay.classList.remove("open");
      menuBtn.textContent = "\u2630 Menu";
      menuBtn.setAttribute("aria-expanded", "false");
    });
    sidebar.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        sidebar.classList.remove("open");
        overlay.classList.remove("open");
        menuBtn.textContent = "\u2630 Menu";
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

})();

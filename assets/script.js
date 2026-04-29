// Date stamp — no tracking.
(function () {
  const el = document.getElementById("year");
  if (el) el.textContent = String(new Date().getFullYear());
})();

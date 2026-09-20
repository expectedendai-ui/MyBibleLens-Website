/* shared by every spotlight page: keeps the parent iframe exactly as tall as the page, and reveals sections as they scroll in */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function fitFrame() { try { if (window.frameElement) window.frameElement.style.height = document.body.scrollHeight + "px"; } catch (e) {} }
  if (window.ResizeObserver) new ResizeObserver(fitFrame).observe(document.body);
  window.addEventListener("load", function () { fitFrame(); setTimeout(fitFrame, 500); });
  window.SPOT = { fitFrame: fitFrame, reduce: reduce,
    $: function (s, r) { return (r || document).querySelector(s); },
    $$: function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); },
    esc: function (t) { return String(t).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); },
    rand: function (a, b) { return a + Math.random() * (b - a); } };
  var els = SPOT.$$(".reveal");
  if (reduce || !("IntersectionObserver" in window)) { els.forEach(function (e) { e.classList.add("in"); }); return; }
  var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }); }, { threshold: 0.12 });
  els.forEach(function (e) { io.observe(e); });
})();

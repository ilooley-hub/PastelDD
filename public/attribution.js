// Pastel: remembers how a visitor first arrived (landing page, referring site,
// campaign tags, recent pages), in this browser only, and sends demo requests
// to Pastel HQ alongside Formspree, so each lead shows where it came from.
(function () {
  var HQ = "https://sdr.pastelai.tech/api/public/leads";
  var KEY = "pastel_touch";
  function read() {
    try { return JSON.parse(localStorage.getItem(KEY) || "null"); } catch (e) { return null; }
  }
  function write(v) {
    try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) {}
  }
  var t = read();
  if (!t) {
    var q = new URLSearchParams(location.search);
    var utm = {};
    ["source", "medium", "campaign", "term", "content"].forEach(function (k) {
      var v = q.get("utm_" + k);
      if (v) utm[k] = v.slice(0, 150);
    });
    var ref = document.referrer && document.referrer.indexOf(location.origin) !== 0 ? document.referrer.slice(0, 500) : null;
    t = { landing: (location.pathname + location.search).slice(0, 500), referrer: ref, utm: Object.keys(utm).length ? utm : null, pages: [], firstSeenAt: new Date().toISOString() };
  }
  var pages = t.pages || [];
  if (pages[pages.length - 1] !== location.pathname) pages.push(location.pathname.slice(0, 300));
  t.pages = pages.slice(-15);
  write(t);

  // Called by the demo form on submit. sendBeacon survives the page navigating away.
  window.pastelSendLead = function (fields) {
    try {
      var body = JSON.stringify(Object.assign({}, fields, { source: read() }));
      var blob = new Blob([body], { type: "text/plain;charset=UTF-8" });
      if (navigator.sendBeacon && navigator.sendBeacon(HQ, blob)) return;
      fetch(HQ, { method: "POST", body: body, keepalive: true, headers: { "Content-Type": "text/plain;charset=UTF-8" } });
    } catch (e) {}
  };
})();

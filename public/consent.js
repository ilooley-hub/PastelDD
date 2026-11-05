// Pastel cookie consent. Loaded on every page (static pages and the Next.js layout).
//
// Nothing that sets tracking cookies runs until the visitor says yes:
//   - Google Tag Manager (and any tags inside it, e.g. Google Analytics)
//   - Apollo website visitor tracking (the Warm Visitors loop)
//   - public/attribution.js, which remembers how a visitor arrived
// Vercel Analytics is cookieless, so it runs regardless.
//
// The choice is kept for 6 months in a first-party cookie, "pastel_consent"
// ("all" or "essential"), which is itself strictly necessary.
// A "Cookie settings" link (any element with data-cookie-settings, or
// href="#cookie-settings") reopens the banner so visitors can change their mind.
// Other scripts can check window.pastelConsent.granted() or listen for the
// "pastel:consent" event on window.
(function () {
  if (window.pastelConsent) return;

  var GTM_ID = "GTM-NQ9S6W79";
  var APOLLO_APP_ID = "69f667e8a704d400110e746c";
  var COOKIE = "pastel_consent";
  var MAX_AGE = 60 * 60 * 24 * 182; // about 6 months

  // Google Consent Mode v2: everything denied until the visitor agrees.
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
    functionality_storage: "granted",
    security_storage: "granted",
  });

  function readChoice() {
    var m = document.cookie.match(/(?:^|;\s*)pastel_consent=(all|essential)/);
    return m ? m[1] : null;
  }
  function saveChoice(v) {
    var secure = location.protocol === "https:" ? "; Secure" : "";
    document.cookie = COOKIE + "=" + v + "; Max-Age=" + MAX_AGE + "; Path=/; SameSite=Lax" + secure;
  }

  var loaded = false;
  function loadTrackers() {
    if (loaded) return;
    loaded = true;
    gtag("consent", "update", {
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
      analytics_storage: "granted",
    });

    // Google Tag Manager
    window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
    var g = document.createElement("script");
    g.async = true;
    g.src = "https://www.googletagmanager.com/gtm.js?id=" + GTM_ID;
    document.head.appendChild(g);

    // Apollo website visitor tracking
    var a = document.createElement("script");
    a.async = true;
    a.defer = true;
    a.src = "https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache=" + Math.random().toString(36).substring(7);
    a.onload = function () {
      if (window.trackingFunctions) window.trackingFunctions.onLoad({ appId: APOLLO_APP_ID });
    };
    document.head.appendChild(a);
  }

  // Removes cookies the trackers may have set, when someone switches from "all" to "essential".
  function clearTrackerCookies() {
    var host = location.hostname;
    var parts = host.split(".");
    var domains = ["", host, "." + host];
    if (parts.length > 1) domains.push("." + parts.slice(-2).join("."));
    document.cookie.split(";").forEach(function (c) {
      var name = c.split("=")[0].trim();
      if (!name || name === COOKIE) return;
      if (/^(_ga|_gid|_gat|_gcl|_fbp|_uet|ap3|apollo|_apollo|zp_|amplitude)/i.test(name)) {
        domains.forEach(function (d) {
          document.cookie = name + "=; Max-Age=0; Path=/" + (d ? "; Domain=" + d : "");
        });
      }
    });
    try { localStorage.removeItem("pastel_touch"); } catch (e) {}
  }

  function decide(v) {
    var before = readChoice();
    saveChoice(v);
    hideBanner();
    if (v === "all") {
      loadTrackers();
    } else if (before === "all") {
      clearTrackerCookies();
      // Trackers already running on this page can't be unloaded; a reload stops them.
      location.reload();
      return;
    }
    try { window.dispatchEvent(new CustomEvent("pastel:consent", { detail: { choice: v } })); } catch (e) {}
  }

  // ---- Banner ----
  var banner = null;
  var CSS =
    ".pc-banner{position:fixed;left:16px;right:16px;bottom:16px;z-index:2147483000;max-width:560px;margin:0 auto;" +
    "background:#fff;color:#101114;border:1px solid rgba(16,17,20,.10);border-radius:14px;" +
    "box-shadow:0 12px 32px rgba(16,17,20,.12),0 1px 2px rgba(16,17,20,.06);padding:18px 20px;" +
    "font:14px/1.5 'Schibsted Grotesk',-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif}" +
    ".pc-banner h2{font-size:15px;font-weight:600;margin:0 0 6px;letter-spacing:0}" +
    ".pc-banner p{margin:0 0 14px;color:#52545C}" +
    ".pc-banner a{color:#1F7F9E;text-decoration:underline}" +
    ".pc-actions{display:flex;gap:8px;flex-wrap:wrap;justify-content:flex-end}" +
    ".pc-btn{font:inherit;font-weight:600;font-size:14px;border-radius:999px;padding:9px 18px;cursor:pointer;border:1px solid rgba(16,17,20,.16);background:#fff;color:#101114}" +
    ".pc-btn:hover{background:#F2F2EF}" +
    ".pc-btn.pc-primary{background:#101114;color:#fff;border-color:#101114}" +
    ".pc-btn.pc-primary:hover{background:#2a2c33}" +
    ".pc-btn:focus-visible{outline:2px solid #1F7F9E;outline-offset:2px}" +
    "@media (max-width:480px){.pc-banner{left:12px;right:12px;bottom:12px}.pc-btn{flex:1}}";

  function showBanner() {
    if (banner) { banner.style.display = ""; focusFirst(); return; }
    if (!document.body) { document.addEventListener("DOMContentLoaded", showBanner); return; }

    var style = document.createElement("style");
    style.textContent = CSS;
    document.head.appendChild(style);

    banner = document.createElement("div");
    banner.className = "pc-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-live", "polite");
    banner.setAttribute("aria-labelledby", "pc-title");
    banner.innerHTML =
      '<h2 id="pc-title">Cookies on Pastel</h2>' +
      "<p>We use essential cookies to make this site work. With your permission, we also use analytics and " +
      "marketing cookies (Google Tag Manager and Apollo) to understand how the site is used and which companies visit. " +
      '<a href="/privacy#cookies">Learn more</a></p>' +
      '<div class="pc-actions">' +
      '<button type="button" class="pc-btn" data-pc="essential">Essential only</button>' +
      '<button type="button" class="pc-btn pc-primary" data-pc="all">Accept all</button>' +
      "</div>";
    banner.addEventListener("click", function (e) {
      var choice = e.target && e.target.getAttribute && e.target.getAttribute("data-pc");
      if (choice) decide(choice);
    });
    document.body.appendChild(banner);
  }
  function focusFirst() {
    var b = banner && banner.querySelector("button");
    if (b) b.focus();
  }
  function hideBanner() {
    if (banner) banner.style.display = "none";
  }

  function openSettings() {
    showBanner();
    focusFirst();
  }

  // "Cookie settings" links anywhere on the page.
  document.addEventListener("click", function (e) {
    var el = e.target && e.target.closest && e.target.closest("[data-cookie-settings], a[href='#cookie-settings']");
    if (!el) return;
    e.preventDefault();
    openSettings();
  });

  window.pastelConsent = {
    choice: readChoice,
    granted: function () { return readChoice() === "all"; },
    open: openSettings,
  };

  var choice = readChoice();
  if (choice === "all") loadTrackers();
  else if (!choice) showBanner();
})();

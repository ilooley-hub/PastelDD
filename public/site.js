// Shared by every static page (public/*.html).
// 1. A phone menu (☰) on pages whose nav doesn't have one, built from the nav's own links.
// 2. A "Book a demo" bar on phones, shown once the visitor scrolls past the top
//    and hidden again when the footer is in view (and on the demo pages themselves).
(function () {
  var nav = document.querySelector("nav .nav-inner");

  if (nav && !document.getElementById("hamb")) {
    var links = [];
    var top = nav.querySelectorAll(".nav-links > a, .nav-links > .nav-item > a");
    for (var i = 0; i < top.length; i++) links.push(top[i]);
    var login = nav.querySelector(".login");
    var book = nav.querySelector(".btn");

    var btn = document.createElement("button");
    btn.className = "hamb";
    btn.id = "hamb";
    btn.type = "button";
    btn.setAttribute("aria-label", "Menu");
    btn.setAttribute("aria-expanded", "false");
    btn.innerHTML = "<span></span><span></span><span></span>";

    var menu = document.createElement("div");
    menu.className = "mobile-menu";
    menu.id = "mmenu";
    links.concat(login ? [login] : [], book ? [book] : []).forEach(function (a) {
      var copy = document.createElement("a");
      copy.href = a.getAttribute("href");
      copy.textContent = a.textContent.trim();
      menu.appendChild(copy);
    });

    nav.appendChild(btn);
    nav.appendChild(menu);
    btn.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  } else {
    // Pages with their own menu: keep the icon's open/closed state in sync.
    var own = document.getElementById("hamb"), ownMenu = document.getElementById("mmenu");
    if (own && ownMenu) {
      own.setAttribute("aria-expanded", "false");
      own.addEventListener("click", function () {
        own.setAttribute("aria-expanded", ownMenu.classList.contains("open") ? "true" : "false");
      });
    }
  }

  var path = location.pathname;
  if (/book-a-demo|pastel_demo|thanks/.test(path)) return;
  var bar = document.createElement("div");
  bar.className = "cta-bar";
  bar.innerHTML = '<span class="cb-text">See Pastel in action<small>30-minute live demo</small></span><a href="/book-a-demo">Book a demo</a>';
  document.body.appendChild(bar);

  var footer = document.querySelector("footer");
  var footerVisible = false;
  if (footer && "IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      footerVisible = entries[0].isIntersecting;
      update();
    }).observe(footer);
  }
  function update() {
    bar.classList.toggle("show", window.scrollY > 520 && !footerVisible);
  }
  window.addEventListener("scroll", update, { passive: true });
  update();
})();

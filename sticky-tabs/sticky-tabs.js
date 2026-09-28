function initAllStickyTabs() {
  document.querySelectorAll(".cc-stabs").forEach((root) => {

    if (root.dataset.stabsInitialized === "true") return;

    root.dataset.stabsInitialized = "true";

    initStickyTabs(root);

    if (root.dataset.sticky === "fixed") {
      initFixedNav(root);
    }

  });
}


if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAllStickyTabs);
} else {
  initAllStickyTabs();
}


function initStickyTabs(root) {

  const mode = root.dataset.mode || "scroll";

  const navItems = root.querySelectorAll(
    ":scope > .cc-stabs-nav a, :scope > .cc-stabs-nav button"
  );

  const mobile = root.querySelector(":scope > .cc-stabs-mobile");

  const panels = root.querySelectorAll(
    ":scope > .cc-stabs-content > .cc-stabs-panel"
  );

  if (!panels.length) return;


  function targetOf(item) {
    return item.dataset.target || item.getAttribute("href")?.slice(1);
  }

  function activate(id) {

    navItems.forEach((item) => {
      item.classList.toggle("is-active", targetOf(item) === id);
    });

    if (mobile && mobile.value !== id) {
      mobile.value = id;
    }

    if (mode === "switch") {
      panels.forEach((p) => {

        const leaving =
          p.classList.contains("is-active") && p.id !== id;

        if (leaving) resetDetails(p);

        p.classList.toggle("is-active", p.id === id);

      });
    }

  }


  panels.forEach((p) => {
    p.querySelectorAll("details").forEach((d) => {
      d.dataset.initialOpen = d.open;
    });
  });

  function resetDetails(panel) {
    panel.querySelectorAll("details").forEach((d) => {
      d.open = d.dataset.initialOpen === "true";
    });
  }


  if (mode === "switch") {

    navItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        activate(targetOf(item));
      });
    });

    mobile?.addEventListener("change", () => activate(mobile.value));

    activate(targetOf(navItems[0]) || panels[0].id);

  } else {

    const prefersReducedMotion =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    mobile?.addEventListener("change", () => {
      document.getElementById(mobile.value)?.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) activate(entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -70% 0px" }
    );

    panels.forEach((p) => observer.observe(p));

  }

}


/* Modo alternativo para cuando position: sticky no funciona */

function initFixedNav(root) {

  const nav = root.querySelector(
    ":scope > .cc-stabs-nav:not(.cc-stabs-nav--chips)"
  );

  const mobile = root.querySelector(":scope > .cc-stabs-mobile");

  /* hueco que ocupa el select mientras está fijado, para que
     el contenido no salte hacia arriba */
  let spacer = null;

  if (mobile) {
    spacer = document.createElement("div");
    spacer.hidden = true;
    mobile.before(spacer);
  }

  let navWidth = 0;
  let ticking = false;

  function release(el) {
    el.classList.remove("is-fixed");
    el.style.top = el.style.left = el.style.width = "";
  }

  function update() {

    ticking = false;

    const rect = root.getBoundingClientRect();
    const isMobile = window.matchMedia("(max-width: 736px)").matches;

    const navbarHeight = parseFloat(
      getComputedStyle(document.documentElement)
        .getPropertyValue("--cc-navbar-height")
    ) || 0;

    const offset = navbarHeight + (isMobile ? 12 : 24);


    /* ---------- escritorio: índice lateral ---------- */

    if (nav && !isMobile) {

      const h = nav.offsetHeight;

      if (rect.top <= offset && rect.bottom > offset) {

        nav.classList.add("is-fixed");
        nav.style.width = navWidth + "px";
        nav.style.left = rect.left + "px";
        nav.style.top = Math.min(offset, rect.bottom - h) + "px";

      } else {

        release(nav);
        navWidth = nav.getBoundingClientRect().width;

      }

      if (!navWidth) navWidth = nav.getBoundingClientRect().width;

    }


    /* ---------- móvil: select ---------- */

    if (mobile && isMobile) {

      const h = mobile.offsetHeight;

      if (rect.top <= offset && rect.bottom > offset + h) {

        if (spacer.hidden) {
          spacer.style.height =
            h + parseFloat(getComputedStyle(mobile).marginBottom) + "px";
          spacer.hidden = false;
        }

        mobile.classList.add("is-fixed");
        mobile.style.top = offset + "px";
        mobile.style.left = rect.left + "px";
        mobile.style.width = rect.width + "px";

      } else {

        release(mobile);
        spacer.hidden = true;

      }

    } else if (mobile) {

      /* al pasar de móvil a escritorio, limpiar lo que quedara fijado */
      release(mobile);
      spacer.hidden = true;

    }

  }

  function requestUpdate() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);

  update();

}

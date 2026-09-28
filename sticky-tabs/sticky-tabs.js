/* =========================================================
   INICIALIZACIÓN GLOBAL
========================================================= */

function initAllStickyTabs() {

  document.querySelectorAll(".cc-stabs").forEach((root) => {

    if (root.dataset.stabsInitialized === "true") {
      return;
    }

    root.dataset.stabsInitialized = "true";

    initStickyTabs(root);

  });

}


if (document.readyState === "loading") {

  document.addEventListener(
    "DOMContentLoaded",
    initAllStickyTabs
  );

} else {

  initAllStickyTabs();

}


/* =========================================================
   COMPONENTE PRINCIPAL
========================================================= */

function initStickyTabs(root) {

  const mode = root.dataset.mode || "scroll";

  const nav =
    root.querySelector(".cc-stabs-nav");

  const mobile =
    root.querySelector(".cc-stabs-mobile");

  const links = nav
    ? Array.from(
        nav.querySelectorAll("a")
      )
    : [];

  const panels = Array.from(
    root.querySelectorAll(".cc-stabs-panel")
  );


  if (!panels.length) {
    return;
  }


  /* =======================================================
     MODO SWITCH
  ======================================================= */

  if (mode === "switch") {

    let activePanel = panels.find(
      (panel) =>
        panel.classList.contains("is-active")
    );


    if (!activePanel) {

      activePanel = panels[0];

      activePanel.classList.add(
        "is-active"
      );

    }


    updateActiveLink(
      links,
      activePanel.id
    );


    links.forEach((link) => {

      link.addEventListener(
        "click",
        (event) => {

          event.preventDefault();


          const targetId =
            link
              .getAttribute("href")
              ?.replace("#", "");


          if (!targetId) {
            return;
          }


          switchPanel(
            panels,
            links,
            targetId
          );

        }
      );

    });


    if (mobile) {

      mobile.addEventListener(
        "change",
        () => {

          switchPanel(
            panels,
            links,
            mobile.value
          );

        }
      );

    }


    return;

  }


  /* -------------------------------------------------------
     Scrollspy
  ------------------------------------------------------- */

  if (
    links.length &&
    "IntersectionObserver" in window
  ) {

    const navbarHeight =
      parseFloat(
        getComputedStyle(
          document.documentElement
        ).getPropertyValue(
          "--cc-navbar-height"
        )
      ) || 82;


    const observer =
      new IntersectionObserver(
        (entries) => {

          const visiblePanels =
            entries
              .filter(
                (entry) =>
                  entry.isIntersecting
              )
              .sort(
                (a, b) =>
                  b.intersectionRatio -
                  a.intersectionRatio
              );


          if (!visiblePanels.length) {
            return;
          }


          const activeId =
            visiblePanels[0]
              .target
              .id;


          updateActiveLink(
            links,
            activeId
          );


          if (mobile) {

            mobile.value =
              activeId;

          }

        },
        {

          root: null,

          rootMargin:
            `-${navbarHeight + 24}px 0px -45% 0px`,

          threshold: [
            0.1,
            0.25,
            0.5,
            0.75
          ]

        }
      );


    panels.forEach((panel) => {

      observer.observe(panel);

    });

  }


  /* -------------------------------------------------------
     Selector móvil
  ------------------------------------------------------- */

  if (mobile) {

    mobile.addEventListener(
      "change",
      () => {

        const targetId =
          mobile.value;


        const target =
          document.getElementById(
            targetId
          );


        if (!target) {
          return;
        }


        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }
    );

  }

}


/* =========================================================
   CAMBIAR PANEL EN MODO SWITCH
========================================================= */

function switchPanel(
  panels,
  links,
  targetId
) {

  const target =
    panels.find(
      (panel) =>
        panel.id === targetId
    );


  if (!target) {
    return;
  }


  panels.forEach((panel) => {

    panel.classList.toggle(
      "is-active",
      panel === target
    );

  });


  updateActiveLink(
    links,
    targetId
  );

}


/* =========================================================
   ACTUALIZAR LINK ACTIVO
========================================================= */

function updateActiveLink(
  links,
  activeId
) {

  links.forEach((link) => {

    const linkId =
      link
        .getAttribute("href")
        ?.replace("#", "");


    link.classList.toggle(
      "is-active",
      linkId === activeId
    );

  });

}

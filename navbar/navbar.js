/* =========================================================
   CRISOL CROWLING — NAVBAR JS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const navbar = document.querySelector(".cc-navbar");

  const menuButton = document.querySelector(".cc-navbar-menu-button");
  const mobileMenu = document.querySelector(".cc-navbar-mobile");

  const desktopDropdownToggle = document.querySelector(
    ".cc-navbar-dropdown-toggle"
  );

  const desktopDropdownMenu = document.querySelector(
    ".cc-navbar-dropdown-menu"
  );

  const mobileDropdownToggle = document.querySelector(
    ".cc-mobile-dropdown-toggle"
  );

  const mobileDropdownMenu = document.querySelector(
    ".cc-mobile-dropdown-menu"
  );


  /* =======================================================
     DESKTOP DROPDOWN
     ======================================================= */

  function closeDesktopDropdown() {
    if (!desktopDropdownToggle || !desktopDropdownMenu) return;

    desktopDropdownToggle.setAttribute("aria-expanded", "false");
    desktopDropdownMenu.classList.remove("is-open");
  }

  function toggleDesktopDropdown() {
    if (!desktopDropdownToggle || !desktopDropdownMenu) return;

    const isOpen =
      desktopDropdownToggle.getAttribute("aria-expanded") === "true";

    desktopDropdownToggle.setAttribute(
      "aria-expanded",
      String(!isOpen)
    );

    desktopDropdownMenu.classList.toggle("is-open", !isOpen);
  }

  desktopDropdownToggle?.addEventListener(
    "click",
    toggleDesktopDropdown
  );


  /* =======================================================
     MOBILE MENU
     ======================================================= */

  function openMobileMenu() {
    menuButton.classList.add("is-open");
    mobileMenu.classList.add("is-open");

    menuButton.setAttribute("aria-expanded", "true");
    menuButton.setAttribute("aria-label", "Cerrar menú");

    mobileMenu.setAttribute("aria-hidden", "false");

    document.body.classList.add("cc-mobile-menu-open");
  }

  function closeMobileMenu() {
    menuButton.classList.remove("is-open");
    mobileMenu.classList.remove("is-open");

    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menú");

    mobileMenu.setAttribute("aria-hidden", "true");

    document.body.classList.remove("cc-mobile-menu-open");
  }

  function toggleMobileMenu() {
    const isOpen =
      menuButton.getAttribute("aria-expanded") === "true";

    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  menuButton?.addEventListener("click", toggleMobileMenu);


  /* =======================================================
     MOBILE COMMISSIONS
     ======================================================= */

  function toggleMobileDropdown() {
    if (!mobileDropdownToggle || !mobileDropdownMenu) return;

    const isOpen =
      mobileDropdownToggle.getAttribute("aria-expanded") === "true";

    mobileDropdownToggle.setAttribute(
      "aria-expanded",
      String(!isOpen)
    );

    mobileDropdownMenu.classList.toggle("is-open", !isOpen);
  }

  mobileDropdownToggle?.addEventListener(
    "click",
    toggleMobileDropdown
  );


  /* =======================================================
     CLOSE MOBILE MENU WHEN CLICKING A LINK
     ======================================================= */

  const mobileLinks = mobileMenu?.querySelectorAll(
    "a"
  );

  mobileLinks?.forEach((link) => {
    link.addEventListener("click", () => {
      closeMobileMenu();
    });
  });


  /* =======================================================
     CLICK OUTSIDE DESKTOP DROPDOWN
     ======================================================= */

  document.addEventListener("click", (event) => {

    if (
      desktopDropdownMenu &&
      desktopDropdownToggle &&
      !desktopDropdownMenu.contains(event.target) &&
      !desktopDropdownToggle.contains(event.target)
    ) {
      closeDesktopDropdown();
    }

  });


  /* =======================================================
     ESCAPE KEY
     ======================================================= */

  document.addEventListener("keydown", (event) => {

    if (event.key !== "Escape") return;

    closeDesktopDropdown();

    if (
      menuButton?.getAttribute("aria-expanded") === "true"
    ) {
      closeMobileMenu();
    }

  });


  /* =======================================================
     RESET MOBILE MENU WHEN SWITCHING TO DESKTOP
     ======================================================= */

  window.addEventListener("resize", () => {

    if (window.innerWidth > 768) {
      closeMobileMenu();
    }

  });

});

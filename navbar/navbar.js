function initNavbar() {

    document.querySelectorAll(".cc-navbar").forEach((navbar) => {

        const mobileToggle = navbar.querySelector(
            ".cc-navbar-toggle"
        );

        const mobileMenu = navbar.querySelector(
            ".cc-navbar-mobile"
        );

        const desktopDropdownToggle = navbar.querySelector(
            ".cc-navbar-dropdown-toggle"
        );

        const desktopDropdown = navbar.querySelector(
            ".cc-navbar-dropdown"
        );

        const mobileDropdownToggle = navbar.querySelector(
            ".cc-navbar-mobile-dropdown-toggle"
        );

        const mobileSubmenu = navbar.querySelector(
            ".cc-navbar-mobile-submenu"
        );


        function closeMobileMenu() {

            if (!mobileMenu || !mobileToggle) return;

            mobileMenu.classList.remove("is-open");

            mobileToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }


        function openMobileMenu() {

            if (!mobileMenu || !mobileToggle) return;

            mobileMenu.classList.add("is-open");

            mobileToggle.setAttribute(
                "aria-expanded",
                "true"
            );

        }


        if (mobileToggle) {

            mobileToggle.addEventListener("click", (event) => {

                event.stopPropagation();

                const isOpen =
                    mobileMenu.classList.contains("is-open");

                if (isOpen) {
                    closeMobileMenu();
                } else {
                    openMobileMenu();
                }

            });

        }


        function closeDesktopDropdown() {

            if (
                !desktopDropdown ||
                !desktopDropdownToggle
            ) return;

            desktopDropdown.classList.remove("is-open");

            desktopDropdownToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }


        if (desktopDropdownToggle) {

            desktopDropdownToggle.addEventListener(
                "click",
                (event) => {

                    event.stopPropagation();

                    const isOpen =
                        desktopDropdown.classList.contains(
                            "is-open"
                        );

                    if (isOpen) {

                        closeDesktopDropdown();

                    } else {

                        desktopDropdown.classList.add(
                            "is-open"
                        );

                        desktopDropdownToggle.setAttribute(
                            "aria-expanded",
                            "true"
                        );

                    }

                }
            );

        }


        if (
            mobileDropdownToggle &&
            mobileSubmenu
        ) {

            mobileDropdownToggle.addEventListener(
                "click",
                () => {

                    const isOpen =
                        mobileSubmenu.classList.contains(
                            "is-open"
                        );

                    if (isOpen) {

                        mobileSubmenu.classList.remove(
                            "is-open"
                        );

                        mobileDropdownToggle.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    } else {

                        mobileSubmenu.classList.add(
                            "is-open"
                        );

                        mobileDropdownToggle.setAttribute(
                            "aria-expanded",
                            "true"
                        );

                    }

                }
            );

        }


        navbar.querySelectorAll(
            ".cc-navbar-mobile a"
        ).forEach((link) => {

            link.addEventListener("click", () => {
                closeMobileMenu();
            });

        });


        document.addEventListener("click", (event) => {

            if (!navbar.contains(event.target)) {

                closeMobileMenu();
                closeDesktopDropdown();

            }

        });


        document.addEventListener("keydown", (event) => {

            if (event.key === "Escape") {

                closeMobileMenu();
                closeDesktopDropdown();

            }

        });

    });

}


/*
 * Si la navbar ya existe cuando carga la página,
 * la inicializamos normalmente.
 */

document.addEventListener(
    "DOMContentLoaded",
    initNavbar
);

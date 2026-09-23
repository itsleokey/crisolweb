document.addEventListener("DOMContentLoaded", async () => {

    const navbarContainer =
        document.querySelector("#navbar-container");

    if (!navbarContainer) return;


    try {

        const response =
            await fetch("../demo/navbar.html");


        if (!response.ok) {

            throw new Error(
                `No se pudo cargar navbar.html: ${response.status}`
            );

        }


        const html =
            await response.text();


        const parser =
            new DOMParser();


        const documentFragment =
            parser.parseFromString(
                html,
                "text/html"
            );


        const navbar =
            documentFragment.querySelector(
                ".cc-navbar"
            );


        if (!navbar) {

            throw new Error(
                "No se encontró .cc-navbar en navbar.html"
            );

        }


        navbarContainer.replaceWith(navbar);


        /*
         * La navbar acaba de ser insertada,
         * así que ahora podemos inicializar
         * sus botones y dropdowns.
         */

        if (typeof initNavbar === "function") {
            initNavbar();
        }


    } catch (error) {

        console.error(
            "Error cargando la navbar:",
            error
        );

    }

});

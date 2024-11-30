document.addEventListener("DOMContentLoaded", () => {
    const CONTAINER_TEXTOS = document.querySelector(".container-text-col");
    const ITEMS_TEXTOS = document.querySelectorAll(".item-text-col");
    const IMGS_CONTAINER = document.querySelector(".container-img-col");
    const IMGS_OCULTAS = document.querySelectorAll(".container-img-col > .hide");


    console.log(IMGS_CONTAINER.childNodes)
    console.log(IMGS_CONTAINER.childNodes[0].nodeName)

    console.log(IMGS_CONTAINER.childNodes)


    console.log(ITEMS_TEXTOS)


    IMGS_CONTAINER.childNodes[1].classList.remove("hide")
    ITEMS_TEXTOS[0].classList.remove("hide") 


    let ultimoText; 
    let currentIndex = 0; 
    const textosProcesados = []; 
    let lastScrollY = window.scrollY; 
    

    // Evento scroll
    window.addEventListener("scroll", () => {
        const sectionTop = CONTAINER_TEXTOS.getBoundingClientRect().top; 
        const viewportHeight = window.innerHeight; 
        const scrollingDown = window.scrollY > lastScrollY; 
        lastScrollY = window.scrollY; 

        if ((sectionTop + 320) < viewportHeight) {
            IMGS_CONTAINER.classList.add("sticky");
            console.log("sticky");
        } 

        ITEMS_TEXTOS.forEach((texto, index) => {
            const rectTexto = texto.getBoundingClientRect();

            if (rectTexto.top > 0 && rectTexto.bottom < viewportHeight - 280) {
                if (!textosProcesados.includes(texto)) {
                    textosProcesados.push(texto); 
                }

                currentIndex = index; 
                texto.style.opacity = 1; 

                if (ultimoText && ultimoText !== texto) {
                    ultimoText.style.opacity = 0; 
                }
                ultimoText = texto; 

                actualizarImagenes(currentIndex, IMGS_OCULTAS); 
            }

            if (!scrollingDown && rectTexto.bottom <= 0) {
                if (textosProcesados.includes(texto)) {
                    textosProcesados.splice(textosProcesados.indexOf(texto), 1); 
                }

                texto.style.opacity = 0; 
                currentIndex = Math.max(0, index - 1); 
                actualizarImagenes(currentIndex, IMGS_OCULTAS);
            }
        });
    });

    // Cambia las imagenes
    function actualizarImagenes(index, imagenes) {
        for (let i = 0; i < imagenes.length; i++) {
            const img = imagenes[i];
            if (i === index) {
                img.classList.remove("hide");
                img.classList.add("sticky");
                imgAnterior = img; 
            } else {
                img.classList.add("hide");
                img.classList.remove("sticky");
            }
        }
    }
});

  
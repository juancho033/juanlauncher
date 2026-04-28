
// --- LÓGICA DEL SITIO ---

function getYouTubeId(url) {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

const path = window.location.pathname;
const isIndex = path.includes('index.html') || path === '/' || path.endsWith('/') || !path.includes('.html');
const isGame = path.includes('juego.html');

// --- LÓGICA PÁGINA DE INICIO (FILTROS COMPLETOS) ---
if (isIndex) {
    const contenedor = document.getElementById('contenedor-juegos');
    const buscador = document.getElementById('buscador');
    const tituloSeccion = document.getElementById('titulo-seccion');
    
    // Elementos Selectores
    const selectorServidor = document.getElementById('filtro-servidor'); 
    const selectorConsola = document.getElementById('filtro-tipo-consola'); // NUEVO
    const contenedorFiltroConsola = document.getElementById('filtro-consola-container'); // NUEVO

    // Variables de estado
    let filtroPlataforma = 'pc';
    let filtroCategoria = 'todos';
    let filtroBusqueda = '';
    let filtroServidorActual = 'todos'; 
    let filtroConsolaActual = 'todos'; // NUEVA VARIABLE CONSOLAS

    // --- LÓGICA DEL BOTÓN SORPRÉNDEME ---
    const btnSorprendeme = document.getElementById('btn-sorprendeme');

    if (btnSorprendeme) {
        btnSorprendeme.addEventListener('click', () => {
            // 1. Filtrar los juegos
            const juegosDisponibles = listaJuegos.filter(juego => juego.plataforma === filtroPlataforma);
            if (juegosDisponibles.length === 0) return;

            // 2. Cambiar el diseño a "Cargando"
            btnSorprendeme.classList.add('loading');
            btnSorprendeme.innerHTML = '⏳ Buscando joyita...';

            // 3. Esperar 1.5 segundos y redirigir
            setTimeout(() => {
                const indiceAzar = Math.floor(Math.random() * juegosDisponibles.length);
                const juegoAzar = juegosDisponibles[indiceAzar];
                
                window.location.href = `juego.html?id=${juegoAzar.id}`;
            }, 1500);
        });

        // 🛠️ REPARACIÓN: Detectar cuando el usuario vuelve con la flecha de "Atrás"
        window.addEventListener('pageshow', (event) => {
            if (event.persisted) {
                btnSorprendeme.classList.remove('loading');
                btnSorprendeme.innerHTML = '🎲 Sorpréndeme';
            }
        });
    }

    // Botones del DOM
    const btnsPlataforma = document.querySelectorAll('.plat-btn');
    const btnsCategoria = document.querySelectorAll('.genre-btn');

    // Función principal de filtrado
    function aplicarFiltros() {
        const juegosFiltrados = listaJuegos.filter(juego => {
            const coincidePlataforma = juego.plataforma === filtroPlataforma;
            const coincideCategoria = filtroCategoria === 'todos' || (juego.categoria && juego.categoria.includes(filtroCategoria));
            const coincideBusqueda = juego.titulo.toLowerCase().includes(filtroBusqueda.toLowerCase());
            
            // Si el juego es AAA (tiene links múltiples), el filtro de servidor único lo ignoramos o lo ajustamos, 
            // pero para simplificar, si tiene "links", lo mostramos siempre.
            let coincideServidor = true;
            if (!juego.links) {
                const servDelJuego = juego.servidor ? juego.servidor.toLowerCase() : 'mediafire';
                coincideServidor = filtroServidorActual === 'todos' || servDelJuego === filtroServidorActual;
            } else {
                coincideServidor = filtroServidorActual === 'todos'; // Si filtra por mediafire, ocultamos los AAA que son Gofile/Buzzheavier (opcional)
            }

            // Consola
            let coincideTipoConsola = true;
            if (filtroPlataforma === 'consola') {
                const consolaDelJuego = juego.consolaFiltro ? juego.consolaFiltro.toLowerCase() : 'todos';
                coincideTipoConsola = filtroConsolaActual === 'todos' || consolaDelJuego === filtroConsolaActual;
            }

            return coincidePlataforma && coincideCategoria && coincideBusqueda && coincideServidor && coincideTipoConsola;
        });

        // --- MAGIA HOT: Ordenar para que los HOT salgan de primero ---
        juegosFiltrados.sort((a, b) => {
            if (a.hot && !b.hot) return -1; // A va primero
            if (!a.hot && b.hot) return 1;  // B va primero
            return 0; // Si ambos son hot o ambos normales, se quedan igual
        });

        cargarJuegos(juegosFiltrados);
        
        const catNombre = filtroCategoria.charAt(0).toUpperCase() + filtroCategoria.slice(1);
        let textoTitulo = `Catálogo ${filtroPlataforma.toUpperCase()}`;
        if (filtroPlataforma === 'consola') textoTitulo = "Catálogo Retro (BETA)";
        tituloSeccion.innerText = `${textoTitulo} ${filtroCategoria !== 'todos' ? '- ' + catNombre : ''}`;
    }

    // Renderizar tarjetas
    function cargarJuegos(juegos) {
        if (!contenedor) return;
        contenedor.innerHTML = '';

        if (juegos.length === 0) {
            contenedor.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #888;">No hay juegos con estos filtros.</p>';
            return;
        }




            // Dentro de cargarJuegos...
        juegos.forEach(juego => {
        const card = document.createElement('div');
        card.classList.add('card');
        
        // Comprobamos si el juego es HOT
        const etiquetaHot = juego.hot ? `<span class="hot-badge">🔥 HOT</span>` : '';

        card.innerHTML = `
            <div class="card-img-wrapper">
                ${etiquetaHot}
                <img src="${juego.imagen}" alt="${juego.titulo}" onerror="this.src='./img/error.jpg'" loading="lazy" decoding="async">
            </div>
            <div class="card-info">
                <h3>${juego.titulo}</h3>
                <p>${juego.genero}</p>
            </div>
        `;
            
            // ¡Corregida la falta de comilla en onerror!
            card.innerHTML = `
                <div class="card-img-wrapper">
                    <img src="${juego.imagen}" alt="${juego.titulo}" onerror="this.src='./img/error.jpg'" loading="lazy" decoding="async">
                </div>
                <div class="card-info">
                    <h3>${juego.titulo}</h3>
                    <p>${juego.genero}</p>
                </div>
            `;
            card.addEventListener('click', () => {
                window.location.href = `juego.html?id=${juego.id}`;
            });
            contenedor.appendChild(card);
        });
    }

    // Eventos Botones Plataforma
    btnsPlataforma.forEach(btn => {
        btn.addEventListener('click', () => {
            btnsPlataforma.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filtroPlataforma = btn.dataset.plat;

            // Mostrar u ocultar el filtro de consolas dependiendo de la pestaña
            if (contenedorFiltroConsola) {
                if (filtroPlataforma === 'consola') {
                    contenedorFiltroConsola.style.display = 'inline-flex';
                } else {
                    contenedorFiltroConsola.style.display = 'none';
                }
            }

            aplicarFiltros();
        });
    });

    // Eventos Botones Categoría
    btnsCategoria.forEach(btn => {
        btn.addEventListener('click', () => {
            btnsCategoria.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filtroCategoria = btn.dataset.cat;
            aplicarFiltros();
        });
    });

    // Evento Buscador
    if (buscador) {
        buscador.addEventListener('input', (e) => {
            filtroBusqueda = e.target.value;
            aplicarFiltros();
        });
    }
    
    // Evento Selector Servidor
    if (selectorServidor) {
        selectorServidor.addEventListener('change', (e) => {
            filtroServidorActual = e.target.value;
            aplicarFiltros();
        });
    }

    // Evento Selector Consola (NUEVO)
    if (selectorConsola) {
        selectorConsola.addEventListener('change', (e) => {
            filtroConsolaActual = e.target.value;
            aplicarFiltros();
        });
    }

    // Carga inicial
    aplicarFiltros();
}

// --- LÓGICA PÁGINA DE DETALLES (Sin cambios) ---
if (isGame) {
    const params = new URLSearchParams(window.location.search);
    const idJuego = parseInt(params.get('id'));
    const juego = listaJuegos.find(j => j.id === idJuego);

    if (juego) {
        document.title = `${juego.titulo} - Descarga`;

        const imgPrincipal = document.getElementById('detalle-img');
        if (imgPrincipal) {
            imgPrincipal.src = juego.imagen;
            imgPrincipal.onerror = function () { this.style.display = 'none'; };
        }
        document.getElementById('detalle-titulo').innerText = juego.titulo;
        document.getElementById('detalle-genero').innerText = juego.genero;
        document.getElementById('detalle-desc').innerText = juego.descripcion;
       // --- CONFIGURAR BOTÓN DE DESCARGA (NORMAL O MULTIPLE AAA) ---
        const btnDescargaOriginal = document.getElementById('detalle-btn');
        const contenedorPadre = btnDescargaOriginal.parentElement;

        if (juego.links) {
            // ES UN JUEGO AAA CON VARIOS ENLACES
            btnDescargaOriginal.style.display = 'none'; // Ocultamos el botón normal
            
            // Creamos un contenedor para los 3 botones
            const boxLinks = document.createElement('div');
            boxLinks.className = 'multi-download-box';

            if (juego.links.gofile) {
                boxLinks.innerHTML += `<a href="${juego.links.gofile}" class="download-btn-mega btn-gofile" target="_blank">DESCARGAR (GOFILE) <br><small>Recomendado</small></a>`;
            }
            if (juego.links.buzzheavier) {
                boxLinks.innerHTML += `<a href="${juego.links.buzzheavier}" class="download-btn-mega btn-buzz" target="_blank">DESCARGAR (BUZZHEAVIER) <br><small>Rápido</small></a>`;
            }
            if (juego.links["1fichier"]) {
                boxLinks.innerHTML += `<a href="${juego.links["1fichier"]}" class="download-btn-mega btn-1fichier" target="_blank">DESCARGAR (1FICHIER) <br><small>Alternativo</small></a>`;
            }

            // Insertamos la caja donde estaba el botón viejo
            contenedorPadre.insertBefore(boxLinks, btnDescargaOriginal);

        } else {
            // ES UN JUEGO NORMAL CON 1 SOLO ENLACE
            btnDescargaOriginal.href = juego.link;
            let nombreServidor = "Mediafire";
            let claseServidor = "btn-mediafire";

            if (juego.servidor) {
                const serv = juego.servidor.toLowerCase();
                if (serv === "terabox") { nombreServidor = "TeraBox"; claseServidor = "btn-terabox"; } 
                else if (serv === "buzzheavier") { nombreServidor = "Buzzheavier"; claseServidor = "btn-buzz"; }
                else if (serv === "gofile") { nombreServidor = "Gofile"; claseServidor = "btn-gofile"; }
            }

            btnDescargaOriginal.className = `download-btn-mega ${claseServidor}`;
            btnDescargaOriginal.innerHTML = `DESCARGAR AHORA <br> <small>(vía ${nombreServidor})</small>`;
        }

        // Requisitos
        document.getElementById('req-min').innerHTML = juego.requisitos.minimos;
        document.getElementById('req-rec').innerHTML = juego.requisitos.recomendados;

        // Video Trailer
        const videoWrapper = document.getElementById('video-wrapper');
        const videoId = getYouTubeId(juego.trailer);
        if (videoId && videoWrapper) {
            videoWrapper.innerHTML = `
                <iframe src="https://www.youtube.com/embed/${videoId}" 
                title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            `;
        } else {
            if (videoWrapper) videoWrapper.style.display = 'none';
        }

       // 4. Galería e Imágenes expandibles (Lightbox con Slider)
        const galeriaContenedor = document.getElementById('detalle-galeria');
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('img-grande');
        const closeLightbox = document.querySelector('.close-lightbox');
        
        // Elementos nuevos del slider
        const prevBtn = document.querySelector('.prev-lightbox');
        const nextBtn = document.querySelector('.next-lightbox');
        let indiceImagenActual = 0; // Variable para saber en qué foto estamos

        if (galeriaContenedor) {
            galeriaContenedor.innerHTML = '';
            if (juego.galeria && juego.galeria.length > 0) {
                juego.galeria.forEach((imgUrl, index) => {
                    const img = document.createElement('img');
                    img.src = imgUrl;
                    img.alt = "Captura de pantalla";
                    
                    // Evento Click para abrir Lightbox en esa foto específica
                    img.addEventListener('click', () => {
                        indiceImagenActual = index; // Guardamos el número de la foto
                        lightboxImg.src = imgUrl;
                        lightbox.style.display = "flex";
                    });

                    galeriaContenedor.appendChild(img);
                });
            } else {
                galeriaContenedor.innerHTML = "<p style='color:#666;'>No hay capturas disponibles.</p>";
            }
        }

        // --- FUNCIONES DEL SLIDER ---
        function cambiarImagen(direccion) {
            if (!juego.galeria || juego.galeria.length === 0) return;
            
            indiceImagenActual += direccion; // Suma 1 o resta 1
            
            // Si llega al final, vuelve a la primera
            if (indiceImagenActual >= juego.galeria.length) {
                indiceImagenActual = 0; 
            } 
            // Si retrocede antes de la primera, va a la última
            else if (indiceImagenActual < 0) {
                indiceImagenActual = juego.galeria.length - 1; 
            }
            
            // Cambiamos la imagen que se ve
            lightboxImg.src = juego.galeria[indiceImagenActual];
        }

        // Click en flecha anterior (-1)
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Evita que se cierre el Lightbox al hacer click
                cambiarImagen(-1);
            });
        }

        // Click en flecha siguiente (+1)
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                cambiarImagen(1);
            });
        }

        // Evitar que al dar click a la imagen en sí, se cierre el lightbox
        if (lightboxImg) {
            lightboxImg.addEventListener('click', (e) => e.stopPropagation());
        }

        // --- CERRAR LIGHTBOX ---
        if (closeLightbox) {
            closeLightbox.addEventListener('click', () => lightbox.style.display = "none");
        }
        if (lightbox) {
            // Cierra solo si haces clic en el fondo oscuro
            lightbox.addEventListener('click', (e) => { 
                if(e.target === lightbox) lightbox.style.display = "none"; 
            });
        }
    } else {
        document.body.innerHTML = "<h1 style='color:white; text-align:center;'>Juego no encontrado</h1>";
    }
}

    // Script para el Contacto

  const form = document.getElementById("formulario-contacto");
        const popup = document.getElementById("popup-mensaje");
        const btnCerrar = document.querySelector(".cerrar-popup-btn");
        const btnEnviar = document.getElementById("btn-enviar");

        form.addEventListener("submit", async function(event) {
            event.preventDefault(); // Evita que la página te lleve a Formspree

            // Cambiar el texto del botón mientras carga
            const textoOriginal = btnEnviar.innerText;
            btnEnviar.innerText = "Enviando...";
            btnEnviar.disabled = true;

            const data = new FormData(form);

            try {
                // Enviar los datos de forma invisible
                const response = await fetch(form.action, {
                    method: form.method,
                    body: data,
                    headers: { 'Accept': 'application/json' }
                });
                
                if (response.ok) {
                    // ÉXITO
                    document.getElementById("popup-icono").innerText = "✅";
                    document.getElementById("popup-titulo").innerText = "¡Mensaje Enviado!";
                    document.getElementById("popup-texto").innerText = "Gracias por avisarnos. Lo revisaremos lo antes posible.";
                    form.reset(); // Limpia los campos del formulario
                } else {
                    // ERROR DE la plataforma o que se acabo los 250 mensajes mensuales
                    document.getElementById("popup-icono").innerText = "❌";
                    document.getElementById("popup-titulo").innerText = "Hubo un problema";
                    document.getElementById("popup-texto").innerText = "No se pudo enviar. Inténtalo de nuevo más tarde.";
                }
            } catch (error) {
                // ERROR DE INTERNET
                document.getElementById("popup-icono").innerText = "📡";
                document.getElementById("popup-titulo").innerText = "Error de conexión";
                document.getElementById("popup-texto").innerText = "Comprueba tu internet e inténtalo de nuevo.";
            }

            // Mostrar el Pop-up y restaurar el botón
            popup.style.display = "flex";
            btnEnviar.innerText = textoOriginal;
            btnEnviar.disabled = false;
        });

        // Cerrar el popup al hacer clic en "Aceptar"
        btnCerrar.addEventListener('click', () => {
            popup.style.display = "none";
        });

        // Cerrar si hace clic fuera de la caja
        window.addEventListener('click', (e) => {
            if(e.target === popup) popup.style.display = "none";
        });


// LÓGICA DEL MENÚ HAMBURGUESA (MÓVILES)
document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (hamburgerBtn && mobileMenu) {
        // Abrir/Cerrar menú al tocar la hamburguesa
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('open');
            mobileMenu.classList.toggle('open');
        });

        // Opcional: Cerrar el menú automáticamente si el usuario hace clic en un enlace
        const navLinks = mobileMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburgerBtn.classList.remove('open');
                mobileMenu.classList.remove('open');
            });
        });
    }
});

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

// --- LÓGICA PÁGINA DE INICIO ---
if (isIndex) {
    const contenedor = document.getElementById('contenedor-juegos');
    const buscador = document.getElementById('buscador');
    const tituloSeccion = document.getElementById('titulo-seccion');
    const selectorServidor = document.getElementById('filtro-servidor');
    const selectorConsola = document.getElementById('filtro-tipo-consola');
    const contenedorFiltroConsola = document.getElementById('filtro-consola-container');
    const btnSorprendeme = document.getElementById('btn-sorprendeme');
    const resultCount = document.getElementById('result-count');
    const sortSelect = document.getElementById('sort-select');
    const viewToggle = document.getElementById('view-toggle');
    const recientesSection = document.getElementById('recientes-section');
    const recientesContainer = document.getElementById('recientes-container');
    const quickPreview = document.getElementById('quick-preview');
    const btnsCategoria = document.querySelectorAll('.genre-btn');

    // --- STATE ---
    let filtroPlataforma = 'pc';
    let filtroCategoria = 'todos';
    let filtroBusqueda = '';
    let filtroServidorActual = 'todos';
    let filtroConsolaActual = 'todos';
    let sortMode = 'default';
    let listView = false;
    let visibleCount = 20;
    const STEP = 20;
    let todosLosJuegosFiltrados = [];

    // --- URL STATE ---
    function leerEstadoURL() {
        const params = new URLSearchParams(window.location.search);
        if (params.has('plat')) filtroPlataforma = params.get('plat');
        if (params.has('cat')) filtroCategoria = params.get('cat');
        if (params.has('q')) filtroBusqueda = params.get('q');
        if (params.has('sort')) sortMode = params.get('sort');
        if (buscador && filtroBusqueda) buscador.value = filtroBusqueda;
        if (sortSelect && sortMode !== 'default') sortSelect.value = sortMode;
    }
    function escribirEstadoURL() {
        const params = new URLSearchParams();
        if (filtroPlataforma !== 'pc') params.set('plat', filtroPlataforma);
        if (filtroCategoria !== 'todos') params.set('cat', filtroCategoria);
        if (filtroBusqueda) params.set('q', filtroBusqueda);
        if (sortMode !== 'default') params.set('sort', sortMode);
        const str = params.toString();
        const url = str ? '?' + str : window.location.pathname;
        history.replaceState(null, '', url);
    }

    // --- FAVORITES (localStorage) ---
    function obtenerFavoritos() {
        try { return JSON.parse(localStorage.getItem('jlfavs') || '{}'); } catch { return {}; }
    }
    function guardarFavoritos(favs) {
        localStorage.setItem('jlfavs', JSON.stringify(favs));
    }
    function toggleFavorite(id) {
        const favs = obtenerFavoritos();
        if (favs[id]) delete favs[id];
        else favs[id] = true;
        guardarFavoritos(favs);
        aplicarFiltros();
    }
    function esFavorito(id) {
        return !!obtenerFavoritos()[id];
    }

    // --- RECENTS (localStorage) ---
    function obtenerRecientes() {
        try { return JSON.parse(localStorage.getItem('jlrecent') || '[]'); } catch { return []; }
    }
    function guardarReciente(juego) {
        let recientes = obtenerRecientes();
        recientes = recientes.filter(function(r) { return r.id !== juego.id; });
        recientes.unshift({ id: juego.id, titulo: juego.titulo, imagen: juego.imagen, timestamp: Date.now() });
        if (recientes.length > 5) recientes = recientes.slice(0, 5);
        localStorage.setItem('jlrecent', JSON.stringify(recientes));
    }
    function cargarRecientes() {
        if (!recientesSection || !recientesContainer) return;
        const recientes = obtenerRecientes();
        if (recientes.length < 2) {
            recientesSection.style.display = 'none';
            return;
        }
        recientesSection.style.display = 'block';
        recientesContainer.innerHTML = recientes.map(function(r) {
            return '<div class="recent-card" onclick="window.location.href=\'juego.html?id=' + r.id + '\'">' +
                '<div class="recent-img" style="background-image:url(\'' + r.imagen + '\')"></div>' +
                '<span>' + r.titulo + '</span></div>';
        }).join('');
    }

    // --- DYNAMIC SLIDER (juegos hot) ---
    function initSlider() {
        const track = document.getElementById('slider-track');
        const dotsContainer = document.getElementById('slider-dots');
        const btnPrev = document.getElementById('btn-prev');
        const btnNext = document.getElementById('btn-next');
        if (!track) return;
        const hotGames = listaJuegos.filter(function(j) { return j.hot; });
        if (hotGames.length === 0) {
            var sliderContainer = track.closest('.custom-slider-container');
            if (sliderContainer) sliderContainer.style.display = 'none';
            return;
        }
        var shuffled = hotGames.slice();
        for (var i = shuffled.length - 1; i > 0; i--) {
            var r = Math.floor(Math.random() * (i + 1));
            var t = shuffled[i]; shuffled[i] = shuffled[r]; shuffled[r] = t;
        }
        var selected = shuffled.slice(0, 6);
        track.innerHTML = selected.map(function(j) {
            return '<div class="slide-item" style="background-image:url(\'' + (j.banner || j.imagen) + '\');cursor:pointer" data-id="' + j.id + '">' +
                '<div class="slide-info"><span class="slide-badge">Destacado</span><h2>' + j.titulo + '</h2><p>' + j.genero + '</p></div></div>';
        }).join('');
        track.querySelectorAll('.slide-item').forEach(function(el) {
            el.addEventListener('click', function() {
                window.location.href = 'juego.html?id=' + el.dataset.id;
            });
        });
        var slides = track.querySelectorAll('.slide-item');
        if (!slides.length) return;
        var currentIndex = 0, slideTimer, startX = 0, isDragging = false;
        if (dotsContainer) {
            dotsContainer.innerHTML = '';
            slides.forEach(function(_, i) {
                var dot = document.createElement('div');
                dot.className = 'dot' + (i === 0 ? ' active' : '');
                dot.addEventListener('click', function() { goToSlide(i); });
                dotsContainer.appendChild(dot);
            });
        }
        var dots = dotsContainer ? dotsContainer.querySelectorAll('.dot') : [];
        function goToSlide(index) {
            if (index < 0) index = slides.length - 1;
            if (index >= slides.length) index = 0;
            currentIndex = index;
            track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
            if (dots.length) { dots.forEach(function(d) { d.classList.remove('active'); }); dots[currentIndex].classList.add('active'); }
            resetTimer();
        }
        function startTimer() { slideTimer = setInterval(function() { goToSlide(currentIndex + 1); }, 5000); }
        function resetTimer() { clearInterval(slideTimer); startTimer(); }
        if (btnNext) btnNext.addEventListener('click', function() { goToSlide(currentIndex + 1); });
        if (btnPrev) btnPrev.addEventListener('click', function() { goToSlide(currentIndex - 1); });
        track.addEventListener('touchstart', function(e) { startX = e.touches[0].clientX; isDragging = true; clearInterval(slideTimer); }, { passive: true });
        track.addEventListener('touchend', function(e) {
            if (!isDragging) return;
            var diffX = startX - e.changedTouches[0].clientX;
            if (Math.abs(diffX) > 50) goToSlide(currentIndex + (diffX > 0 ? 1 : -1));
            isDragging = false;
            startTimer();
        });
        document.addEventListener('visibilitychange', function() { if (document.hidden) clearInterval(slideTimer); else startTimer(); });
        startTimer();
    }

    // --- SKELETON ---
    function mostrarSkeleton() {
        if (!contenedor) return;
        contenedor.innerHTML = '';
        for (var i = 0; i < 8; i++) {
            var sk = document.createElement('div');
            sk.className = 'card skeleton-card';
            sk.innerHTML = '<div class="card-img-wrapper"><div class="sk-shimmer"></div></div><div class="card-info"><div class="sk-line sk-line-title"></div><div class="sk-line sk-line-sub"></div></div>';
            contenedor.appendChild(sk);
        }
    }

    // --- RENDER ---
    var renderTimer = null;

    function cargarJuegos(juegos) {
        if (!contenedor) return;
        todosLosJuegosFiltrados = juegos;

        // If skeleton cards are present, replace immediately
        if (contenedor.querySelector('.skeleton-card')) {
            renderGameCards(juegos);
            return;
        }

        // If real cards exist, fade them out first
        var existing = contenedor.querySelectorAll('.card');
        if (existing.length > 0) {
            existing.forEach(function(c) {
                c.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
                c.style.opacity = '0';
                c.style.transform = 'scale(0.95)';
            });
            clearTimeout(renderTimer);
            renderTimer = setTimeout(function() {
                renderGameCards(juegos);
            }, 200);
        } else {
            renderGameCards(juegos);
        }
    }

    function renderGameCards(juegos) {
        contenedor.innerHTML = '';
        if (juegos.length === 0) {
            contenedor.innerHTML = '<p class="empty-msg">No hay juegos con estos filtros.</p>';
            actualizarBotonCargar(juegos.length);
            actualizarContador(juegos.length);
            return;
        }
        var mostrar = juegos.slice(0, visibleCount);
        mostrar.forEach(function(juego, idx) {
            anadirCard(juego, idx);
        });
        actualizarBotonCargar(juegos.length);
        actualizarContador(juegos.length);
    }

    function actualizarContador(total) {
        if (resultCount) {
            resultCount.innerText = 'Mostrando ' + Math.min(visibleCount, total) + ' de ' + total + ' juegos';
        }
    }

    function actualizarBotonCargar(total) {
        var btn = document.getElementById('btn-load-more');
        if (visibleCount >= total) {
            if (btn) btn.remove();
            return;
        }
        if (!btn) {
            btn = document.createElement('button');
            btn.id = 'btn-load-more';
            btn.className = 'load-more-btn';
            btn.innerText = 'Ver m\u00e1s juegos';
            btn.addEventListener('click', function() {
                var prevCount = visibleCount;
                visibleCount += STEP;
                var nuevos = todosLosJuegosFiltrados.slice(prevCount, visibleCount);
                nuevos.forEach(function(juego, idx) {
                    anadirCard(juego, prevCount + idx);
                });
                actualizarBotonCargar(todosLosJuegosFiltrados.length);
                actualizarContador(todosLosJuegosFiltrados.length);
            });
            contenedor.parentNode.insertBefore(btn, contenedor.nextSibling);
        }
    }

    function anadirCard(juego, idx) {
        var card = document.createElement('div');
        card.className = 'card' + (listView ? ' card-list' : '');
        card.dataset.id = juego.id;
        var etiquetaHot = juego.hot ? '<span class="hot-badge"><svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" stroke="none" style="vertical-align:middle;margin-right:2px"><path d="M12 23c-3.87 0-7-3.13-7-7 0-3.53 2.61-6.43 6-6.92V2l4 4-4 4v2.08c3.39.49 6 3.39 6 6.92 0 3.87-3.13 7-7 7z"/></svg> HOT</span>' : '';
        var fav = esFavorito(juego.id);
        var favIcon = '<button class="fav-btn' + (fav ? ' fav-active' : '') + '" data-id="' + juego.id + '" aria-label="Favorito"><svg viewBox="0 0 24 24" width="16" height="16" fill="' + (fav ? 'currentColor' : 'none') + '" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></button>';
        card.innerHTML = '<div class="card-img-wrapper">' + etiquetaHot + favIcon +
            '<img class="card-banner" src="' + (juego.banner || juego.imagen) + '" alt="' + juego.titulo + '" onerror="this.style.display=\'none\'" loading="lazy" decoding="async">' +
            '<img class="card-cover" src="' + juego.imagen + '" alt="' + juego.titulo + '" onerror="this.src=\'./img/error.jpg\'" loading="lazy" decoding="async">' +
            '</div><div class="card-info"><h3>' + juego.titulo + '</h3><p>' + juego.genero + '</p></div>';

        // Entrance transition
        card.style.opacity = '0';
        card.style.transform = 'scale(0.93) translateY(10px)';
        contenedor.appendChild(card);
        requestAnimationFrame(function() {
            card.style.transition = 'opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1), transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.transitionDelay = (idx * 25) + 'ms';
            card.style.opacity = '1';
            card.style.transform = 'scale(1) translateY(0)';
            var cleanupDelay = 400 + (idx * 25);
            setTimeout(function() {
                card.style.transition = '';
                card.style.transitionDelay = '';
                card.style.opacity = '';
                card.style.transform = '';
            }, cleanupDelay);
        });

        var favBtn = card.querySelector('.fav-btn');
        if (favBtn) {
            favBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                toggleFavorite(juego.id);
            });
        }
        if (window.innerWidth > 767) {
            var previewTimer;
            card.addEventListener('mouseenter', function(e) {
                clearTimeout(previewTimer);
                previewTimer = setTimeout(function() {
                    mostrarPreview(juego, e.clientX, e.clientY);
                }, 400);
            });
            card.addEventListener('mouseleave', function() {
                clearTimeout(previewTimer);
                ocultarPreview();
            });
            card.addEventListener('mousemove', function(e) {
                if (quickPreview && quickPreview.classList.contains('visible')) {
                    posicionarPreview(e.clientX, e.clientY);
                }
            });
        }
        card.addEventListener('click', function() {
            guardarReciente(juego);
            window.location.href = 'juego.html?id=' + juego.id;
        });
    }

    // --- QUICK PREVIEW ---
    var previewTimeout = null;
    function mostrarPreview(juego, x, y) {
        if (!quickPreview) return;
        clearTimeout(previewTimeout);
        previewTimeout = setTimeout(function() {
            var desc = juego.descripcion ? juego.descripcion.substring(0, 120) + (juego.descripcion.length > 120 ? '...' : '') : '';
            quickPreview.innerHTML = '<div class="qp-img" style="background-image:url(\'' + juego.imagen + '\')"></div>' +
                '<div class="qp-body"><h4>' + juego.titulo + '</h4><p>' + juego.genero + '</p>' +
                '<p class="qp-desc">' + desc + '</p><span class="qp-link">Ver m\u00e1s \u2192</span></div>';
            posicionarPreview(x, y);
            quickPreview.classList.add('visible');
        }, 400);
    }
    function posicionarPreview(x, y) {
        if (!quickPreview) return;
        var w = 320, h = 200;
        var left = x + 15, top = y - 10;
        if (left + w > window.innerWidth - 10) left = x - w - 15;
        if (top + h > window.innerHeight - 10) top = window.innerHeight - h - 10;
        if (top < 10) top = 10;
        quickPreview.style.left = left + 'px';
        quickPreview.style.top = top + 'px';
    }
    function ocultarPreview() {
        clearTimeout(previewTimeout);
        if (quickPreview) quickPreview.classList.remove('visible');
    }

    // --- FILTER ---
    function aplicarFiltros() {
        var juegosFiltrados = listaJuegos.filter(function(juego) {
            if (juego.plataforma !== filtroPlataforma) return false;
            if (filtroCategoria === 'favoritos') {
                if (!esFavorito(juego.id)) return false;
            } else if (filtroCategoria !== 'todos') {
                if (!juego.categoria || !juego.categoria.includes(filtroCategoria)) return false;
            }
            if (filtroBusqueda && juego.titulo.toLowerCase().indexOf(filtroBusqueda.toLowerCase()) === -1) return false;
            var coincideServidor = true;
            if (!juego.links) {
                var servDelJuego = juego.servidor ? juego.servidor.toLowerCase() : 'mediafire';
                coincideServidor = filtroServidorActual === 'todos' || servDelJuego === filtroServidorActual;
            } else {
                coincideServidor = filtroServidorActual === 'todos';
            }
            if (!coincideServidor) return false;
            if (filtroPlataforma === 'consola') {
                var consolaDelJuego = juego.consolaFiltro ? juego.consolaFiltro.toLowerCase() : 'todos';
                if (filtroConsolaActual !== 'todos' && consolaDelJuego !== filtroConsolaActual) return false;
            }
            return true;
        });
        // Sort
        if (sortMode === 'az') {
            juegosFiltrados.sort(function(a, b) { return a.titulo.localeCompare(b.titulo); });
        } else if (sortMode === 'za') {
            juegosFiltrados.sort(function(a, b) { return b.titulo.localeCompare(a.titulo); });
        } else if (sortMode === 'newest') {
            juegosFiltrados.sort(function(a, b) { return b.id - a.id; });
        } else if (sortMode === 'oldest') {
            juegosFiltrados.sort(function(a, b) { return a.id - b.id; });
        } else {
            juegosFiltrados.sort(function(a, b) {
                if (a.hot && !b.hot) return -1;
                if (!a.hot && b.hot) return 1;
                return 0;
            });
        }
        escribirEstadoURL();
        visibleCount = STEP;
        cargarJuegos(juegosFiltrados);
        var catNombre = filtroCategoria.charAt(0).toUpperCase() + filtroCategoria.slice(1);
        var textoTitulo = 'Cat\u00e1logo ' + filtroPlataforma.toUpperCase();
        if (filtroPlataforma === 'consola') textoTitulo = 'Cat\u00e1logo Retro (BETA)';
        else if (filtroPlataforma === 'colecciones') textoTitulo = 'Colecciones';
        tituloSeccion.innerText = textoTitulo + (filtroCategoria !== 'todos' ? ' - ' + catNombre : '');
    }


    if (btnSorprendeme) {
        btnSorprendeme.addEventListener('click', function() {
            var juegosDisponibles = listaJuegos.filter(function(j) { return j.plataforma === filtroPlataforma; });
            if (juegosDisponibles.length === 0) return;
            btnSorprendeme.classList.add('loading');
            btnSorprendeme.innerHTML = 'Buscando joyita...';
            setTimeout(function() {
                var idx = Math.floor(Math.random() * juegosDisponibles.length);
                var juegoAzar = juegosDisponibles[idx];
                window.location.href = 'juego.html?id=' + juegoAzar.id;
            }, 1500);
        });
        window.addEventListener('pageshow', function(event) {
            if (event.persisted) {
                btnSorprendeme.classList.remove('loading');
                btnSorprendeme.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:4px"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> Sorpr\u00e9ndeme';
            }
        });
    }

    // --- EVENT LISTENERS ---
    var btnsPlataforma = document.querySelectorAll('.plat-btn');
    btnsPlataforma.forEach(function(btn) {
        btn.addEventListener('click', function() {
            btnsPlataforma.forEach(function(b) { b.classList.remove('active'); });
            btn.classList.add('active');
            filtroPlataforma = btn.dataset.plat;
            if (contenedorFiltroConsola) {
                contenedorFiltroConsola.style.display = filtroPlataforma === 'consola' ? 'inline-flex' : 'none';
            }
            aplicarFiltros();
        });
    });
    btnsCategoria.forEach(function(btn) {
        btn.addEventListener('click', function() {
            btnsCategoria.forEach(function(b) { b.classList.remove('active'); });
            btn.classList.add('active');
            filtroCategoria = btn.dataset.cat;
            aplicarFiltros();
        });
    });
    if (buscador) {
        buscador.addEventListener('input', function(e) {
            filtroBusqueda = e.target.value;
            aplicarFiltros();
        });
    }
    if (selectorServidor) {
        selectorServidor.addEventListener('change', function(e) {
            filtroServidorActual = e.target.value;
            aplicarFiltros();
        });
    }
    if (selectorConsola) {
        selectorConsola.addEventListener('change', function(e) {
            filtroConsolaActual = e.target.value;
            aplicarFiltros();
        });
    }
    if (sortSelect) {
        sortSelect.addEventListener('change', function(e) {
            sortMode = e.target.value;
            aplicarFiltros();
        });
    }
    if (viewToggle) {
        viewToggle.addEventListener('click', function() {
            listView = !listView;
            viewToggle.querySelector('.vg-grid').style.display = listView ? 'none' : '';
            viewToggle.querySelector('.vg-list').style.display = listView ? '' : 'none';
            if (contenedor) contenedor.classList.toggle('list-view', listView);
        });
    }

    // --- KEYBOARD SHORTCUTS ---
    document.addEventListener('keydown', function(e) {
        if (e.key === '/' && ['INPUT', 'TEXTAREA'].indexOf(e.target.tagName) === -1) {
            e.preventDefault();
            if (buscador) buscador.focus();
        }
        if (e.key === 'Escape' && buscador && document.activeElement === buscador) {
            buscador.value = '';
            filtroBusqueda = '';
            aplicarFiltros();
            buscador.blur();
        }
    });

    // --- INIT ---
    leerEstadoURL();

    btnsPlataforma.forEach(function(btn) {
        if (btn.dataset.plat === filtroPlataforma) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    btnsCategoria.forEach(function(btn) {
        if (btn.dataset.cat === filtroCategoria) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    if (contenedorFiltroConsola) {
        contenedorFiltroConsola.style.display = filtroPlataforma === 'consola' ? 'inline-flex' : 'none';
    }
    if (sortSelect && sortMode !== 'default') sortSelect.value = sortMode;

    mostrarSkeleton();
    initSlider();
    cargarRecientes();

    setTimeout(function() {
        aplicarFiltros();
    }, 300);
}

// --- LÓGICA PÁGINA DE DETALLES ---
if (isGame) {
    const params = new URLSearchParams(window.location.search);
    const idJuego = parseInt(params.get('id'));
    const juego = listaJuegos.find(j => j.id === idJuego);

    if (juego) {
        document.title = `${juego.titulo} - Descarga`;

        // Guardar en recientes
        try {
            let recientes = JSON.parse(localStorage.getItem('jlrecent') || '[]');
            recientes = recientes.filter(function(r) { return r.id !== juego.id; });
            recientes.unshift({ id: juego.id, titulo: juego.titulo, imagen: juego.imagen, timestamp: Date.now() });
            if (recientes.length > 5) recientes = recientes.slice(0, 5);
            localStorage.setItem('jlrecent', JSON.stringify(recientes));
        } catch(e) {}

        const imgPrincipal = document.getElementById('detalle-img');
        if (imgPrincipal) {
            imgPrincipal.src = juego.banner || juego.imagen;
            imgPrincipal.onerror = function () { this.style.display = 'none'; };
        }
        document.getElementById('detalle-titulo').innerText = juego.titulo;
        document.getElementById('detalle-genero').innerText = juego.genero;
        document.getElementById('detalle-desc').innerText = juego.descripcion;
       // --- CONFIGURAR BOTÓN DE DESCARGA (NORMAL / AAA / COLECCIÓN) ---
        const btnDescargaOriginal = document.getElementById('detalle-btn');
        const contenedorPadre = btnDescargaOriginal.parentElement;

        if (juego.coleccion) {
            btnDescargaOriginal.style.display = 'none';
            const coleccionContainer = document.createElement('div');
            coleccionContainer.className = 'coleccion-container';
            juego.coleccion.forEach(function(item, idx) {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'coleccion-item';
                let nombreServidor = "Mediafire";
                let claseServidor = "btn-mediafire";
                if (item.servidor) {
                    const s = item.servidor.toLowerCase();
                    if (s === "gofile") { nombreServidor = "Gofile"; claseServidor = "btn-gofile"; }
                    else if (s === "buzzheavier") { nombreServidor = "Buzzheavier"; claseServidor = "btn-buzz"; }
                    else if (s === "terabox") { nombreServidor = "TeraBox"; claseServidor = "btn-terabox"; }
                    else if (s === "directo") { nombreServidor = "Directo"; claseServidor = "btn-directo"; }
                }
                itemDiv.innerHTML = `
                    <div class="coleccion-item-header">
                        <span class="coleccion-numero">${idx + 1}</span>
                        <h4>${item.titulo}</h4>
                    </div>
                    ${item.descripcion ? '<p class="coleccion-item-desc">' + item.descripcion + '</p>' : ''}
                    <a href="${item.link}" class="download-btn-mega ${claseServidor}" target="_blank">DESCARGAR <br><small>(${nombreServidor})</small></a>
                `;
                coleccionContainer.appendChild(itemDiv);
            });
            contenedorPadre.insertBefore(coleccionContainer, btnDescargaOriginal);
            const reqCard = document.querySelector('.req-card');
            if (reqCard) reqCard.style.display = 'none';
        } else if (juego.links) {
            btnDescargaOriginal.style.display = 'none';
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
            if (juego.links.directo) {
                boxLinks.innerHTML += `<a href="${juego.links.directo}" class="download-btn-mega btn-directo" target="_blank">DESCARGAR (DIRECTO) <br><small>Alternativo</small></a>`;
            }
            contenedorPadre.insertBefore(boxLinks, btnDescargaOriginal);
        } else {
            btnDescargaOriginal.href = juego.link;
            let nombreServidor = "Mediafire";
            let claseServidor = "btn-mediafire";
            if (juego.servidor) {
                const serv = juego.servidor.toLowerCase();
                if (serv === "terabox") { nombreServidor = "TeraBox"; claseServidor = "btn-terabox"; }
                else if (serv === "buzzheavier") { nombreServidor = "Buzzheavier"; claseServidor = "btn-buzz"; }
                else if (serv === "gofile") { nombreServidor = "Gofile"; claseServidor = "btn-gofile"; }
                else if (serv === "directo") { nombreServidor = "Directo"; claseServidor = "btn-directo"; }
            }
            btnDescargaOriginal.className = `download-btn-mega ${claseServidor}`;
            btnDescargaOriginal.innerHTML = `DESCARGAR AHORA <br> <small>(vía ${nombreServidor})</small>`;
        }

        // Popup de descarga
        const downloadOverlay = document.getElementById('download-overlay');
        document.querySelector('.download-card')?.addEventListener('click', function(e) {
            const btn = e.target.closest('.download-btn-mega');
            if (!btn) return;
            e.preventDefault();
            const href = btn.getAttribute('href');
            if (!href) return;
            downloadOverlay.classList.add('active');
            setTimeout(function() {
                window.open(href, '_blank');
                downloadOverlay.classList.remove('active');
            }, 1200);
        });

        // Requisitos
        if (juego.requisitos) {
            document.getElementById('req-min').innerHTML = juego.requisitos.minimos;
            document.getElementById('req-rec').innerHTML = juego.requisitos.recomendados;
        } else {
            const reqCard = document.querySelector('.req-card');
            if (reqCard) reqCard.style.display = 'none';
        }

        // Video Trailer
        const videoWrapper = document.getElementById('video-wrapper');
        const videoId = getYouTubeId(juego.trailer);
        const trailerSection = videoWrapper ? videoWrapper.closest('.detail-section') : null;
        if (videoId && videoWrapper) {
            videoWrapper.innerHTML = `
                <iframe src="https://www.youtube.com/embed/${videoId}" 
                title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            `;
        } else {
            if (videoWrapper) videoWrapper.style.display = 'none';
            if (trailerSection) trailerSection.style.display = 'none';
        }

       // Galería e Imágenes expandibles (Lightbox con Slider)
        const galeriaSection = document.getElementById('detalle-galeria') ? document.getElementById('detalle-galeria').closest('.detail-section') : null;
        const galeriaContenedor = document.getElementById('detalle-galeria');
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('img-grande');
        const closeLightbox = document.querySelector('.close-lightbox');
        const prevBtn = document.querySelector('.prev-lightbox');
        const nextBtn = document.querySelector('.next-lightbox');
        const lbCounter = document.getElementById('lb-counter');
        const lbThumbs = document.getElementById('lb-thumbs');
        let indiceImagenActual = 0;

        function actualizarLightbox() {
            lightboxImg.style.opacity = '0';
            setTimeout(() => {
                lightboxImg.src = juego.galeria[indiceImagenActual];
                lightboxImg.style.opacity = '1';
            }, 120);
            if (lbCounter) {
                lbCounter.textContent = (indiceImagenActual + 1) + ' / ' + juego.galeria.length;
            }
            if (lbThumbs) {
                lbThumbs.querySelectorAll('.lb-thumb').forEach((t, i) => {
                    t.classList.toggle('active', i === indiceImagenActual);
                    t.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                });
            }
        }

        function abrirLightbox(index) {
            indiceImagenActual = index;
            if (lbThumbs) {
                lbThumbs.innerHTML = '';
                juego.galeria.forEach((url, i) => {
                    const thumb = document.createElement('img');
                    thumb.src = url;
                    thumb.className = 'lb-thumb' + (i === index ? ' active' : '');
                    thumb.addEventListener('click', () => abrirLightbox(i));
                    lbThumbs.appendChild(thumb);
                });
            }
            actualizarLightbox();
            lightbox.style.display = "flex";
        }

        function cambiarImagen(direccion) {
            if (!juego.galeria || juego.galeria.length === 0) return;
            indiceImagenActual += direccion;
            if (indiceImagenActual >= juego.galeria.length) {
                indiceImagenActual = 0;
            } else if (indiceImagenActual < 0) {
                indiceImagenActual = juego.galeria.length - 1;
            }
            actualizarLightbox();
        }

        if (galeriaContenedor) {
            galeriaContenedor.innerHTML = '';
            if (juego.galeria && juego.galeria.length > 0) {
                juego.galeria.forEach((imgUrl, index) => {
                    const img = document.createElement('img');
                    img.src = imgUrl;
                    img.alt = "Captura de pantalla";
                    img.addEventListener('click', () => abrirLightbox(index));
                    galeriaContenedor.appendChild(img);
                });
            } else {
                galeriaContenedor.innerHTML = "<p style='color:#666;'>No hay capturas disponibles.</p>";
                if (galeriaSection) galeriaSection.style.display = 'none';
            }
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                cambiarImagen(-1);
            });
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                cambiarImagen(1);
            });
        }
        if (lightboxImg) {
            lightboxImg.addEventListener('click', (e) => e.stopPropagation());
        }
        if (closeLightbox) {
            closeLightbox.addEventListener('click', () => lightbox.style.display = "none");
        }
        if (lightbox) {
            lightbox.addEventListener('click', (e) => {
                if(e.target === lightbox) lightbox.style.display = "none";
            });
        }
        document.addEventListener('keydown', function cerrarLightbox(e) {
            if (!lightbox || lightbox.style.display !== "flex") return;
            if (e.key === 'Escape') {
                lightbox.style.display = "none";
            } else if (e.key === 'ArrowLeft') {
                cambiarImagen(-1);
            } else if (e.key === 'ArrowRight') {
                cambiarImagen(1);
            }
        });
    } else {
        document.body.innerHTML = "<h1 style='color:white; text-align:center;'>Juego no encontrado</h1>";
    }
}

// Script para el Contacto
const contactForm = document.getElementById("formulario-contacto");
if (contactForm) {
    const popup = document.getElementById("popup-mensaje");
    const btnCerrar = document.querySelector(".cerrar-popup-btn");
    const btnEnviar = document.getElementById("btn-enviar");

    contactForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const textoOriginal = btnEnviar.innerText;
        btnEnviar.innerText = "Enviando...";
        btnEnviar.disabled = true;

        const data = new FormData(contactForm);

        try {
            const response = await fetch(contactForm.action, {
                method: contactForm.method,
                body: data,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                document.getElementById("popup-icono").innerHTML = '<svg viewBox="0 0 24 24" width="50" height="50" fill="none" stroke="#4ade80" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
                document.getElementById("popup-titulo").innerText = "¡Mensaje Enviado!";
                document.getElementById("popup-texto").innerText = "Gracias por avisarnos. Lo revisaremos lo antes posible.";
                contactForm.reset();
            } else {
                document.getElementById("popup-icono").innerHTML = '<svg viewBox="0 0 24 24" width="50" height="50" fill="none" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
                document.getElementById("popup-titulo").innerText = "Hubo un problema";
                document.getElementById("popup-texto").innerText = "No se pudo enviar. Inténtalo de nuevo más tarde.";
            }
        } catch (error) {
            document.getElementById("popup-icono").innerHTML = '<svg viewBox="0 0 24 24" width="50" height="50" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="2" x2="22" y2="22"/><path d="M8.5 16.5a5 5 0 017 0M5.5 13.5a8 8 0 0113 0"/></svg>';
            document.getElementById("popup-titulo").innerText = "Error de conexión";
            document.getElementById("popup-texto").innerText = "Comprueba tu internet e inténtalo de nuevo.";
        }

        popup.style.display = "flex";
        btnEnviar.innerText = textoOriginal;
        btnEnviar.disabled = false;
    });

    btnCerrar.addEventListener('click', () => {
        popup.style.display = "none";
    });

    window.addEventListener('click', (e) => {
        if(e.target === popup) popup.style.display = "none";
    });
}

// RESALTAR ENLACE ACTIVO EN NAVEGACION MOVIL Y BOTTOM NAV
(function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.bottom-nav a, .mobile-menu a').forEach(link => {
        const href = link.getAttribute('href');
        if (href && href === currentPage) {
            link.classList.add('active');
        }
    });
})();

// LOGICA HEADER HIDE ON SCROLL + SCROLL-TOP BUTTON + is-scrolling
(function() {
    const header = document.querySelector('body.launcher header');
    const scrollBtn = document.getElementById('scrollTopBtn');
    if (!header) return;
    let lastScroll = 0, ticking = false, scrollTimeout;
    const isMobile = () => window.innerWidth <= 767;

    window.addEventListener('scroll', () => {
        document.body.classList.add('is-scrolling');
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function() { document.body.classList.remove('is-scrolling'); }, 150);

        if (!ticking) {
            window.requestAnimationFrame(function() {
                const cy = window.scrollY;
                if (isMobile()) {
                    if (cy > lastScroll && cy > 80) header.classList.add('header-hidden');
                    else header.classList.remove('header-hidden');
                } else {
                    header.classList.remove('header-hidden');
                }
                if (scrollBtn) {
                    if (cy > 300) scrollBtn.classList.add('visible');
                    else scrollBtn.classList.remove('visible');
                }
                lastScroll = cy;
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    if (scrollBtn) {
        scrollBtn.addEventListener('click', function() { window.scrollTo({ top: 0, behavior: 'smooth' }); });
    }
})();

// LOGICA DEL MENU HAMBURGUESA (MOVILES)
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuOverlay = document.getElementById('menuOverlay');

    function toggleMenu(open) {
        hamburger.classList.toggle('active', open);
        mobileMenu.classList.toggle('active', open);
        menuOverlay.classList.toggle('active', open);
        document.body.style.overflow = open ? 'hidden' : '';
    }

    if (hamburger && mobileMenu && menuOverlay) {
        hamburger.addEventListener('click', () => toggleMenu(!mobileMenu.classList.contains('active')));
        menuOverlay.addEventListener('click', () => toggleMenu(false));
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') toggleMenu(false); });
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => toggleMenu(false));
        });
    }
});

// --- BASE DE DATOS DE JUEGOS ---
const listaJuegos = [
    {
        id: 1,
        titulo: "Terraria",
        genero: "Supervivencia / SandBox",
        // AHORA LAS CATEGORIAS SON UNA LISTA ENTRE CORCHETES []
        categoria: ["supervivencia", "aventura"],
        plataforma: "pc",
        imagen: "./img/terraria/portada.jpg",
        galeria: ["./img/terraria/img-1.jpg", "./img/terraria/img-2.jpg", "./img/terraria/img-3.jpg", "./img/terraria/img-4.jpg"],
        trailer: "https://youtu.be/HHNLfxBxcvo",
         servidor: "mediafire", // PUEDE SER: "mediafire", "terabox" o "gofile"
        descripcion: "¡Cava, lucha, explora, construye! Con este juego de aventuras repleto de acción nada es imposible. ¡Pack de Cuatro también disponible!",
        requisitos: {
            minimos: "<strong>SO:</strong> Windows XP, Vista, 7, 8/8.1, 10<br><strong>Procesador:</strong> 2.0 Ghz<br><strong>Memoria:</strong> 2.5 GB de RAM<br><strong>Gráficos:</strong> 128mb Video Memory, capaz de Shader Model 2.0+<br><strong>Almacenamiento:</strong> 200 MB de espacio disponible",
            recomendados: "<strong>SO:</strong> Windows 7, 8/8.1, 10<br><strong>Procesador:</strong> Dual Core 3.0 Ghz<br><strong>Memoria:</strong> 4 GB de RAM<br><strong>Gráficos:</strong> 256mb Video Memory, capaz de Shader Model 2.0+<br><strong>Almacenamiento:</strong> 200 MB de espacio disponible"
        },
        link: "https://www.mediafire.com/file/ygcg47cr6cej0dw/Terraria_v1.4.5.5_Juan_Launcher.zip/file"
    },
    {
        id: 2,
        titulo: "Hollow Knight",
        genero: "Metroidvania",
        // TIENE DOS CATEGORIAS: METROIDVANIA Y AVENTURA
        categoria: ["metroidvania", "aventura", "accion"],
        plataforma: "pc",
        imagen: "./img/hollowknight/portada.jpg",
        galeria: ["./img/hollowknight/img-1.jpg", "./img/hollowknight/img-2.jpg", "./img/hollowknight/img-3.jpg", "./img/hollowknight/img-4.jpg"],
        trailer: "https://www.youtube.com/watch?v=UAO2urG23S4",
        servidor: "mediafire", // PUEDE SER: "mediafire", "terabox" o "gofile"
        descripcion: "¡Forja tu propio camino en Hollow Knight! Una aventura épica a través de un vasto reino de insectos y héroes que se encuentra en ruinas. Explora cavernas tortuosas, combate contra criaturas corrompidas y entabla amistad con extraños insectos, todo en un estilo clásico en 2D dibujado a mano. Creditos a TheFenix010",
        requisitos: {
            minimos: "<strong>SO:</strong> Windows 7 (64bit)<br><strong>Procesador:</strong> Intel Core 2 Duo E5200<br><strong>Memoria:</strong> 4 GB de RAM<br><strong>Gráficos:</strong> GeForce 9800GTX+ (1GB)<br><strong>Almacenamiento:</strong> 9 GB de espacio disponible",
            recomendados: "<strong>SO:</strong> Windows 10 (64bit)<br><strong>Procesador:</strong> Intel Core i5<br><strong>Memoria:</strong> 8 GB de RAM<br><strong>Gráficos:</strong> GeForce GTX 560<br><strong>Almacenamiento:</strong> 9 GB de espacio disponible"
        },
        link: "https://www.mediafire.com/file/w5em9atpqrhaqmi/HK_-_JuanLauncher_and_thefenix010.zip/file"
    },

    {
        id: 4,
        titulo: "Stardew Valley",
        genero: "Simulación de granja",
        // CATEGORIAS: SIMULACIÓN, RPG, INDIE
        categoria: ["simulacion", "rpg", "indie", "aventura"],
        plataforma: "pc",
        imagen: "./img/stardewvalley/portada.jpg",
        galeria: ["./img/stardewvalley/img-1.jpg", "./img/stardewvalley/img-2.jpg", "./img/stardewvalley/img-3.jpg", "./img/stardewvalley/img-4.jpg"],
        trailer: "https://www.youtube.com/watch?v=ot7uXNQskhs",
         servidor: "mediafire", // PUEDE SER: "mediafire", "terabox" o "gofile"
        descripcion: "Has heredado la vieja parcela agrícola de tu abuelo. Armado con herramientas de mano y unas pocas monedas, te dispones a comenzar tu nueva vida.",
        requisitos: {
            minimos: "<strong>SO:</strong> Windows 7 o superior<br><strong>Procesador:</strong> 2 Ghz<br><strong>Memoria:</strong> 2 GB de RAM<br><strong>Gráficos:</strong> 256 mb memoria de vídeo, shader model 3.0+<br><strong>Almacenamiento:</strong> 500 MB de espacio disponible",
            recomendados: "<strong>SO:</strong> Windows 10<br><strong>Procesador:</strong> 2.5 Ghz<br><strong>Memoria:</strong> 4 GB de RAM<br><strong>Gráficos:</strong> 512 mb memoria de vídeo<br><strong>Almacenamiento:</strong> 1 GB de espacio disponible"
        },
        link: "https://www.mediafire.com/file/bi6u9o8ona5r0q2/Stardew_valley_-_JuanLauncher.zip/file"
    },
    {
        id: 5,
        titulo: "Five Nights at Freddy's 1 + 2 + 3",
        genero: "Survival Horror",
        // CATEGORIAS: TERROR, SUPERVIVENCIA, POINT AND CLICK
        categoria: ["terror", "supervivencia", "indie", "estrategia"],
        plataforma: "pc",
        imagen: "./img/fnaf1/portada.webp",
        galeria: ["./img/fnaf1/img-1.jpg", "./img/fnaf1/img-2.jpg", "./img/fnaf1/img-3.jpg", "./img/fnaf1/img-4.jpg"],
        trailer: "https://www.youtube.com/watch?v=RP4UTOek0-Y",
         servidor: "mediafire", // PUEDE SER: "mediafire", "terabox" o "gofile"
        descripcion: "En este Paquete viene los 3 primeros Juegos de la Famosa Saga de FNAF (Todos los creditos a Optiproyects por el Paquete)",
        requisitos: {
            minimos: "<strong>SO:</strong> Windows XP, 7, 8, 10<br><strong>Procesador:</strong> 2 GHz Intel Pentium 4 o AMD Athlon<br><strong>Memoria:</strong> 1 GB de RAM<br><strong>Gráficos:</strong> 1 GB de memoria de vídeo<br><strong>Almacenamiento:</strong> 250 MB de espacio disponible",
            recomendados: "<strong>SO:</strong> Windows 10<br><strong>Procesador:</strong> 2.4 Ghz Dual Core<br><strong>Memoria:</strong> 2 GB de RAM<br><strong>Gráficos:</strong> 2 GB de memoria de vídeo<br><strong>Almacenamiento:</strong> 500 MB de espacio disponible"
        },
        link: "https://www.mediafire.com/file/akaszd8xyefopwe/Five_Nights_At_Freddys_-_Optiproyects_Juanlauncher.zip/file"
    },
   {
        id: 6,
        titulo: "Celeste",
        genero: "Plataformas",
        // CATEGORIAS: DIFICIL, INDIE, ACCION, AVENTURA
        categoria: ["aventura", "accion", "dificil", "pixel-art"],
        plataforma: "pc",
        imagen: "./img/celeste/portada.png",
        galeria: ["./img/celeste/img-1.jpg", "./img/celeste/img-2.jpg", "./img/celeste/img-3.jpg", "./img/celeste/img-4.jpg"],
        trailer: "https://www.youtube.com/watch?v=FqBj2IGg6Uw",
         servidor: "mediafire", // PUEDE SER: "mediafire", "terabox" o "gofile"
        descripcion: "Ayuda a Madeline a sobrevivir a sus demonios internos en su viaje a la cima de la montaña Celeste, en este ajustadísimo plataformas de los creadores de TowerFall. (Creditos a Optiproyects)",
        requisitos: {
            minimos: "<strong>SO:</strong> Windows 7 o superior<br><strong>Procesador:</strong> Intel Core i3 M380<br><strong>Memoria:</strong> 2 GB de RAM<br><strong>Gráficos:</strong> Intel HD 4000<br><strong>Almacenamiento:</strong> 1.2 GB de espacio disponible",
            recomendados: "<strong>SO:</strong> Windows 10<br><strong>Procesador:</strong> Dual Core 2.0 Ghz<br><strong>Memoria:</strong> 4 GB de RAM<br><strong>Gráficos:</strong> Dedicada con 512 MB de VRAM<br><strong>Almacenamiento:</strong> 1.5 GB de espacio disponible"
        },
        link: "https://www.mediafire.com/file/xyn82xpnzgby32m/Celeste_1.4.zip/file"
    },
   {
        id: 7,
        titulo: "Hollow Knight: Silksong",
        genero: "Metroidvania",
        // CATEGORIAS: ACCION, AVENTURA, DIFICIL, INDIE
        categoria: ["metroidvania", "accion", "aventura", "dificil"],
        plataforma: "pc",
        imagen: "./img/silksong/portada.jpg",
        galeria: ["./img/silksong/img-1.jpg", "./img/silksong/img-2.jpg", "./img/silksong/img-3.jpg", "./img/silksong/img-4.jpg"],
        trailer: "https://www.youtube.com/watch?v=pFAknD_9U7c",
         servidor: "mediafire", // PUEDE SER: "mediafire", "terabox" o "gofile"
        descripcion: "Juega como Hornet, la princesa protectora de Hallownest, y aventúrate a través de un reino completamente nuevo donde reinan la seda y la música. (Creditos a TheFenix010)",
        requisitos: {
            minimos: "<strong>SO:</strong> Windows 7<br><strong>Procesador:</strong> Intel Core i3<br><strong>Memoria:</strong> 4 GB de RAM<br><strong>Gráficos:</strong> Nvidia GeForce GTX 460<br><strong>Almacenamiento:</strong> 9 GB de espacio disponible",
            recomendados: "<strong>SO:</strong> Windows 10<br><strong>Procesador:</strong> Intel Core i5<br><strong>Memoria:</strong> 8 GB de RAM<br><strong>Gráficos:</strong> Nvidia GeForce GTX 560<br><strong>Almacenamiento:</strong> 9 GB de espacio disponible"
        },
        link: "https://www.mediafire.com/file/uonip8ykr936n0h/HKSS.STP_-_juanlauncher.zip/file"
    },
   {
        id: 8,
        titulo: "Megabonk",
        genero: "Acción / Plataformas",
        // CATEGORIAS: ACCION, AVENTURA, ARCADE, INDIE
        categoria: ["accion", "aventura", "arcade", "indie"],
        plataforma: "pc",
        imagen: "./img/megabonk/portada.jpg",
        galeria: ["./img/megabonk/img-1.jpg", "./img/megabonk/img-2.jpg", "./img/megabonk/img-3.jpg", "./img/megabonk/img-4.jpg"],
        trailer: "https://youtu.be/PlC4_c2dcGw", // Sustituir por el link real del trailer
         servidor: "mediafire", // PUEDE SER: "mediafire", "terabox" o "gofile"
        descripcion: "¡Arrasa con oleadas infinitas de enemigos y vuélvete absurdamente poderoso! Agarra loot, sube de nivel, desbloquea personajes y haz upgrades para crear builds únicas y locas mientras te enfrentas a hordas de criaturas. (Creditos a Optiproyects)",
        requisitos: {
            minimos: "<strong>SO:</strong> Windows 10<br><strong>Procesador:</strong> Intel Core i3 o equivalente<br><strong>Memoria:</strong> 4 GB de RAM<br><strong>Gráficos:</strong> Integrados Intel HD 4000<br><strong>Almacenamiento:</strong> 2 GB de espacio disponible",
            recomendados: "<strong>SO:</strong> Windows 11<br><strong>Procesador:</strong> Intel Core i5 o superior<br><strong>Memoria:</strong> 8 GB de RAM<br><strong>Gráficos:</strong> Nvidia GeForce GTX 1050<br><strong>Almacenamiento:</strong> 2 GB de espacio disponible"
        },
        link: "https://www.mediafire.com/file/o07d4rld1cyeo72/Megabonk_-_JuanLauncher.zip/file"
    },
   {
        id: 9,
        titulo: "Geometry Dash (2.2081)",
        genero: "Ritmo / Plataformas",
        // CATEGORIAS: RITMO, ARCADE, DIFICIL, INDIE
        categoria: ["ritmo", "arcade", "dificil", "plataformas"],
        plataforma: "pc",
        imagen: "./img/geometry-dash/portada.jpg",
        galeria: ["./img/geometry-dash/img-1.jpg", "./img/geometry-dash/img-2.jpg", "./img/geometry-dash/img-3.jpg", "./img/geometry-dash/img-4.jpg"],
        trailer: "https://www.youtube.com/watch?v=k90y6PIzIaE",
         servidor: "mediafire", // PUEDE SER: "mediafire", "terabox" o "gofile"
        descripcion: "¡Salta y vuela a través del peligro en este juego de plataformas de acción basado en el ritmo!",
        requisitos: {
            minimos: "<strong>SO:</strong> Windows XP/Vista/7/8/10/11<br><strong>Procesador:</strong> 2.0 GHz<br><strong>Memoria:</strong> 512 MB de RAM<br><strong>Gráficos:</strong> OpenGL 2.0 compatible<br><strong>Almacenamiento:</strong> 100 MB de espacio disponible",
            recomendados: "<strong>SO:</strong> Windows 10/11<br><strong>Procesador:</strong> Dual Core 3.0 GHz<br><strong>Memoria:</strong> 2 GB de RAM<br><strong>Gráficos:</strong> Nvidia GeForce 8000 series<br><strong>Almacenamiento:</strong> 200 MB de espacio disponible"
        },
        link: "https://www.mediafire.com/file/nffdct9twywljbe/Geometry_Dash_2.2081_-_JuanLauncher.zip/file"
    },
    {
        id: 10,
        titulo: "Hytale",
        genero: "RPG / Sandbox",
        // CATEGORIAS: AVENTURA, RPG, SANDBOX, MULTIJUGADOR
        categoria: ["aventura", "supervivencia", "sandbox", "multijugador"],
        plataforma: "pc",
        imagen: "./img/hytale/portada.webp",
        galeria: ["./img/hytale/img-1.webp", "./img/hytale/img-2.webp", "./img/hytale/img-3.webp", "./img/hytale/img-4.webp"],
        trailer: "https://www.youtube.com/watch?v=o77MzDQT1cg&t=1s",
         servidor: "mediafire", // PUEDE SER: "mediafire", "terabox" o "gofile"
        descripcion: "Hytale es un RPG sandbox de mundo abierto estilo voxel desarrollado por Hypixel Studios, que mezcla exploración, construcción y combate en un universo fantástico generado proceduralmente. Ofrece una experiencia centrada en la aventura con progresión RPG, jefes, mazmorras y herramientas de creación avanzadas, diseñado para ser tanto una aventura guiada como un lienzo creativo multijugador. (Creditos a thefenix010)",
        requisitos: {
            minimos: "<strong>SO:</strong> Windows 7 (64-bit)<br><strong>Procesador:</strong> Intel Core i3-3225 / AMD A8-7600<br><strong>Memoria:</strong> 4 GB de RAM<br><strong>Gráficos:</strong> Intel HD Graphics 4000 / AMD Radeon R5<br><strong>Almacenamiento:</strong> 4 GB de espacio disponible",
            recomendados: "<strong>SO:</strong> Windows 10/11 (64-bit)<br><strong>Procesador:</strong> Intel Core i5-6600K / AMD Ryzen 5 1600<br><strong>Memoria:</strong> 8 GB de RAM<br><strong>Gráficos:</strong> NVIDIA GeForce GTX 960 / AMD Radeon R9 285<br><strong>Almacenamiento:</strong> 10 GB de espacio disponible"
        },
        link: "https://www.mediafire.com/file/wb6hwury090ymq3/Hytale_-_JuanLauncher_and_thefenix010.zip/file"
    },

    {
        id: 11,
        titulo: "Stardew Valley (Android)",
        genero: "Simulación",
        // CATEGORIAS: GRANJA, RELAJANTE, RPG, INDIE
        categoria: ["granja", "aventura", "rpg", "indie"],
        plataforma: "android",
        imagen: "./img/stardewvalley/portada.jpg",
        galeria: ["./img/stardew-valley2/img-1.webp", "./img/stardew-valley2/img-2.webp", "./img/stardew-valley2/img-3.webp", "./img/stardew-valley2/img-4.webp"],
        trailer: "https://youtu.be/pHUqhYslji4",
         servidor: "mediafire", // PUEDE SER: "mediafire", "terabox" o "gofile"
        descripcion: "Has heredado la vieja parcela agrícola de tu abuelo en Stardew Valley. Armado con herramientas de segunda mano y unas pocas monedas, te dispones a comenzar tu nueva vida. ¿Podrás aprender a vivir de la tierra y convertir estos campos descuidados en un hogar próspero? (Creditos a Optiproyects)",
        requisitos: {
            minimos: "<strong>SO:</strong> Android 4.4 o superior<br><strong>Procesador:</strong> Quad-core 1.2 GHz<br><strong>Memoria:</strong> 2 GB de RAM<br><strong>Gráficos:</strong> Adreno 306 o equivalente<br><strong>Almacenamiento:</strong> 500 MB de espacio disponible",
            recomendados: "<strong>SO:</strong> Android 10.0 o superior<br><strong>Procesador:</strong> Octa-core 2.0 GHz<br><strong>Memoria:</strong> 4 GB de RAM o más<br><strong>Gráficos:</strong> Mali-G72 MP3 / Adreno 610<br><strong>Almacenamiento:</strong> 1 GB de espacio disponible"
        },
        link: "https://www.mediafire.com/file/t334s9p1qkc7ad6/Stardew_Valley-_JuanLauncher.apk/file"
    },

    {
        id: 12,
        titulo: "Geometry Dash (Android, 2.207)",
        genero: "Ritmo / Plataformas",
        // CATEGORIAS: RITMO, ARCADE, DIFICIL, ANDROID
        categoria: ["ritmo", "arcade", "dificil", "plataformas"],
        plataforma: "android",
        imagen: "./img/geometry-dash/portada.jpg",
        galeria: ["./img/geometry-dash/img-1.jpg", "./img/geometry-dash/img-2.jpg", "./img/geometry-dash/img-3.jpg", "./img/geometry-dash/img-4.jpg"],
        trailer: "https://www.youtube.com/watch?v=k90y6PIzIaE",
         servidor: "mediafire", // PUEDE SER: "mediafire", "terabox" o "gofile"
        descripcion: "¡La experiencia completa de Geometry Dash en la palma de tu mano! Salta, vuela y ábrete paso a través de peligrosos pasajes y obstáculos puntiagudos al ritmo de la música. ¡Niveles nuevos, logros y mucha frustración divertida te esperan! (Creditos a Optiproyects)",
        requisitos: {
            minimos: "<strong>SO:</strong> Android 4.0 o superior<br><strong>Procesador:</strong> Dual Core 1.2 GHz<br><strong>Memoria:</strong> 1 GB de RAM<br><strong>Gráficos:</strong> Adreno 305 o equivalente<br><strong>Almacenamiento:</strong> 150 MB de espacio disponible",
            recomendados: "<strong>SO:</strong> Android 10.0 o superior<br><strong>Procesador:</strong> Quad Core 2.0 GHz o superior<br><strong>Memoria:</strong> 2 GB de RAM o más<br><strong>Gráficos:</strong> Mali-G71 MP2 / Adreno 506<br><strong>Almacenamiento:</strong> 250 MB de espacio disponible"
        },
        link: "https://www.mediafire.com/file/4v0s1tp03mgts87/GeometryDash_2.207_juanlauncher.apk/file"
    },

    {
        id: 13,
        titulo: "Need for Speed: Most Wanted",
        genero: "Carreras / Mundo Abierto",
        // CATEGORIAS: CARRERAS, ACCION, CONDUCCION, CLASICO
        categoria: ["carreras", "accion", "conduccion", "mundo-abierto"],
        plataforma: "pc",
        imagen: "./img/nfs-most-wanted/portada.jpg",
        galeria: ["./img/nfs-most-wanted/img-1.jpg", "./img/nfs-most-wanted/img-2.jpg", "./img/nfs-most-wanted/img-3.jpg", "./img/nfs-most-wanted/img-4.jpg"],
        trailer: "https://youtu.be/ifK6ZQogJds",
         servidor: "gofile", // PUEDE SER: "mediafire", "terabox" o "gofile"
        descripcion: "Conviértete en el corredor callejero más buscado. Burla a la policía, gana carreras y escala en la Blacklist de Rockport City para recuperar tu coche y ganar reputación en el mundo del tuning.",
        requisitos: {
            minimos: "<strong>SO:</strong> Windows XP/7<br><strong>Procesador:</strong> 1.4 GHz o superior<br><strong>Memoria:</strong> 2 GB de RAM<br><strong>Gráficos:</strong> 32 MB compatible con DirectX 9.0c<br><strong>Almacenamiento:</strong> 3 GB de espacio disponible",
            recomendados: "<strong>SO:</strong> Windows 10/11<br><strong>Procesador:</strong> 3.0 GHz o superior<br><strong>Memoria:</strong> 4 GB de RAM<br><strong>Gráficos:</strong> 128 MB NVIDIA GeForce 6800 / Radeon 9800<br><strong>Almacenamiento:</strong> 3 GB de espacio disponible"
        },
        link: "https://buzzheavier.com/0ituoqfuafn8"
    },
    {
        id: 14,
        titulo: "Project Zomboid",
        genero: "Supervivencia / RPG",
        // CATEGORIAS: SUPERVIVENCIA, ZOMBIES, REALISTA, DIFICIL
        categoria: ["supervivencia", "estrategia", "accion", "aventura"],
        plataforma: "pc",
        imagen: "./img/silksong/portada.jpg",
        galeria: ["./img/project-zomboid/img-1.jpg", "./img/project-zomboid/img-2.jpg", "./img/project-zomboid/img-3.jpg", "./img/project-zomboid/img-4.jpg"],
        trailer: "https://www.youtube.com/watch?v=y79h7Xm8XfI",
         servidor: "gofile", // PUEDE SER: "mediafire", "terabox" o "gofile"
        descripcion: "Project Zomboid es la cumbre de la supervivencia zombie. Solo o en multijugador: saqueas, construyes, fabricas, luchas, cultivas y pescas en una lucha por sobrevivir. Un conjunto de habilidades de RPG incondicional, un mapa enorme y una horda que no perdona errores.",
        requisitos: {
            minimos: "<strong>SO:</strong> Windows 10 (64bit)<br><strong>Procesador:</strong> Intel Quad-core 2.7 GHz<br><strong>Memoria:</strong> 8 GB de RAM<br><strong>Gráficos:</strong> Tarjeta dedicada con 2 GB de VRAM (compatible con OpenGL 2.1)<br><strong>Almacenamiento:</strong> 5 GB de espacio disponible",
            recomendados: "<strong>SO:</strong> Windows 11 (64bit)<br><strong>Procesador:</strong> Intel Core i5/i7 o AMD Ryzen 5 o superior<br><strong>Memoria:</strong> 16 GB de RAM<br><strong>Gráficos:</strong> NVIDIA GeForce GTX 1060 / AMD Radeon RX 580<br><strong>Almacenamiento:</strong> 10 GB de espacio disponible (SSD recomendado)"
        },
        link: "https://www.mediafire.com/"
    },

    // --- NUEVO JUEGO ANDROID: BALATRO ---
    {
        id: 3,
        titulo: "Balatro (Android)",
        genero: "Roguelike / Cartas",
        categoria: ["estrategia", "indie"],
        plataforma: "android",
        imagen: "./img/balatro/portada.webp", // Asegúrate de tener esta imagen
        galeria: ["./img/balatro/img-1.jpg", "./img/balatro/img-2.jpg", "./img/balatro/img-3.jpg", "./img/balatro/img-4.jpg"],
        trailer: "https://youtu.be/VUyP21iQ_-g",
        servidor: "gofile", // PUEDE SER: "mediafire", "terabox" o "gofile"
        descripcion: "El roguelike de póker. Balatro es un hipnótico y genial constructor de mazos donde podrás jugar manos ilegales de póker, descubrir comodines que alterarán tus partidas y activar combos impresionantes que dispararán tu adrenalina.",
        requisitos: {
            minimos: "<strong>SO:</strong> Android 7.0 o superior<br><strong>RAM:</strong> 2 GB<br><strong>Almacenamiento:</strong> 150 MB de espacio disponible",
            recomendados: "<strong>SO:</strong> Android 11 o superior<br><strong>RAM:</strong> 4 GB<br><strong>Almacenamiento:</strong> 200 MB de espacio disponible"
        },
        link: "https://www.mediafire.com/file/w0wgkpdp4q51u3b/balatro_v0.7_Juan_Launcher.apk/file"
    }
];

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

// --- LÓGICA PÁGINA DE INICIO (FILTROS ACTUALIZADA) ---
if (isIndex) {
    const contenedor = document.getElementById('contenedor-juegos');
    const buscador = document.getElementById('buscador');
    const tituloSeccion = document.getElementById('titulo-seccion');

    // Variables de estado
    let filtroPlataforma = 'pc';

// --- LÓGICA DEL BOTÓN SORPRÉNDEME ---
    const btnSorprendeme = document.getElementById('btn-sorprendeme');

    if (btnSorprendeme) {
        btnSorprendeme.addEventListener('click', () => {
            // 1. Filtrar los juegos SOLO por la plataforma actual (PC o Android)
            const juegosDisponibles = listaJuegos.filter(juego => juego.plataforma === filtroPlataforma);

            if (juegosDisponibles.length === 0) return; // Por si acaso no hay juegos

            // 2. Cambiar el diseño a "Cargando"
            btnSorprendeme.classList.add('loading');
            btnSorprendeme.innerHTML = '⏳ Buscando joyita...';

            // 3. Esperar 1.5 segundos (animación) y redirigir
            setTimeout(() => {
                // Selecciona un número al azar entre 0 y el total de juegos disponibles
                const indiceAzar = Math.floor(Math.random() * juegosDisponibles.length);
                const juegoAzar = juegosDisponibles[indiceAzar];
                
                // Redirigir a la página de ese juego
                window.location.href = `juego.html?id=${juegoAzar.id}`;
            }, 1500); // 1500 ms = 1.5 segundos de "suspense"
        });
    }
    
    let filtroCategoria = 'todos';
    let filtroBusqueda = '';

    // Botones del DOM
    const btnsPlataforma = document.querySelectorAll('.plat-btn');
    const btnsCategoria = document.querySelectorAll('.genre-btn');

    // Función principal de filtrado
    function aplicarFiltros() {
        const juegosFiltrados = listaJuegos.filter(juego => {
            // 1. Coincidir plataforma
            const coincidePlataforma = juego.plataforma === filtroPlataforma;

            // 2. Coincidir categoria (LOGICA CAMBIADA PARA ARRAYS)
            // Si el filtro es 'todos' O la lista de categorias del juego INCLUYE la categoria seleccionada
            const coincideCategoria = filtroCategoria === 'todos' || juego.categoria.includes(filtroCategoria);

            // 3. Coincidir busqueda
            const coincideBusqueda = juego.titulo.toLowerCase().includes(filtroBusqueda.toLowerCase());

            return coincidePlataforma && coincideCategoria && coincideBusqueda;
        });

        cargarJuegos(juegosFiltrados);

        // Actualizar título
        const catNombre = filtroCategoria.charAt(0).toUpperCase() + filtroCategoria.slice(1);
        tituloSeccion.innerText = `Catálogo ${filtroPlataforma.toUpperCase()} ${filtroCategoria !== 'todos' ? '- ' + catNombre : ''}`;
    }

    // Renderizar tarjetas
    function cargarJuegos(juegos) {
        if (!contenedor) return;
        contenedor.innerHTML = '';

        if (juegos.length === 0) {
            contenedor.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #888;">No hay juegos con estos filtros.</p>';
            return;
        }

        juegos.forEach(juego => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <img src="${juego.imagen}" alt="${juego.titulo}" onerror="this.src='./img/error.jpg'">
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
        // --- CONFIGURAR BOTÓN DE DESCARGA SEGÚN SERVIDOR ---
        const btnDescarga = document.getElementById('detalle-btn');
        btnDescarga.href = juego.link;

        // Valores por defecto (por si se te olvida ponerlo en la base de datos)
        let nombreServidor = "Mediafire";
        let claseServidor = "btn-mediafire";

        if (juego.servidor) {
            const serv = juego.servidor.toLowerCase();
            if (serv === "terabox") {
                nombreServidor = "TeraBox";
                claseServidor = "btn-terabox";
            } else if (serv === "gofile") {
                nombreServidor = "Gofile";
                claseServidor = "btn-buzz";
            }
        }

        // Aplicamos la clase de color y cambiamos el texto
        btnDescarga.className = `download-btn-mega ${claseServidor}`;
        btnDescarga.innerHTML = `DESCARGAR AHORA <br> <small>(vía ${nombreServidor})</small>`;

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
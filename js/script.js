// 1. SELECCIONAR  ELEMENTOS

const logos = document.querySelectorAll('.logo-interactivo');
const modal = document.getElementById('huevo-pascua-modal');
const video = document.getElementById('video-personaje');
const textoModal = document.getElementById('texto-sorpresa');
const contenedorCreditos = document.getElementById('contenedor-creditos');
const textoAnimadoCreditos = document.getElementById('texto-animado-creditos');
const musicaModal = document.getElementById('musica-exclusiva-starwars');
const botonCerrarModal = document.getElementById('cerrar-sorpresa');
const volumen_video = 0.5;

// RUTAS DE LOS VIDEOS
const VIDEO_1 = "./vid/baile1.mp4";
const VIDEO_2 = "./vid/baile2.mp4";

let contadorClics = 0;
let temporizador;
let temporizadorCierreCreditos;

// 2. LÓGICA DE CLICS (PASCUA)

logos.forEach(logo => {
    logo.addEventListener('click', () => {
        contadorClics++;
        
        // Si el usuario (niño) vuelve a hacer clic, cancelar la espera anterior
        clearTimeout(temporizador);
        
        // Esperar 1.5 segundos de inactividad para evaluar
        temporizador = setTimeout(() => {
            evaluarResultadoClics();
        }, 1500); 
    });
});

function evaluarResultadoClics() {
    if (contadorClics >= 7) {
        mostrarCreditos();
    } 
    else if (contadorClics >= 5) {
        reproducirVideo(VIDEO_2, "¡Wow, un nuevo baile secreto! 2️⃣ <img src='./img/quirki.png' class='emoji-quirquincho' alt='Quirquincho'> ✨");


    } 
    else if (contadorClics >= 3) {
        reproducirVideo(VIDEO_1, "¡A bailar con nuestro primer amigo! 1️⃣🕺🎉");
    }
    // Reiniciar el contador para la próxima vez
    contadorClics = 0;
}


// 3. FUNCIONES DE REPRODUCCIÓN Y CRÉDITOS

function reproducirVideo(ruta, mensaje) {
    limpiarPantalla();
    textoModal.innerHTML = mensaje;
    video.src = ruta;
    video.load();
    video.style.display = 'block';
    
    video.muted = false; // Con sonido para videos propios
    video.volume = volumen_video;

    abrirModal();
    video.play().catch(error => console.log("Autoplay de video bloqueado:", error));
}

function mostrarCreditos() {
    limpiarPantalla();
    textoModal.innerText = "⭐ ¡CRÉDITOS ESPACIALES SECRETOS! ⭐";
    textoModal.style.color = "#f5c518";
    
    contenedorCreditos.style.display = 'block';
    
    // Reiniciar la animación de créditos y ajustarla a 40 segundos
   if (textoAnimadoCreditos) {
        textoAnimadoCreditos.style.animation = 'none';
        void textoAnimadoCreditos.offsetHeight; // Truco para reiniciar el reflow del DOM
        textoAnimadoCreditos.style.animation = 'avanceCreditos 40s linear forwards';
    }

    // 🎵 CONTROL DE MÚSICA: Inicia en el segundo 14
    if (musicaModal) {
        musicaModal.volume = 0.7; // Volumen al 70%
        
        const iniciarMusicaEn14 = () => {
            musicaModal.currentTime = 14;
            musicaModal.play().catch(error => console.log("Error al jugar la música:", error));
        };

        if (musicaModal.readyState >= 1) {
            iniciarMusicaEn14();
        } else {
            musicaModal.addEventListener('loadedmetadata', iniciarMusicaEn14, { once: true });
        }
    }

    abrirModal();

    // Cierra el modal tras 30 segundos de visualización
    clearTimeout(temporizadorCierreCreditos);
    temporizadorCierreCreditos = setTimeout(() => {
        cerrarTodoElModal();
    }, 40000); // 28s de animación y 2s de desvanecimiento final
}




// 4. FUNCIONES DE APOYO (ABRIR, LIMPIAR, CERRAR)

function abrirModal() {
    modal.style.display = 'flex';
}

function limpiarPantalla() {
    // Limpiar video
    video.pause();
    video.currentTime = 0;
    video.style.display = 'none';
    video.removeAttribute('src'); 
    
    // Limpiar textos y créditos
    contenedorCreditos.style.display = 'none';
    textoModal.style.color = 'white';

    // Apagar y reiniciar la música galáctica
    if (musicaModal) {
        musicaModal.pause();
        musicaModal.currentTime = 0;
    }
}

function cerrarTodoElModal() {
    clearTimeout(temporizadorCierreCreditos); 
    clearTimeout(temporizador);
    
    modal.style.display = 'none';
    limpiarPantalla();
    contadorClics = 0; // Reiniciamos el contador al cerrar
}


// 5. EVENTOS DE CIERRE

if (botonCerrarModal) {
    botonCerrarModal.addEventListener('click', cerrarTodoElModal);
}

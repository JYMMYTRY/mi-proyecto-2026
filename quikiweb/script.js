    const logo = document.getElementById('logo-interactivo');
    const modal = document.getElementById('huevo-pascua-modal');
    const video = document.getElementById('video-personaje');
    const textoModal = document.getElementById('texto-sorpresa');
    const contenedorCreditos = document.getElementById('contenedor-creditos');
    const textoAnimadoCreditos = document.getElementById('texto-animado-creditos');

    // ⚠️ RUTAS DE LOS VIDEOS
    const VIDEO_1 = "../vid/video1.mp4";
    const VIDEO_2 = "../vid/video2.mp4";

    let contadorClics = 0;
    let temporizador;

    logo.addEventListener('click', () => {
      contadorClics++;
      clearTimeout(temporizador);
      temporizador = setTimeout(() => { contadorClics = 0; }, 3500);

      switch (contadorClics) {
        case 3:
          reproducirVideo(VIDEO_1, "¡A bailar con nuestro primer amigo! 1️⃣🕺🎉");
          break;
        case 5:
          reproducirVideo(VIDEO_2, "¡Wow, un nuevo baile secreto! 2️⃣🐼✨");
          break;
        case 7:
          mostrarCreditos();
          contadorClics = 0;
          break;
      }
    });

    function reproducirVideo(ruta, mensaje) {
      limpiarPantalla();
      textoModal.innerText = mensaje;
      video.src = ruta;
      video.load();
      video.style.display = 'block';
      abrirModal();
      video.play().catch(error => console.log("Autoplay bloqueado:", error));
    }

    function mostrarCreditos() {
      limpiarPantalla();
      textoModal.innerText = "⭐ ¡CRÉDITOS ESPACIALES SECRETOS! ⭐";
      textoModal.style.color = "#f5c518";
      contenedorCreditos.style.display = 'block';

      textoAnimadoCreditos.style.animation = 'none';
      void textoAnimadoCreditos.offsetHeight;
      textoAnimadoCreditos.style.animation = 'avanceCreditos 20s linear forwards';

      abrirModal();
    }

    function abrirModal() {
      modal.style.display = 'flex';
    }

    function limpiarPantalla() {
      video.pause();
      video.style.display = 'none';
      contenedorCreditos.style.display = 'none';
      textoModal.style.color = 'white';
    }

    document.getElementById('cerrar-sorpresa').addEventListener('click', () => {
      modal.style.display = 'none';
      limpiarPantalla();
    });

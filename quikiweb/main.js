const modal = document.querySelector("#modal-juego");
const botonAbrir = document.querySelector(".boton-info");
const botonCerrar = document.querySelector(".modal-cerrar");

botonAbrir.addEventListener("click", () => {
  modal.showModal();
});

botonCerrar.addEventListener("click", () => {
  modal.close();
});

// Cierra el modal al hacer clic en el fondo oscuro.
modal.addEventListener("click", (evento) => {
  if (evento.target === modal) {
    modal.close();
  }
});

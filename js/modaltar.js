const botones = document.querySelectorAll('[data-abrir-modal]');
const todosLosModales = document.querySelectorAll('dialog');

botones.forEach(boton => {
  boton.addEventListener('click', () => {
    const idModal = boton.getAttribute('data-abrir-modal');
    const modalAbrir = document.querySelector(`#${idModal}`);

    if (modalAbrir) {
      modalAbrir.showModal();
    } else {
      console.error(`No se encontró el modal con id: ${idModal}`);
    }
  });
});

todosLosModales.forEach(modal => {
  const botonCerrar = modal.querySelector('.modal-cerrar');

  if (botonCerrar) {
    botonCerrar.addEventListener('click', () => {
      modal.close();
    });
  }

  modal.addEventListener('click', evento => {
    if (evento.target === modal) {
      modal.close();
    }
  });
});


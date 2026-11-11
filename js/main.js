// Abrir el modal de cada caso de estudio
document.querySelectorAll('[data-modal]').forEach((boton) => {
  boton.addEventListener('click', () => {
    document.getElementById(boton.dataset.modal).showModal();
  });
});

// Cerrar los modales: botón ✕, clic fuera de la ventana (Escape lo hace el navegador)
document.querySelectorAll('dialog').forEach((modal) => {
  modal.addEventListener('click', (evento) => {
    if (evento.target === modal) modal.close();
  });
  modal.querySelectorAll('[data-close]').forEach((boton) => {
    boton.addEventListener('click', () => modal.close());
  });
  // Al cerrar, pausar cualquier vídeo que se estuviera reproduciendo
  modal.addEventListener('close', () => {
    modal.querySelectorAll('video').forEach((video) => video.pause());
  });
});

// Demos: si un archivo de assets/demos/ no existe, se oculta su hueco.
// Si no existe ninguno, se oculta toda la sección "demo" del modal.
document.querySelectorAll('[data-demo]').forEach((demo) => {
  const huecos = demo.querySelectorAll('.demo-slot');

  const revisar = () => {
    if ([...huecos].every((hueco) => hueco.hidden)) demo.hidden = true;
  };

  huecos.forEach((hueco) => {
    const media = hueco.querySelector('img, video');
    const falta = () => {
      hueco.hidden = true;
      revisar();
    };
    media.addEventListener('error', falta);
    // Por si el error ocurrió antes de que este script se ejecutara
    if (media.tagName === 'IMG' && media.complete && media.naturalWidth === 0) falta();
    if (media.tagName === 'VIDEO' && media.error) falta();
  });
});

// Año del pie de página
document.getElementById('year').textContent = new Date().getFullYear();
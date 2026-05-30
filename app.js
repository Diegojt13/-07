// =========================
// FOTOS ONLINE
// Reemplaza estas URLs por las tuyas
// =========================
const fotos = [
    
    'https://res.cloudinary.com/dwvfqkfzp/image/upload/f_auto,q_auto/IMG_2177_x7pp5f',
    'https://res.cloudinary.com/TU_CLOUD_NAME/image/upload/v1/IMG_2189.jpg',
    'https://res.cloudinary.com/TU_CLOUD_NAME/image/upload/v1/IMG_2200.jpg',
    'https://res.cloudinary.com/TU_CLOUD_NAME/image/upload/v1/IMG_2205.jpg',
    'https://res.cloudinary.com/TU_CLOUD_NAME/image/upload/v1/IMG_2212.jpg',
    'https://res.cloudinary.com/TU_CLOUD_NAME/image/upload/v1/IMG_2230.jpg',
    'https://res.cloudinary.com/TU_CLOUD_NAME/image/upload/v1/IMG_2277.jpg',
    'https://res.cloudinary.com/TU_CLOUD_NAME/image/upload/v1/IMG_2623.jpg',
    'https://res.cloudinary.com/TU_CLOUD_NAME/image/upload/v1/IMG_3099.jpg',
    'https://res.cloudinary.com/TU_CLOUD_NAME/image/upload/v1/IMG_3230.jpg',
    'https://res.cloudinary.com/TU_CLOUD_NAME/image/upload/v1/IMG_3236.jpg',
    'https://res.cloudinary.com/TU_CLOUD_NAME/image/upload/v1/IMG_3427.jpg',
    'https://res.cloudinary.com/TU_CLOUD_NAME/image/upload/v1/IMG_3762.jpg',
    'https://res.cloudinary.com/TU_CLOUD_NAME/image/upload/v1/IMG_3946.jpg',
    'https://res.cloudinary.com/TU_CLOUD_NAME/image/upload/v1/IMG_3959.jpg',
    'https://res.cloudinary.com/TU_CLOUD_NAME/image/upload/v1/IMG_3967.jpg'
];

// =========================
// CONFIGURACIÓN
// =========================
const VOLUMEN_MUSICA = 0.4;
const TIEMPO_TRANSICION = 350;

const inicio = document.getElementById('inicio');
const corazonContainer = document.getElementById('corazon-container');
const galeria = document.getElementById('galeria');
const corazonSvg = document.getElementById('corazon-svg');
const fotoPrincipal = document.getElementById('foto-principal');
const fondoBorroso = document.getElementById('fondo-borroso');
const mensajeError = document.getElementById('mensaje-error');
const indicador = document.getElementById('indicador');

let currentPhotoIndex = 0;
let scale = 0.2;
let animando = false;
let galeriaActiva = false;

const musica = new Audio('musica/cancion.mp3');
musica.loop = true;
musica.volume = VOLUMEN_MUSICA;

inicio.addEventListener('click', async () => {
    try {
        await musica.play();
    } catch (e) {
        console.log('Audio bloqueado por el navegador hasta otra interacción.');
    }

    inicio.classList.remove('active');
    corazonContainer.classList.add('active');
    startHeartAnimation();
});

function startHeartAnimation() {
    const animation = setInterval(() => {
        scale += 0.08;
        corazonSvg.style.transform = `scale(${scale})`;

        if (scale >= 4) {
            clearInterval(animation);
            setTimeout(() => {
                corazonContainer.classList.remove('active');
                galeria.classList.add('active');
                startGallery();
            }, 1200);
        }
    }, 40);
}

function startGallery() {
    if (fotos.length === 0) {
        mensajeError.style.display = 'block';
        return;
    }

    mensajeError.style.display = 'none';
    galeriaActiva = true;
    showPhoto(0);
}

function showPhoto(index) {
    if (animando || !galeriaActiva) return;
    animando = true;

    const src = fotos[index];

    fotoPrincipal.classList.remove('show');
    fotoPrincipal.classList.add('hide');

    setTimeout(() => {
        fotoPrincipal.onload = () => {
            fondoBorroso.style.backgroundImage = `url('${src}')`;
            indicador.textContent = `${index + 1} / ${fotos.length}`;

            requestAnimationFrame(() => {
                fotoPrincipal.classList.remove('hide');
                fotoPrincipal.classList.add('show');
                animando = false;
            });
        };

        fotoPrincipal.src = src;
    }, TIEMPO_TRANSICION);
}

// Cambiar foto con click en cualquier parte
galeria.addEventListener('click', () => {
    if (!galeriaActiva) return;
    currentPhotoIndex = (currentPhotoIndex + 1) % fotos.length;
    showPhoto(currentPhotoIndex);
});

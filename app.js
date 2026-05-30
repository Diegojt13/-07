// ⬇️⬇️⬇️ EDITA ESTO CON TUS FOTOS REAL⬇️⬇️⬇️
const fotos = [
    'IMG_2177.jpg',
    'IMG_2189.jpg',
    'IMG_2205.jpg',
    'IMG_2212.jpg',
    'IMG_2230.jpg',
    'IMG_2623.jpg',
    'IMG_3099.jpg',
    'IMG_3230.jpg',
    'IMG_3762.jpg',
    'IMG_3946.jpg',
    'IMG_3959.jpg',
    'IMG_3967.jpg'
];
// ⬆️⬆️⬆️ EDITA ARRIBA CON TUS ARCHIVOS ⬆️⬆️⬆️

const CARPETA_FOTOS = 'fotos/';
const VOLUMEN_MUSICA = 0.4;

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

    const photo = fotos[index];
    const src = `${CARPETA_FOTOS}${photo}`;

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
    }, 350);
}

function nextPhoto() {
    if (!galeriaActiva || animando) return;
    currentPhotoIndex = (currentPhotoIndex + 1) % fotos.length;
    showPhoto(currentPhotoIndex);
}

// Click en cualquier parte de la galería para cambiar foto
galeria.addEventListener('click', () => {
    nextPhoto();
});

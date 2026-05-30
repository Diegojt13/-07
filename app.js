const fotos = [
    'https://res.cloudinary.com/dwvfqkfzp/image/upload/f_auto,q_auto/IMG_2177_x7pp5f',
    'https://res.cloudinary.com/dwvfqkfzp/image/upload/q_auto/f_auto/v1780109000/IMG_2189_awfhba.jpg',
    'https://res.cloudinary.com/dwvfqkfzp/image/upload/q_auto/f_auto/v1780109009/IMG_2212_vteyzm.jpg',
    'https://res.cloudinary.com/dwvfqkfzp/image/upload/q_auto/f_auto/v1780109010/IMG_2205_oqfpsg.jpg',
    'https://res.cloudinary.com/dwvfqkfzp/image/upload/q_auto/f_auto/v1780109038/IMG_3762_awk6yn.jpg',
    'https://res.cloudinary.com/dwvfqkfzp/image/upload/q_auto/f_auto/v1780109041/IMG_3427_f5xxst.jpg',
    'https://res.cloudinary.com/dwvfqkfzp/image/upload/q_auto/f_auto/v1780109047/IMG_3946_df1ffq.jpg',
    'https://res.cloudinary.com/dwvfqkfzp/image/upload/q_auto/f_auto/v1780109053/IMG_3236_cb89au.jpg',
    'https://res.cloudinary.com/dwvfqkfzp/image/upload/q_auto/f_auto/v1780109054/IMG_3967_yvnugb.jpg',
    'https://res.cloudinary.com/dwvfqkfzp/image/upload/q_auto/f_auto/v1780109055/IMG_3943_nj4l8o.jpg',
    'https://res.cloudinary.com/dwvfqkfzp/image/upload/q_auto/f_auto/v1780109055/IMG_3959_bevc8u.jpg',
    'https://res.cloudinary.com/dwvfqkfzp/image/upload/q_auto/f_auto/v1780109066/IMG_2623_qplpda.jpg',
    'https://res.cloudinary.com/dwvfqkfzp/image/upload/q_auto/f_auto/v1780109068/IMG_3230_cz3ugf.jpg',
];

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

const musica = new Audio('cancion.mp3');
musica.loop = true;
musica.volume = VOLUMEN_MUSICA;
musica.preload = 'auto';

async function intentarReproducirMusica() {
    try {
        await musica.play();
        console.log('Música reproduciéndose');
    } catch (e) {
        console.log('Audio bloqueado por el navegador hasta otra interacción.');
    }
}

inicio.addEventListener('click', async () => {
    await intentarReproducirMusica();
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

        fotoPrincipal.onerror = () => {
            console.error('No se pudo cargar la imagen:', src);
            animando = false;
        };

        fotoPrincipal.src = src;
    }, TIEMPO_TRANSICION);
}

galeria.addEventListener('click', () => {
    if (!galeriaActiva) return;
    currentPhotoIndex = (currentPhotoIndex + 1) % fotos.length;
    showPhoto(currentPhotoIndex);
});

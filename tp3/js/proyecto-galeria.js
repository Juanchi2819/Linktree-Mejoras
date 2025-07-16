document.addEventListener('DOMContentLoaded', () => {
    const galeriaGrid = document.getElementById('galeria-grid');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-btn.prev');
    const nextBtn = document.querySelector('.lightbox-btn.next');

    const imagenes = [
        'img/img1.jpg',
        'img/img2.jpg',
        'img/img3.jpg',
        'img/img4.jpg',
        'img/img5.jpg',
        'img/img6.jpg'
    ];

    let currentIndex = 0;

    function crearGaleria() {
        if (!galeriaGrid) return;
        galeriaGrid.innerHTML = '';
        imagenes.forEach((src, index) => {
            const div = document.createElement('div');
            div.className = 'galeria-item';
            div.dataset.index = index;
            
            const img = document.createElement('img');
            img.src = src;
            img.alt = `Imagen de la galería ${index + 1}`;
            
            div.appendChild(img);
            galeriaGrid.appendChild(div);
        });
    }

    function openLightbox(index) {
        currentIndex = index;
        lightboxImg.src = imagenes[currentIndex];
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    function showPrevImage() {
        currentIndex = (currentIndex - 1 + imagenes.length) % imagenes.length;
        lightboxImg.src = imagenes[currentIndex];
    }

    function showNextImage() {
        currentIndex = (currentIndex + 1) % imagenes.length;
        lightboxImg.src = imagenes[currentIndex];
    }

    if (galeriaGrid) {
        galeriaGrid.addEventListener('click', (e) => {
            const item = e.target.closest('.galeria-item');
            if (item) {
                openLightbox(parseInt(item.dataset.index, 10));
            }
        });
    }

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', showPrevImage);
    if (nextBtn) nextBtn.addEventListener('click', showNextImage);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    window.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrevImage();
        if (e.key === 'ArrowRight') showNextImage();
    });
    
    crearGaleria();
});

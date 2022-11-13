import { galleryItems } from './gallery-items.js';
// Change code below this line

const instance = basicLightbox.create(`
    <img class="modal-image" src="">`,
    {
        onShow: () => {
            window.addEventListener("keydown", onEscClose)
        },
        onClose: () => {
            window.removeEventListener("keydown", onEscClose)
        },  
    }    
);

const refs = {
    galleryContainer: document.querySelector(".gallery"),
    modalImageSource: instance.element().querySelector(".modal-image"),
}

const galleryMarkup = galleryItems
    .map(({ preview, original, description }) =>
        `<div class="gallery__item">
        <a class="gallery__link" href="${original}">
            <img
                class="gallery__image"
                src="${preview}" 
                data-source="${original}" 
                alt="${description}"
            />
        </a>
        </div>`)
    .join("");


refs.galleryContainer.insertAdjacentHTML("beforeend", galleryMarkup);

refs.galleryContainer.addEventListener("click", onClick);

function onEscClose(e) {
    e.preventDefault();
    if (e.code === "Escape") instance.close();
}

function onClick(e) {
    e.preventDefault();
    if (!e.target.classList.contains('gallery__image')) return;
    
    refs.modalImageSource.setAttribute("src", e.target.dataset.source);
    
    instance.show();
}

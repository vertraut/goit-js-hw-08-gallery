import galleryImages from './gallery-items.js';

const galleryEl = document.querySelector('.js-gallery');

const galleryMarkup = galleryImages.map(({preview,original,description}) => { 

    return `
    <li class="gallery__item">
         <a class="gallery__link" href="${original}">
            <img class="gallery__image" src="${preview}"
            data-source="${original}" alt="${description}" />
        </a>
    </li>`;
    
}).join("")


galleryEl.insertAdjacentHTML('beforeend', galleryMarkup)

galleryEl.addEventListener('click', clickOnImage)

function clickOnImage(e) {

    if (!e.target.classList.contains('gallery__image'))
    {
               return
    }
    
    return e.target.nodeName;
 }


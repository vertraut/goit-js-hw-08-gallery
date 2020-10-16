import galleryImages from './gallery-items.js';

const galleryEl = document.querySelector('.js-gallery');
const modalEl = document.querySelector('div.lightbox');
const bigImgModalEl = modalEl.querySelector(".lightbox__image");
const btnCloseModalEl = modalEl.querySelector('button[data-action="close-lightbox"]');
const backdropModalEl = modalEl.querySelector('div.lightbox__overlay')



const galleryMarkup = galleryImages.map(({ preview, original, description }) => { 

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

    if (!e.target.classList.contains('gallery__image')) //проверяем, что кликнули действительно на изображение
    {return}
    e.preventDefault(); //предотвращаем выполнение предустановленного сценария
    showModalSwitch(); //открываем модальное окное
    addEventListenerModal(); //добавляем нужные слушали событий для модального окна
    bigImgModalEl.src = e.target.dataset.source; //устанавливаем src для изображения, которое будет отображаться в модальнок окне
    return e.target.nodeName;
}
 
function closeModal() { // действеи на кнопку закрытия модального окна
    showModalSwitch(); 
     bigImgModalEl.src = '' //очистка src, чтобы при медленном интернете, не подгружалась предыдущая картинка
    removeEventListenerModal();
}
 
function showModalSwitch() //открытие/закрытие модального окна
{
    modalEl.classList.toggle('is-open')

}


 
function addEventListenerModal() { 
    btnCloseModalEl.addEventListener('click', closeModal) //вешаем слушателя событий на кнопку закрытия модального окна
    backdropModalEl.addEventListener('click', closeModal)  //вешаем слушателя событий на бэкдроп
  window.addEventListener('keydown', checkCode)  //проверяем какая клавиша нажата
}

function removeEventListenerModal() { 
     btnCloseModalEl.removeEventListener('click', closeModal) // удаляем слушатель события с кнопки закрытия модального окна
    backdropModalEl.removeEventListener('click', closeModal) // удаляем слушатель события с бэкдропа модального окна
    window.removeEventListener('keydown', checkCode)  //проверяем какая клавиша нажата
}

function checkCode(e) { 
    switch (e.code) {
        
        case "Escape":
            closeModal();
            break;
        case "ArrowLeft":
           previousImage();
             break;
        case "ArrowRight":
            nextImage();
             break;
    }
    
}

function previousImage() {
    setNextImage(indexCurrentImage() - 1)
     }

 
function nextImage() { 
    setNextImage(indexCurrentImage()+1)
    }
 
function indexCurrentImage() {     
    return galleryImages.findIndex(img => bigImgModalEl.src === img.original)
}

function setNextImage(index) {
    let nextIMG = index;
    if (index < 0) nextIMG = galleryImages.length - 1;
    if (index === galleryImages.length) nextIMG = 0;
    bigImgModalEl.src = galleryImages[nextIMG].original;

}


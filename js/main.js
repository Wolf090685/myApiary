// Переворот карточек 

function toggleSlide(item) {
    $(item).each(function(i) {
        $(this).on('click', function(e) {
            e.preventDefault();
            $('.products-item__content').eq(i).toggleClass('products-item__content_active');
            $('.products-item__list').eq(i).toggleClass('products-item__list_active');
        })
    });
};

toggleSlide('.products-item__link');
toggleSlide('.products-item__back');

// Слайдер фото с пасеки

const img = [
    '1.jpg',
    '2.jpg',
    '3.jpg',
    '4.jpg',
    '5.jpg',
    '6.jpg',
    '7.jpg',
    '8.jpg',
    '9.jpg',
    '10.jpg'
];

let count = img.length;
const cover = document.querySelector('.apiary__photo');

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

function createImages() {
    shuffle(img);
    for (let i = 0; i < img.length; i++) {
        let card = document.createElement('div');
        card.classList.add('card');
        card.style.background = `url('images/slider-apiary/${img[i]}')`;
        card.style.backgroundSize = 'cover';
        card.style.backgroundPosition = 'center';
        card.style.transform = `rotate(${randomInteger(-10, 25)}deg) translate(${randomInteger(-20, 35)}px, ${randomInteger(-5, 65)}px)`;
        cover.append(card);
    }    
}

createImages();

cover.addEventListener('click', event => {
   
    if (event.target.classList.contains('card')) {
        event.target.classList.add('left');
        count--; 
    }

    if (count == 0) {
        cover.innerHTML = '';
        createImages();
        count = img.length;
    }    
});

// Слайдер с отзывами 

let mySwiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    loop: true,
    // autoplay: {
    //     delay: 2500,
    //     disableOnInteraction: false,
    // },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    breakpoints: {
      540: {
        slidesPerView: 2,      
      }
    }
  });
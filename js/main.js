// Переворот карточек 

function toggleSlide(item) {
    $(item).each(function (i) {
        $(this).on('click', function (e) {
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
        card.style.backgroundRepeat = 'no-repeat';
        card.style.transform = `rotate(${randomInteger(-20, 25)}deg) translate(${randomInteger(-20, 35)}px, ${randomInteger(-5, 65)}px)`;
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
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        991: {
            slidesPerView: 2,
        }
    }
});

// Scroll to top   

let scrolled,
    timer,
    btn = document.getElementById('to-top');

function scrollToTop() {
    if (scrolled > 0) {
        window.scrollTo(0, scrolled);
        scrolled = scrolled - 250;
        timer = setTimeout(scrollToTop, 50);
    }
    else {
        clearTimeout(timer);
        window.scrollTo(0, 0);
    }
}

$(window).on('scroll', function () {
    scrolled = window.pageYOffset;
    if (scrolled > 400) {
        btn.style.display = 'block';
    } else {
        btn.style.display = '';
    }
});

$(btn).on('click', function () {
    scrollToTop();
});

// Add class "active" to menu

$('.header__menu-link').on('click', function (event) {
    event.preventDefault();
    $('.header__menu-link').removeClass('active');
    $(this).addClass('active');
});

// Скролл к пункту меню

let offerH = $("#offer").innerHeight(),
    header = $("#header");
scrollOffset = $(window).scrollTop();

$("[data-scroll]").on('click', function (event) {
    event.preventDefault();

    var $this = $(this),
        blockId = $(this).data('scroll'),
        blockOfset = $(blockId).offset().top;

    $('.header__menu-link').removeClass('active');
    $(this).addClass('active');
    $('.header__menu-list').removeClass('show');

    $("html, body").animate({
        scrollTop: blockOfset
    }, 700);
});

// Burger menu toogle

$('#nav-toggle').on('click', function (event) {
    event.preventDefault();
    $('.header__menu-list').toggleClass('show');
});

// Modal

$('.offer__btn').on('click', function () {
    $('.overlay, #consultation').fadeIn('slow');
    $('body').css('overflow', 'hidden');
});
$('.modal__close').on('click', function () {
    $('.overlay, #consultation, #thanks').fadeOut('slow');
    $('body').css('overflow', '');
});



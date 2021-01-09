$(function () {

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
        spaceBetween: 20,
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
            767: {
                slidesPerView: 2,
            }
        }
    });

    // Scroll to top 
    $(window).on('scroll', function () {
        let scrolled = window.pageYOffset;
        let btn = document.querySelector('#to-top');
        if (scrolled > 400) {
            btn.style.opacity = 1;
        } else {
            btn.style.opacity = 0;
        }
    });
    $('#to-top').on('click', function (event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: 20
        }, 600);
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

    // Close mobile menu after click on body
    $(document).click(function (e) {
        if (!$(e.target).is('#nav-toggle') && !$(e.target).is('#nav-toggle img') &&
            !$(e.target).is('.header__menu-item') && !$(e.target).is('.header__menu-link')) {
            $('.header__menu-list').removeClass('show');
        }
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

    $(document).click(function (e) {
        if ($(e.target).is('.overlay')) {
            $('.overlay, #consultation, #thanks').fadeOut('slow');
            $('body').css('overflow', '');
        }
    });

    // Validate modal
    function validateForms(form) {

        $.validator.methods.cyrillic = function (value, element) {
            return this.optional (element) || /^[А-Яа-яЁё]+$/.test(value);
        }

        $(form).validate({
            rules: {
                name: {
                    required: true,
                    cyrillic: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Введите свое имя",
                    minlength: jQuery.validator.format("Введите минимум {0} символа!"),
                    cyrillic: "В имени допустима только кириллица, без пробелов и знаков препиния"
                },
                phone: "Введите номер телефона",
                email: {
                    required: "Введите почтый ящик",
                    email: "Неправильно введен адрес почты"
                }
            }
        });
    }

    validateForms('#consultation form');

    $('input[name=phone]').mask("+7 (999) 999-99-99");

    // E-mail

    // $('form').submit(function(e) {
    //     e.preventDefault();
    //     $.ajax({
    //         type: "POST",
    //         url: "mailer/smart.php",
    //         data: $(this).serialize()
    //     }).done(function() {
    //         $(this).find('input').val('');
    //         $('#consultation').fadeOut();
    //         $('.overlay, #thanks').fadeIn('slow');

    //         $('form').trigger('reset');
    //     });
    //     return false;
    // });

});
const CARD_IMAGES = [
  { Aries: "1-aries.png" },
  { Taurus: "2-taurus.png" },
  { Gemini: "3-gemini.png" },
  { Cancer: "4-cancer.png" },
  { Leo: "5-leo.png" },
  { Virgo: "6-virgo.png" },
  { Libra: "7-libra.png" },
  { Scorpio: "8-scorpio.png" },
  { Sagittarius: "9-sagittarius.png" },
  { Capricorn: "10-capricorn.png" },
  { Aquarius: "11-aquarius.png" },
  { Pisces: "12-pisces.png" },
];

const OTHER_CARDS = [
  { Love: "love.png" },
  { Career: "career.png" },
  { Finance: "finance.png" },
  { Health: "health.png" },
  { Future: "future.png" },
  { Study: "study.png" },
  { Family: "family.png" },
];

const PREDICT_CARDS = [
  { Name: "name.png" },
  { Phone_number: "phone-number.png" },
  { ID_Card: "id-card.png" },
  { Car_Number: "car-number.png" },
  { Account_Number: "account-number.png" },
];

const TOTAL_SIGN_CARDS = 41;

function zodiacCard (data) {
    let field = Object.keys(data)[0];
    return `
        <div data-name="${field.toLowerCase()}" class="sign-cards mb-3 mx-auto">
            <div class="zodiac-img-container d-flex">
                <img height="89px" class="m-auto" src="/images/${data[field]}">
            </div>
            <div class="text-center zodiac-name-container">${field}</div>
        </div>
    `;
}
function otherCard (data) {
    let field = Object.keys(data)[0];
    return `
    <div data-name="${field.toLowerCase()}" data-pagename="${location.pathname.split('/')[1]}" class="other-cards mx-auto">
            <div class="square-1"></div>
            <div class="square-2"></div>
            <div class="h-100 d-flex">
                <img class="m-auto" height="52px" src="/images/${data[field]}">
            </div>
        <div class="other-cards-text justify-content-center mx-auto d-flex mt-3">${field.replace('_', ' ')}</div>
    </div>
    `;
}

function tarotCard (id) {
    return `
        <div data-id="${id}" class="tarot-card">
            <div class="zodiac-img-container d-flex">
                <img class="m-auto" src="/cards/${id}.png">
            </div>
        </div>
    `;
}

function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    return splitStr.join(' '); 
 }

 
function spread() {
    $('.card-list > li').removeClass('selected');
    $('[astro-shuffler-action]').removeClass('getReading').addClass('suffleCard').text('Shuffle cards');
    $($('.card-list > li').get().reverse()).each(function () {
        setTimeout(() => {
            $(this).css({
                zIndex: $(this).index() + 1,
                left: (0 + (($('.card-picker').width() - 150) / TOTAL_SIGN_CARDS) * $(this).index()) + 'px'
                // left: (0 + (($('.card-picker').width() - 100) / TOTAL_SIGN_CARDS) * ($(this).index() + 1)) + 'px'
            })
        }, (10 * ($(this).index() + 1)));
    })
    var parent = $(".card-list");
    var divs = parent.find('li');
    while (divs.length) {
        parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
    }
}

function collect() {
    $('[astro-shuffler-action]').removeClass('getReading').addClass('suffleCard').text('Shuffle cards');
    $('.card-list > li').removeClass('selected');
    $($('.card-list > li').get().reverse()).each(function () {
        setTimeout(() => {
            $(this).css({
                zIndex: $(this).index() + 1,
                left: (0) + 'px'
            })
        }, (10 * ($(this).index() + 1)));
    })
}

function suffle() {
    $('[astro-shuffler-action]').removeClass('getReading').addClass('suffleCard').text('Shuffle cards');
    $('.card-list > li').removeClass('selected').css({
        opacity: 0.3
    });
    let $ele = $('.card-list').find('li').last()
    $ele.css({
        zIndex: $(this).index() + 1,
        top: '30px',
        left: '30px'
    });
    setTimeout(() => {
        $('.card-list > li').css({
            opacity: 1
        });
        $ele.css({
            zIndex: $(this).index() + 1,
            top: '0px',
            left: '0px',
            opacity: 1
        });
    }, 200);
}




CARD_IMAGES.forEach((element) => {
    $('.sign-cards-container').append(zodiacCard(element));
});
OTHER_CARDS.forEach((element) => {
    $('.other-horoscopes-cards-container').append(otherCard(element));
});
PREDICT_CARDS.forEach((element) => {
    $('.predict-horoscopes-cards-container').append(otherCard(element));
})

for (let i = 1; i < TOTAL_SIGN_CARDS; i++) {
    $('.card-list').append(`<li data-id="${i}"><img src="/cards/Back.png" alt=""></li>`);
}

$('[pediction-form]').attr('action', `${location.pathname}/view`);

$('.openbtn').on('click', function () {
    $('#mySidepanel').css({ width: '350px'})
})
$('.closebtn').on('click', function () {
    $('#mySidepanel').css({ width: '0'})
})

$('.other-cards').on('click', function () {
    let name = $(this).data('name');
    let page = $(this).data('pagename');
    location.href = `/${page}/${name}`;
})
$.each($('.other-cards'), function (index, value) {
    let name = $(value).data('name');
    if (location.pathname.includes(name)) $('[for="prediction-type"]').text(titleCase(name.replace('_', ' ')));
})
$('.sign-cards').on('click', function () {
    let name = $(this).data('name');
    location.href = location.pathname + '?value=' + name;
})

// let randomCard = CARD_IMAGES[Math.floor(Math.random() * CARD_IMAGES.length)];
// $('.zodiac-horoscope-container-head-image').append(`<img src="/images/${randomCard[Object.keys(randomCard)[0]]}" alt="">`);
// $('.zodiac-horoscope-container-head-text').text(Object.keys(randomCard)[0]);

$(window).on('load', function () {
    let pageName = location.pathname.split('/')[1]
    if (!pageName && location.pathname == '/') pageName = 'home'

    $.each($('[data-page-name]'), function(index, element) {
        if (pageName == $(element).data('page-name')) {
            $(element).addClass('nav-active');
        }
    })
});
$(window).on('resize', spread);

$('body').on('click', '.suffleCard', function () {
    collect();
    let k = 0;
    let _suffle = setInterval(() => {
        k++
        if (k < 10) {
            suffle()
        } else {
            clearInterval(_suffle)
            spread()
        }
    }, 400);
})

$('body').on('click', '.card-list > li', function () {
    if ($('.card-list').find('li.selected').length >= 3) {
        alert('You Can Select only 3 cards');
        return;
    }
    $(this).addClass('selected');
    if ($('.card-list').find('li.selected').length == 3) {
        $('.suffleCard').addClass('getReading').removeClass('suffleCard').text('Get my Readings');
        //$('.getReading').css({ display: 'block'});
    }
});

$('body').on('click', '.shuffle', function (e) {
    let submit = $(this).find('button').attr('type');
    if (submit != 'submit') {
        e.preventDefault();
        return;
    }
})

$('body').on('click', '.getReading', function () {
    if ($('.card-list').find('li.selected').length < 3) {
        return alert('Please Select at 3 cards');
    }
    let cards = [];
    $('.card-list').find('li.selected').each(function () {
        cards.push($(this).data('id'));
    })
    $('.shuffle').attr('action', `${location.pathname}/view`)
    $.each(cards, function (index, value) {
        $('.shuffle').prepend(`<input type="hidden" name="value[]" value="${value}">`);
    })
    $('[astro-shuffler-action]').attr('type', 'submit');
})

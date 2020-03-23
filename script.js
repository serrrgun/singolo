// header

const arrLinks = document.querySelectorAll('.navigation__item');
const arrBlocks = document.querySelectorAll('.js-link-block');
const header = document.querySelector('.header');

function anim(duration) {
    let temp;
    return function(sel) {
        cancelAnimationFrame(temp);
        const start = performance.now();
        const from = window.pageYOffset || document.documentElement.scrollTop,
        to = sel.getBoundingClientRect().top - header.offsetHeight;
        requestAnimationFrame(function step(timestamp) {
            var progress = (timestamp - start) / duration;
            1 <= progress && (progress = 1);
            window.scrollTo(0, from + to * progress | 0);
            1 > progress && (temp = requestAnimationFrame(step))
        })
    }
};

const scrollMenu = anim(500);

arrLinks.forEach((elem, index) => {
    elem.addEventListener('click', function() {
        
        scrollMenu(arrBlocks[index])
        
        arrLinks.forEach(elem => {
            elem.classList.remove('navigation__item--active')
        })
        elem.classList.add('navigation__item--active')
    })
})

document.addEventListener('scroll', onScroll);

function onScroll() {
    const scrollPosition = window.scrollY;
    
    arrBlocks.forEach((elem, index) => {
        if ((elem.offsetTop - header.offsetHeight) <= scrollPosition && (elem.offsetTop + elem.offsetHeight) > scrollPosition) {
            
            arrLinks.forEach(elem => {
                elem.classList.remove('navigation__item--active')

                if (elem === arrLinks[index]) {
                    elem.classList.add('navigation__item--active')
                }
            })
        }

        else if (scrollPosition === 0) {
            arrLinks.forEach((elem, index) => {
                elem.classList.remove('navigation__item--active')
            })
            arrLinks[0].classList.add('navigation__item--active')
        }
    })
}

// menu mobile 
const menuBtn = document.querySelector('.header__btn');

menuBtn.addEventListener('click', function() {
    header.classList.toggle('header--mobile-menu')
})


arrLinks.forEach(elem => {
    elem.addEventListener('click', function() {
        if (header.classList.contains('header--mobile-menu')) {
            header.classList.remove('header--mobile-menu')
        }
    })
})


// --header

// portfolio

const filtersButtons = document.querySelectorAll('.filter__btn');
const workList = [...document.querySelectorAll('.work-list__item')];
const workListContainer = document.querySelector('.work-list')

filtersButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        filtersButtons.forEach(button => {
            button.classList.remove('filter__btn--active');
            button.disabled = false
        })
        btn.classList.add('filter__btn--active')
        btn.disabled = true;
        workList.forEach(work => {
            work.remove()
        });
        workList.sort(function(){
            return Math.random() - 0.5;
        });
        workList.forEach(work => {
            workListContainer.append(work)
            work.style.outline = 'none'
        });
    })
})

workList.forEach(elem => {
    elem.addEventListener('click', function(evt) {
        evt.preventDefault()
        workList.forEach(item => {
            item.style.outline = 'none'
        })
        elem.style.outline = '5px solid #F06C64'
    })
})

// -- portfolio

// form

const form = document.querySelector('.form');
const popup = document.querySelector('.popup');
const popupBtn = document.querySelector('.popup__btn');

const subjectForm = document.querySelector('#subject');
const subjectPopup = document.querySelector('.popup__theme');

const descriptionForm = document.querySelector('#describe');
const descriptionPopup = document.querySelector('.popup__desc')

form.addEventListener('submit', function(evt) {
    evt.preventDefault();
    if(subjectForm.value.length > 0) {
        subjectPopup.textContent = `Тема: ${subjectForm.value}`
    }
    if(descriptionForm.value.length > 0) {
        descriptionPopup.textContent = `Описание: ${descriptionForm.value}`
    }
    popup.style.display = 'block'
})

popupBtn.addEventListener('click', function() {
    popup.style.display = 'none'
}) 

// -- form

// slider

const items = document.querySelectorAll('.slider__item')
const sliderBtnPrev = document.querySelector('.slider__btn--prev');
const sliderBtnNext = document.querySelector('.slider__btn--next');
let currentItem = 0;
let isEnabled = true;

function chengeCurrentItem(n) {
    currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
    isEnabled = false;
    items[currentItem].classList.add(direction);
    items[currentItem].addEventListener('animationend', function() {
        this.classList.remove('slider__item--active', direction);
    })
}

function showItem(direction) {
    items[currentItem].classList.add('slider__item--next', direction);
    items[currentItem].addEventListener('animationend', function() {
        this.classList.remove('slider__item--next', direction);
        this.classList.add('slider__item--active');
        isEnabled = true;
    })
}

function nextItem(num) {
    hideItem('to-left');
    chengeCurrentItem(num + 1);
    showItem('from-right')
}

function previousItem(num) {
    hideItem('to-right');
    chengeCurrentItem(num - 1);
    showItem('from-left')
}

sliderBtnPrev.addEventListener('click', function() {
    if (isEnabled) {
        previousItem(currentItem)
    }
});

sliderBtnNext.addEventListener('click', function() {
    if (isEnabled) {
        nextItem(currentItem)
    }
})

// -- slider

// phone

const phonesBtn = document.querySelectorAll('.phone__btn');
const phonesBg = document.querySelectorAll('.phone__bg');

phonesBtn.forEach((elem, index) => {
    elem.addEventListener('click', function () {
        phonesBg[index].classList.toggle('phone__bg--opacity')
    })
})
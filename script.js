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

// --header

// portfolio

const filtersButtons = document.querySelectorAll('.filter__btn');
const workList = [...document.querySelectorAll('.work-list__item')];
const workListContainer = document.querySelector('.work-list')

filtersButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        filtersButtons.forEach(button => {
            button.classList.remove('filter__btn--active')
        })
        btn.classList.add('filter__btn--active')
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
console.log(descriptionForm.value);

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
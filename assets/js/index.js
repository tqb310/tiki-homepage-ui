const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

window.addEventListener('load', function(){
    let searchInput = $('#search-input'),
        loginBtn = $('#login-btn')
        registerBtn = $('#register-btn')
        formExitBtn = $$('.form-exit'),
        modalOverlay = $('.modal__overlay')
        btnSlidePre = $('.main__slide-banner-pre');
        btnSlideNext = $('.main__slide-banner-next');
        bannerCarousel = $$('.main__slide-banner-carousel');
    addEvent();
    let renderRemainTime = createRemainTime(),
        slider = createSlider();
    this.setInterval(renderRemainTime, 1000);
    this.setInterval(slider.bind(null, 1), 3000);
    function addEvent(){
        searchInput.addEventListener('focus', (e) => {
            $('.header__search-autocomplete').style.display = 'block';
            $('.modal').classList.add('modal--searchbar', 'open');
        })
        searchInput.addEventListener('blur', (e) => {
            $('.header__search-autocomplete').style.display = 'none';        
            $('.modal').classList.remove('modal--searchbar', 'open');
        })
        loginBtn.addEventListener('click', (e) => {
            $('.modal').classList.remove('modal--register-form');
            $('.modal').classList.add('modal--login-form', 'open');
        })
        registerBtn.addEventListener('click', (e) => {
            $('.modal').classList.remove('modal--login-form');
            $('.modal').classList.add('modal--register-form', 'open');
        })
        formExitBtn.forEach(btn => {
            btn.addEventListener('click',(e) => {
                $('.modal').classList.remove('open');
            })
        })
        modalOverlay.addEventListener('click', e => {
            $('.modal').classList.remove('open');
        })
        btnSlidePre.addEventListener('click', e => {
            slider(-1);
            console.log('clicked')
        })
        btnSlideNext.addEventListener('click', e => {
            slider(1)
        })
        bannerCarousel.forEach((carousel, index) => {
            carousel.addEventListener('click', e => {
                slider(0, index);
            })
        })
    }
    function createRemainTime(){
        let hour = $('#h'),
            minute = $('#m'),
            second = $('#s'),
            h = 2, m = 59, s = 59;
        hour.innerText = h.toString().padStart(2, '0');
        minute.innerText = m.toString().padStart(2, '0');
        second.innerText = s.toString().padStart(2, '0');
        return () => {
            if(s > 0){ s--}
            else if(s === 0) {s = 59; m--;}

            if(m === 0) {m = 60; h--;}
            hour.innerText = h.toString().padStart(2, '0');
            minute.innerText = m.toString().padStart(2, '0');
            second.innerText = s.toString().padStart(2, '0');
        }
    }
    function createSlider(){
        let index = 0;
        let slideContainer = $('.main__slide-banner-inner');
        let slideContainerWidth = 0;
        return (i, pos) => {
            slideContainerWidth = $('.main__slide-banner').clientWidth;
            if(pos !== undefined){
                index = pos;
                slideContainer.style.transform = `translateX(${index * -slideContainerWidth}px)`;
                rerenderCarousel(index);
                return;
            }
            index += i;
            if(index === 4) index = 0;
            else if(index === -1) index = 3;
            slideContainer.style.transform = `translateX(${index * -slideContainerWidth}px)`;
            rerenderCarousel(index);
        }
    }
    function rerenderCarousel(i){
        bannerCarousel.forEach((carousel, index) => {
            carousel.classList.remove('active');
            if(index === i)
                carousel.classList.add('active');
        })
    }
})
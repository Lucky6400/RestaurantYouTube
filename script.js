const navBtn = document.querySelector('#nav_btn');
const navItems = document.querySelector('#nav_items');

navBtn.addEventListener('click', () => {
    navItems.classList.toggle('hidden');
    navItems.classList.toggle('flex');

})

const carouselInner = document.querySelector('.carousel-inner');
const carouselItems = document.querySelectorAll('.carousel-item');
const prevButton = document.querySelector('#prev');
const nextButton = document.querySelector('#next');

let currentSlide = 0;
prevButton.disabled = currentSlide === 0;

function updateCarousel() {
    const slideWidth = carouselItems[0].clientWidth;
    carouselInner.style.transform = `translateX(-${currentSlide * slideWidth}px)`;

    prevButton.disabled = currentSlide === 0;

    nextButton.disabled = currentSlide === carouselItems.length - 1;

}

nextButton.addEventListener('click', () => {
    if (currentSlide < carouselItems.length - 1) currentSlide++;
    else currentSlide = 0;

    updateCarousel();
})

prevButton.addEventListener('click', () => {
    if (currentSlide > 0) currentSlide--;
    else currentSlide = carouselItems.length - 1;

    updateCarousel();
});

window.addEventListener('resize', updateCarousel());


const sliders = document.querySelectorAll('.slider');

function checkSliderButtons(sliderContainer) {
    const slider = sliderContainer.querySelector('.slider');
    const prevBtn = sliderContainer.querySelector('.prevBtn');
    const nextBtn = sliderContainer.querySelector('.nextBtn');

    prevBtn.disabled = slider.scrollLeft === 0;
    nextBtn.disabled = Math.ceil(slider.scrollLeft + slider.clientWidth) >= slider.scrollWidth;
}

let isDragging = false;
let startX;
let scrollLeft;


sliders.forEach(slider => {
    const prevBtn = slider.querySelector('.prevBtn');
    const nextBtn = slider.querySelector('.nextBtn');
    slider.addEventListener('scroll', () => checkSliderButtons(slider.parentElement));

    slider.addEventListener('mousedown', e => {
        isDragging = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', e => {
        isDragging = false;
    });

    slider.addEventListener('mouseup', e => {
        isDragging = false;
    });

    slider.addEventListener('mousemove', e => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = x - startX;
        slider.scrollLeft = scrollLeft - walk;
    });

    prevBtn.addEventListener('click', () => {
        slider.scrollBy({ left: -300, behavior: 'smooth' });
        setTimeout(() => {
            checkSliderButtons(slider.parentElement)
        }, 300);
    });

    nextBtn.addEventListener('click', () => {
        slider.scrollBy({ left: 300, behavior: 'smooth' });
        setTimeout(() => {
            checkSliderButtons(slider.parentElement)
        }, 300);
    })

    checkSliderButtons(slider.parentElement);

});


const exciting = document.querySelector('#exciting').querySelector('.slider');
const european = document.querySelector('#european').querySelector('.slider');

fetch('https://dummyjson.com/recipes/').then(res => res.json()).then(data => {
    console.log(data)
    exciting.innerHTML += data.recipes.map(CardComponent).join("");
    initializeSliderButtons(exciting.parentElement)
});

fetch('https://dummyjson.com/recipes/tag/Italian').then(res => res.json()).then(data => {
    console.log(data)
    european.innerHTML += data.recipes.map(CardComponent).join("");
    initializeSliderButtons(european.parentElement)
});

function initializeSliderButtons(sliderContainer) {
    const slider = sliderContainer.querySelector('.slider');
    const prevBtn = sliderContainer.querySelector('.prevBtn');
    const nextBtn = sliderContainer.querySelector('.nextBtn');

    checkSliderButtons(sliderContainer);

    prevBtn.addEventListener('click', () => {
        slider.scrollBy({ left: -300, behavior: 'smooth' });
        setTimeout(() => {
            checkSliderButtons(slider.parentElement)
        }, 300);
    });

    nextBtn.addEventListener('click', () => {
        slider.scrollBy({ left: 300, behavior: 'smooth' });
        setTimeout(() => {
            checkSliderButtons(slider.parentElement)
        }, 300);
    })
}

function CardComponent(r) {
    return `
    <div class="card cursor-grab flex-shrink-0 w-60 bg-white shadow-lg overflow-hidden rounded-lg">
                    <img src="${r.image}" alt="" class="w-full aspect-[4/3] object-cover">
                    <div class="p-4 text-sm">
                        <h2 title="${r.name}" class="font-bold text-lg whitespace-nowrap overflow-hidden text-ellipsis">${r.name}</h2>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id, illo quodquos sequi qui.</p>
                        <hr class="my-3">
                        <p class="text-green-600 font-semibold">
                            <i class="fa-solid fa-indian-rupee-sign"></i>50
                        </p>
                        <hr class="my-3">
                        <p class="text-gray-600">${r.prepTimeMinutes} mins</p>
                        <hr class="my-3">
                        <button type="button" class="cursor-pointer mx-auto w-full px-4 py-1 bg-primary font-semibold shadow-lg text-black rounded-lg">
                            <a href="#">Order Now</a>
                        </button>
                        <button type="button" class="cursor-pointer mt-3 mx-auto w-full px-4 py-1 bg-red-500 text-white font-semibold shadow-lg rounded-lg">
                            <a href="#">Add to cart</a>
                        </button>
                    </div>
                </div>
    `
}
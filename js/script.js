(function() {

    // Definition of caller element
    var getTriggerElement = function(el) {
      var isCollapse = el.getAttribute('data-collapse');
      if (isCollapse !== null) {
        return el;
      } else {
        var isParentCollapse = el.parentNode.getAttribute('data-collapse');
        return (isParentCollapse !== null) ? el.parentNode : undefined;
      }
    };
    
    // A handler for click on toggle button
    var collapseClickHandler = function(event) {
    var triggerEl = getTriggerElement(event.target);
      // If trigger element does not exist
      if (triggerEl === undefined) {
        event.preventDefault();
        return false;
      }
      // If the target element exists
      var targetEl = document.querySelector(triggerEl.getAttribute('data-target'));
      if (targetEl) {
        triggerEl.classList.toggle('active');
        targetEl.classList.toggle('open');
      }
    };
    
    // Delegated event
    document.addEventListener('click', collapseClickHandler, false);
    
})(document, window);
    
const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel__button--right');
const prevButton = document.querySelector('.carousel__button--left');
const dotsNav = document.querySelector('.carousel__nav');
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;

const setSlidePositon = (slide, index) =>{
    slide.style.left = slideWidth * index + 'px';
}

slides.forEach(setSlidePositon);

// Move to next slide
const moveToSlide = (track,currentSlide,targetSlide) =>{
    track.style.transform ='translateX( -' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current--slide');
    targetSlide.classList.add('current--slide');
}

const updateDot = (currentDot,targetDot) =>{
    currentDot.classList.remove('current--slide');
    targetDot.classList.add('current--slide')
}

const hideShowArrow = (slides,prevButton,nextButton,targetIndex) =>{
    if(targetIndex === 0){
        prevButton.classList.add('is-hidden');
        nextButton.classList.remove('is-hidden');
    }else if(targetIndex === slides.length - 1){
        prevButton.classList.remove('is-hidden');
        nextButton.classList.add('is-hidden');
    }else{
        prevButton.classList.remove('is-hidden');
        nextButton.classList.remove('is-hidden'); 
    }
}

// Left click button
prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current--slide');
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector('.current--slide');
    const prevDot = currentDot.previousElementSibling;;
    const prevIndex = slides.findIndex(slide => slide === prevSlide);

    moveToSlide(track,currentSlide,prevSlide);
    updateDot(currentDot,prevDot);
    hideShowArrow(slides,prevButton,nextButton,prevIndex);
})

// Right click button 
nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current--slide');
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = dotsNav.querySelector('.current--slide');
    const nextDot = currentDot.nextElementSibling;
    const nextIndex = slides.findIndex(slide => slide === nextSlide);

    moveToSlide(track,currentSlide,nextSlide);
    updateDot(currentDot,nextDot);
    hideShowArrow(slides,prevButton,nextButton,nextIndex);
})

// Click nav indicator
dotsNav.addEventListener('click', e => {

    const targetDot = e.target.closest('button');

    if (!targetDot) return;

    const currentSlide = track.querySelector('.current--slide');
    const currentDot = dotsNav.querySelector('.current--slide');
    const targetIndex = dots.findIndex(dot => dot === targetDot)
    const targetSlide = slides[targetIndex];

    moveToSlide(track,currentSlide,targetSlide);
    updateDot(currentDot,targetDot);
    hideShowArrow(slides,prevButton,nextButton,targetIndex);
})
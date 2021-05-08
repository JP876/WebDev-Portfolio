// **** Carousel ****
const btns = Array.from(document.querySelectorAll('button'));
let condition, firstResult, secondResult;
let projects = {
    0: { className: 'projects__carousel-item-0', slidePosition: 0 },
    1: { className: 'projects__carousel-item-1', slidePosition: 0 },
};

const updatePosition = projectBtn => {
    let { className, slidePosition } = projects[projectBtn];
    let slides = document.getElementsByClassName(className);

    for (let slide of slides) {
        slide.classList.remove(`projects__carousel-item--visible-${projectBtn}`);
        slide.classList.add(`projects__carousel-item--hidden-${projectBtn}`);
    }
    slides[slidePosition].classList.add(`projects__carousel-item--visible-${projectBtn}`);
};

const findCorrectProjectBtn = e => {
    let btn = e.srcElement.id;

    for (let project in projects) {
        if (btn.slice(-1) === project) {
            return { project: project, pressedBtn: btn.slice(-2, -1) };
        }
    }

    return null;
};

const moveToSlide = e => {
    let projectBtn = findCorrectProjectBtn(e);

    if (projectBtn) {
        let { project, pressedBtn } = projectBtn;
        let { className, slidePosition } = projects[project];
        let totalSlides = document.getElementsByClassName(className).length;

        if (pressedBtn === 'n') {
            condition = slidePosition === totalSlides - 1;
            firstResult = 0;
            secondResult = slidePosition + 1;
        } else if (pressedBtn === 'p') {
            condition = slidePosition === 0;
            firstResult = totalSlides - 1;
            secondResult = slidePosition - 1;
        }

        if (condition) {
            projects = {
                ...Object.assign({}, projects),
                [project]: { ...projects[project], slidePosition: firstResult },
            };
        } else {
            projects = {
                ...Object.assign({}, projects),
                [project]: { ...projects[project], slidePosition: secondResult },
            };
        }

        updatePosition(project);
    }
};

btns.forEach(btn => btn.addEventListener('click', e => moveToSlide(e)));
////////////////////////////////////

/* const card = document.querySelector('.projects__project');
const container = document.querySelector('.projects__animContainer');

container.addEventListener('mousemove', e => {
    let xAxis = (window.innerWidth / 2 - e.pageX) / 60;
    let yAxis = (window.innerHeight / 2 - e.pageY + 1200) / 60;

    card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});

container.addEventListener('mouseleave', e => {
    card.style.transition = 'all 1s ease';
    card.style.transform = 'rotateY(0deg) rotateX(0deg)';
});

container.addEventListener('mouseenter', e => {
    card.style.transition = 'none';
}); */

////////////////////////////////

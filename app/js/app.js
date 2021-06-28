// ------------ Variables ----------- //
const btns = Array.from(document.querySelectorAll('button'));
let condition, firstResult, secondResult;
let projects = {
    0: { className: 'projects__carousel-item-0', slidePosition: 0 },
    1: { className: 'projects__carousel-item-1', slidePosition: 0 },
};

const homeLink = document.getElementById('home-link');

const projectsLink = document.getElementById('projects-link');
const projectsLinkMobile = document.getElementById('projects-link-mobile');
const projectsSection = document.querySelector('.projects');

const contactLink = document.getElementById('contact-link');
const contactLinkMobile = document.getElementById('contact-link-mobile');
const contactSection = document.querySelector('.contact');

const linksArr = [
    projectsLink,
    projectsLinkMobile,
    contactLink,
    contactLinkMobile,
    homeLink,
];
const sectionsArr = [
    { name: 'projects-link', section: projectsSection },
    { name: 'projects-link-mobile', section: projectsSection },
    { name: 'contact-link', section: contactSection },
    { name: 'contact-link-mobile', section: contactSection },
];

const btnHamburger = document.getElementById('btnHamburger');
const body = document.querySelector('body');
const overlay = document.querySelector('.overlay');
const fadeElems = document.querySelectorAll('.has-fade');
const header = document.querySelector('.header');

// ------------ Carousel ------------ //
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
// --------------------------------------- //

// ------------ Smooth Scroll ------------ //
linksArr.forEach(link =>
    link.addEventListener('click', e => {
        let pressedLink = e.srcElement.id;
        let correctSection = sectionsArr.filter(section => section.name === pressedLink);

        if (correctSection.length > 0) {
            if (correctSection[0].name.slice(-6) === 'mobile') {
                body.classList.remove('noscroll');
                header.classList.remove('open');
                fadeElems.forEach(function (element) {
                    element.classList.remove('fade-in');
                    element.classList.add('fade-out');
                });
                correctSection[0].section.scrollIntoView({ behavior: 'smooth' });
            } else {
                correctSection[0].section.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        }
    })
);

/* contactLinkMobile.addEventListener('click', () => {
    body.classList.remove('noscroll');
    header.classList.remove('open');
    fadeElems.forEach(function (element) {
        element.classList.remove('fade-in');
        element.classList.add('fade-out');
    });
    contactSection.scrollIntoView({ behavior: 'smooth' });
});
projectsLinkMobile.addEventListener('click', () => {
    body.classList.remove('noscroll');
    header.classList.remove('open');
    fadeElems.forEach(function (element) {
        element.classList.remove('fade-in');
        element.classList.add('fade-out');
    });
    projectsSection.scrollIntoView({ behavior: 'smooth' });
}); */

// --------------------------------------- //

// ------------ Header shadow ------------ //
window.addEventListener('scroll', e => {
    if (this.pageYOffset > 100) {
        header.classList.add('header-shadow');
    } else {
        header.classList.remove('header-shadow');
    }
});
// --------------------------------------- //

// ------------ Hamburger menu ------------ //
btnHamburger.addEventListener('click', function () {
    if (header.classList.contains('open')) {
        // Close Hamburger Menu
        body.classList.remove('noscroll');
        header.classList.remove('open');
        fadeElems.forEach(function (element) {
            element.classList.remove('fade-in');
            element.classList.add('fade-out');
        });
    } else {
        // Open Hamburger Menu
        body.classList.add('noscroll');
        header.classList.add('open');
        fadeElems.forEach(function (element) {
            element.classList.remove('fade-out');
            element.classList.add('fade-in');
        });
    }
});
// --------------------------------------- //

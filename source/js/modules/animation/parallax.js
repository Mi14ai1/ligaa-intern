import {ScrollTrigger} from '../../vendor/gsap/scroll-trigger.min.js';
import {pageScroller} from '../../utils/page-scroller.js';


const vp767 = window.matchMedia('(max-width: 767px)');

// функция добавляет анимацию прозрачности с небольшим масштабированием
const fadeScaleParallax = () => {
  const items = document.querySelectorAll('[data-parallax="fadeScale"]');
  if (!items.length) { // проверка наличия анимируемых блоков
    return;
  }

  // набрасываем анимацию на каждый блок
  items.forEach((item) => {
    const animateContainer = item.querySelector('[data-parallax="item"]');
    // начальное значение (перед анимацией)
    gsap.set(animateContainer, {opacity: 0, scale: 0.7});
    //сама анимация
    const tl = gsap.to(animateContainer, {opacity: 1, scale: 1});
    // конфигурация тригера
    ScrollTrigger.create({
      // отслеживаемый элемент
      trigger: item,
      // блок в котором происходит прокрутка
      scroller: pageScroller,
      // настройка позиции элемента во вьюпорте (когда начинается анимация, когда заканчивается)
      start: 'top bottom',
      end: vp767.matches ? 'center center' : 'top center',
      // если true будет воспроизводится в соответствии с прогрессом прокрутки
      scrub: true,
      // то какая анимация проиграется
      animation: tl,
    });
  });
};

// функция добавляет анимацию трансформации по вертикали
// конфигурация аналогична той что описана выше
const transformYParallax = () => {
  const items = document.querySelectorAll('[data-parallax="transformY"]');
  if (!items.length) {
    return;
  }

  items.forEach((item) => {
    const animateContainer = item.querySelector('[data-parallax="item"]');
    gsap.set(animateContainer, {y: item.dataset.from ? item.dataset.from : '100%', z: 0});
    const tl = gsap.to(animateContainer, {y: 0});
    ScrollTrigger.create({
      trigger: item,
      scroller: pageScroller,
      start: 'top bottom',
      end: vp767.matches ? 'center center' : 'top center',
      scrub: true,
      animation: tl,
    });
  });
};

export const initParallaxComponents = () => {
  fadeScaleParallax();
  transformYParallax();
};

import {ScrollTrigger} from '../../vendor/gsap/scroll-trigger.min.js';
import {pageScroller} from '../../utils/page-scroller.js';

// этот файл является частью модуля animation.js

// по скроллу на блоках с дата атрибутом data-animate="fade", далее блок, запускается одна из анимаций
ScrollTrigger.batch('[data-animate="fade"]', {
  onEnter: (batch) => gsap.to(batch, { // анимация, когда доскроллили до блока
    autoAlpha: 1, duration: 0.45, stagger: 0.1, // управление прозрачностью
    overwrite: true, // перезапись анимации
  }),
  onLeave: (batch) => gsap.to(batch, { // анимация, когда блок покидает вьюпорт (вверх)
    autoAlpha: 0, stagger: 0.1,
    overwrite: true,
  }),
  onEnterBack: (batch) => gsap.to(batch, { // анимация, когда блок покидает вьюпорт (вниз)
    autoAlpha: 1, stagger: 0.1,
    overwrite: true,
  }),
  onLeaveBack: (batch) => gsap.to(batch, { // анимация, когда блок возвращается во вьюпорт (сверху)
    autoAlpha: 0, duration: 45, stagger: 0.1,
    overwrite: true,
  }),
  start: 'top center', // место во вьюпорте, где стартует анимация (в данном случае когда верхняя грань блока доходит до центра)
  scroller: pageScroller, // назначение контейнера в котором происходит скролл
});

// по скроллу на блоках с дата атрибутом data-animate="fadeIn"
ScrollTrigger.batch('[data-animate="fadeIn"]', {
  onEnter: (batch) => gsap.to('[data-animate="fadeIn"] [data-animate-item]', { // здесь анимируются не весе блоки из бетча,
    autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.1,                          // а блоки в бетче соответствующие селектору в первом параметре
  }),
  start: 'top center',
  scroller: pageScroller,
});

// по скроллу на блоках с дата атрибутом data-animate="fadeScale"
ScrollTrigger.batch('[data-animate="fadeScale"]', {
  onEnter: (batch) => gsap.to('[data-animate="fadeScale"] [data-animate-item]', {
    autoAlpha: 1, scale: 1, duration: 0.45, ease: 'back.out(1.5)', stagger: 0.1,
  }),
  start: 'top center',
  scroller: pageScroller,
});

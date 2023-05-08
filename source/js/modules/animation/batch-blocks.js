import {ScrollTrigger} from '../../vendor/gsap/scroll-trigger.min.js';
import {pageScroller} from '../../utils/page-scroller.js';

ScrollTrigger.batch('[data-animate="fade"]', {
  onEnter: (batch) => gsap.to(batch, {
    autoAlpha: 1, duration: 0.45, stagger: 0.1,
  }),
  start: 'top center',
  scroller: pageScroller,
});

ScrollTrigger.batch('[data-animate="fadeIn"]', {
  onEnter: (batch) => gsap.to('[data-animate="fadeIn"] [data-animate-item]', {
    autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.1,
  }),
  start: 'top center',
  scroller: pageScroller,
});

ScrollTrigger.batch('[data-animate="fadeScale"]', {
  onEnter: (batch) => gsap.to('[data-animate="fadeScale"] [data-animate-item]', {
    autoAlpha: 1, scale: 1, duration: 0.45, ease: 'back.out(1.5)', stagger: 0.1,
  }),
  start: 'top center',
  scroller: pageScroller,
});

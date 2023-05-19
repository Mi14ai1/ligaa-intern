import {ScrollToPlugin} from './../vendor/gsap/scroll-to-plugin';
import {pageScroller} from '../utils/page-scroller.js';
import {clickObserver} from "../utils/observers.js";

const scrollToHandler = (e) => {
  const btn = e.target.closest('[data-move-to]');

  if (!btn) {
    return;
  }

  e.preventDefault();

  const target = document.querySelector(btn.dataset.moveTo);

  const options = {
    duration: Math.abs(btn.getBoundingClientRect().top - target.getBoundingClientRect().top) / (window.innerHeight * 1.5),
    offset: 0,
  };


  gsap.to(pageScroller === 'body' ? window : pageScroller, options.duration, {
    scrollTo: {
      y: target,
      offsetY: options.offset,
    },
    ease: 'power4.out',
  });
};

export const initScrollTo = () => {
  gsap.registerPlugin(ScrollToPlugin);

  if (!document.querySelector('[data-move-to]')) {
    return;
  }
  clickObserver.subscribe(scrollToHandler);
};

// Swiper 7.4.1
// import './vendor/swiper';
import './vendor/focus-visible-polyfill';
import {gsap} from './vendor/gsap.min.js';
import {ScrollTrigger} from './vendor/ScrollTrigger.js';
import Splitting from './vendor/splitting.min.js';

gsap.registerPlugin(ScrollTrigger);

Splitting({
  by: 'lines',
});



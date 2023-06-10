import {ScrollSlider} from './scroll-slider';
import {generateTimeline} from './generate-timeline.js';
import './batch-blocks';
import {initParallaxComponents} from './parallax.js';

// основной блок модуля animation (работает как main для всего js, но в рамках директории animation)
// за счет чего можно обращаться с папкой animation как с единым модулем
export const initAnimationModule = () => {
  const sliderContainer = document.querySelector('[data-scroll-slider="parent"]');
  const scrollSlider = new ScrollSlider(sliderContainer);
  generateTimeline();
  initParallaxComponents();
};



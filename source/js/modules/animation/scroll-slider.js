import {resizeObserver} from '../../utils/observers';
import {ScrollTrigger} from '../../vendor/gsap/scroll-trigger.min.js';


// создание класса для полноэкранных секций
export class ScrollSlider {

  // базовая конфигурация класса (как параметр получает контейнер, содержащий, секции )
  constructor(slider) {
    if (!slider) {
      return;
    }
    // задаем свойству container данные из параметра
    this.container = slider;
    // в свойство slides передаем все секции
    this.slides = this.container.querySelectorAll('[data-scroll-slider="slide"]');
    // считаем колличество секций
    this.slidesCount = this.slides.length;
    // назначаем начальный слайд
    this.currentSlide = 0;
    // инициализируем свойство под таймлайн
    this.timeline = null;
    // определяем тип устройства
    this.vpTouch = window.matchMedia('(pointer: coarse)');
    // привязка контекста ScrollSlider к методам setSlider и switchSlide
    this.setSlider = this.setSlider.bind(this);
    this.switchSlide = this.switchSlide.bind(this);
    // инициализация метода init
    this.init();
  }

  // метод switchSlide просто тоглит текущий слайд (секцию)
  switchSlide(scroll) {
    if (scroll.progress === 0) {
      this.currentSlide = 0;
    } else {
      this.currentSlide = Math.ceil((scroll.progress) / (1 / this.slidesCount)) - 1;
    }
    [...this.slides].map((slide) => slide.classList.remove('is-active'));
    this.slides[this.currentSlide].classList.add('is-active');
  }

  // метод для пересчет высоты
  updateHeight() {
    this.height = this.slidesCount * window.innerHeight;
    this.container.style.minHeight = this.height + 'px';
  }

  // (сеттер) метод для конфигурирования анимации
  setSlider() {
    this.updateHeight();

    if (this.timeline) {
      this.timeline.kill();
      this.timeline = null;
    }

    this.timeline = gsap.timeline({paused: true});
    ScrollTrigger.create({
      scroller: this.vpTouch.matches ? '.wrapper' : 'body',
      trigger: this.container,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: this.switchSlide,
      animation: this.timeline,
    });
  }

  // метод инициализирующий полноэкранные секции
  init() {
    this.setSlider();
    resizeObserver.subscribe(this.setSlider);
  }
}

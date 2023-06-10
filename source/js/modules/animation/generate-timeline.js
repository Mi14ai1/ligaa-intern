// ---
// generateTimeline module
// создает анимации по скроллу с помощью дата атрибута
const vpTouch = window.matchMedia('(pointer: coarse)');

//функция возвращающая сумму ширин переданных блоков
const getMaxWidth = (blocks) => {
  let maxWidth = 0;
  blocks.forEach((block) => {
    maxWidth += block.offsetWidth;
  });
  return maxWidth
};

//функция возвращает объект, содержащий, ключ значение, работает только со строками которые соответствуют структуре объекта
const getObjectFromString = (str) => {
  if (str.indexOf('clipPath') !== -1) {
    const arr = str.split(':');
    return {clipPath: arr[1]};
  }
  return str.split(',')
    .map((keyVal) => {
      return keyVal
        .split(':')
        .map((_) => _.trim());
    })
    .reduce((accumulator, currentValue) => {
      accumulator[currentValue[0]] = isNaN(Number(currentValue[1])) ? currentValue[1] : Number(currentValue[1]);
      return accumulator;
    }, {});
};


//фукция возвращает объект с конфигурацией анимации
function getAnimationObject(el) {
  const obj = {};
  obj.direction = el.dataset.animationDirection;                        //направление
  obj.duration = +el.dataset.animationDuration || 1;                    //продолжительность
  obj.delay = +el.dataset.animationDelay || 0;                          //задержка
  obj.position = el.dataset.position;                                   //позиция
  obj.element = el;                                                     //анимируемый элемент
  obj.animation = getObjectFromString(el.dataset.animation.toString()); //настройка анимация из дата-атрибута
  return obj;
}

//основная функция данного блока
const generateTimeline = () => {
  const sections = document.querySelectorAll('[data-section-animation]')                              //получаем анимируемые секции
  sections.forEach((section) => {                                                                         //основной цикл функции
    const blocks = gsap.utils.toArray(section.querySelectorAll("[data-animation]")).sort((a, b) => {     //сортируем секции по индексу
      const aIndex = +a.dataset.index || 1;
      const bIndex = +b.dataset.index || 1;
      return aIndex - bIndex;
    });

    const tl = window.gsap.timeline({                                                                                                //создаем gsap таймлайн
      scrollTrigger: {                                                                                                               //конфигурируем скроллтригер
        scroller: vpTouch.matches ? '.wrapper' : 'body',                                                                             //определяем обертку для скролла в зависимости от устройства(тач не тач)
        trigger: section,                                                                                                            //привязываем тригер к секции
        start: section.dataset.start,                                                                                                //начало анимации
        end: section.hasAttribute('data-end') ? section.dataset.end : () => `+=${getMaxWidth(blocks)}`,           //конец анимации
        scrub: section.dataset.scrub ? Number(section.dataset.scrub) : 1,                                                            //параметр отвечающий за анимацию во время прокрутки страницы (если true, то анимация будет проигрываться в соответствии с прогрессом прокрутки)
        pin: section.hasAttribute('data-pin') ? true : false,                                                            // в демонстрации не применяется
        pinSpacing: section.hasAttribute('data-pin-spacing') ? true : false,                                             // в демонстрации не применяется
      }
    });
//накидываем параметры анимации из дата-атрибута
    blocks.forEach(block => {
      const obj = getAnimationObject(block);
      if (obj.position) {
        tl[obj.direction](obj.element, {duration: obj.duration, delay: obj.delay, ...obj.animation}, obj.position);
      } else {
        tl[obj.direction](obj.element, {duration: obj.duration, delay: obj.delay, ...obj.animation});
      }
    });
  });
};

export {generateTimeline};

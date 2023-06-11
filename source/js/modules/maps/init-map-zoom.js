// import {scroll} from '../animation/init-loco-scroll';

const mediaPoint = matchMedia('(max-width: 767px)');

//функция инициализации управления зумом на карте
const initZoomMap = (ymap) => {
  const messageBlock = document.querySelector('.ya-map__message');

  if (!messageBlock) {
    return;
  }

  const CTRL_KEY = 'Control';
  const TIMEOUT = 1500;
  let isCtrlKeyDown;
  let isCtrlMessageVisible;

  let timer;

  const showMessageBlock = () => {
    messageBlock.classList.add('is-active');
    isCtrlMessageVisible = true;
    clearTimeout(timer); // сбрасываем таймер(чтобы таймеры не стакались)
    // убираем сообщение по таймеру
    timer = setTimeout(hiddenMessageBlock, TIMEOUT);
  };

  // функция, скрывающая сообщение о зуме
  const hiddenMessageBlock = () => {
    if (isCtrlMessageVisible) {
      messageBlock.classList.remove('is-active');
      isCtrlMessageVisible = false;
    }
  };


  // хендлер нажатия на кнопку мыши
  const hiddenMessageBlockOnMousedown = () => {
    hiddenMessageBlock();
  };


  // хендлер нажатия на кнопку контрол
  const enableScrollMapZoomOnKeydown = (evt) => {
    if (evt.key === CTRL_KEY && !isCtrlKeyDown) {
      isCtrlKeyDown = true;
      ymap.behaviors.enable('scrollZoom');
      // scroll.stop();
      hiddenMessageBlockOnMousedown();
    }
  };

  // хенделер отжатия кнопки контрол
  const disableScrollMapZoomOnKeyup = (evt) => {
    if (evt.key === CTRL_KEY) {
      isCtrlKeyDown = false;
      ymap.behaviors.disable('scrollZoom');
      // scroll.start();
    }
  };

  // хендлер колеса мыши
  const onMapWheel = () => {
    if (!isCtrlKeyDown) {
      // если не нажат контрол показываем сообщение, с предупреждением
      showMessageBlock();
    } else {
      // если нажат контрол скрываем сообщение, с предупреждением
      hiddenMessageBlock();
    }
  };

  const breakpointChecker = () => {
    if (!mediaPoint.matches) {
      document.addEventListener('keydown', enableScrollMapZoomOnKeydown);
      document.addEventListener('keyup', disableScrollMapZoomOnKeyup);
      messageBlock.addEventListener('mousedown', hiddenMessageBlockOnMousedown);
      messageBlock.addEventListener('wheel', onMapWheel);
      // добавляем событие колеса мыши (включаем зум)
      ymap.events.add('wheel', onMapWheel);
    } else {
      document.removeEventListener('keydown', enableScrollMapZoomOnKeydown);
      document.removeEventListener('keyup', disableScrollMapZoomOnKeyup);
      messageBlock.removeEventListener('mousedown', hiddenMessageBlockOnMousedown);
      messageBlock.removeEventListener('wheel', onMapWheel);
      // удаляем событие колеса мыши (отключаем зум)
      ymap.events.remove('wheel', onMapWheel);
    }
  };

  breakpointChecker();
  mediaPoint.addListener(breakpointChecker);
};

export {initZoomMap};

import {initMapPin} from './init-map-pin.js';

const initMap1 = (mapBlock) => {
  //координаты
  const center = mapBlock.dataset.center.split(', ').map((str) => +str);
  //начальный зум
  const zoom = +mapBlock.dataset.zoom;
  //элементы управления картой
  const controls = mapBlock.dataset.controls ? mapBlock.dataset.controls.split(' ') : [];
  //параметры взаимодействия с картой
  const behaviorsMap = ['drag', 'multiTouch'];
// задаем конфигурацию карты
  window.ymaps.ready(() => {
    const myMap = new ymaps.Map(mapBlock, {
      center,
      zoom,
      controls,
      behaviors: behaviorsMap,
    },
    {
      //отслеживание размера контейнера (для масштабирования самой карты внутри)
      autoFitToViewport: 'always',
    });

    initMapPin(mapBlock, myMap);
  });
};

export {initMap1};

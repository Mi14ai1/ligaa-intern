const initClustersPins = (mapBlock, ymap) => {
  // массив под кластер
  const pinsArray = [];

  ymap.geoObjects.each(function (geoObject) {
    const pinType = geoObject.options.get('placemarkType');
    if (pinType !== 'mainPin') {
      // групируем пины
      pinsArray.push(geoObject);
    }
  });

  // темплейт всплывашки кластера
  const customItemContentLayout = ymaps.templateLayoutFactory.createClass(
      `<div class="cluster-balloon">
          <div class="cluster-balloon__image">
            <img src="$[properties.imagePath]" width="101" height="94" alt="$[properties.imageAlt]">
          </div>
          <div class="cluster-balloon__wrap">
            <p class="cluster-balloon__head">$[properties.textHead]</p>
            <p class="cluster-balloon__title">$[properties.title]</p>
            <p class="cluster-balloon__text {% if properties.textLeft %} cluster-balloon__text--right-text {% endif %}">
              {% if properties.text %}
                {% if properties.linkHref %}
                  <a href="$[properties.linkHref]">$[properties.text]</a>
                {% else %}
                  <span>$[properties.text]</span>
                {% endif %}
              {% endif %}
              {% if properties.textRight %}
                <span class="right">$[properties.textRight]</span>
              {% endif %}
            </p>
          </div>
        </div>`
  );

  // конфигурируем кластер
  const clusterer = new ymaps.Clusterer({
    gridSize: 12800,
    preset: 'islands#brownClusterIcons',
    hasBalloon: true,
    // hasHint: true, позволяет выводить подсказки при наведении на пин
    clusterDisableClickZoom: true,


    clusterOpenBalloonOnClick: true,
    // Устанавливаем стандартный макет балуна кластера "Карусель".
    clusterBalloonContentLayout: 'cluster#balloonCarousel',
    clusterBalloonItemContentLayout: customItemContentLayout,
    clusterBalloonPanelMaxMapArea: 0,
    clusterBalloonContentLayoutWidth: 300,
    clusterBalloonContentLayoutHeight: 180,
    clusterBalloonPagerSize: 5, // максимум слайдов
    clusterBalloonPagerType: 'marker',
  });

  // добавляем в кластер пины из массива
  clusterer.add(pinsArray);
  //добавляем кластер на карту
  ymap.geoObjects.add(clusterer);

  // задаем зависимость кластеризации от зума
  ymap.setBounds(clusterer.getBounds(), {
    checkZoomRange: true,
  });
};

export {initClustersPins};

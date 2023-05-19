import {clickObserver} from '../../utils/observers.js';
import {keyObserver} from "../../utils/observers.js";

let isMenuOpen = false;

const menuElements = {
  header: document.querySelector('.header'),
  menuToggle: document.querySelector('[data-menu="toggle"]'),
  menuNav: document.querySelector('[data-menu="nav"]'),
};

const closeMenu = () => {
  menuElements.menuNav.classList.remove('is-active');
  menuElements.menuToggle.classList.remove('is-active');
  menuElements.header.classList.remove('menu-opened');
  window.scrollLock.enableScrolling();
  isMenuOpen = false;
  keyObserver.unsubscribe(escPressHandler);
};

const openMenu = () => {
  menuElements.menuNav.classList.add('is-active');
  menuElements.menuToggle.classList.add('is-active');
  menuElements.header.classList.add('menu-opened');
  window.scrollLock.disableScrolling();
  isMenuOpen = true;
  keyObserver.subscribe(escPressHandler);
};

const toggleMenu = (evt) => {
  const target = evt.target;
  const menuToggle = target.closest('[data-menu="toggle"]');
  if (!menuToggle || !menuElements.menuNav) {
    return;
  }

  if (isMenuOpen) {
    closeMenu();
  } else {
    openMenu();
  }
};

const escPressHandler = (evt) => {
  if (evt.key === 'Escape') {
    closeMenu();
  }
};

export const initToggleMenu = () => {
  if (!menuElements.menuNav || !menuElements.menuToggle) {
    return;
  }
  clickObserver.subscribe(toggleMenu);
};


import React, { useState } from 'react';
import Icon from '../../atoms/Icon';
import FormSearch from '../../atoms/FormSearch';
import Button from '../../atoms/Button';
import burger from '../../../images/burger.svg';
import close from '../../../images/close.svg';
import './style.scss';

const Menu = ({
  updateMenuState, updateCartState, isCartVisible, menuItems, submenuItems,
}) => {
  const [isMenuVisible, setMenuIsVisible] = useState(false);
  const [isSubmenuVisible, setSubmenuIsVisible] = useState(false);

  const dropDownClickHandler = (isMenuVisible, isSubmenuVisible) => {
    const isVisible = !isMenuVisible;
    updateMenuState(isVisible);
    updateCartState(false);
    setMenuIsVisible(isVisible);
    if (isSubmenuVisible === true) {
      setSubmenuIsVisible(false);
      setMenuIsVisible(false);
    }
  };

  const showSubmenuClickHandler = (isSubmenuVisible) => {
    const isVisible = !isSubmenuVisible;
    setSubmenuIsVisible(isVisible);
    setMenuIsVisible(false);
    updateCartState(false);
    if (isSubmenuVisible === true) {
      setSubmenuIsVisible(false);
      setMenuIsVisible(true);
    }
  };

  return (
    <div>
      <button type="button" className="header__burger" onClick={() => dropDownClickHandler(isMenuVisible, isSubmenuVisible)}>
        <Icon src={isMenuVisible || isSubmenuVisible ? close : burger} alt="burger" />
      </button>
      <div className={isMenuVisible && !isCartVisible ? 'header__menu--active' : 'header__menu'}>
        <ul className="header__menu__list">
          <li className="header__menu__list__item">
            <FormSearch />
          </li>
          {menuItems && menuItems.map((item) => (
            <li className="header__menu__list__item" key={item.id} onClick={item.onclick ? () => showSubmenuClickHandler(isSubmenuVisible) : null}>
              <a className="header__link" href={item.url}>
                {item.title}
                {item.button ? <Button className="button button__link" arrowDirection="right" /> : null }
              </a>
            </li>
          ))}
          <ul className={isSubmenuVisible && !isCartVisible ? 'header__menu__list__submenu--active' : 'header__menu__list__submenu'}>
            {submenuItems && submenuItems.map((item) => (
              <li className="header__menu__list__submenu__item" key={item.id} onClick={item.onclick ? () => showSubmenuClickHandler(isSubmenuVisible) : null}>
                <a className="header__sublink" href={item.url}>
                  {item.button ? <Button className="button button__sublink" arrowDirection="left" /> : null }
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </ul>
      </div>
    </div>
  );
};

export default Menu;

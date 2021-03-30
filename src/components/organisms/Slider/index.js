import React, { useState } from 'react';
import Button from '../../atoms/Button';
import CarouselText from '../../molecules/CarouselText';
import './style.scss';

const Slider = ({ title, subtitle, images }) => {
  const slides = images && images.map((item) => (
    <img src={require(`../../../${item.src}`).default} alt={item.alt} key={item.id} />));

  const [transform, setTransform] = useState(-100);
  const [transition, setTransition] = useState('transition-on');
  const [currentSlide, setCurrentSlide] = useState(1);

  const clickLeft = () => {
    setCurrentSlide(currentSlide - 1);
    if (currentSlide < 1) {
      setCurrentSlide(slides.length - 1);
    }
    setTransform(-100 * (currentSlide - 1));
    if (currentSlide === 1 && transition === 'transition-on') {
      setTimeout(() => {
        setTransition('transition-off');
        setCurrentSlide(slides.length - 2);
        setTransform(-100 * (slides.length - 2));
      }, 300);
    } else if (currentSlide === 1 && transition === 'transition-off') {
      setTransition('transition-on');
      setTimeout(() => {
        setTransition('transition-off');
        setCurrentSlide(slides.length - 2);
        setTransform(-100 * (slides.length - 2));
      }, 300);
    } else {
      setTransition('transition-on');
    }
  };

  const clickRight = () => {
    setCurrentSlide(currentSlide + 1);
    if (currentSlide === slides.length - 1) {
      setCurrentSlide(1);
    }
    setTransform(-100 * (currentSlide + 1));
    if (currentSlide === (slides.length - 2) && transition === 'transition-on') {
      setTimeout(() => {
        setTransition('transition-off');
        setTransform(-100);
        setCurrentSlide(1);
      }, 300);
    } else if (currentSlide === (slides.length - 2) && transition === 'transition-off') {
      setTransition('transition-on');
      setTimeout(() => {
        setTransition('transition-off');
        setTransform(-100);
        setCurrentSlide(1);
      }, 300);
    } else {
      setTransition('transition-on');
    }
  };

  return (
    <div className="slider">
      {slides && slides.map((item) => (
        <div
          className={`slider__slide--${transition}`}
          style={{ transform: `translateX(${transform}%)` }}
          key={item.key}
        >
          {item}
          <CarouselText title={title} subtitle={subtitle} />
        </div>
      ))}
      <div className="slider__buttons">
        <Button className="button" size="big" arrowDirection="left" onClick={() => clickLeft()} />
        <Button className="button" size="big" arrowDirection="right" onClick={() => clickRight()} />
      </div>
    </div>
  );
};

export default Slider;
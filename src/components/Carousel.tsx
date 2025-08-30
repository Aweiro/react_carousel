import React, { useState } from 'react';
import './Carousel.scss';

interface Props {
  images: string[];
  step: number;
  itemWidth: number;
  frameSize: number;
  animationDuration: number;
  infinite: boolean;
}

const Carousel: React.FC<Props> = ({
  images,
  step,
  itemWidth,
  frameSize,
  animationDuration,
  infinite,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentStep, setCurrentStep] = useState(step);
  const [currentWidth, setCurrentWidth] = useState(itemWidth);
  const [currentSize, setCurrentSize] = useState(frameSize);
  const [currentDuration, setCurrentDuration] = useState(animationDuration);
  const [currentInfinite, setCurrentInfinite] = useState(infinite);
  const size = currentSize * currentWidth;

  return (
    <div className="Carousel" style={{ width: `${size}px` }}>
      <ul
        className="Carousel__list"
        style={{
          transition: `transform ${currentDuration}ms ease`,
          transform: `translateX(-${currentIndex * currentWidth}px)`,
        }}
      >
        {images.map((a, i) => (
          <li key={i}>
            <img src={a} alt={a} style={{ width: `${currentWidth}px` }} />
          </li>
        ))}
      </ul>

      <button
        type="button"
        disabled={currentIndex <= 0 && currentInfinite !== true}
        onClick={e => {
          e.preventDefault();
          if (currentInfinite) {
            if (currentIndex <= 0) {
              setCurrentIndex(images.length - currentSize);
            } else {
              setCurrentIndex(currentIndex - currentStep);
            }
          } else {
            if (currentIndex - currentSize < 0) {
              setCurrentIndex(0);
            } else {
              setCurrentIndex(currentIndex - currentStep);
            }
          }
        }}
      >
        Prev
      </button>
      <button
        type="button"
        disabled={
          currentIndex + currentSize >= images.length &&
          currentInfinite !== true
        }
        onClick={e => {
          e.preventDefault();
          if (currentInfinite) {
            if (currentIndex >= images.length - currentSize) {
              setCurrentIndex(0);
            } else {
              setCurrentIndex(
                Math.min(
                  currentIndex + currentStep,
                  images.length - currentSize,
                ),
              );
            }
          } else {
            setCurrentIndex(
              Math.min(currentIndex + currentStep, images.length - currentSize),
            );
          }
        }}
      >
        Next
      </button>

      <label htmlFor="itemStep">itemStep</label>
      <input
        id="itemStep"
        type="number"
        min="1"
        max={images.length}
        defaultValue={step}
        onChange={e => setCurrentStep(+e.target.value)}
      />

      <label htmlFor="itemWidth">itemWidth</label>
      <input
        id="itemWidth"
        type="number"
        min="1"
        defaultValue={itemWidth}
        onChange={e => setCurrentWidth(+e.target.value)}
      />

      <label htmlFor="frameSize">frameSize</label>
      <input
        id="frameSize"
        type="number"
        min="1"
        max={images.length}
        defaultValue={frameSize}
        onChange={e => setCurrentSize(+e.target.value)}
      />

      <label htmlFor="animationDuration">Animation Duration</label>
      <input
        id="animationDuration"
        type="number"
        min="1"
        defaultValue={animationDuration}
        onChange={e => setCurrentDuration(+e.target.value)}
      />

      <label htmlFor="isInfinite">Infinite</label>
      <input
        id="isInfinite"
        type="checkbox"
        checked={currentInfinite}
        onChange={e => setCurrentInfinite(e.target.checked)}
      />
    </div>
  );
};

export default Carousel;

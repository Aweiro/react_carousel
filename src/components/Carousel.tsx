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
  const size = frameSize * itemWidth;

  return (
    <div className="Carousel" style={{ width: `${size}px` }}>
      <ul
        className="Carousel__list"
        style={{
          transition: `transform ${animationDuration}ms ease`,
          transform: `translateX(-${currentIndex * itemWidth}px)`,
        }}
      >
        {images.map((a, i) => (
          <li key={i}>
            <img
              src={a}
              alt={a}
              width={itemWidth}
              style={{ width: `${itemWidth}px` }}
            />
          </li>
        ))}
      </ul>

      <button
        type="button"
        disabled={currentIndex <= 0 && infinite !== true}
        onClick={e => {
          e.preventDefault();
          if (infinite) {
            if (currentIndex <= 0) {
              setCurrentIndex(images.length - frameSize);
            } else {
              setCurrentIndex(currentIndex - step);
            }
          } else {
            if (currentIndex - frameSize < 0) {
              setCurrentIndex(0);
            } else {
              setCurrentIndex(currentIndex - step);
            }
          }
        }}
      >
        Prev
      </button>
      <button
        type="button"
        data-cy="next"
        disabled={
          currentIndex + frameSize >= images.length && infinite !== true
        }
        onClick={e => {
          e.preventDefault();
          if (infinite) {
            if (currentIndex >= images.length - frameSize) {
              setCurrentIndex(0);
            } else {
              setCurrentIndex(
                Math.min(currentIndex + step, images.length - frameSize),
              );
            }
          } else {
            setCurrentIndex(
              Math.min(currentIndex + step, images.length - frameSize),
            );
          }
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;

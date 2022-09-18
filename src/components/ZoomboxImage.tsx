import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ENABLE_DRAG_AT_ZOOM } from '../constants';

type ZoomboxImageProps = {
  src: string;
  alt?: string;
  zoom: number;
  xPercentage: string;
  yPercentage: string;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
  enableImageDrag?: boolean;
  dbClickToZoom?: boolean;
};

export const ZoomboxImage = ({ src, alt, zoom, xPercentage, yPercentage, setZoom, enableImageDrag, dbClickToZoom }: ZoomboxImageProps) => {
  const [isDown, setIsDown] = useState(false);
  const image: React.MutableRefObject<HTMLImageElement | null> = useRef(null);
  const handleMouseDown = () => {
    setIsDown(true);
  };
  const handleMouseUp = () => {
    setIsDown(false);
  };
  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (isDown && image.current) {
        var deltaX = event.movementX;
        var deltaY = event.movementY;
        const styles = getComputedStyle(image.current);
        const x = (Math.sign(deltaX) >= 0 ? Math.min(deltaX, 10) : Math.max(deltaX, -10)) * (50 / zoom);
        const y = (Math.sign(deltaY) >= 0 ? Math.min(deltaY, 10) : Math.max(deltaY, -10)) * (50 / zoom);
        image.current.style.transform = `${styles.transform} translate(${x + 'px'},${y + 'px'})`;
      }
    },
    [isDown, zoom]
  );
  useEffect(() => {
    if (image.current && enableImageDrag && zoom >= ENABLE_DRAG_AT_ZOOM) {
      image.current.addEventListener('mousedown', handleMouseDown, true);
      image.current.addEventListener('mouseup', handleMouseUp, true);
      image.current.addEventListener('mousemove', handleMouseMove, true);
    }
    return () => {
      if (image.current && enableImageDrag && zoom >= ENABLE_DRAG_AT_ZOOM) {
        image.current.removeEventListener('mousedown', handleMouseDown, true);
        image.current.removeEventListener('mouseup', handleMouseUp, true);
        image.current.removeEventListener('mousemove', handleMouseMove, true);
      }
    };
  }, [image.current, handleMouseMove, zoom]);
  return (
    <div
      draggable={false}
      ref={image}
      style={{
        transform: `scale(${zoom})`,
        transformOrigin: `${xPercentage}% ${yPercentage}%`,
        ...(enableImageDrag && zoom >= ENABLE_DRAG_AT_ZOOM ? { cursor: isDown ? 'grabbing' : 'grab' } : {})
      }}
      className="imageContainer"
    >
      <img
        draggable={false}
        onDoubleClick={() => {
          dbClickToZoom && setZoom(zoom >= 2 ? 1 : 2);
        }}
        src={src}
        alt={alt}
      />
    </div>
  );
};

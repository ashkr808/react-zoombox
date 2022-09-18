import React, { useCallback, useEffect, useRef, useState } from 'react';

type ZoomboxImageProps = {
  src: string;
  alt?: string;
  zoom: number;
  xPercentage: string;
  yPercentage: string;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
  enableImageDragBeta?: boolean;
  dbClickToZoom?: boolean;
};

export const ZoomboxImage = ({ src, alt, zoom, xPercentage, yPercentage, setZoom, enableImageDragBeta, dbClickToZoom }: ZoomboxImageProps) => {
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
        image.current.style.transform = `${styles.transform} translate(${deltaX * (50 / zoom) + 'px'},${deltaY * (50 / zoom) + 'px'})`;
      }
    },
    [isDown, zoom]
  );
  useEffect(() => {
    if (image.current && enableImageDragBeta) {
      image.current.addEventListener('mousedown', handleMouseDown, true);
      image.current.addEventListener('mouseup', handleMouseUp, true);
      image.current.addEventListener('mousemove', handleMouseMove, true);
    }
    return () => {
      if (image.current && enableImageDragBeta) {
        image.current.removeEventListener('mousedown', handleMouseDown, true);
        image.current.removeEventListener('mouseup', handleMouseUp, true);
        image.current.removeEventListener('mousemove', handleMouseMove, true);
      }
    };
  }, [image.current, handleMouseMove]);
  return (
    <div
      draggable={false}
      ref={image}
      style={{
        transform: `scale(${zoom})`,
        transformOrigin: `${xPercentage}% ${yPercentage}%`,
        ...(enableImageDragBeta && isDown ? { cursor: 'grabbing' } : {})
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

import React from 'react';

type ZoomboxImageProps = {
  src: string;
  alt?: string;
  zoom: number;
};

export const ZoomboxImage = ({ src, alt, zoom }: ZoomboxImageProps) => {
  return (
    <div style={{ transform: `scale(${zoom})` }} className="imageContainer">
      <img src={src} alt={alt} />
    </div>
  );
};

import React from 'react';

type ZoomboxImageProps = {
  src: string;
  alt?: string;
  zoom: number;
  xPercentage: string;
  yPercentage: string;
};

export const ZoomboxImage = ({ src, alt, zoom, xPercentage, yPercentage }: ZoomboxImageProps) => {
  return (
    <div style={{ transform: `scale(${zoom})`, transformOrigin: `${xPercentage}% ${yPercentage}%` }} className="imageContainer">
      <img src={src} alt={alt} />
    </div>
  );
};

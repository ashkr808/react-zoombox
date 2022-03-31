import React from "react";

type ZoomboxImageProps = {
  src: string;
  alt?: string;
};

export const ZoomboxImage = ({ src, alt }: ZoomboxImageProps) => {
  return (
    <div className="imageContainer">
      <img src={src} alt={alt} />
    </div>
  );
};

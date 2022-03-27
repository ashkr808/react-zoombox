import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Image, Images } from "../types";

type ZoomboxFooterProps = {
  images: Images;
  setSelectedImage: Dispatch<SetStateAction<number>>;
  selectedImage: number;
};

const ZoomBoxFooter = (props: ZoomboxFooterProps) => {
  const [translateX, setTranslateX] = useState(0);
  const { images, selectedImage, setSelectedImage } = props;
  const handleImageClick = (index: number) => {
    setTranslateX(-80 * index);
    setSelectedImage(index);
  };
  useEffect(() => {
    setTranslateX(-80 * selectedImage);
  }, [selectedImage]);
  return (
    <div className="footer">
      <div
        className="previewImagesContainer"
        style={{ transform: `translateX(${translateX}px)` }}
      >
        {images.map((image: Image, index: number) => (
          <img
            key={index}
            alt={image.caption}
            src={image.src}
            onClick={() => handleImageClick(index)}
            className={selectedImage === index ? "activeImage" : ""}
          />
        ))}
      </div>
    </div>
  );
};

export default ZoomBoxFooter;

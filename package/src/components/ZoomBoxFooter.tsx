import React, { Dispatch, SetStateAction, useState } from "react";
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
  return (
    <div className="footer">
      <div
        className="previewImagesContainer"
        style={{ transform: `translateX(${translateX}px)` }}
      >
        {images.map((image: Image, index: number) => (
          <img
            alt={image.caption}
            src={image.url}
            onClick={() => handleImageClick(index)}
            style={{ opacity: selectedImage === index ? 1 : 0.5 }}
          />
        ))}
      </div>
    </div>
  );
};

export default ZoomBoxFooter;

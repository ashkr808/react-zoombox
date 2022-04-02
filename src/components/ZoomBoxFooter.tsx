import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { heightWidthOfPreviewImage } from '../constants';
import { Image, Images } from '../types';

type ZoomboxFooterProps = {
  images: Images;
  setSelectedImage: Dispatch<SetStateAction<Image>>;
  selectedImage: Image;
  translateX: number;
  setTranslateX: Dispatch<SetStateAction<number>>;
  selectedImageIndex: number;
};

const ZoomBoxFooter = (props: ZoomboxFooterProps) => {
  const { images, selectedImage, setSelectedImage, translateX, setTranslateX, selectedImageIndex } = props;
  const handleImageClick = (image: Image) => {
    setSelectedImage(image);
  };
  useEffect(() => {
    if (selectedImageIndex >= 0) {
      setTranslateX(-(heightWidthOfPreviewImage + 10) * selectedImageIndex);
    }
  }, [selectedImage, selectedImageIndex]);
  return (
    <div
      className="zoomboxFooter"
      style={{
        top: `calc(100% - ${heightWidthOfPreviewImage}px)`,
        left: `calc(50% - ${heightWidthOfPreviewImage / 2}px)`,
        transform: `translateX(${translateX}px)`
      }}
    >
      {images.map((image: Image, index: number) => (
        <img
          style={{
            height: `${heightWidthOfPreviewImage}px`,
            width: `${heightWidthOfPreviewImage}px`
          }}
          key={index}
          alt={image.caption}
          src={image.src}
          onClick={() => handleImageClick(image)}
          className={selectedImageIndex === index ? 'activeImage' : ''}
        />
      ))}
    </div>
  );
};

export default ZoomBoxFooter;

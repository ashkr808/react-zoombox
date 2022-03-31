import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { heightWidthOfPreviewImage } from '../constants';
import { Image, Images } from '../types';

type ZoomboxFooterProps = {
  images: Images;
  setSelectedImage: Dispatch<SetStateAction<Image>>;
  selectedImage: Image;
};

const ZoomBoxFooter = (props: ZoomboxFooterProps) => {
  const [translateX, setTranslateX] = useState(0);
  const { images, selectedImage, setSelectedImage } = props;
  const selectedImageIndex = useMemo(() => images.indexOf(selectedImage), [selectedImage]);
  const handleImageClick = (image: Image) => {
    setSelectedImage(image);
  };
  useEffect(() => {
    // console.log(selectedImageIndex, selectedImage);
    setTranslateX(-(heightWidthOfPreviewImage + 10) * selectedImageIndex);
    return () => {
      console.log('removed');
    };
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

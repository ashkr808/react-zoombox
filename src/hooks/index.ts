import { useEffect, useMemo, useState } from 'react';
import { Image, Images } from '../types';

export const useKeyboard = (
  enableKeyboardNavigation: boolean,
  isActive: boolean,
  nextPrevImage: (move: 1 | -1) => void
) => {
  const handleKeyPress = (e: any) => {
    if (isActive) {
      switch (e.keyCode) {
        case 37:
          nextPrevImage(-1);
          break;
        case 39:
          nextPrevImage(1);
          break;
      }
    }
  };
  useEffect(() => {
    enableKeyboardNavigation && window.addEventListener('keydown', handleKeyPress);
    return () => {
      enableKeyboardNavigation && window.removeEventListener('keydown', handleKeyPress);
    };
  });
};

export const useNavigation = (images: Images, selectedIndex: number) => {
  const [selectedImage, setSelectedImage] = useState<Image>(images[selectedIndex]);
  const [translateX, setTranslateX] = useState(0);
  const selectedImageIndex = useMemo(() => images.indexOf(selectedImage), [selectedImage]);

  useEffect(() => {
    setSelectedImage(images[selectedIndex]);
  }, [selectedIndex]);

  const nextPrevImage = (move: number = 1 | -1) => {
    const selectedIndex = images.indexOf(selectedImage);
    const prevIndex = selectedIndex - 1;
    const nextIndex = selectedIndex + 1;
    const moveToIndex =
      move === -1 ? (prevIndex >= 0 ? prevIndex : images.length - 1) : nextIndex < images.length ? nextIndex : 0;
    setSelectedImage(images[moveToIndex]);
  };

  return {
    selectedImage,
    setSelectedImage,
    nextPrevImage,
    translateX,
    setTranslateX,
    selectedImageIndex
  };
};

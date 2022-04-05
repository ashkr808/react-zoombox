import { useEffect, useMemo, useState } from 'react';
import { DEFAULT_ZOOM, MAX_ZOOM, MIN_ZOOM, ZOOM_STEP } from '../constants';
import { Image, Images } from '../types';

export const useKeyboardAndMouse = (
  zoomboxElement: React.MutableRefObject<null> | any,
  enableKeyboardNavigation: boolean,
  isActive: boolean,
  nextPrevImage: (move: 1 | -1) => void,
  setZoomValue: (move?: number) => void,
  enableZoom: 0 | 1 | 2
) => {
  const [xPercentage, setXPercentage] = useState('50');
  const [yPercentage, setYPercentage] = useState('50');
  const handleKeyPress = (e: any) => {
    if (isActive) {
      switch (e.keyCode) {
        case 37:
          nextPrevImage(-1);
          break;
        case 39:
          nextPrevImage(1);
          break;
        case 38:
          enableZoom && setZoomValue(1);
          break;
        case 40:
          enableZoom && setZoomValue(-1);
          break;
      }
    }
  };

  const handleScroll = (e: any) => {
    const { deltaY, clientX, clientY } = e;
    if (enableZoom === 2) {
      const { innerHeight, innerWidth } = window;
      const xPercentage = ((clientX / innerWidth) * 100).toFixed(2);
      const yPercentage = ((clientY / innerHeight) * 100).toFixed(2);
      setXPercentage(xPercentage);
      setYPercentage(yPercentage);
    }
    if (deltaY) {
      setZoomValue(deltaY > 0 ? -1 : 1);
    } else {
      throw 'deltaY is not supported for wheelevent';
    }
  };
  useEffect(() => {
    if (enableKeyboardNavigation) {
      window.addEventListener('keydown', handleKeyPress);
      if (zoomboxElement.current) {
        enableZoom && zoomboxElement.current.addEventListener('wheel', handleScroll);
      }
    }
    return () => {
      if (enableKeyboardNavigation) {
        window.removeEventListener('keydown', handleKeyPress);
        if (zoomboxElement.current) {
          enableZoom && zoomboxElement.current.removeEventListener('wheel', handleScroll);
        }
      }
    };
  });
  return {
    xPercentage,
    yPercentage
  };
};

export const useNavigation = (images: Images, selectedIndex: number) => {
  const [selectedImage, setSelectedImage] = useState<Image>(images[selectedIndex]);
  const [translateX, setTranslateX] = useState(0);
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);
  const selectedImageIndex = useMemo(() => images.indexOf(selectedImage), [selectedImage]);
  const zoomStep = useMemo(() => ZOOM_STEP, [ZOOM_STEP]);

  useEffect(() => {
    setSelectedImage(images[selectedIndex]);
    return () => {
      setZoom(DEFAULT_ZOOM);
    };
  }, [selectedIndex]);

  const nextPrevImage = (move: number = 1 | -1) => {
    const selectedIndex = images.indexOf(selectedImage);
    const prevIndex = selectedIndex - 1;
    const nextIndex = selectedIndex + 1;
    const moveToIndex = move === -1 ? (prevIndex >= 0 ? prevIndex : images.length - 1) : nextIndex < images.length ? nextIndex : 0;
    setSelectedImage(images[moveToIndex]);
    setZoom(DEFAULT_ZOOM);
  };

  const setZoomValue = (move: number = 1 | -1) => {
    if (move === 1) {
      setZoom(zoom + zoomStep > MAX_ZOOM ? MAX_ZOOM : zoom + zoomStep);
    } else {
      setZoom(zoom - zoomStep < MIN_ZOOM ? MIN_ZOOM : zoom - zoomStep);
    }
  };

  return {
    selectedImage,
    setSelectedImage,
    nextPrevImage,
    translateX,
    setTranslateX,
    selectedImageIndex,
    zoom,
    setZoomValue,
    setZoom
  };
};

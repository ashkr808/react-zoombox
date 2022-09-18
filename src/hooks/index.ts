import { useEffect, useMemo, useState } from 'react';
import { DEFAULT_ZOOM, MAX_ZOOM, MIN_ZOOM, ZOOM_STEP } from '../constants';
import { Image, Images } from '../types';

export const useImages = (
  selectedIndex: number,
  images?: Images,
  setActive?: React.Dispatch<React.SetStateAction<boolean>>,
  containerRef?: React.MutableRefObject<HTMLElement | null>
) => {
  const [zoomboxImages, setZoomboxImages] = useState<Images>(images || []);
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);
  const [selectedImage, setSelectedImage] = useState<Image | null>(images ? images[selectedIndex] : null);
  useEffect(() => {
    if (containerRef?.current) {
      const scannedImages = containerRef.current.querySelectorAll('[data-zoombox]');
      const imagesFromImgTag: Images = [];
      scannedImages.forEach((img: HTMLImageElement) => {
        const image: Image = {
          src: img?.src,
          caption: img.getAttribute('data-caption') || ''
        };
        imagesFromImgTag.push(image);
        img.onclick = () => {
          setSelectedImage(image);
          setZoom(DEFAULT_ZOOM);
          setActive && setActive(true);
        };
      });
      setZoomboxImages(imagesFromImgTag);
    }
  }, [containerRef?.current]);
  return {
    zoomboxImages,
    setZoomboxImages,
    selectedImage,
    setSelectedImage,
    selectedIndex,
    setZoom,
    zoom
  };
};

export const useKeyboardAndMouse = (
  zoomboxElement: React.MutableRefObject<null> | any,
  enableKeyboardNavigation: boolean,
  isActive: boolean,
  nextPrevImage: (move: 1 | -1) => void,
  setZoomValue: (move?: number) => void,
  zoom: number,
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
    let xPercentage = '';
    let yPercentage = '';
    if (enableZoom === 2) {
      const { innerHeight, innerWidth } = window;
      xPercentage = ((clientX / innerWidth) * 100).toFixed(2);
      yPercentage = ((clientY / innerHeight) * 100).toFixed(2);
    }
    if (deltaY) {
      if (deltaY > 0) {
        setXPercentage(zoom > DEFAULT_ZOOM ? xPercentage : '50');
        setYPercentage(zoom > DEFAULT_ZOOM ? yPercentage : '50');
        setZoomValue(-1);
      } else {
        setXPercentage(xPercentage);
        setYPercentage(yPercentage);
        setZoomValue(1);
      }
    }
  };
  useEffect(() => {
    if (enableKeyboardNavigation) {
      window.addEventListener('keydown', handleKeyPress, { passive: true });
      if (zoomboxElement.current) {
        enableZoom && zoomboxElement.current.addEventListener('wheel', handleScroll, { passive: true });
      }
    }
    return () => {
      if (enableKeyboardNavigation) {
        window.removeEventListener('keydown', handleKeyPress);
        if (zoomboxElement.current) {
          enableZoom && zoomboxElement.current.removeEventListener('wheel', handleScroll, { passive: true });
        }
      }
    };
  });
  return {
    xPercentage,
    yPercentage
  };
};

export const uselockBodyScroll = (active: boolean, lockBodyScroll?: boolean) => {
  const [bodyOverflow, setbodyOverflow] = useState<string>('');
  useEffect(() => {
    if (lockBodyScroll && active) {
      const body = document.body;
      const style = getComputedStyle(body);
      setbodyOverflow(style.overflow);
      body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = bodyOverflow;
    };
  }, [lockBodyScroll, active]);
};

export const useNavigation = (
  images: Images,
  selectedImage: Image | null,
  setSelectedImage: React.Dispatch<React.SetStateAction<Image>>,
  selectedIndex: number,
  zoom: number,
  setZoom: React.Dispatch<React.SetStateAction<number>>
) => {
  const [translateX, setTranslateX] = useState(0);
  const selectedImageIndex = useMemo(() => (selectedImage ? images.indexOf(selectedImage) : 0), [selectedImage]);
  const zoomStep = useMemo(() => ZOOM_STEP, [ZOOM_STEP]);

  useEffect(() => {
    setSelectedImage(images[selectedIndex]);
    return () => {
      setZoom(DEFAULT_ZOOM);
    };
  }, [selectedIndex]);

  const nextPrevImage = (move: number = 1 | -1) => {
    const selectedIndex = selectedImage ? images.indexOf(selectedImage) : 0;
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

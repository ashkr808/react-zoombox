import React, { useRef } from 'react';
import { ZoomboxCaption } from './components/ZoomboxCaption';
import { ZoomboxControls } from './components/ZoomboxControls';
import ZoomBoxFooter from './components/ZoomBoxFooter';
import ZoomboxHeader from './components/ZoomboxHeader';
import { ZoomboxImage } from './components/ZoomboxImage';
import { ZoomboxMask } from './components/ZoomboxMask';
import { useKeyboard, useNavigation } from './hooks';
import './scss/zoombox.scss';
import { Images } from './types';

type ZoomboxProps = {
  images: Images;
  active: boolean;
  setActive?: React.Dispatch<React.SetStateAction<boolean>>;
  selectedImage?: number;
  zIndex?: number;
  enableKeyboadNavigation?: boolean;
  maskClosable?: boolean;
};

const Zoombox = (props: ZoomboxProps) => {
  const { images, active, setActive, selectedImage: selectedIndex = 0, zIndex = 10000, enableKeyboadNavigation = false, maskClosable = true } = props;
  const { selectedImage, setSelectedImage, nextPrevImage, setTranslateX, translateX, selectedImageIndex, zoom, setZoomValue, setZoom } = useNavigation(
    images,
    selectedIndex
  );
  const zoomboxElement = useRef(null);
  useKeyboard(zoomboxElement, enableKeyboadNavigation, active, nextPrevImage, setZoomValue);

  const handleClose = () => {
    setActive && setActive(false);
  };

  return active ? (
    <div ref={zoomboxElement} className="zoombox" style={{ zIndex: zIndex }}>
      <ZoomboxMask onClick={() => maskClosable && handleClose()} />
      <ZoomboxHeader />
      <ZoomboxImage src={selectedImage.src} alt={selectedImage.caption} zoom={zoom} />
      <ZoomboxCaption text={selectedImage.caption} />
      <ZoomBoxFooter {...{ setZoom, images, setSelectedImage, selectedImage, selectedIndex, translateX, setTranslateX, selectedImageIndex }} />
      <ZoomboxControls {...{ nextPrevImage, setZoomValue }} />
      <div className="test"></div>
    </div>
  ) : null;
};

export default Zoombox;

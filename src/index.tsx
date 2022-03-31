import React from 'react';
import { ZoomboxCaption } from './components/ZoomboxCaption';
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
  const {
    images,
    active,
    setActive,
    selectedImage: selectedIndex = 0,
    zIndex = 10000,
    enableKeyboadNavigation = false,
    maskClosable = true
  } = props;
  const { selectedImage, setSelectedImage, nextPrevImage } = useNavigation(images, selectedIndex);
  useKeyboard(enableKeyboadNavigation, active, nextPrevImage);
  const handleClose = () => {
    setActive && setActive(false);
  };

  return active ? (
    <div className="zoombox" style={{ zIndex: zIndex }}>
      <ZoomboxMask onClick={() => maskClosable && handleClose()} />
      <ZoomboxHeader />
      <ZoomboxImage src={selectedImage.src} alt={selectedImage.caption} />
      <ZoomboxCaption text={selectedImage.caption} />
      <ZoomBoxFooter {...{ images, setSelectedImage, selectedImage, selectedIndex }} />
      <div className="test"></div>
    </div>
  ) : null;
};

export default Zoombox;

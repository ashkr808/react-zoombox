import React, { useEffect, useState } from "react";
import { ZoomboxCaption } from "./components/ZoomboxCaption";
import ZoomBoxFooter from "./components/ZoomBoxFooter";
import ZoomboxHeader from "./components/ZoomboxHeader";
import "./scss/zoombox.scss";
import { Images } from "./types";

type ZoomboxProps = {
  images: Images;
  active: boolean;
  setActive?: React.Dispatch<React.SetStateAction<boolean>>;
  selectedImage?: number;
};

const Zoombox = (props: ZoomboxProps) => {
  const { images, active, setActive, selectedImage: selectedIndex } = props;
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const handleClose = () => {
    setActive && setActive(false);
  };
  useEffect(() => {
    if (selectedIndex) {
      setSelectedImage(selectedIndex);
    }
  }, [selectedIndex]);
  return (
    <div
      className="zoombox"
      style={{ display: `${active ? "block" : "none"}` }}
    >
      <div onClick={handleClose} className="closeOverlay"></div>
      <ZoomboxHeader />
      <div className="imageContainer">
        <img src={images[selectedImage].src} alt="" />
      </div>
      <ZoomboxCaption text={images[selectedImage].caption} />
      <ZoomBoxFooter {...{ images, setSelectedImage, selectedImage }} />
      <div className="test"></div>
    </div>
  );
};

export default Zoombox;

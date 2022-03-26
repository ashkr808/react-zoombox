import React, { useState } from "react";
import ZoomBoxFooter from "./components/ZoomBoxFooter";
import ZoomboxHeader from "./components/ZoomboxHeader";
import "./scss/zoombox.scss";
import { Images } from "./types";

type ZoomboxProps = {
  images: Images;
};

const Zoombox = (props: ZoomboxProps) => {
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const { images } = props;
  return (
    <div className="zoombox">
      <ZoomboxHeader />
      <div className="imageContainer">
        <img src={images[selectedImage].url} alt="" />
      </div>
      <ZoomBoxFooter {...{ images, setSelectedImage, selectedImage }} />
    </div>
  );
};

export default Zoombox;

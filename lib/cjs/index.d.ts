import React from "react";
import "./scss/zoombox.scss";
import { Images } from "./types";
declare type ZoomboxProps = {
    images: Images;
    active: boolean;
    setActive?: React.Dispatch<React.SetStateAction<boolean>>;
    selectedImage?: number;
};
declare const Zoombox: (props: ZoomboxProps) => JSX.Element;
export default Zoombox;

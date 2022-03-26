/// <reference types="react" />
import "./scss/zoombox.scss";
import { Images } from "./types";
declare type ZoomboxProps = {
    images: Images;
};
declare const Zoombox: (props: ZoomboxProps) => JSX.Element;
export default Zoombox;

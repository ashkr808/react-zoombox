import { Dispatch, SetStateAction } from "react";
import { Images } from "../types";
declare type ZoomboxFooterProps = {
    images: Images;
    setSelectedImage: Dispatch<SetStateAction<number>>;
    selectedImage: number;
};
declare const ZoomBoxFooter: (props: ZoomboxFooterProps) => JSX.Element;
export default ZoomBoxFooter;

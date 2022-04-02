import { Dispatch, SetStateAction } from 'react';
import { Image, Images } from '../types';
declare type ZoomboxFooterProps = {
    images: Images;
    setSelectedImage: Dispatch<SetStateAction<Image>>;
    selectedImage: Image;
    translateX: number;
    setTranslateX: Dispatch<SetStateAction<number>>;
    selectedImageIndex: number;
};
declare const ZoomBoxFooter: (props: ZoomboxFooterProps) => JSX.Element;
export default ZoomBoxFooter;

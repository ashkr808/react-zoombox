/// <reference types="react" />
import { Image, Images } from '../types';
export declare const useKeyboardAndMouse: (zoomboxElement: React.MutableRefObject<null> | any, enableKeyboardNavigation: boolean, isActive: boolean, nextPrevImage: (move: 1 | -1) => void, setZoomValue: (move?: number | undefined) => void) => {
    xPercentage: string;
    yPercentage: string;
};
export declare const useNavigation: (images: Images, selectedIndex: number) => {
    selectedImage: Image;
    setSelectedImage: import("react").Dispatch<import("react").SetStateAction<Image>>;
    nextPrevImage: (move?: number) => void;
    translateX: number;
    setTranslateX: import("react").Dispatch<import("react").SetStateAction<number>>;
    selectedImageIndex: number;
    zoom: number;
    setZoomValue: (move?: number) => void;
    setZoom: import("react").Dispatch<import("react").SetStateAction<number>>;
};

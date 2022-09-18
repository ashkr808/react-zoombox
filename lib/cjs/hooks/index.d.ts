/// <reference types="react" />
import { Image, Images } from '../types';
export declare const useImages: (selectedIndex: number, images?: Images | undefined, setActive?: import("react").Dispatch<import("react").SetStateAction<boolean>> | undefined, containerRef?: import("react").MutableRefObject<HTMLElement | null> | undefined) => {
    zoomboxImages: Images;
    setZoomboxImages: import("react").Dispatch<import("react").SetStateAction<Images>>;
    selectedImage: Image | null;
    setSelectedImage: import("react").Dispatch<import("react").SetStateAction<Image | null>>;
    selectedIndex: number;
    setZoom: import("react").Dispatch<import("react").SetStateAction<number>>;
    zoom: number;
};
export declare const useKeyboardAndMouse: (zoomboxElement: React.MutableRefObject<null> | any, enableKeyboardNavigation: boolean, isActive: boolean, nextPrevImage: (move: 1 | -1) => void, setZoomValue: (move?: number | undefined) => void, zoom: number, enableZoom: 0 | 1 | 2) => {
    xPercentage: string;
    yPercentage: string;
};
export declare const uselockBodyScroll: (active: boolean, lockBodyScroll?: boolean | undefined) => void;
export declare const useNavigation: (images: Images, selectedImage: Image | null, setSelectedImage: React.Dispatch<React.SetStateAction<Image>>, selectedIndex: number, zoom: number, setZoom: React.Dispatch<React.SetStateAction<number>>) => {
    selectedImage: Image | null;
    setSelectedImage: import("react").Dispatch<import("react").SetStateAction<Image>>;
    nextPrevImage: (move?: number) => void;
    translateX: number;
    setTranslateX: import("react").Dispatch<import("react").SetStateAction<number>>;
    selectedImageIndex: number;
    zoom: number;
    setZoomValue: (move?: number) => void;
    setZoom: import("react").Dispatch<import("react").SetStateAction<number>>;
};

/// <reference types="react" />
import { Image, Images } from '../types';
export declare const useKeyboard: (enableKeyboardNavigation: boolean, isActive: boolean, nextPrevImage: (move: 1 | -1) => void) => void;
export declare const useNavigation: (images: Images, selectedIndex: number) => {
    selectedImage: Image;
    setSelectedImage: import("react").Dispatch<import("react").SetStateAction<Image>>;
    nextPrevImage: (move?: number) => void;
};

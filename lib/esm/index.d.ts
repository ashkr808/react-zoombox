import React from 'react';
import './scss/zoombox.scss';
import { Images } from './types';
declare type ZoomboxProps = {
    images: Images;
    active: boolean;
    setActive?: React.Dispatch<React.SetStateAction<boolean>>;
    selectedImage?: number;
    zIndex?: number;
    enableKeyboadNavigation?: boolean;
    maskClosable?: boolean;
    enableZoom?: 0 | 1 | 2;
};
declare const Zoombox: (props: ZoomboxProps) => JSX.Element | null;
export default Zoombox;

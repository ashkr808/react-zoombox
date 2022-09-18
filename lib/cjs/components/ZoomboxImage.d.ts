import React from 'react';
declare type ZoomboxImageProps = {
    src: string;
    alt?: string;
    zoom: number;
    xPercentage: string;
    yPercentage: string;
    setZoom: React.Dispatch<React.SetStateAction<number>>;
    enableImageDragBeta?: boolean;
    dbClickToZoom?: boolean;
};
export declare const ZoomboxImage: ({ src, alt, zoom, xPercentage, yPercentage, setZoom, enableImageDragBeta, dbClickToZoom }: ZoomboxImageProps) => JSX.Element;
export {};

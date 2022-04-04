/// <reference types="react" />
declare type ZoomboxImageProps = {
    src: string;
    alt?: string;
    zoom: number;
    xPercentage: string;
    yPercentage: string;
};
export declare const ZoomboxImage: ({ src, alt, zoom, xPercentage, yPercentage }: ZoomboxImageProps) => JSX.Element;
export {};

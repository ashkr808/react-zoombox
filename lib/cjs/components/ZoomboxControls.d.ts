/// <reference types="react" />
declare type ZoomboxControlsProps = {
    nextPrevImage: (move: 1 | -1) => void;
    setZoomValue: (move?: number) => void;
};
export declare const ZoomboxControls: (props: ZoomboxControlsProps) => JSX.Element;
export {};

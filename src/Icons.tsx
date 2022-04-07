import React from 'react';
import { ZoomboxIconsCSS } from './constants';

export const LeftIcon = (
  <>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke={ZoomboxIconsCSS.COLOR}
      strokeWidth={ZoomboxIconsCSS.STROKE_WIDTH}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-chevron-left"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  </>
);

export const RightIcon = (
  <>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke={ZoomboxIconsCSS.COLOR}
      strokeWidth={ZoomboxIconsCSS.STROKE_WIDTH}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-chevron-right"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  </>
);

export const ZoomInIcon = (
  <>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke={ZoomboxIconsCSS.COLOR}
      strokeWidth={ZoomboxIconsCSS.STROKE_WIDTH}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-zoom-in"
    >
      <circle cx={11} cy={11} r={8} />
      <line x1={21} y1={21} x2="16.65" y2="16.65" />
      <line x1={11} y1={8} x2={11} y2={14} />
      <line x1={8} y1={11} x2={14} y2={11} />
    </svg>
  </>
);

export const ZoomOutIcon = (
  <>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke={ZoomboxIconsCSS.COLOR}
      strokeWidth={ZoomboxIconsCSS.STROKE_WIDTH}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-zoom-out"
    >
      <circle cx={11} cy={11} r={8} />
      <line x1={21} y1={21} x2="16.65" y2="16.65" />
      <line x1={8} y1={11} x2={14} y2={11} />
    </svg>
  </>
);

export const CloseIcon = (
  <>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke={ZoomboxIconsCSS.COLOR}
      strokeWidth={ZoomboxIconsCSS.STROKE_WIDTH}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-x"
    >
      <line x1={18} y1={6} x2={6} y2={18} />
      <line x1={6} y1={6} x2={18} y2={18} />
    </svg>
  </>
);

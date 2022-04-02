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

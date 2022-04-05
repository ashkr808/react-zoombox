import React from 'react';
import { ZoomboxIcon } from './Icons/ZoomboxIcon';
import { LeftIcon, RightIcon, ZoomInIcon, ZoomOutIcon } from '../Icons';

type ZoomboxControlsProps = {
  nextPrevImage: (move: 1 | -1) => void;
  setZoomValue: (move?: number) => void;
  enableZoom: 0 | 1 | 2;
};

export const ZoomboxControls = (props: ZoomboxControlsProps) => {
  const { nextPrevImage, setZoomValue, enableZoom } = props;
  return (
    <div>
      <ZoomboxIcon className="ZoomboxLeftIcon" onClick={() => nextPrevImage(-1)} icon={LeftIcon} />
      <ZoomboxIcon className="ZoomboxRightIcon" onClick={() => nextPrevImage(1)} icon={RightIcon} />
      {enableZoom !== 0 && (
        <>
          <ZoomboxIcon className="ZoomboxZoomInIcon" onClick={() => setZoomValue(1)} icon={ZoomInIcon} />
          <ZoomboxIcon className="ZoomboxZoomOutIcon" onClick={() => setZoomValue(-1)} icon={ZoomOutIcon} />
        </>
      )}
    </div>
  );
};

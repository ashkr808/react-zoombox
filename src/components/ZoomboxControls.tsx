import React from 'react';
import { ZoomboxIcon } from './Icons/ZoomboxIcon';
import { LeftIcon, RightIcon, ZoomInIcon, ZoomOutIcon } from '../Icons';

type ZoomboxControlsProps = {
  nextPrevImage: (move: 1 | -1) => void;
  setZoomValue: (move?: number) => void;
};

export const ZoomboxControls = (props: ZoomboxControlsProps) => {
  const { nextPrevImage, setZoomValue } = props;
  return (
    <div>
      <ZoomboxIcon className="ZoomboxLeftIcon" onClick={() => nextPrevImage(-1)} icon={LeftIcon} />
      <ZoomboxIcon className="ZoomboxRightIcon" onClick={() => nextPrevImage(1)} icon={RightIcon} />
      <ZoomboxIcon className="ZoomboxZoomInIcon" onClick={() => setZoomValue(1)} icon={ZoomInIcon} />
      <ZoomboxIcon className="ZoomboxZoomOutIcon" onClick={() => setZoomValue(-1)} icon={ZoomOutIcon} />
    </div>
  );
};

import React from 'react';
import { ZoomboxIcon } from './Icons/ZoomboxIcon';
import { LeftIcon, RightIcon } from '../Icons';

type ZoomboxControlsProps = {
  nextPrevImage: (move: 1 | -1) => void;
};

export const ZoomboxControls = (props: ZoomboxControlsProps) => {
  const { nextPrevImage } = props;
  return (
    <div>
      <ZoomboxIcon className="ZoomboxLeftIcon" onClick={() => nextPrevImage(-1)} icon={LeftIcon} />
      <ZoomboxIcon className="ZoomboxRightIcon" onClick={() => nextPrevImage(1)} icon={RightIcon} />
    </div>
  );
};

import React from 'react';
import { ZoomboxIcon } from './Icons/ZoomboxIcon';
import { CloseIcon, LeftIcon, RightIcon, ZoomInIcon, ZoomOutIcon } from '../Icons';

type ZoomboxControlsProps = {
  nextPrevImage: (move: 1 | -1) => void;
  setZoomValue: (move?: number) => void;
  enableZoom: 0 | 1 | 2;
  closable: boolean;
  handleClose: () => void;
};

export const ZoomboxControls = (props: ZoomboxControlsProps) => {
  const { nextPrevImage, setZoomValue, enableZoom, closable, handleClose } = props;
  return (
    <div>
      {closable && <ZoomboxIcon className="ZoomboxCloseIcon" onClick={() => handleClose()} icon={CloseIcon} />}
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

import React from 'react';

type ZoomboxMaskProps = {
  onClick: () => void;
  maskOpacity: number;
};

export const ZoomboxMask = ({ onClick, maskOpacity }: ZoomboxMaskProps) => {
  return <div onClick={() => onClick()} className="closeOverlay" style={{ backgroundColor: `rgba(0,0,0,${maskOpacity})` }}></div>;
};

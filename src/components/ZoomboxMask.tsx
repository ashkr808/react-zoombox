import React from 'react';

type ZoomboxMaskProps = {
  onClick: () => void;
};

export const ZoomboxMask = ({ onClick }: ZoomboxMaskProps) => {
  return <div onClick={() => onClick()} className="closeOverlay"></div>;
};

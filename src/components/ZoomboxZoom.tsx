import React, { useEffect, useState } from 'react';

type ZoomboxZoomionProps = {
  zoom: number;
};

let timeVar: any = null;

export const ZoomboxZoom = (props: ZoomboxZoomionProps) => {
  const [visible, setVisible] = useState(false);
  const { zoom } = props;

  useEffect(() => {
    setVisible(true);
    clearTimeout(timeVar);
    timeVar = setTimeout(() => {
      setVisible(false);
    }, 1000);
    return () => {
      setVisible(false);
      clearTimeout(timeVar);
    };
  }, [zoom]);

  return (
    <div className="ZoomboxZoom" data-visible={visible}>
      {Math.round(zoom * 100)}%
    </div>
  );
};

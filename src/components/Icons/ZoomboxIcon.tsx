import React from 'react';

type ZoomboxIconProps = {
  onClick: () => void;
  icon: React.ReactElement<any, any>;
  className: string;
};

export const ZoomboxIcon = (props: ZoomboxIconProps) => {
  const { onClick, icon, className } = props;
  return (
    <div className={`ZoomboxControls ${className}`} onClick={() => onClick()}>
      {icon}
    </div>
  );
};

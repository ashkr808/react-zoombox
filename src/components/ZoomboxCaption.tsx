import React from "react";

type ZoomboxCaptionProps = {
  text?: string;
};

export const ZoomboxCaption = (props: ZoomboxCaptionProps) => {
  const { text } = props;
  return <div className="caption">{text}</div>;
};

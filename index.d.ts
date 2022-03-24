import React from "react";
import { Images } from "./src/types";

export interface ZoomboxProps {
  images: Images;
}

declare const MyComponent: React.FunctionComponent<ZoomboxProps>;

export default MyComponent;

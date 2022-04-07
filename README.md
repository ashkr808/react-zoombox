# ZoomBox

### An interactive image viewer library for react.

Zoombox is a lightweight library for adding an intreratcive image viewer into your react app.

## Features

- Caption in images.
- Image preview for next and previuos image.
- Control over the behaviour.
- Mobile Responsive

## Get Started

```sh
yarn add zoombox
```

or

```sh
npm i zoombox
```

```javascript
import React, { useState } from "react";
import Zoombox from "zoombox-test";

const App = () => {
  const [active, setActive] = useState(false);
  const images = [
    {
      src: "https://picsum.photos/id/222/1200/800",
      caption: "This is caption one",
    },
    {
      src: "https://picsum.photos/id/230/1200/800",
      caption: "This is caption two",
    },
    {
      src: "https://picsum.photos/id/120/1200/800",
      caption: "This is caption three",
    },
  ];
  return (
    <>
      <button onClick={() => setActive(true)}>
        Click to Open Zoombox, or click on above images
      </button>
      <Zoombox
        {...{
          images,
          active,
          setActive,
        }}
      />
    </>
  );
};
export default App;

```

## API
| Props | Type | Default value | Description |
| --- | ----------- | ----------- |  ----------- |
| `images`* | [{ src: "https://picsum.photos/200", caption?: "This is caption one", }] | []  | Array of images with url of image in 'src'  with optional 'caption' |
| `active`* | boolean | false | To tell Zoombox weather to stay visible or not 
| `setActive`* | React.Dispatch<React.SetStateAction<boolean>> | | To update the external active state
| `zIndex` | number | 10000 | Sets the `z-index` css of ZoomBox's parent container
|`enableKeyboardMouseControls` | boolean | true | Enable / Disable the mouse nad keyboard controls (`right arrow` -> next slide, `left arrow` -> prev slide,  `up arrow` -> zoom in, `down arrow` -> zoom out )
| `maskClosable` | boolean | false | If sets to true, closes the zoombox when clicked on background mask.
|`enableZoom` | `0` or `1` or `2` | 2 | `0` to disable zoom feature, `1` to enable center zoom, `2` for to enable area specific zoom based on cursor position.
|`closable` | boolean | true | enable/disable close icon
|`maskOpacity` | number | 0.8 | sets the opacity of background mask
|`selectedImage`| number | 0 | load the image at given index when zoombox gets opened
 

## License

MIT
images
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
import Zoombox from "zoombox";

function App() {
  const [active, setActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
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
    {
      src: "https://picsum.photos/id/130/1200/800",
      caption: "This is caption four",
    },
    {
      src: "https://picsum.photos/id/131/1200/800",
      caption: "",
    },
  ];
  return (
    <>
      {images.map((image: any, index: number) => (
        <img
          style={{ padding: "20px" }}
          height={200}
          alt={image.caption}
          src={image.src}
          key={index}
          onClick={() => {
            setSelectedImage(index);
            setActive(true);
          }}
        />
      ))}
      <button onClick={() => setActive(true)}>
        Click to Open Zoombox, or click on above images
      </button>
      <Zoombox {...{ images, active, setActive, selectedImage }} />
    </>
  );
}
export default App;
```

## License

MIT

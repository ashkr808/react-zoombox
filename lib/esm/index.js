function ___$insertStyle(css) {
    if (!css || typeof window === 'undefined') {
        return;
    }
    const style = document.createElement('style');
    style.setAttribute('type', 'text/css');
    style.innerHTML = css;
    document.head.appendChild(style);
    return css;
}

import React, { useState } from 'react';

const ZoomBoxFooter = (props) => {
    const [translateX, setTranslateX] = useState(0);
    const { images, selectedImage, setSelectedImage } = props;
    const handleImageClick = (index) => {
        setTranslateX(-80 * index);
        setSelectedImage(index);
    };
    return (React.createElement("div", { className: "footer" },
        React.createElement("div", { className: "previewImagesContainer", style: { transform: `translateX(${translateX}px)` } }, images.map((image, index) => (React.createElement("img", { alt: image.caption, src: image.url, onClick: () => handleImageClick(index), style: { opacity: selectedImage === index ? 1 : 0.5 } }))))));
};

const ZoomboxHeader = () => {
    return React.createElement("div", null);
};

___$insertStyle(".zoombox {\n  font-family: Arial, Helvetica, sans-serif;\n  position: fixed;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  top: 0;\n  background-color: rgba(0, 0, 0, 0.8);\n  overflow: hidden;\n}\n\n.imageContainer {\n  position: absolute;\n  top: 100px;\n  bottom: 100px;\n  left: 0;\n  right: 0;\n}\n.imageContainer img {\n  height: 100%;\n  width: 100%;\n  object-fit: contain;\n}\n\n.footer {\n  position: absolute;\n  bottom: 0;\n  left: calc(50% - 70px);\n  right: 0;\n  top: calc(100% - 70px);\n}\n\n.previewImagesContainer {\n  width: fit-content;\n  transition: 0.5s;\n}\n.previewImagesContainer img {\n  height: 70px;\n  width: 70px;\n  object-fit: cover;\n  margin: 0 5px;\n}\n.previewImagesContainer img:first-child {\n  margin-left: 0;\n}\n.previewImagesContainer img:last-child {\n  margin-right: 0;\n}");

const Zoombox = (props) => {
    const [selectedImage, setSelectedImage] = useState(0);
    const { images } = props;
    return (React.createElement("div", { className: "zoombox" },
        React.createElement(ZoomboxHeader, null),
        React.createElement("div", { className: "imageContainer" },
            React.createElement("img", { src: images[selectedImage].url, alt: "" })),
        React.createElement(ZoomBoxFooter, Object.assign({}, { images, setSelectedImage, selectedImage }))));
};

export { Zoombox as default };
//# sourceMappingURL=index.js.map

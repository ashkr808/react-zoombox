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

import React, { useEffect, useState, useMemo, useRef } from 'react';

const ZoomboxCaption = (props) => {
    const { text } = props;
    return React.createElement("div", { className: "caption" }, text);
};

const ZoomboxIcon = (props) => {
    const { onClick, icon, className } = props;
    return (React.createElement("div", { className: `ZoomboxControls ${className}`, onClick: () => onClick() }, icon));
};

const heightWidthOfPreviewImage = 60;
const ZoomboxIconsCSS = {
    COLOR: '#fff',
    STROKE_WIDTH: 2
};
const MAX_ZOOM = 2;
const MIN_ZOOM = 0.2;
const ZOOM_STEP = 0.1;
const DEFAULT_ZOOM = 1;

const LeftIcon = (React.createElement(React.Fragment, null,
    React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: ZoomboxIconsCSS.COLOR, strokeWidth: ZoomboxIconsCSS.STROKE_WIDTH, strokeLinecap: "round", strokeLinejoin: "round", className: "feather feather-chevron-left" },
        React.createElement("polyline", { points: "15 18 9 12 15 6" }))));
const RightIcon = (React.createElement(React.Fragment, null,
    React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: ZoomboxIconsCSS.COLOR, strokeWidth: ZoomboxIconsCSS.STROKE_WIDTH, strokeLinecap: "round", strokeLinejoin: "round", className: "feather feather-chevron-right" },
        React.createElement("polyline", { points: "9 18 15 12 9 6" }))));
const ZoomInIcon = (React.createElement(React.Fragment, null,
    React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: ZoomboxIconsCSS.COLOR, strokeWidth: ZoomboxIconsCSS.STROKE_WIDTH, strokeLinecap: "round", strokeLinejoin: "round", className: "feather feather-zoom-in" },
        React.createElement("circle", { cx: 11, cy: 11, r: 8 }),
        React.createElement("line", { x1: 21, y1: 21, x2: "16.65", y2: "16.65" }),
        React.createElement("line", { x1: 11, y1: 8, x2: 11, y2: 14 }),
        React.createElement("line", { x1: 8, y1: 11, x2: 14, y2: 11 }))));
const ZoomOutIcon = (React.createElement(React.Fragment, null,
    React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: ZoomboxIconsCSS.COLOR, strokeWidth: ZoomboxIconsCSS.STROKE_WIDTH, strokeLinecap: "round", strokeLinejoin: "round", className: "feather feather-zoom-out" },
        React.createElement("circle", { cx: 11, cy: 11, r: 8 }),
        React.createElement("line", { x1: 21, y1: 21, x2: "16.65", y2: "16.65" }),
        React.createElement("line", { x1: 8, y1: 11, x2: 14, y2: 11 }))));

const ZoomboxControls = (props) => {
    const { nextPrevImage, setZoomValue } = props;
    return (React.createElement("div", null,
        React.createElement(ZoomboxIcon, { className: "ZoomboxLeftIcon", onClick: () => nextPrevImage(-1), icon: LeftIcon }),
        React.createElement(ZoomboxIcon, { className: "ZoomboxRightIcon", onClick: () => nextPrevImage(1), icon: RightIcon }),
        React.createElement(ZoomboxIcon, { className: "ZoomboxZoomInIcon", onClick: () => setZoomValue(1), icon: ZoomInIcon }),
        React.createElement(ZoomboxIcon, { className: "ZoomboxZoomOutIcon", onClick: () => setZoomValue(-1), icon: ZoomOutIcon })));
};

const ZoomBoxFooter = (props) => {
    const { images, selectedImage, setSelectedImage, translateX, setTranslateX, selectedImageIndex, setZoom } = props;
    const handleImageClick = (image) => {
        setSelectedImage(image);
        setZoom(DEFAULT_ZOOM);
    };
    useEffect(() => {
        if (selectedImageIndex >= 0) {
            setTranslateX(-(heightWidthOfPreviewImage + 10) * selectedImageIndex);
        }
    }, [selectedImage, selectedImageIndex]);
    return (React.createElement("div", { className: "zoomboxFooter", style: {
            top: `calc(100% - ${heightWidthOfPreviewImage}px)`,
            left: `calc(50% - ${heightWidthOfPreviewImage / 2}px)`,
            transform: `translateX(${translateX}px)`
        } }, images.map((image, index) => (React.createElement("img", { style: {
            height: `${heightWidthOfPreviewImage}px`,
            width: `${heightWidthOfPreviewImage}px`
        }, key: index, alt: image.caption, src: image.src, onClick: () => handleImageClick(image), className: selectedImageIndex === index ? 'activeImage' : '' })))));
};

const ZoomboxHeader = () => {
    return React.createElement("div", null);
};

const ZoomboxImage = ({ src, alt, zoom, xPercentage, yPercentage }) => {
    return (React.createElement("div", { style: { transform: `scale(${zoom})`, transformOrigin: `${xPercentage}% ${yPercentage}%` }, className: "imageContainer" },
        React.createElement("img", { src: src, alt: alt })));
};

const ZoomboxMask = ({ onClick }) => {
    return React.createElement("div", { onClick: () => onClick(), className: "closeOverlay" });
};

let timeVar = null;
const ZoomboxZoom = (props) => {
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
    return (React.createElement("div", { className: "ZoomboxZoom", "data-visible": visible },
        Math.round(zoom * 100),
        "%"));
};

const useKeyboardAndMouse = (zoomboxElement, enableKeyboardNavigation, isActive, nextPrevImage, setZoomValue) => {
    const [xPercentage, setXPercentage] = useState('0');
    const [yPercentage, setYPercentage] = useState('0');
    const handleKeyPress = (e) => {
        if (isActive) {
            switch (e.keyCode) {
                case 37:
                    nextPrevImage(-1);
                    break;
                case 39:
                    nextPrevImage(1);
                    break;
                case 38:
                    setZoomValue(1);
                    break;
                case 40:
                    setZoomValue(-1);
                    break;
            }
        }
    };
    const handleScroll = (e) => {
        const { deltaY, clientX, clientY } = e;
        const { innerHeight, innerWidth } = window;
        const xPercentage = ((clientX / innerWidth) * 100).toFixed(2);
        const yPercentage = ((clientY / innerHeight) * 100).toFixed(2);
        setXPercentage(xPercentage);
        setYPercentage(yPercentage);
        if (deltaY) {
            setZoomValue(deltaY > 0 ? -1 : 1);
        }
        else {
            throw 'deltaY is not supported for wheelevent';
        }
    };
    useEffect(() => {
        if (enableKeyboardNavigation) {
            window.addEventListener('keydown', handleKeyPress);
            if (zoomboxElement.current) {
                zoomboxElement.current.addEventListener('wheel', handleScroll);
            }
        }
        return () => {
            if (enableKeyboardNavigation) {
                window.removeEventListener('keydown', handleKeyPress);
                if (zoomboxElement.current) {
                    zoomboxElement.current.removeEventListener('wheel', handleScroll);
                }
            }
        };
    });
    return {
        xPercentage,
        yPercentage
    };
};
const useNavigation = (images, selectedIndex) => {
    const [selectedImage, setSelectedImage] = useState(images[selectedIndex]);
    const [translateX, setTranslateX] = useState(0);
    const [zoom, setZoom] = useState(DEFAULT_ZOOM);
    const selectedImageIndex = useMemo(() => images.indexOf(selectedImage), [selectedImage]);
    const zoomStep = useMemo(() => ZOOM_STEP, [ZOOM_STEP]);
    useEffect(() => {
        setSelectedImage(images[selectedIndex]);
    }, [selectedIndex]);
    const nextPrevImage = (move = 1 | -1) => {
        const selectedIndex = images.indexOf(selectedImage);
        const prevIndex = selectedIndex - 1;
        const nextIndex = selectedIndex + 1;
        const moveToIndex = move === -1 ? (prevIndex >= 0 ? prevIndex : images.length - 1) : nextIndex < images.length ? nextIndex : 0;
        setSelectedImage(images[moveToIndex]);
        setZoom(DEFAULT_ZOOM);
    };
    const setZoomValue = (move = 1 | -1) => {
        if (move === 1) {
            setZoom(zoom + zoomStep > MAX_ZOOM ? MAX_ZOOM : zoom + zoomStep);
        }
        else {
            setZoom(zoom - zoomStep < MIN_ZOOM ? MIN_ZOOM : zoom - zoomStep);
        }
    };
    return {
        selectedImage,
        setSelectedImage,
        nextPrevImage,
        translateX,
        setTranslateX,
        selectedImageIndex,
        zoom,
        setZoomValue,
        setZoom
    };
};

___$insertStyle(".zoombox {\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif;\n  position: fixed;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  top: 0;\n  overflow: hidden;\n}\n\n.closeOverlay {\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  top: 0;\n  background-color: rgba(0, 0, 0, 0.8);\n  z-index: 0;\n}\n\n.imageContainer {\n  user-select: none;\n  position: absolute;\n  top: 100px;\n  bottom: 100px;\n  margin: auto;\n  width: fit-content;\n  left: 0;\n  right: 0;\n  transition: 0.3s;\n}\n.imageContainer img {\n  height: 100%;\n  width: 100%;\n  object-fit: contain;\n}\n\n.zoomboxFooter {\n  user-select: none;\n  position: absolute;\n  bottom: 0;\n  right: 0;\n  transition: 0.4s;\n  width: fit-content;\n}\n.zoomboxFooter img {\n  object-fit: cover;\n  margin: 0 5px;\n  opacity: 0.4;\n  transform: scale(0.9);\n  transition: 0.3s;\n}\n.zoomboxFooter img:first-child {\n  margin-left: 0;\n}\n.zoomboxFooter img:last-child {\n  margin-right: 0;\n}\n.zoomboxFooter .activeImage {\n  opacity: 1;\n  transform: scale(1);\n}\n\n.caption {\n  position: absolute;\n  bottom: 120px;\n  left: 50%;\n  transform: translate(-50%);\n  color: #fff;\n  font-size: 20px;\n  width: fit-content;\n  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);\n}\n\n.ZoomboxControls {\n  user-select: none;\n  position: absolute;\n  height: 30px;\n  width: 30px;\n  padding: 10px;\n  cursor: pointer;\n}\n.ZoomboxControls svg {\n  height: 100%;\n  width: 100%;\n  object-fit: contain;\n}\n\n.ZoomboxLeftIcon {\n  left: 5%;\n  bottom: 5px;\n}\n\n.ZoomboxRightIcon {\n  right: 5%;\n  bottom: 5px;\n}\n\n.ZoomboxZoomInIcon {\n  right: 5%;\n  bottom: 160px;\n}\n\n.ZoomboxZoomOutIcon {\n  right: 5%;\n  bottom: 100px;\n}\n\n.ZoomboxZoom {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  background-color: rgba(0, 0, 0, 0.5);\n  color: #fff;\n  padding: 5px 10px;\n  font-size: 14px;\n  width: fit-content;\n  border-radius: 10px;\n  pointer-events: none;\n  opacity: 0;\n  transition: 0.4s;\n  user-select: none;\n}\n\n.ZoomboxZoom[data-visible=true] {\n  opacity: 1;\n}\n\n.test {\n  position: absolute;\n  left: 50%;\n  top: 0;\n  bottom: 0;\n  width: 60px;\n  transform: translateX(-50%);\n  background-color: red;\n  opacity: 0;\n  pointer-events: none;\n}");

const Zoombox = (props) => {
    const { images, active, setActive, selectedImage: selectedIndex = 0, zIndex = 10000, enableKeyboadNavigation = false, maskClosable = true } = props;
    const { selectedImage, setSelectedImage, nextPrevImage, setTranslateX, translateX, selectedImageIndex, zoom, setZoomValue, setZoom } = useNavigation(images, selectedIndex);
    const zoomboxElement = useRef(null);
    const { xPercentage, yPercentage } = useKeyboardAndMouse(zoomboxElement, enableKeyboadNavigation, active, nextPrevImage, setZoomValue);
    const handleClose = () => {
        setActive && setActive(false);
    };
    return active ? (React.createElement("div", { ref: zoomboxElement, className: "zoombox", style: { zIndex: zIndex } },
        React.createElement(ZoomboxMask, { onClick: () => maskClosable && handleClose() }),
        React.createElement(ZoomboxHeader, null),
        React.createElement(ZoomboxImage, Object.assign({ src: selectedImage.src, alt: selectedImage.caption, zoom: zoom }, { xPercentage, yPercentage })),
        React.createElement(ZoomboxCaption, { text: selectedImage.caption }),
        React.createElement(ZoomBoxFooter, Object.assign({}, { setZoom, images, setSelectedImage, selectedImage, selectedIndex, translateX, setTranslateX, selectedImageIndex })),
        React.createElement(ZoomboxControls, Object.assign({}, { nextPrevImage, setZoomValue })),
        React.createElement(ZoomboxZoom, { zoom: zoom }))) : null;
};

export { Zoombox as default };
//# sourceMappingURL=index.js.map

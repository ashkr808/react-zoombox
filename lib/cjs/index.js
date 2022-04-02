

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

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const ZoomboxCaption = (props) => {
    const { text } = props;
    return React__default["default"].createElement("div", { className: "caption" }, text);
};

const ZoomboxIcon = (props) => {
    const { onClick, icon, className } = props;
    return (React__default["default"].createElement("div", { className: `ZoomboxControls ${className}`, onClick: () => onClick() }, icon));
};

const heightWidthOfPreviewImage = 60;
const ZoomboxIconsCSS = {
    COLOR: '#fff',
    STROKE_WIDTH: 3
};

const LeftIcon = (React__default["default"].createElement(React__default["default"].Fragment, null,
    React__default["default"].createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: ZoomboxIconsCSS.COLOR, strokeWidth: ZoomboxIconsCSS.STROKE_WIDTH, strokeLinecap: "round", strokeLinejoin: "round", className: "feather feather-chevron-left" },
        React__default["default"].createElement("polyline", { points: "15 18 9 12 15 6" }))));
const RightIcon = (React__default["default"].createElement(React__default["default"].Fragment, null,
    React__default["default"].createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: ZoomboxIconsCSS.COLOR, strokeWidth: ZoomboxIconsCSS.STROKE_WIDTH, strokeLinecap: "round", strokeLinejoin: "round", className: "feather feather-chevron-right" },
        React__default["default"].createElement("polyline", { points: "9 18 15 12 9 6" }))));

const ZoomboxControls = (props) => {
    const { nextPrevImage } = props;
    return (React__default["default"].createElement("div", null,
        React__default["default"].createElement(ZoomboxIcon, { className: "ZoomboxLeftIcon", onClick: () => nextPrevImage(-1), icon: LeftIcon }),
        React__default["default"].createElement(ZoomboxIcon, { className: "ZoomboxRightIcon", onClick: () => nextPrevImage(1), icon: RightIcon })));
};

const ZoomBoxFooter = (props) => {
    const { images, selectedImage, setSelectedImage, translateX, setTranslateX, selectedImageIndex } = props;
    const handleImageClick = (image) => {
        setSelectedImage(image);
    };
    React.useEffect(() => {
        if (selectedImageIndex >= 0) {
            setTranslateX(-(heightWidthOfPreviewImage + 10) * selectedImageIndex);
        }
    }, [selectedImage, selectedImageIndex]);
    return (React__default["default"].createElement("div", { className: "zoomboxFooter", style: {
            top: `calc(100% - ${heightWidthOfPreviewImage}px)`,
            left: `calc(50% - ${heightWidthOfPreviewImage / 2}px)`,
            transform: `translateX(${translateX}px)`
        } }, images.map((image, index) => (React__default["default"].createElement("img", { style: {
            height: `${heightWidthOfPreviewImage}px`,
            width: `${heightWidthOfPreviewImage}px`
        }, key: index, alt: image.caption, src: image.src, onClick: () => handleImageClick(image), className: selectedImageIndex === index ? 'activeImage' : '' })))));
};

const ZoomboxHeader = () => {
    return React__default["default"].createElement("div", null);
};

const ZoomboxImage = ({ src, alt }) => {
    return (React__default["default"].createElement("div", { className: "imageContainer" },
        React__default["default"].createElement("img", { src: src, alt: alt })));
};

const ZoomboxMask = ({ onClick }) => {
    return React__default["default"].createElement("div", { onClick: () => onClick(), className: "closeOverlay" });
};

const useKeyboard = (enableKeyboardNavigation, isActive, nextPrevImage) => {
    const handleKeyPress = (e) => {
        if (isActive) {
            switch (e.keyCode) {
                case 37:
                    nextPrevImage(-1);
                    break;
                case 39:
                    nextPrevImage(1);
                    break;
            }
        }
    };
    React.useEffect(() => {
        enableKeyboardNavigation && window.addEventListener('keydown', handleKeyPress);
        return () => {
            enableKeyboardNavigation && window.removeEventListener('keydown', handleKeyPress);
        };
    });
};
const useNavigation = (images, selectedIndex) => {
    const [selectedImage, setSelectedImage] = React.useState(images[selectedIndex]);
    const [translateX, setTranslateX] = React.useState(0);
    const selectedImageIndex = React.useMemo(() => images.indexOf(selectedImage), [selectedImage]);
    React.useEffect(() => {
        setSelectedImage(images[selectedIndex]);
    }, [selectedIndex]);
    const nextPrevImage = (move = 1 | -1) => {
        const selectedIndex = images.indexOf(selectedImage);
        const prevIndex = selectedIndex - 1;
        const nextIndex = selectedIndex + 1;
        const moveToIndex = move === -1 ? (prevIndex >= 0 ? prevIndex : images.length - 1) : nextIndex < images.length ? nextIndex : 0;
        setSelectedImage(images[moveToIndex]);
    };
    return {
        selectedImage,
        setSelectedImage,
        nextPrevImage,
        translateX,
        setTranslateX,
        selectedImageIndex
    };
};

___$insertStyle(".zoombox {\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif;\n  position: fixed;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  top: 0;\n  overflow: hidden;\n}\n\n.closeOverlay {\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  top: 0;\n  background-color: rgba(0, 0, 0, 0.8);\n  z-index: 0;\n}\n\n.imageContainer {\n  position: absolute;\n  top: 100px;\n  bottom: 100px;\n  margin: auto;\n  width: fit-content;\n  left: 0;\n  right: 0;\n}\n.imageContainer img {\n  height: 100%;\n  width: 100%;\n  object-fit: contain;\n}\n\n.zoomboxFooter {\n  position: absolute;\n  bottom: 0;\n  right: 0;\n  transition: 0.4s;\n  width: fit-content;\n}\n.zoomboxFooter img {\n  object-fit: cover;\n  margin: 0 5px;\n  opacity: 0.4;\n  transform: scale(0.9);\n  transition: 0.3s;\n}\n.zoomboxFooter img:first-child {\n  margin-left: 0;\n}\n.zoomboxFooter img:last-child {\n  margin-right: 0;\n}\n.zoomboxFooter .activeImage {\n  opacity: 1;\n  transform: scale(1);\n}\n\n.caption {\n  position: absolute;\n  bottom: 120px;\n  left: 50%;\n  transform: translate(-50%);\n  color: #fff;\n  font-size: 20px;\n  width: fit-content;\n  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);\n}\n\n.ZoomboxControls {\n  position: absolute;\n  height: 30px;\n  width: 30px;\n  padding: 10px;\n  cursor: pointer;\n}\n.ZoomboxControls svg {\n  height: 100%;\n  width: 100%;\n  object-fit: contain;\n}\n\n.ZoomboxLeftIcon {\n  left: 5%;\n  bottom: 5px;\n}\n\n.ZoomboxRightIcon {\n  right: 5%;\n  bottom: 5px;\n}\n\n.test {\n  position: absolute;\n  left: 50%;\n  top: 0;\n  bottom: 0;\n  width: 60px;\n  transform: translateX(-50%);\n  background-color: red;\n  opacity: 0;\n  pointer-events: none;\n}");

const Zoombox = (props) => {
    const { images, active, setActive, selectedImage: selectedIndex = 0, zIndex = 10000, enableKeyboadNavigation = false, maskClosable = true } = props;
    const { selectedImage, setSelectedImage, nextPrevImage, setTranslateX, translateX, selectedImageIndex } = useNavigation(images, selectedIndex);
    useKeyboard(enableKeyboadNavigation, active, nextPrevImage);
    const handleClose = () => {
        setActive && setActive(false);
    };
    return active ? (React__default["default"].createElement("div", { className: "zoombox", style: { zIndex: zIndex } },
        React__default["default"].createElement(ZoomboxMask, { onClick: () => maskClosable && handleClose() }),
        React__default["default"].createElement(ZoomboxHeader, null),
        React__default["default"].createElement(ZoomboxImage, { src: selectedImage.src, alt: selectedImage.caption }),
        React__default["default"].createElement(ZoomboxCaption, { text: selectedImage.caption }),
        React__default["default"].createElement(ZoomBoxFooter, Object.assign({}, { images, setSelectedImage, selectedImage, selectedIndex, translateX, setTranslateX, selectedImageIndex })),
        React__default["default"].createElement(ZoomboxControls, Object.assign({}, { nextPrevImage })),
        React__default["default"].createElement("div", { className: "test" }))) : null;
};

exports["default"] = Zoombox;
//# sourceMappingURL=index.js.map

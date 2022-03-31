

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

const heightWidthOfPreviewImage = 60;

const ZoomBoxFooter = (props) => {
    const [translateX, setTranslateX] = React.useState(0);
    const { images, selectedImage, setSelectedImage } = props;
    const selectedImageIndex = React.useMemo(() => images.indexOf(selectedImage), [selectedImage]);
    const handleImageClick = (image) => {
        setSelectedImage(image);
    };
    React.useEffect(() => {
        console.log(selectedImageIndex, selectedImage);
        setTranslateX(-(heightWidthOfPreviewImage + 10) * selectedImageIndex);
        return () => {
            console.log('removed');
        };
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
        nextPrevImage
    };
};

___$insertStyle(".zoombox {\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif;\n  position: fixed;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  top: 0;\n  overflow: hidden;\n}\n\n.closeOverlay {\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  top: 0;\n  background-color: rgba(0, 0, 0, 0.8);\n  z-index: 0;\n}\n\n.imageContainer {\n  position: absolute;\n  top: 100px;\n  bottom: 100px;\n  margin: auto;\n  width: fit-content;\n  left: 0;\n  right: 0;\n}\n.imageContainer img {\n  height: 100%;\n  width: 100%;\n  object-fit: contain;\n}\n\n.zoomboxFooter {\n  position: absolute;\n  bottom: 0;\n  right: 0;\n  transition: 0.4s;\n  width: fit-content;\n}\n.zoomboxFooter img {\n  object-fit: cover;\n  margin: 0 5px;\n  opacity: 0.4;\n  transform: scale(0.9);\n  transition: 0.3s;\n}\n.zoomboxFooter img:first-child {\n  margin-left: 0;\n}\n.zoomboxFooter img:last-child {\n  margin-right: 0;\n}\n.zoomboxFooter .activeImage {\n  opacity: 1;\n  transform: scale(1);\n}\n\n.caption {\n  position: absolute;\n  bottom: 120px;\n  left: 50%;\n  transform: translate(-50%);\n  color: #fff;\n  font-size: 20px;\n  width: fit-content;\n  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);\n}\n\n.test {\n  position: absolute;\n  left: 50%;\n  top: 0;\n  bottom: 0;\n  width: 60px;\n  transform: translateX(-50%);\n  background-color: red;\n  opacity: 0;\n  pointer-events: none;\n}");

const Zoombox = (props) => {
    const { images, active, setActive, selectedImage: selectedIndex = 0, zIndex = 10000, enableKeyboadNavigation = false, maskClosable = true } = props;
    const { selectedImage, setSelectedImage, nextPrevImage } = useNavigation(images, selectedIndex);
    useKeyboard(enableKeyboadNavigation, active, nextPrevImage);
    const handleClose = () => {
        setActive && setActive(false);
    };
    return active ? (React__default["default"].createElement("div", { className: "zoombox", style: { zIndex: zIndex } },
        React__default["default"].createElement(ZoomboxMask, { onClick: () => maskClosable && handleClose() }),
        React__default["default"].createElement(ZoomboxHeader, null),
        React__default["default"].createElement(ZoomboxImage, { src: selectedImage.src, alt: selectedImage.caption }),
        React__default["default"].createElement(ZoomboxCaption, { text: selectedImage.caption }),
        React__default["default"].createElement(ZoomBoxFooter, Object.assign({}, { images, setSelectedImage, selectedImage, selectedIndex })),
        React__default["default"].createElement("div", { className: "test" }))) : null;
};

exports["default"] = Zoombox;
//# sourceMappingURL=index.js.map

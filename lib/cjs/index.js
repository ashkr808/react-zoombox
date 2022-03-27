

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

const ZoomBoxFooter = (props) => {
    const [translateX, setTranslateX] = React.useState(0);
    const { images, selectedImage, setSelectedImage } = props;
    const handleImageClick = (index) => {
        setTranslateX(-80 * index);
        setSelectedImage(index);
    };
    React.useEffect(() => {
        setTranslateX(-80 * selectedImage);
    }, [selectedImage]);
    return (React__default["default"].createElement("div", { className: "footer" },
        React__default["default"].createElement("div", { className: "previewImagesContainer", style: { transform: `translateX(${translateX}px)` } }, images.map((image, index) => (React__default["default"].createElement("img", { key: index, alt: image.caption, src: image.src, onClick: () => handleImageClick(index), className: selectedImage === index ? "activeImage" : "" }))))));
};

const ZoomboxHeader = () => {
    return React__default["default"].createElement("div", null);
};

___$insertStyle(".zoombox {\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif;\n  position: fixed;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  top: 0;\n  overflow: hidden;\n}\n\n.closeOverlay {\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  top: 0;\n  background-color: rgba(0, 0, 0, 0.8);\n  z-index: 0;\n}\n\n.imageContainer {\n  position: absolute;\n  top: 100px;\n  bottom: 100px;\n  margin: auto;\n  width: fit-content;\n  left: 0;\n  right: 0;\n}\n.imageContainer img {\n  height: 100%;\n  width: 100%;\n  object-fit: contain;\n}\n\n.footer {\n  position: absolute;\n  bottom: 0;\n  left: calc(50% - 35px);\n  right: 0;\n  top: calc(100% - 70px);\n}\n\n.previewImagesContainer {\n  width: fit-content;\n  transition: 0.5s;\n}\n.previewImagesContainer img {\n  height: 70px;\n  width: 70px;\n  object-fit: cover;\n  margin: 0 5px;\n  opacity: 0.4;\n  transform: scale(0.9);\n  transition: 0.3s;\n}\n.previewImagesContainer img:first-child {\n  margin-left: 0;\n}\n.previewImagesContainer img:last-child {\n  margin-right: 0;\n}\n.previewImagesContainer .activeImage {\n  opacity: 1;\n  transform: scale(1);\n}\n\n.caption {\n  position: absolute;\n  bottom: 120px;\n  left: 50%;\n  transform: translate(-50%);\n  color: #fff;\n  font-size: 1.3rem;\n  width: fit-content;\n  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);\n}\n\n.test {\n  position: absolute;\n  left: 50%;\n  top: 0;\n  bottom: 0;\n  width: 70px;\n  transform: translateX(-50%);\n  background-color: red;\n  opacity: 0;\n  pointer-events: none;\n}");

const Zoombox = (props) => {
    const { images, active, setActive, selectedImage: selectedIndex } = props;
    const [selectedImage, setSelectedImage] = React.useState(0);
    const handleClose = () => {
        setActive && setActive(false);
    };
    React.useEffect(() => {
        if (selectedIndex) {
            setSelectedImage(selectedIndex);
        }
    }, [selectedIndex]);
    return (React__default["default"].createElement("div", { className: "zoombox", style: { display: `${active ? "block" : "none"}` } },
        React__default["default"].createElement("div", { onClick: handleClose, className: "closeOverlay" }),
        React__default["default"].createElement(ZoomboxHeader, null),
        React__default["default"].createElement("div", { className: "imageContainer" },
            React__default["default"].createElement("img", { src: images[selectedImage].src, alt: "" })),
        React__default["default"].createElement(ZoomboxCaption, { text: images[selectedImage].caption }),
        React__default["default"].createElement(ZoomBoxFooter, Object.assign({}, { images, setSelectedImage, selectedImage })),
        React__default["default"].createElement("div", { className: "test" })));
};

exports["default"] = Zoombox;
//# sourceMappingURL=index.js.map

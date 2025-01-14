import PropTypes from "prop-types";
ImageWrapper.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  widthSvgWrapperImage: PropTypes.number,
  heightSvgWrapperImage: PropTypes.number,
};

function ImageWrapper({
  src,
  alt,
  widthSvgWrapperImage,
  heightSvgWrapperImage,
}) {
  const svgDataUrl = generateSvgDataUrl(
    widthSvgWrapperImage,
    heightSvgWrapperImage
  );

  return (
    <span
      style={{
        boxSizing: "border-box",
        display: "inline-block",
        overflow: "hidden",
        width: "initial",
        height: "initial",
        background: "none",
        opacity: 1,
        border: 0,
        margin: 0,
        padding: 0,
        position: "relative",
        maxWidth: "100%",
      }}
    >
      <span
        style={{
          boxSizing: "border-box",
          display: "block",
          width: "initial",
          height: "initial",
          background: "none",
          opacity: 1,
          border: 0,
          margin: 0,
          padding: 0,
          maxWidth: "100%",
        }}
      >
        <img
          style={{
            display: "block",
            maxWidth: "100%",
            width: "initial",
            height: "initial",
            background: "none",
            opacity: 1,
            border: 0,
            margin: 0,
            padding: 0,
          }}
          alt={alt}
          aria-hidden="true"
          src={svgDataUrl}
        />
      </span>
      <img
        src={src}
        decoding="async"
        data-nimg="intrinsic"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          boxSizing: "border-box",
          padding: 0,
          border: "none",
          margin: "auto",
          display: "block",
          width: 0,
          height: 0,
          minWidth: "100%",
          maxWidth: "100%",
          minHeight: "100%",
          maxHeight: "100%",
        }}
        srcSet={`${src} 1x, ${src} 2x`}
      />
    </span>
  );
}

// Hàm tạo SVG dưới dạng Data URL
function generateSvgDataUrl(width, height) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' version='1.1' width='${width}' height='${height}' />`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export default ImageWrapper;

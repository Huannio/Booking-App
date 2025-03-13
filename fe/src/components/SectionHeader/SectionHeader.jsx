import classNames from "classnames/bind";
import styles from "./SectionHeader.module.scss";
import PropTypes from "prop-types";

const cx = classNames.bind(styles);

function SectionHeader({
  firstTitle,
  secondTitle,
  mainContent,
  column = false,
}) {
  return (
    <div className={cx("SectionHeader", { "SectionHeader-column": column })}>
      <div className={cx("SectionHeader-title")}>
        <h4>
          {firstTitle}
          <br></br>
          {secondTitle}
        </h4>

        {!column && (
          <div>
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
                  alt=""
                  aria-hidden="true"
                  src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2780%27%20height=%278%27/%3e"
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
                />
              </span>
              <img
                src="https://res.cloudinary.com/dhnp8ymxv/image/upload/v1741405844/heading-border_jpgu2f.webp"
                decoding="async"
                data-nimg="intrinsic"
                srcSet="https://res.cloudinary.com/dhnp8ymxv/image/upload/v1741405844/heading-border_jpgu2f.webp 1x,https://res.cloudinary.com/dhnp8ymxv/image/upload/v1741405844/heading-border_jpgu2f.webp 2x"
                style={{
                  position: "absolute",
                  inset: 0,
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
              />
            </span>
          </div>
        )}
      </div>

      <label htmlFor="" className={cx("lg", "SectionHeader-description")}>
        {mainContent}
      </label>

      {column && (
        <div>
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
                alt=""
                aria-hidden="true"
                src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2780%27%20height=%278%27/%3e"
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
              />
            </span>
            <img
              src="https://res.cloudinary.com/dhnp8ymxv/image/upload/v1741405844/heading-border_jpgu2f.webp"
              decoding="async"
              data-nimg="intrinsic"
              srcSet="https://res.cloudinary.com/dhnp8ymxv/image/upload/v1741405844/heading-border_jpgu2f.webp 1x,https://res.cloudinary.com/dhnp8ymxv/image/upload/v1741405844/heading-border_jpgu2f.webp 2x"
              style={{
                position: "absolute",
                inset: 0,
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
            />
          </span>
        </div>
      )}
    </div>
  );
}

SectionHeader.propTypes = {
  column: PropTypes.bool,
  firstTitle: PropTypes.string,
  secondTitle: PropTypes.string,
  mainContent: PropTypes.string,
};

export default SectionHeader;

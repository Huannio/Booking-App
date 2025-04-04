import classNames from "classnames/bind";

import SectionHeader from "~/components/SectionHeader/SectionHeader";
import styles from "../Hotel.module.scss";

const cx = classNames.bind(styles);

function Intro({ id, longDescProducts }) {
  return (
    <div className="" id={id}>
      <SectionHeader title={<h4>Giới thiệu</h4>} />

      <div className={cx("ShipDetail-output")}>
        {longDescProducts?.map((item, index) => {
          if (item?.type_id === 1) {
            return (
              <h5 key={index} style={{ margin: "15px 0px 8px" }}>
                {item.text}
              </h5>
            );
          }

          if (item?.type_id === 2) {
            return (
              <p key={index} style={{ margin: "5px 0px", textAlign: "left" }}>
                {item.text}
              </p>
            );
          }

          if (item?.type_id === 3) {
            return (
              <figure
                key={index}
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "20px 0px",
                  width: "100%",
                  maxWidth: "100%",
                  maxHeight: "400px",
                  overflow: "hidden",
                  border: "none",
                }}
              >
                <img
                  src={item.image_url}
                  alt={item.type?.type || "image"}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "400px",
                    width: "100%",
                  }}
                />

                <figcaption
                  style={{
                    position: "absolute",
                    top: "8px",
                    right: "8px",
                    padding: "5px 10px",
                    fontSize: "12px",
                    backgroundColor: "rgb(45, 51, 58)",
                    color: "white",
                    borderRadius: "2px",
                    cursor: "default",
                  }}
                >
                  {item?.caption}
                </figcaption>
              </figure>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

export default Intro;

import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "../Home.module.scss";
import { useEffect, useState } from "react";

const cx = classNames.bind(styles);

function BlogSection() {
  const [shipBlog, setShipBlog] = useState([]);

  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => setShipBlog(data))
      .catch((error) => console.error("Error fetching blogs:", error));
  }, []);

  return (
    <section className={cx("container", "BlogSection-section")}> 
      <div className={cx("SectionHeader-sectionHeader")}> 
        <div className={cx("SectionHeader-title")}> 
          <h4>Hạ Long: Khám phá Sự đặc sắc <br /> và Cập nhật tin tức mới nhất</h4>
          <div>
            <span style = {{boxSizing: "border-box",display: "inline-block",overflow: "hidden",width: "initial",height: "initial",background: "none",opacity: 1,border: 0,margin: 0,padding: 0,position: "relative",maxWidth: "100%",}} >
              <span style = {{boxSizing: "border-box", display: "block", width: "initial", height: "initial", background: "none", opacity: 1, border: 0, margin: 0, padding: 0, maxWidth: "100%",}} >
                <img alt="" aria-hidden="true" src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2780%27%20height=%278%27/%3e" style={{display: "block", maxWidth: "100%", width: "initial", height: "initial", background: "none", opacity: 1, border: 0, margin: 0, padding: 0,}} />
              </span>  
                <img 
                  srcSet="/src/assets/images/heading-border.webp 1x, /src/assets/images/heading-border.webp 2x"
                  src="/src/assets/images/heading-border.webp"
                  alt="Heading Border"
                  style={{ position: "absolute", inset: 0, boxSizing: "border-box", padding: 0, border: "none", margin: "auto", display: "block", width: 0, height: 0, minWidth: "100%", maxWidth: "100%", minHeight: "100%", maxHeight: "100%",}} />
            </span>
          </div>
        </div>
        <p className={cx("lg", "SectionHeader-description")}>
          Hạ Long: Bí mật và Cuộc sống trong Vịnh - Khám phá và Cập nhật những tin tức hấp dẫn từ điểm đến tuyệt vời này.
        </p>
      </div>

      <div className={cx("BlogSection-cardList")}> 
        {shipBlog.map((blog) => (
          <Link key={blog.slug} to={`/blog-detail/${blog.slug}`} className={cx("BlogCard-blogCard")}> 
            <div className={cx("card")}> 
              <div className={cx("BlogCard-imageWrapper")}> 
                <div className={cx("BlogCard-imageWrapper-image")} style={{ width: "352px", height: "216px", position: "relative", overflow: "hidden" }}> 
                  <img 
                    src={blog.thumbnail} 
                    alt={blog.title} 
                    width="100%" 
                    height="100%" 
                    loading="lazy" 
                    style={{ objectFit: "cover" }} 
                  />
                </div>
              </div>
              <div className={cx("BlogCard-body")}> 
                <p className={cx("subheading", "md", "BlogCard-title")}>{blog.title}</p>
                <p className={cx("BlogCard-description", "sm")}>{blog.short_desc}</p>
              </div>
              <p className={cx("BlogCard-footer", "detail", "sm")}>{blog.created_at}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className={cx("BlogSection-action")}> 
        <Link to="/blog"> 
          <button type="button" className={cx("btn", "btn-normal", "btn-outline")}> 
            <span className={cx("label", "md")}>Xem tất cả</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"> 
              <path d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9" stroke="#1d2939" strokeLinecap="round" strokeLinejoin="round" /> 
            </svg>
          </button>
        </Link>
      </div>
    </section>
  );
}

export default BlogSection;

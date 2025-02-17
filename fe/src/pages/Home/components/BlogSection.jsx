import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "../Home.module.scss"; // Ensure this path is correct

const cx = classNames.bind(styles);

function BlogSection() {
  const [shipBlog, setShipBlog] = useState([]);

  useEffect(() => {
    fetch("/api/blogs") // Call API from the backend
      .then((res) => res.json())
      .then((data) => setShipBlog(data))
      .catch((error) => console.error("Error fetching blogs:", error));
  }, []);

  return (
    <section className={cx("container", "BlogSection-section")}>
      <div className={cx("SectionHeader-sectionHeader")}>
        <div className={cx("SectionHeader-title")}>
          <h4>
            Hạ Long: Khám phá Sự đặc sắc <br /> và Cập nhật tin tức mới nhất
          </h4>
          <div>
            <img src="/views/assest/img/heading-border.webp" alt="heading border" />
          </div>
        </div>
        <p className={cx("lg", "SectionHeader-description")}>
          Hạ Long: Bí mật và Cuộc sống trong Vịnh - Khám phá và Cập nhật những tin tức hấp dẫn từ điểm đến tuyệt vời này.
        </p>
      </div>

      <div className={cx("BlogSection-cardList")}>
        {shipBlog.length > 0 ? (
          shipBlog.map((blog) => (
            <Link key={blog.slug} to={`/blog-detail/${blog.slug}`} className={cx("BlogCard-blogCard")}>
              <div className={cx("card")}>
                <div className={cx("BlogCard-imageWrapper")}>
                  <img src={blog.thumbnail} alt={blog.title} className={cx("BlogCard-image")} />
                </div>
                <div className={cx("BlogCard-body")}>
                  <p className={cx("subheading", "md", "BlogCard-title")}>{blog.title}</p>
                  <p className={cx("BlogCard-description", "sm")}>{blog.short_desc}</p>
                </div>
                <p className={cx("BlogCard-footer", "detail", "sm")}>{blog.created_at}</p>
              </div>
            </Link>
          ))
        ) : (
          <p>Đang tải bài viết...</p>
        )}
      </div>

      <div className={cx("BlogSection-action")}>
        <Link to="/blog">
          <button type="button" className={cx("btn", "btn-normal", "btn-outline")}>
            <span className={cx("label", "md")}>Xem tất cả</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9" stroke="#1d2939" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </button>
        </Link>
      </div>
    </section>
  );
}

export default BlogSection;

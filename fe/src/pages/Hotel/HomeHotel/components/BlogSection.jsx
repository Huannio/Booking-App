import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./BlogSection.module.scss";
import { handleGetBlogPaginationApi } from "~/api";
import SectionHeader from "~/components/SectionHeader/SectionHeader";
import BlogCard from "~/components/Card/BlogCard";
import { formatDate } from "~/utils/formatters.js";
import Button from "~/components/Button/Button";

const cx = classNames.bind(styles);

function BlogSection() {
  const [blogs, setBlogs] = useState([]);
  const getBlog = useCallback(async () => {
    // Có thể thay đổi blogTypeId === 3 để lấy ra những bài viết liên quan đến chủ đề khách sạn, do thiếu api nên sẽ thay sau!
    const response = await handleGetBlogPaginationApi(0, 3, null);
    setBlogs(response?.blogs);
  }, []);

  useEffect(() => {
    getBlog();
  }, [getBlog]);

  return (
    <section className={cx("container", "BlogSection-section")}>
      <SectionHeader
        title={
          <h4>
            Khám phá Sự đặc sắc <br /> và Cập nhật tin tức mới nhất
          </h4>
        }
        mainContent="Những điểm đến hấp dẫn cùng nhiều thông tin cần thiết cho chuyến du lịch tuyệt vời của bạn."
      />

      <div className={cx("BlogSection-cardList")}>
        {blogs?.map((blog) => (
          <Link key={blog?.id} to={`/blog-detail/${blog?.slug}`}>
            <BlogCard
              imgSrc={blog?.thumbnail}
              title={blog?.title}
              description={blog?.short_desc}
              date={formatDate(blog?.createdAt)}
            />
          </Link>
        ))}
      </div>

      <div className={cx("BlogSection-action")}>
        <Link to="/blog">
          <Button normal outline>
            <div className="label md">Xem tất cả</div>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9"
                stroke="#1d2939"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        </Link>
      </div>
    </section>
  );
}

export default BlogSection;

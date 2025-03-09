import classNames from "classnames/bind";
import styles from "./Blog.module.scss";
import SectionHeader from "~/components/SectionHeader/SectionHeader";
import { handleGetBlogTypesApi, handleGetBlogPaginationApi } from "~/api";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import BlogCard from "~/components/Card/BlogCard";
import { LoadingContext } from "~/components/Loading/Loading";
import { Skeleton } from "antd";
import Pagination from "../../../components/Pagination";

const cx = classNames.bind(styles);

const BlogPage = () => {
  const [blogTypes, setBlogTypes] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [blogs, setBlogs] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [records, setRecords] = useState(6);

  const { setGlobalLoading } = useContext(LoadingContext);
  const [loading, setLoading] = useState(false);

  const handleTabChange = useCallback(async (id) => {
    setActiveTab(id);
    // Call Api
    setLoading(true);
    const res = await handleGetBlogPaginationApi(0, 6, id);
    setBlogs(res.blogs);
    setTotalBlogs(res.total);
    setTotalPages(res.totalPages);
    setRecords(res.records);
    setCurrentPage(0); // Reset current page
    setLoading(false);
  }, []);

  const handleGetBlogTypes = async () => {
    const res = await handleGetBlogTypesApi();
    setBlogTypes(res);
  };

  const handleGetAllBlog = useCallback(
    async (page, limit, blogTypeId) => {
      setGlobalLoading(true);
      const res = await handleGetBlogPaginationApi(page, limit, blogTypeId);
      setBlogs(res.blogs);
      setTotalBlogs(res.total);
      setTotalPages(res.totalPages);
      setRecords(res.records);
      setGlobalLoading(false);
    },
    [setGlobalLoading]
  );

  useEffect(() => {
    handleGetBlogTypes();
    handleGetAllBlog();
  }, [handleGetAllBlog]);

  const handlePageClick = (e) => {
    setCurrentPage(e.selected);
    handleGetAllBlog(e.selected, 6, activeTab);
    blogListRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const blogListRef = useRef(null);

  return (
    <div
      className={cx(
        "BlogPage-blog-page",
        "container",
        "flex",
        "flex-col",
        "gap-80"
      )}
    >
      <div
        className={cx("BlogPage-blog-header", "flex justify-between gap-16")}
      >
        <SectionHeader
          firstTitle={"Hạ Long: Khám phá Sự đặc sắc"}
          secondTitle={"và Cập nhật tin tức mới nhất"}
          mainContent={
            "Hạ Long: Bí mật và Cuộc sống trong Vịnh - Khám phá và Cập nhật những tin tức hấp dẫn từ điểm đến tuyệt vời này."
          }
          column
        />
      </div>

      <div ref={blogListRef} className={cx("Tabs")}>
        <div className={cx("Tabs-header")}>
          {[{ id: 0, type: "Tất cả" }, ...blogTypes].map((blogType) => (
            <div key={blogType.id}>
              <button
                type="button"
                className={cx("Tabs-tabItem", "Tabs-sm", {
                  "Tabs-active": blogType.id === activeTab,
                })}
                onClick={() => handleTabChange(blogType.id)}
              >
                <label style={{ fontWeight: 400, fontSize: "14px" }}>
                  {blogType.type}
                </label>
              </button>
            </div>
          ))}
        </div>
      </div>

      {loading ? (
        <Skeleton active paragraph loading />
      ) : (
        <div className={cx("BlogPage-blog-list")}>
          {blogs.map((blog) => (
            <Link to={`/blog-detail/${blog.slug}`} key={blog.id}>
              <BlogCard
                imgSrc={blog.thumbnail}
                title={blog.title}
                description={blog.short_desc}
                date={new Date(blog.createdAt).toLocaleDateString("vi-VN")}
              />
            </Link>
          ))}
        </div>
      )}

      <Pagination
        handlePageClick={handlePageClick}
        totalPages={totalPages}
        currentPage={currentPage}
        totalRecords={totalBlogs}
        displayNumberRecords={
          <input
            type="number"
            max={20}
            min={1}
            value={records}
            onChange={(e) => {
              setRecords(e.target.value);
              handleGetAllBlog(0, e.target.value, activeTab);
            }}
          />
        }
      />
    </div>
  );
};

export default BlogPage;

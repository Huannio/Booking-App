import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Blog.module.scss";

const cx = classNames.bind(styles);

const BlogPage = () => {
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [count, setCount] = useState(1);
    const data = { countAll: totalRecords };
    const handleClick = (slug) => {
        const selected = blogs.find(blog => blog.slug === slug);
        setSelectedBlog(selected);
    };

    return (
        <div className={cx("blog-page", "container","flex", "flex-col", "gap-80")}> 
            <div className={cx("blog-header", "flex", "justify-between", "gap-16")}> 
                <div className={cx("SectionHeader-sectionHeader", "SectionHeader-column")}> 
                    <div className={cx("SectionHeader-title")}>
                        <h4>Hạ Long: Khám phá Sự đặc sắc <br /> và Cập nhật tin tức mới nhất</h4>
                    </div>
                    <p className={cx("description")}>
                        Hạ Long: Bí mật và Cuộc sống trong Vịnh - Khám phá và cập nhật những tin tức hấp dẫn từ điểm đến tuyệt vời này.
                    </p>
                    <div>
                    <span style={{ boxSizing: "border-box", display: "inline-block", overflow: "hidden", width: "initial", height: "initial", background: "none", opacity: 1, border: 0, margin: 0, padding: 0, position: "relative", maxWidth: "100%" }}>
                        <span style={{ boxSizing: "border-box", display: "block", width: "initial", height: "initial", background: "none", opacity: 1, border: 0, margin: 0, padding: 0, maxWidth: "100%" }}>
                            <img alt="" aria-hidden="true" src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2780%27%20height=%278%27/%3e" style={{ display: "block", maxWidth: "100%", width: "initial", height: "initial", background: "none", opacity: 1, border: 0, margin: 0, padding: 0 }} />
                        </span>
                            <img src="https://mixivivu.com/_next/image?url=%2Fheading-border.png&w=96&q=75" decoding="async" data-nimg="intrinsic" srcSet="https://mixivivu.com/_next/image?url=%2Fheading-border.png&w=96&q=75 1x, https://mixivivu.com/_next/image?url=%2Fheading-border.png&amp;w=256&amp;q=75 2x" style={{ position: "absolute", inset: 0, boxSizing: "border-box", padding: 0, border: "none", margin: "auto", display: "block", width: 0, height: 0, minWidth: "100%", maxWidth: "100%", minHeight: "100%", maxHeight: "100%" }} />
                    </span>
                </div>
            </div>
        </div>  

            {selectedBlog ? (
                <BlogDetail blog={selectedBlog} longDescBlog={selectedBlog.longDescBlog || []} />
            ) : (
                <>
                    <div className={cx("blog-list")}>
                        {blogs.map((blog, index) => (
                            <div
                            key={blog.slug}
                            className={cx("Card-card", "blog-Card")}
                            onClick={() => handleClick(blog.slug)}
                            style={{ cursor: "pointer" }}
                            >
                            <div className={cx("image-Wrapper")}>
                                <div
                                className={cx("imageWrapper-image")}
                                style={{width: "352px", height: "216px", position: "relative", overflow: "hidden",}}
                                >
                                <img
                                    alt="mixivivu"
                                    src={blog.thumbnail}
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
                        ))}
                        </div>

                    <div className={cx("flex", "justify-between", "align-center", "pagination")}> 
                        <div className={cx("flex", "align-center", "gap-8")}>
                            <p className={cx("sm")}>Đang xem:</p>
                            <div>
                                <label className={cx("md", "Pagination-page-size")}>
                                    <input  type="number" min="1" max="20" value={count} onChange={(e) => setCount(Math.max(1, Math.min(20, Number(e.target.value))))} style={{ appearance: "textfield" }} />
                                </label>
                            </div>
                            <p className={cx("sm")}>của {data.countAll}</p>
                        </div>

                        <ul className={cx("pagination-container")}>
                            <li>
                                <button 
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                                    disabled={currentPage === 1}
                                    aria-label="Previous Page"
                                >
                                    Trước
                                </button>
                            </li>
                            {[...Array(totalPages)].map((_, i) => (
                                <li key={i}>
                                    <button 
                                        onClick={() => setCurrentPage(i + 1)} 
                                        className={cx({ selected: currentPage === i + 1 })}
                                        aria-label={`Page ${i + 1}`}
                                    >
                                        {i + 1}
                                    </button>
                                </li>
                            ))}
                            <li>
                                <button 
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
                                    disabled={currentPage === totalPages}
                                    aria-label="Next Page"
                                >
                                    Tiếp
                                </button>
                            </li>
                        </ul>
                    </div>
                </>
            )}
        </div>
    );
};

export default BlogPage;

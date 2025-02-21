
import React, { useState, useEffect } from "react";

const BlogPage = () => {
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        // Fetch blogs data from API (replace with actual API endpoint)
        fetch("/api/blogs?page=" + currentPage)
            .then(response => response.json())
            .then(data => {
                setBlogs(data.blogs);
                setTotalRecords(data.countAll);
                setTotalPages(data.numberPage);
            });
    }, [currentPage]);

    return (
        <div className="BlogPage-blog-page container flex flex-col gap-80">
            <div className="BlogPage-blog-header flex justify-between gap-16">
                <div className="SectionHeader-sectionHeader SectionHeader-column">
                    <div className="SectionHeader-title">
                        <h4>
                            Hạ Long: Khám phá Sự đặc sắc
                            <br />
                            và Cập nhật tin tức mới nhất
                        </h4>
                    </div>
                    <label className="lg SectionHeader-description">
                        Hạ Long: Bí mật và Cuộc sống trong Vịnh - Khám phá và Cập nhật những tin tức hấp dẫn từ điểm đến tuyệt vời này.
                    </label>
                </div>
            </div>
            <div className="BlogPage-blog-list">
                {blogs.map((blog, index) => (
                    <a key={index} href={`/blog-detail/${blog.slug}`}>
                        <div className="Card-card BlogCard-blogCard">
                            <div className="BlogCard-imageWrapper" style={{ width: 352, height: 216, position: "relative", overflow: "hidden" }}>
                                <img alt="mixivivu" src={blog.thumbnail} width="100%" height="100%" loading="lazy" style={{ objectFit: "cover" }} />
                            </div>
                            <div className="BlogCard-body">
                                <p className="subheading md BlogCard-title">{blog.title}</p>
                                <p className="BlogCard-description sm">{blog.short_desc}</p>
                            </div>
                            <p className="BlogCard-footer detail sm">{blog.created_at}</p>
                        </div>
                    </a>
                ))}
            </div>
            <div className="flex justify-between align-center Pagination-pagination">
                <div className="flex align-center gap-8 Pagination-left-pagination">
                    <p className="sm">Đang xem:</p>
                    <input type="number" className="md Pagination-page-size" min="1" max="20" value={blogs.length} readOnly />
                    <p className="sm">của {totalRecords}</p>
                </div>
                <ul className="Pagination-pagination-container">
                    <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="Pagination-pagination-left-item Pagination-pagination-item">
                        Trước
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                        <button key={i} onClick={() => setCurrentPage(i + 1)} className={`Pagination-pagination-item ${currentPage === i + 1 ? "Pagination-selected" : ""}`}>
                            {i + 1}
                        </button>
                    ))}
                    <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="Pagination-pagination-right-item Pagination-pagination-item">
                        Tiếp
                    </button>
                </ul>
            </div>
        </div>
    );
};

export default BlogPage;
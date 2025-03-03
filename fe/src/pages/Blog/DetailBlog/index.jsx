import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./BlogPage.module.scss";

const cx = classNames.bind(styles);

const BlogPage = () => {
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedBlog, setSelectedBlog] = useState(null);

    useEffect(() => {
        fetchBlogs(currentPage);
    }, [currentPage]);

    return (
        <div className={cx("blog-container")}> 
            <h2>Blog List</h2>
            <ul>
                {blogs.map((blog) => (
                    <li key={blog.id} onClick={() => setSelectedBlog(blog)}>
                        {blog.title}
                    </li>
                ))}
            </ul>
            <div className={cx("pagination")}>
                <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
            {selectedBlog && (
                <div className={cx("blog-detail")}>
                    <h3>{selectedBlog.title}</h3>
                    <p>{selectedBlog.content}</p>
                    <button onClick={() => setSelectedBlog(null)}>Close</button>
                </div>
            )}
        </div>
    );
};

export default BlogPage;

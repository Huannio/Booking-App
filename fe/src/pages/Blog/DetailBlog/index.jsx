import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Detail.module.scss";

const cx = classNames.bind(styles);

const BlogDetail = ({blog, longDescBlog}) => {
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedBlog, setSelectedBlog] = useState(null);

    return (
        <div className={cx("flex", "flex-col", "gap-80")}>
          <div className={cx("BlogDetail-breadcrumbsWrapper")}>
            <div className={cx("container", "BlogDetail-breadcrumbs")}>
              <div className={cx("BreadCrumbs-breadCrumbsContainer")}>
                <div className={cx("BreadCrumbs-breadcrumb")}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#fff">
                    <path
                      d="M8 17H16M11.0177 2.76401L4.23539 8.03914..."
                      stroke="var(--gray-600, #475467)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <a href={`/_WEB_ROOT/blog`}>
                  <div className={cx("BreadCrumbs-breadCrumbs")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M9 6L15 12L9 18" stroke="var(--gray-300, #d0d5dd)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className={cx("BreadCrumbs-breadcrumb")}>Blogs</div>
                  </div>
                </a>
                <a href={`/_WEB_ROOT/blog-detail/${blog.slug}`}>
                  <div className={cx("BreadCrumbs-breadCrumbs")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M9 6L15 12L9 18" stroke="var(--gray-300, #d0d5dd)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className={cx("BreadCrumbs-breadcrumb", "BreadCrumbs-selected")}>{blog.title}</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
    
          <div className={cx("container", "BlogDetail-wrapper")}>
            <div className={cx("flex", "flex-col", "gap-40")}>
              <div className={cx("SectionHeader-sectionHeader")}>
                <div className={cx("SectionHeader-title")}>
                  <h4>
                    <div className={cx("flex", "flex-col", "gap-16")}>
                      <h5>{blog.title}</h5>
                      <div className={cx("Badge-default", "Badge-sm", "Badge-container")}>
                        <label className={cx("xs")}>{blog.created_at}</label>
                      </div>
                    </div>
                  </h4>
                  <div>
                    <img src="https://mixivivu.com/_next/image?url=%2Fheading-border.png&w=96&q=75" alt="heading-border" />
                  </div>
                </div>
              </div>
              <p style={{ fontStyle: "italic", color: "var(--gray-600, #475467)" }}>{blog.short_desc}</p>
            </div>
          </div>
    
          <div className={cx("container", "flex", "flex-col", "gap-40", "BlogDetail-wrapper")}>
            <div className={cx("BlogDetail-thumbnail")} style={{ width: "100%", height: "568px", position: "relative", overflow: "hidden" }}>
              <img src={blog.thumbnail} alt="mixivivu" width="100%" height="100%" loading="lazy" style={{ objectFit: "cover" }} />
            </div>
            <div className={cx("BlogDetail-output")}>
              {longDescBlog.map((value, index) => (
                <React.Fragment key={index}>
                  {value.type === 2 && <p style={{ margin: "5px 0px", textAlign: "left" }}>{value.text}</p>}
                  {value.type === 3 && (
                    <figure style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", margin: "20px 0px", width: "100%", maxHeight: "400px", overflow: "hidden" }}>
                      <img src={value.image_url} alt="" style={{ maxWidth: "100%", maxHeight: "400px" }} />
                    </figure>
                  )}
                  {value.type === 4 && (
                    <ul style={{ margin: "5px 0px" }}>
                      <li>{value.text}</li>
                    </ul>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      );
    };

export default BlogDetail;

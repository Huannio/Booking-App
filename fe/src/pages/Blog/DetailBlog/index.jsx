import React from "react";
import "./Detail.module.scss";

const BlogDetail = ({ blog = {}, longDescBlog = [] }) => {
  return (
    <div className="flex flex-col gap-80">
      {/* Breadcrumbs */}
      <div className="BlogDetail-breadcrumbsWrapper">
        <div className="container BlogDetail-breadcrumbs">
          <div className="BreadCrumbs-breadCrumbsContainer">
            <div className="BreadCrumbs-breadcrumb">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#fff">
                <path
                  d="M8 17H16M11.0177 2.76401L4.23539 8.03914C3.78202 8.39176 3.55534 8.56807 3.39203 8.78887C3.24737 8.98446 3.1396 9.2048 3.07403 9.43907C3 9.70353 3 9.99071 3 10.5651V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.0799 21 6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V10.5651C21 9.99071 21 9.70353 20.926 9.43907C20.8604 9.2048 20.7526 8.98446 20.608 8.78887C20.4447 8.56807 20.218 8.39176 19.7646 8.03914L12.9823 2.76401C12.631 2.49076 12.4553 2.35413 12.2613 2.30162C12.0902 2.25528 11.9098 2.25528 11.7387 2.30162C11.5447 2.35413 11.369 2.49076 11.0177 2.76401Z"
                  stroke="var(--gray-600, #475467)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                />
              </svg>
            </div>
            <a href={`/_WEB_ROOT/blog`} className="BreadCrumbs-breadCrumbs">
              <div>Blogs</div>
            </a>
            <a href={`/_WEB_ROOT/blog-detail/${blog?.slug}`} className="BreadCrumbs-breadCrumbs">
              <div className="BreadCrumbs-breadcrumb BreadCrumbs-selected">{blog?.title}</div>
            </a>
          </div>
        </div>
      </div>

      {/* Blog Header */}
      <div className="container BlogDetail-wrapper">
        <div className="flex flex-col gap-40">
          <div className="SectionHeader-sectionHeader">
            <div className="SectionHeader-title">
              <h4>
                <div className="flex flex-col gap-16">
                  <h5>{blog?.title}</h5>
                  <div className="Badge-default Badge-sm Badge-container">
                    <label className="xs">{blog?.created_at}</label>
                  </div>
                </div>
              </h4>
            </div>
          </div>
          <p style={{ fontStyle: "italic", color: "var(--gray-600, #475467)" }}>
            {blog?.short_desc}
          </p>
        </div>
      </div>

      {/* Blog Thumbnail */}
      <div className="container flex flex-col gap-40 BlogDetail-wrapper">
        {blog?.thumbnail && (
          <div className="BlogDetail-thumbnail" style={{ width: "100%", height: "568px", position: "relative", overflow: "hidden" }}>
            <img
              alt="Blog Thumbnail"
              src={blog?.thumbnail}
              width="100%"
              height="100%"
              loading="lazy"
              decoding="async"
              style={{ objectFit: "cover" }}
            />
          </div>
        )}

        {/* Blog Content */}
        <div className="BlogDetail-output">
          {longDescBlog.map((value, index) => (
            <React.Fragment key={value.id || index}>
              {value.type === 2 && <BlogParagraph text={value.text} />}
              {value.type === 3 && <BlogImage imageUrl={value.image_url} />}
              {value.type === 4 && <BlogList items={value.text} />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

/** Components for Different Content Types **/
const BlogParagraph = ({ text }) => (
  <p style={{ margin: "5px 0px", textAlign: "left" }}>{text}</p>
);

const BlogImage = ({ imageUrl }) => (
  <figure style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", margin: "20px 0px", width: "100%", maxWidth: "100%", maxHeight: "400px", overflow: "hidden", border: "none" }}>
    <img src={imageUrl} alt="Blog Content" style={{ maxWidth: "100%", maxHeight: "400px" }} />
  </figure>
);

const BlogList = ({ items }) => (
  <ul style={{ margin: "5px 0px" }}>
    <li>{items}</li>
  </ul>
);

export default BlogDetail;

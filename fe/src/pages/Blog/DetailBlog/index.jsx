import { useState, useEffect, useCallback, useContext } from "react";
import classNames from "classnames/bind";
import styles from "./Detail.module.scss";
import { useParams } from "react-router-dom";
import SectionHeader from "../../../components/SectionHeader/SectionHeader";
import Badge from "../../../components/Badge/Badge";
import { handleGetBlogBySlugApi } from "~/api";
import BreadCrumb from "../../../components/BreadCrumb/BreadCrumb";
import { LoadingContext } from "../../../components/Loading/Loading";

const cx = classNames.bind(styles);

function DetailBlog() {
  const { setGlobalLoading } = useContext(LoadingContext);

  const [blog, setBlog] = useState({});
  const { slug } = useParams();

  const getBlogBySlug = useCallback(async () => {
    setGlobalLoading(true);
    const res = await handleGetBlogBySlugApi(slug);
    setBlog(res);
    setGlobalLoading(false);
  }, [slug, setGlobalLoading]);

  useEffect(() => {
    getBlogBySlug();
  }, [slug, getBlogBySlug]);

  return (
    <div className="flex flex-col gap-80">
      <div className={cx("BlogDetail-breadcrumbsWrapper")}>
        <div className={cx("container", "BlogDetail-breadcrumbs")}>
          <BreadCrumb
            titleOption="Blog"
            option="blog"
            content={blog?.title}
            linkSlug={`/blog-detail/${slug}`}
          />
        </div>
      </div>

      <div className={cx("container", "BlogDetail-wrapper")}>
        <div className="flex flex-col gap-40">
          <SectionHeader
            title={<h5>{blog?.title}</h5>}
            column
            badge={
              <Badge
                BadgeDefault
                BadgeSm
                ContentXs
                content={new Date(blog.createdAt).toLocaleDateString("vi-VN")}
              />
            }
          />
          <p style={{ fontStyle: "italic", color: "var(--gray-600, #475467)" }}>
            {blog?.short_desc}
          </p>
        </div>
      </div>

      <div
        className={cx("container flex flex-col gap-40", "BlogDetail-wrapper")}
      >
        <div
          className={cx("BlogDetail-thumbnail")}
          style={{
            width: "100%",
            height: "568px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <img
            src={blog?.thumbnail}
            alt="mixivivu"
            width={"100%"}
            height={"100%"}
            loading="lazy"
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className={cx("BlogDetail-output")}>
          {blog?.long_desc?.map((item, index) => {
            if (item?.type_id === 2) {
              if (index === blog.long_desc.length - 1) {
                return (
                  <p key={index} style={{ margin: "5px 0px" }}>
                    <b>
                      <i>{item.text}</i>
                    </b>
                  </p>
                );
              } else {
                return (
                  <p
                    key={index}
                    style={{ margin: "5px 0px", textAlign: "left" }}
                  >
                    {item.text}
                  </p>
                );
              }
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
                    style={{ maxWidth: "100%", maxHeight: "400px" }}
                  />
                </figure>
              );
            }

            if (item?.type_id === 4) {
              return (
                <ul key={index} style={{ margin: "5px 0px" }}>
                  <li>{item.text}</li>
                </ul>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
}

export default DetailBlog;

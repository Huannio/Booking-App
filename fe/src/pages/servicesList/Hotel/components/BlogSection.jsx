

function BlogSection() {
    return (
        <div className="container BlogSection-section">
            <div className="SectionHeader-sectionHeader">
                <div className="SectionHeader-title">
                    <h4>
                        Khám phá Sự đặc sắc<br>và Cập nhật tin tức mới nhất</br>
                    </h4>
                    <div>
                        <span 
                            style={{ boxSizing: "border-box", display: "inline-block", overflow: "hidden", width: "initial", height: "initial", background: "none", opacity: 1, border: "0px", margin: "0px", padding: "0px", position: "relative", maxWidth: "100%" }}>
                            <span
                                style={{ boxSizing: "border-box", display: "inline-block", overflow: "hidden", width: "initial", height: "initial", background: "none", opacity: 1, border: "0px", margin: "0px", padding: "0px", position: "relative", maxWidth: "100%" }}>
                                    <img alt="" aria-hidden="true"
                                    src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2780%27%20height=%278%27/%3e"
                                    style="display: block; max-width: 100%; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px;"/>
                            </span>
                            <img srcSet="{window.location.origin}/public/img/heading-border.webp 1x, {window.location.origin}/public/img/heading-border.web 2x"
                                src="{window.location.origin}/public/img/heading-border.webp 1x, {window.location.origin}/public/img/heading-border.web 2x"
                                decoding="async" data-nimg="intrinsic"
                                style={{ position: "absolute", inset: "0px", boxSizing: "border-box", padding: "0px", border: "none", margin: "auto", display: "block", width: "0px", height: "0px", minWidth: "100%", maxWidth: "100%", minHeight: "100%", maxHeight: "100%" }}/>
                        </span>
                    </div>
                </div>
                <label htmlFor="" className="SectionHeader-description">
                    Những điểm đến hấp dẫn cùng nhiều thông tin cần thiết cho chuyến du lịch tuyệt vời của bạn.
                </label>
            </div>

            <div className="BlogSection-cardList">
                {hotelBlog.map(blog)}
            </div>
        </div>
    )
}

export default BlogSection;
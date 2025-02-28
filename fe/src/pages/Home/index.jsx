

function Home() {
  return (
    <div className="home-banner">
      <video
        className="home-bg-video"
        src="https://res.cloudinary.com/dhnp8ymxv/video/upload/v1731849290/Mixivivuduthuyen_cnlkmw.mp4"
        autoPlay
        muted
        loop
      />
      <div className="card flex flex-col justify-center gap-40 search-box home-search-box">
        <div className="flex flex-col gap-16 gray-900">
          <h4 className="text-center search-box-title home-search-box-title">
            Bạn lựa chọn du thuyền Hạ Long nào?
          </h4>
          <p className="lg text-center search-box-description home-search-box-description">
            Hơn 100 tour du thuyền hạng sang giá tốt đang chờ bạn
          </p>
        </div>
        <form action="" method="get">
          <div className="flex gap-20 search-box-input-group">
            {/* Ô nhập tên du thuyền */}
            <div className="search-box-search-input">
              <label htmlFor="search" className="input-group">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                    stroke="var(--gray-400, #98a2b3)"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <input
                  className="p-md"
                  type="text"
                  name="keyword"
                  placeholder="Nhập tên du thuyền"
                  defaultValue=""
                />
              </label>
            </div>

            {/* Ô chọn địa điểm */}
            <div className="search-box-select-input select-input">
              <label htmlFor="allLocations" className="input-group">
                <input
                  id="allLocations"
                  className="p-md"
                  type="text"
                  name="location"
                  defaultValue="Tất cả địa điểm"
                />
              </label>
            </div>

            {/* Ô chọn mức giá */}
            <div className="search-box-select-input select-input">
              <label htmlFor="allPrices" className="input-group">
                <input
                  id="allPrices"
                  className="p-md"
                  type="text"
                  name="price"
                  defaultValue="Tất cả mức giá"
                />
              </label>
            </div>

            {/* Nút tìm kiếm */}
            <button
              type="submit"
              className="btn btn-btn btn-normal btn-primary search-box-submit-btn"
            >
              <div className="label md">Tìm kiếm</div>
            </button>
          </div>
        </form>
      </div>
    </div>

  )
}


export default Home;

const CruiseBanner = () => {
    const cities = ["Hà Nội", "Hồ Chí Minh", "Đà Nẵng"]; // Thay bằng dữ liệu động từ API

    return (
        <div className="home-banner">
            <video
                className="home-bg-video"
                src="https://res.cloudinary.com/dhnp8ymxv/video/upload/v1732194247/MixivivuHotel_uckfu2.mp4"
                autoPlay
                muted
                loop
            ></video>

            <div className="card flex flex-col justify-center gap-40 search-box home-search-box">
                <div className="flex flex-col gap-16 gray-900">
                    <h4 className="text-center search-box-title home-search-box-title">
                        Bạn lựa chọn du thuyền Hạ Long nào?
                    </h4>
                    <p className="lg text-center search-box-description home-search-box-description">
                        Hơn 100 tour du thuyền hạng sang giá tốt đang chờ bạn
                    </p>
                </div>

                <div className="flex gap-20 search-box-input-group">
                    <div className="search-box-search-input">
                        <label className="input-group">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#98a2b3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                            <input className="p-md" type="text" placeholder="Nhập tên du thuyền" autoComplete="off" />
                        </label>
                    </div>

                    <div className="search-box-select-input select-input">
                        <div className="focus-dropdown">
                            <label className="input-group">
                                <input id="allLocations" className="p-md" type="button" value="Tất cả địa điểm" />
                            </label>
                            <div className="search-box-dropdown">
                                <div className="search-box-dropdown-item dropdown-item">Tất cả địa điểm</div>
                                {cities.map((city, index) => (
                                    <div key={index} className="search-box-dropdown-item dropdown-item">
                                        {city}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="search-box-select-input select-input">
                        <div className="focus-dropdown">
                            <label className="input-group">
                                <input id="allPrices" className="p-md" type="button" value="Tất cả mức giá" />
                            </label>
                            <div className="search-box-dropdown">
                                <div className="search-box-dropdown-item dropdown-item">Tất cả mức giá</div>
                                <div className="search-box-dropdown-item dropdown-item">Từ 1 đến 3 triệu</div>
                                <div className="search-box-dropdown-item dropdown-item">Từ 3 đến 6 triệu</div>
                                <div className="search-box-dropdown-item dropdown-item">Trên 6 triệu</div>
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-normal btn-primary">
                        <div className="label md">Tìm kiếm</div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CruiseBanner;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from "~/components/Button";
import classNames from 'classnames/bind';
import styles from '../Home/style/banner.module.scss';

const cx = classNames.bind(styles);

function Banner() {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('Tất cả địa điểm');
  const [price, setPrice] = useState('Tất cả mức giá');
  const [locationsDropdownVisible, setLocationsDropdownVisible] = useState(false); // dropdown địa điểm
  const [pricesDropdownVisible, setPricesDropdownVisible] = useState(false); // dropdown mức giá
  const navigate = useNavigate();

  const handleLocationClick = () => {
    setLocationsDropdownVisible(!locationsDropdownVisible);
    setPricesDropdownVisible(false); // Toggle visibility dropdown
  };

  const handlePriceClick = () => {
    setPricesDropdownVisible(!pricesDropdownVisible); 
    setLocationsDropdownVisible(false);
  };

  const handleLocationSelect = (selectedLocation) => {
    setLocation(selectedLocation);
    setLocationsDropdownVisible(false); // Đóng dropdown sau khi chọn
  };

  const handlePriceSelect = (selectedPrice) => {
    setPrice(selectedPrice);
    setPricesDropdownVisible(false); // Đóng dropdown sau khi chọn
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Điều hướng với các tham số query
    navigate(`/tim-du-thuyen/search?keyword=${keyword}&location=${location}&price=${price}`);
  };

  return (
    <div className={cx('home-banner')}>
      <video 
        className={cx('home-bg-video')} src="https://res.cloudinary.com/dhnp8ymxv/video/upload/v1731849290/Mixivivuduthuyen_cnlkmw.mp4" autoPlay muted loop />
      <div className={cx('card', 'flex', 'flex-col', 'justify-center', 'gap-40', 'search-box', 'home-search-box')}>
        <div className={cx('flex', 'flex-col', 'gap-16', 'gray-900')}>
          <h4 className={cx('text-center', 'search-box-title', 'home-search-box-title')}>
            Bạn lựa chọn du thuyền Hạ Long nào?
          </h4>
          <p className={cx('lg', 'text-center', 'search-box-description', 'home-search-box-description')}>
            Hơn 100 tour du thuyền hạng sang giá tốt đang chờ bạn
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={cx('flex', 'gap-20', 'search-box-input-group')}>
            <div className={cx('search-box-search-input')}>
              <label className={cx('input-group')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#98a2b3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <input
                  className="p-md"
                  type="text"
                  name="keyword"
                  value={keyword}
                  placeholder="Nhập tên du thuyền"
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </label>
            </div>

            {/* Location Input with Dropdown */}
            <div className={cx('search-box-select-input', 'select-input')}>
              <div className={cx('focus-dropdown')}>
                <label htmlFor="allLocations" className={cx('input-group')}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5.7 15C4.03377 15.6353 3 16.5205 3 17.4997C3 19.4329 7.02944 21 12 21C16.9706 21 21 19.4329 21 17.4997C21 16.5205 19.9662 15.6353 18.3 15M12 9H12.01M18 9C18 13.0637 13.5 15 12 18C10.5 15 6 13.0637 6 9C6 5.68629 8.68629 3 12 3C15.3137 3 18 5.68629 18 9ZM13 9C13 9.55228 12.5523 10 12 10C11.4477 10 11 9.55228 11 9C11 8.44772 11.4477 8 12 8C12.5523 8 13 8.44772 13 9Z"
                      stroke="#98a2b3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    />
                  </svg>
                  <input
                    id="allLocations"
                    className="p-md"
                    type="text"
                    value={location}
                    onClick={handleLocationClick} // Hiển thị dropdown khi click
                    readOnly // Chỉ sử dụng để hiển thị
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M6 9L12 15L18 9"
                      stroke="#98a2b3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    />
                  </svg>
                </label>

                {/* Dropdown Menu */}
                {locationsDropdownVisible && (
                  <div className={cx('SearchBox-dropdown')}>
                    {['Tất cả địa điểm', 'Vịnh Hạ Long', 'Vịnh Lan Hạ', 'Đảo Cát Bà'].map((loc) => (
                      <div
                        key={loc}
                        className={cx('SearchBox-dropdown-item')}
                        onClick={() => handleLocationSelect(loc)}
                      >
                        {loc}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Price Input with Dropdown */}
            <div className={cx('search-box-select-input', 'select-input')}>
              <div className={cx('focus-dropdown')}>
                <label htmlFor="allPrices" className={cx('input-group')}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M15 10V9.91667C15 8.85812 14.1419 8 13.0833 8H11C9.89543 8 9 8.89543 9 10C9 11.1046 9.89543 12 11 12H13C14.1046 12 15 12.8954 15 14C15 15.1046 14.1046 16 13 16H10.9583C9.87678 16 9 15.1232 9 14.0417V14M12 17.5V6.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                      stroke="#98a2b3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    />
                  </svg>
                  <input
                    id="allPrices"
                    className="p-md"
                    type="text"
                    value={price}
                    onClick={handlePriceClick} // Hiển thị dropdown khi click
                    readOnly // Chỉ sử dụng để hiển thị
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M6 9L12 15L18 9"
                      stroke="#98a2b3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    />
                  </svg>
                </label>

                {/* Dropdown Menu */}
                {pricesDropdownVisible && (
                  <div className={cx('SearchBox-dropdown')}>
                    {['Tất cả mức giá', 'Từ 1 đến 3 triệu', 'Từ 3 đến 5 triệu', 'Trên 5 triệu'].map((priceOption) => (
                      <div
                        key={priceOption}
                        className={cx('SearchBox-dropdown-item')}
                        onClick={() => handlePriceSelect(priceOption)}
                      >
                        {priceOption}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <Button primary normal submit className="btn btn-btn btn-normal btn-primary search-box-submit-btn">
              <div className="label md">Tìm kiếm</div>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Banner;
import react from "react";

const SearchPage = () => {
    const [keyword, setKeyword] = useState("");
    const [location, setLocation] = useState("Tất cả địa điểm");
    const [price , setPrice] = useState("Tất cả mức giá");

    const handleSearch = (e) => {
        e.preventDefault();
        console.log(keyword, location, price);
    }

    const locations = ["Tất cả địa điểm", "Vịnh Hạ Long", "Vịnh Lan Hạ", "Đảo Cát Bà"];
    const prices = ["Tất cả mức giá", "Dưới 1 triệu", "1-3 triệu", "Trên 3 triệu"];

    return (
        <div className="fresnel-container fresnel-greaterThan-mdless">
            <div className="card SearchPageDetail-search-box SearchBox-searchBox flex flex-col justify-center gap-40">
                <div className="flex flex-col gap-16 gray-900">
                    <h4 className="text-center search-box-title">Bạn lựa chọn du thuyền Hạ Long nào?</h4>
                    <p className="lg text-center search-box-description">Hơn 100 tour du thuyền hạng sang giá tốt đang chờ bạn</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="flex gap-20 search-box-input-group">
                        {/* Tìm kiếm theo tên du thuyền */}
                        <div className="search-box-search-input">
                            <label className="input-group">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path
                                        d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                                        stroke="var(--gray-400, #98a2b3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <input 
                                    className="p-md" 
                                    type="text" 
                                    name="keyword" 
                                    placeholder="Nhập tên du thuyền" 
                                    value={keyword} 
                                    onChange={(e) => setKeyword(e.target.value)} 
                                />
                            </label>
                        </div>

                        {/* Dropdown cho địa điểm */}
                        <div className="search-box-select-input select-input">
                            <label className="input-group">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path
                                        d="M5.7 15C4.03377 15.6353 3 16.5205 3 17.4997C3 19.4329 7.02944 21 12 21C16.9706 21 21 19.4329 21 17.4997C21 16.5205 19.9662 15.6353 18.3 15M12 9H12.01M18 9C18 13.0637 13.5 15 12 18C10.5 15 6 13.0637 6 9C6 5.68629 8.68629 3 12 3C15.3137 3 18 5.68629 18 9ZM13 9C13 9.55228 12.5523 10 12 10C11.4477 10 11 9.55228 11 9C11 8.44772 11.4477 8 12 8C12.5523 8 13 8.44772 13 9Z"
                                        stroke="var(--gray-400, #98a2b3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <input className="p-md" type="input" name="location" value={location} onClick={(e) => e.stopPropagation()} readOnly/>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M6 9L12 15L18 9" stroke="var(--gray-400, #98a2b3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </label>
                            <div className="search-box-dropdown">
                                {locations.map((item) => (
                                    <div className="search-box-dropdown-item dropdown-item" key={item} onClick={() => setLocation(item)}>
                                    {item}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Dropdown cho mức giá */}
                        <div className="search-box-select-input select-input">
                            <label className="input-group">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path
                                        d="M15 10V9.91667C15 8.85812 14.1419 8 13.0833 8H11C9.89543 8 9 8.89543 9 10C9 11.1046 9.89543 12 11 12H13C14.1046 12 15 12.8954 15 14C15 15.1046 14.1046 16 13 16H10.9583C9.87678 16 9 15.1232 9 14.0417V14M12 17.5V6.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                        stroke="var(--gray-400, #98a2b3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <input className="p-md" type="input" name="price" value={price} onClick={(e) => e.stopPropagation()} readOnly/>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M6 9L12 15L18 9" stroke="var(--gray-400, #98a2b3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </label>
                            <div className="search-box-dropdown">
                                {prices.map((item) => (
                                    <div className="search-box-dropdown-item dropdown-item" key={item} onClick={() => setPrice(item)}>
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Nút tìm kiếm */}
                        <button type="submit" className="btn btn-btn btn-normal btn-primary search-box-submit-btn">
                            <div className="label md">Tìm kiếm</div>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const SearchPageDetailHeader = ({ countAll }) => {
    const [selectedSort, setSelectedSort] = useState("Không sắp xếp");

    const handleSortChange = (e) => {
        setSelectedSort(e.target.value);
    };

    return (
        <div className="SearchPageDetail-header">
            <div className="SearchPageDetail-title">
                <h4>Tìm thấy {countAll} kết quả</h4>
                <div className="heading-border">
                    <img src="https://mixivivu.com/_next/image?url=%2Fheading-border.png&w=96&q=75" alt="Heading Border" />
                </div>
            </div>

            <div className="search-sort">
                <select value={selectedSort} onChange={handleSortChange}className="sort-select">
                    <option value="Không sắp xếp">Không sắp xếp</option>
                    <option value="Sắp xếp theo giá thấp đến cao">Sắp xếp theo giá thấp đến cao</option>
                    <option value="Sắp xếp theo giá cao đến thấp">Sắp xếp theo giá cao đến thấp</option>
                </select>
            </div>
        </div>
    );
};

const ShipCard = ({ ship }) => {
    return (
      <a href={`/du-thuyen/${ship.slug}`}>
        <div className="Card-card ProductCard-grid">
          <div className="ProductCard-imageWrapper">
            <div className="ProductCard-imageWrapper-image" style={{ width: '352px', height: '264px', position: 'relative', overflow: 'hidden' }}>
              <img src={ship.thumbnail} alt="mixivivu" width="100%" height="100%" loading="lazy" style={{ objectFit: 'cover' }} />
            </div>
            <div className="Badge-warning Badge-sm Badge-container ProductCard-imageWrapper-badge">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M11.2443 4.17391C11.4758 3.50799 11.5916 3.17503 11.7627 3.08276C11.9108 3.00289 12.0892 3.00289 12.2373 3.08276C12.4084 3.17503 12.5242 3.50799 12.7556 4.17391L14.2859 8.5763C14.3518 8.76583 14.3847 8.86059 14.4441 8.93116C14.4965 8.9935 14.5634 9.04209 14.6389 9.07269C14.7244 9.10734 14.8247 9.10938 15.0253 9.11347L19.6851 9.20843C20.3899 9.22279 20.7423 9.22998 20.883 9.36423C21.0047 9.48042 21.0598 9.65005 21.0297 9.81559C20.9948 10.0069 20.7139 10.2198 20.1521 10.6458L16.438 13.4615C16.2782 13.5828 16.1982 13.6434 16.1494 13.7216C16.1063 13.7908 16.0808 13.8694 16.075 13.9506C16.0685 14.0426 16.0975 14.1387 16.1556 14.3307L17.5053 18.7918C17.7094 19.4666 17.8115 19.804 17.7273 19.9792C17.6544 20.1309 17.5101 20.2357 17.3433 20.2582C17.1506 20.2841 16.8613 20.0828 16.2826 19.6801L12."></path>
              </svg>
            </div>
          </div>
        </div>
      </a>
    );
  };
  
  // Component chính để hiển thị danh sách tàu
  const ShipList = ({ ships, currentPage, recordsPerPage }) => {
    const startNumber = (currentPage - 1) * recordsPerPage + 1;
    
    return (
      <div className="fresnel-container fresnel-lessThan-md fresnel-greaterThan-sm">
        <div className="flex gap-32">
          <div>
            <div className="SearchPageDetail-ship-list flex flex-col gap-32">
              {ships.map((ship, index) => {
                return (
                  <ShipCard key={ship.id} ship={ship} />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Component phân trang
  const Pagination = ({ totalRecords, currentPage, recordsPerPage, onPageChange }) => {
    const totalPages = Math.ceil(totalRecords / recordsPerPage);
  
    const handlePageChange = (pageNumber) => {
      if (pageNumber > 0 && pageNumber <= totalPages) {
        onPageChange(pageNumber);
      }
    };
  
    return (
      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
        <span>{currentPage} / {totalPages}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
      </div>
    );
  };

export { SearchPage, SearchPageDetailHeader, ShipList, Pagination };
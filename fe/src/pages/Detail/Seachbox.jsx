import { useState } from "react";

export default function SearchBox() {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("Tất cả địa điểm");
  const [price, setPrice] = useState("Tất cả mức giá");
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);

  const locations = ["Tất cả địa điểm", "Vịnh Hạ Long", "Vịnh Lan Hạ", "Đảo Cát Bà"];
  const prices = ["Tất cả mức giá", "Từ 1 đến 3 triệu", "Từ 3 đến 6 triệu", "Trên 6 triệu"];

  return (
    <div className="flex gap-20 search-box-input-group">
      <div className="search-box-search-input">
        <label className="input-group">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#98a2b3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <input className="p-md" type="text" placeholder="Nhập tên du thuyền" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
        </label>
      </div>
      
      <div className="search-box-select-input select-input">
        <div className="focus-dropdown" onClick={() => setShowLocationDropdown(!showLocationDropdown)}>
          <label className="input-group">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M5.7 15C4.03377 15.6353 3 16.5205 3 17.4997C3 19.4329 7.02944 21 12 21C16.9706 21 21 19.4329 21 17.4997C21 16.5205 19.9662 15.6353 18.3 15M12 9H12.01M18 9C18 13.0637 13.5 15 12 18C10.5 15 6 13.0637 6 9C6 5.68629 8.68629 3 12 3C15.3137 3 18 5.68629 18 9Z" stroke="#98a2b3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <input className="p-md" type="button" value={location} readOnly />
          </label>
          {showLocationDropdown && (
            <div className="search-box-dropdown">
              {locations.map((loc) => (
                <div key={loc} className="search-box-dropdown-item dropdown-item" onClick={() => { setLocation(loc); setShowLocationDropdown(false); }}>{loc}</div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="search-box-select-input select-input">
        <div className="focus-dropdown" onClick={() => setShowPriceDropdown(!showPriceDropdown)}>
          <label className="input-group">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 10V9.91667C15 8.85812 14.1419 8 13.0833 8H11C9.89543 8 9 8.89543 9 10C9 11.1046 9.89543 12 11 12H13C14.1046 12 15 12.8954 15 14C15 15.1046 14.1046 16 13 16H10.9583C9.87678 16 9 15.1232 9 14.0417V14M12 17.5V6.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#98a2b3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <input className="p-md" type="button" value={price} readOnly />
          </label>
          {showPriceDropdown && (
            <div className="search-box-dropdown">
              {prices.map((pr) => (
                <div key={pr} className="search-box-dropdown-item dropdown-item" onClick={() => { setPrice(pr); setShowPriceDropdown(false); }}>{pr}</div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <button type="submit" className="btn btn-btn btn-normal btn-primary search-box-submit-btn">
        <div className="label md">Tìm kiếm</div>
      </button>
    </div>
  );
}

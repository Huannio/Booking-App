import  { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Banner.module.scss';
import SearchBox from "~/components/SearchBox/SearchBox";
import { Controller, useForm } from "react-hook-form";
import CustomDatePicker from "~/components/DatePicker/DatePicker";
import Button from "~/components/Button";

const cx = classNames.bind(styles);

const Banner = () => {
  const { control, handleSubmit } = useForm();

  const handleSearchShipsForm = (data) => {
    console.log(data);
  };


  return (
    <div className={cx("Home-banner")}>
      <video
        className={cx("Home-bg-video")}
        src="https://minio.fares.vn/mixivivu-dev/video/Mixivivumaybay.mp4"
        autoPlay
        muted
        loop
      />
      <form onSubmit={handleSubmit(handleSearchShipsForm)}>
      <div className={cx('flight-search-container')}>
        <SearchBox
          className={cx("Home-searchBox")}
          title={"Mở cánh cửa khám phá cùng Mixivivu"}
          description={"Mixivivu - Đặt chân lên đỉnh mây với một bước nhảy"}
        >
        
        <div className={cx('trip-type-selector')}>
          <label className={cx('trip-type-option')}>
            <input
              type="radio"
              name="tripType"
              checked={formData.tripType === 'oneWay'}
              onChange={() => handleTripTypeChange('oneWay')}
            />
            <span className={cx('trip-type-label')}>Một chiều</span>
          </label>
          
          <label className={cx('trip-type-option')}>
            <input
              type="radio"
              name="tripType"
              checked={formData.tripType === 'roundTrip'}
              onChange={() => handleTripTypeChange('roundTrip')}
            />
            <span className={cx('trip-type-label')}>Khứ hồi</span>
          </label>
          
          <div className={cx('cheapest-ticket')}>
            <input 
              type="checkbox" 
              id="cheapestTicket" 
              checked={formData.cheapestTicket}
              onChange={handleCheapestTicketChange}
            />
            <label htmlFor="cheapestTicket">Vé rẻ nhất tháng</label>
          </div>
        </div>
        
        <div className={cx('search-form-container')}>
          <div className={cx('location-inputs')}>
            <div className={cx('input-group')}>
              <label>Điểm đi</label>
              <div className={cx('input-with-icon')}>
                <input
                  type="text"
                  name="departureLoc"
                  value={formData.departureLoc}
                  onChange={handleLocationChange}
                  placeholder="Vui lòng nhập điểm đi"
                />
                <svg className={cx('location-icon')} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
            </div>
            
            <div className={cx('input-group')}>
              <label>Điểm đến</label>
              <div className={cx('input-with-icon')}>
                <input
                  type="text"
                  name="arrivalLoc"
                  value={formData.arrivalLoc}
                  onChange={handleLocationChange}
                  placeholder="Vui lòng nhập điểm đến"
                />
                <svg className={cx('location-icon')} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
            </div>
          </div>
          
          <div className={cx('date-inputs', { 'single-date': formData.tripType === 'oneWay' })}>
            <div className={cx('input-group')}>
              <label>Ngày đi</label>
              <CustomDatePicker
                selected={formData.departureDate}
                onChange={(date) => handleDateChange(date, 'departureDate')}
                placeholderText="Chọn ngày đi"
                minDate={new Date()}
              />
            </div>
            
            {formData.tripType === 'roundTrip' && (
              <div className={cx('input-group')}>
                <label>Ngày về</label>
                <CustomDatePicker
                  selected={formData.returnDate}
                  onChange={(date) => handleDateChange(date, 'returnDate')}
                  placeholderText="Chọn ngày về"
                  minDate={formData.departureDate}
                />
              </div>
            )}
          </div>
          
          <div className={cx('passenger-inputs')}>
            <div className={cx('passenger-group')}>
              <label>Người lớn</label>
              <div className={cx('counter')}>
                <button
                  onClick={() => handlePassengerChange('adults', Math.max(1, formData.adults - 1))}
                  disabled={formData.adults <= 1}
                  className={cx('counter-btn')}
                >
                  -
                </button>
                <span>{formData.adults}</span>
                <button
                  onClick={() => handlePassengerChange('adults', formData.adults + 1)}
                  className={cx('counter-btn')}
                >
                  +
                </button>
              </div>
            </div>
            
            <div className={cx('passenger-group')}>
              <label>Trẻ em</label>
              <div className={cx('counter')}>
                <button
                  onClick={() => handlePassengerChange('children', Math.max(0, formData.children - 1))}
                  disabled={formData.children <= 0}
                  className={cx('counter-btn')}
                >
                  -
                </button>
                <span>{formData.children}</span>
                <button
                  onClick={() => handlePassengerChange('children', formData.children + 1)}
                  className={cx('counter-btn')}
                >
                  +
                </button>
              </div>
            </div>
            
            <div className={cx('passenger-group')}>
              <label>Em bé</label>
              <div className={cx('counter')}>
                <button
                  onClick={() => handlePassengerChange('infants', Math.max(0, formData.infants - 1))}
                  disabled={formData.infants <= 0}
                  className={cx('counter-btn')}
                >
                  -
                </button>
                <span>{formData.infants}</span>
                <button
                  onClick={() => handlePassengerChange('infants', formData.infants + 1)}
                  className={cx('counter-btn')}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <Button submit color normal className="SearchBox-submit-btn">
          <div className="label md">Tìm chuyến bay</div>
        </Button>
      </SearchBox>
      </div>
      </form>
    </div>
  );
};

export default Banner;
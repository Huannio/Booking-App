import { useState, useEffect, useMemo } from "react";
import classNames from "classnames/bind";
import styles from "../Cruise.module.scss";

const cx = classNames.bind(styles);

const ShipCarousel = ({ imagesString, thumbnail }) => {
  const [images, setImages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (imagesString) {
      // Convert image string to array
      const imagesArray = imagesString.split(',')
        .map(url => url.trim())
        .filter(url => url.length > 0);
      
      // Add thumbnail to beginning if provided and not already in the array
      const allImages = thumbnail && !imagesArray.includes(thumbnail) 
        ? [thumbnail, ...imagesArray] 
        : imagesArray;
      
      setImages(allImages);
      setLoading(false);
    }
  }, [imagesString, thumbnail]);

  const handlePrevClick = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setActiveIndex((prevIndex) => 
      (prevIndex + 1) % images.length
    );
  };

  const handleThumbnailClick = (index) => {
    setActiveIndex(index);
  };

  const visibleThumbnails = useMemo(() => {
    if (images.length <= 5) {
      return images.map((_, index) => index);
    }
    
    let start = activeIndex - 2;
    let end = activeIndex + 2;
    
    if (start < 0) {
      return [0, 1, 2, 3, 4].filter(i => i < images.length);
    } else 
    if (end >= images.length) {
      return Array.from({ length: 5 }, (_, i) => images.length - 5 + i).filter(i => i >= 0 && i < images.length);
    }
    
    return [start, start + 1, activeIndex, activeIndex + 1, activeIndex + 2];
  }, [activeIndex, images.length]);

  if (loading) {
    return <div>Đang tải ảnh...</div>;
  }

  if (!images || images.length === 0) {
    return <div>Không có ảnh hiển thị</div>;
  }
  
  const prevIndex = activeIndex === 0 ? images.length - 1 : activeIndex - 1;
  const nextIndex = (activeIndex + 1) % images.length;

  return (
    <div className={cx("ShipDetail-carousel")}>
      <div className={cx("carousel-container")}>
      <div className={cx("preview-image", "preview-left")}>
        <img 
          src={images[prevIndex]} 
          alt="previous" 
          className={cx("preview-img")}
        />
        <button 
          type="button" 
          className={cx("carousel-btn", "left-btn")}
          onClick={handlePrevClick}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4.16602 10H15.8327M4.16602 10L9.16602 5M4.16602 10L9.16602 15" stroke="#344054" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </button>
      </div>
      
      <div className={cx("carousel-main")}>
        {images.map((imageUrl, index) => (
          <div 
            key={index} 
            className={cx("carouselItem", { "fade": index === activeIndex })}
            style={{ display: index === activeIndex ? 'block' : 'none' }}
          >
            <img 
              alt={`du-thuyen-banner-${index}`} 
              src={imageUrl} 
              loading="lazy" 
              className={cx("main-img")}
            />
          </div>
        ))}
      </div>
      
      <div className={cx("preview-image", "preview-right")}>
        <img 
          src={images[nextIndex]} 
          alt="next" 
          className={cx("preview-img")}
        />
        <button 
          type="button" 
          className={cx("carousel-btn", "right-btn")}
          onClick={handleNextClick}
        >
          <svg width="20" height="20" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9" stroke="#344054" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </button>
      </div>
    </div>
      
      <div className={cx("thumbnails-container")}>
        <div className={cx("thumbnails-row")}>
          {visibleThumbnails.map((index) => (
            <div 
              key={index}
              className={cx("thumbnail-item", { "active": index === activeIndex })}
              onClick={() => handleThumbnailClick(index)}
            >
              <img 
                src={images[index]} 
                alt={`thumbnail-${index}`} 
                loading="lazy" 
              />
              {index === activeIndex && <div className={cx("active-indicator")}></div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShipCarousel;
// Dùng css pointer-events để chặn user spam click với những nơi click gọi api (tận dụng interceptor)
// Cách dùng: Thêm class interceptor-loading vào những nơi cần dùng

export const interceptorLoadingElements = (calling) => {
  const elements = document.querySelectorAll(".interceptor-loading");
  for (let i = 0; i < elements.length; i++) {
    if (calling) {
      // calling == true là trong thời gian chờ gọi api => chặn user click bằng css pointer-events
      elements[i].style.opacity = 0.5;
      elements[i].style.pointerEvents = "none";
    } else {
      elements[i].style.opacity = "initial";
      elements[i].style.pointerEvents = "initial";
    }
  }
};

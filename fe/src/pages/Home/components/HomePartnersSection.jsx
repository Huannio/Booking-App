// import { useState, useEffect } from "react";

// const PartnerSection = () => {
//     const [partners, setPartners] = useState([]);

//     useEffect(() => {
//         fetch("/api/partners") // Gọi API từ backend
//             .then((res) => res.json())
//             .then((data) => setPartners(data))
//             .catch((error) => console.error("Error fetching partners:", error));
//     }, []);

//     return (
//         <section className="home-partnersSection section-bg">
//             <div className="container PartnerSection-section">
//                 <div className="SectionHeader-sectionHeader">
//                     <div className="SectionHeader-title">
//                         <h4>Đối tác Cùng các <br />Hãng Du thuyền Lớn</h4>
//                     </div>
//                     <label className="lg SectionHeader-description">
//                         Đối tác hàng đầu với các hãng du thuyền danh tiếng: Ưu đãi độc quyền dành riêng cho bạn
//                     </label>
//                 </div>

//                 <div className="PartnerSection-partnerList">
//                     {partners.length > 0 ? (
//                         partners.map((partner) => (
//                             <div key={partner.id} className="PartnerSection-img-wrapper">
//                                 <img alt="partner" src={partner.imageUrl} loading="lazy" style={{ objectFit: "cover", width: "100%", height: "100%" }} />
//                             </div>
//                         ))
//                     ) : (
//                         <p>Đang tải danh sách đối tác...</p>
//                     )}
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default PartnerSection;

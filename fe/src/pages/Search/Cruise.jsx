import styles from "./Cruise.module.scss";
function Cruise() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
      <h1 className="text-2xl font-bold text-gray-900 search-box-title">
        Bạn lựa chọn du thuyền Hạ Long nào?
      </h1>
      <p className="text-gray-500 mt-2 search-box-description">
        Hơn 100 tour du thuyền hạng sang giá tốt đang chờ bạn
      </p>

      {/* Chỉnh flex để các phần tử căn ngang hàng */}
      <div className="mt-4 flex flex-wrap justify-center md:justify-between gap-3">
        <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/3">
          <input
            type="text"
            placeholder="Nhập tên du thuyền"
            className="w-full outline-none bg-transparent text-gray-700"
          />
        </div>

        <select className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/4 text-gray-700">
          <option>Tất cả địa điểm</option>
        </select>

        <select className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/4 text-gray-700">
          <option>Tất cả mức giá</option>
        </select>

        <button className="bg-teal-400 text-white px-6 py-2 rounded-lg hover:bg-teal-500 transition">
          Tìm kiếm
        </button>
      </div>
    </div>
  )
}
export default Cruise;

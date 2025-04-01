import Banner from "./Banner";
import SearchPageDetail from "./SearchPageDetail";
import { useEffect, useState } from "react";
import { handleGetCruiseCategoryApi } from "~/api";

function CruiseSearch() {
  const [cruiseCategory, setCruiseCategory] = useState([]);

  const getCruiseCategory = async () => {
    const res = await handleGetCruiseCategoryApi();
    setCruiseCategory(res.cruiseCategory);
  };

  useEffect(() => {
    getCruiseCategory();
  }, []);

  return (
    <>
      <Banner cruiseCategory={cruiseCategory} />
      <SearchPageDetail />
    </>
  );
}
export default CruiseSearch;

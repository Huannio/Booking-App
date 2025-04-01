import Banner from "./Banner";
import ReviewSections from "./ReviewSections";
import HomePartnersSection from "./HomePartnersSection";
// import { useEffect, useState } from "react";
// import { handleGetCruiseCategoryApi } from "~/api";

function FlightSearch() {
  // const [cruiseCategory, setCruiseCategory] = useState([]);

  // const getCruiseCategory = async () => {
  //   const res = await handleGetCruiseCategoryApi();
  //   setCruiseCategory(res.cruiseCategory);
  // };

  // useEffect(() => {
  //   getCruiseCategory();
  // }, []);

  return (
    <>
      <Banner />
      <ReviewSections />
      <HomePartnersSection />
    </>
  );
}
export default FlightSearch;

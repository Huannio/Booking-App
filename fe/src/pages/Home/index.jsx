import Banner from "./Banner";
import ReviewSections from "./ReviewSections";
import PopularSections from "./PopularSections";
import HomeSection from "./HomeSection";
import HomePartnersSection from "./HomePartnersSection";
import BlogSection from "./BlogSection";
import { useEffect, useState } from "react";
import { handleGetCruiseCategoryApi } from "~/api";

function Home() {
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
      <PopularSections />
      <ReviewSections />
      <HomeSection cruiseCategory={cruiseCategory} />
      <HomePartnersSection />
      <BlogSection />
    </>
  );
}
export default Home;

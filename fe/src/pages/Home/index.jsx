import Banner from "./components/Banner";
import ReviewSections from "./components/ReviewSections";
import PopularSections from "./components/PopularSections";
import HomeSection from "./components/HomeSection";
import HomePartnersSection from "./components/HomePartnersSection";
import BlogSection from "./components/BlogSection";
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

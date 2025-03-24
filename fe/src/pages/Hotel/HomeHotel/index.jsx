import Banner from "./components/Banner";
import ReviewSections from "./components/ReviewSections";
import PopularSections from "./components/PopularSections";
import HomeSection from "./components/HomeSection";
import HomePartnersSection from "./components/HomePartnersSection";
import BlogSection from "./components/BlogSection";
import { handleGetCityApi } from "~/api";
import { useEffect, useState } from "react";

function HomeHotel() {
  const [cities, setCities] = useState([]);
  const getCities = async () => {
    const res = await handleGetCityApi();
    setCities(res.data);
  };

  useEffect(() => {
    getCities();
  }, []);

  return (
    <>
      <Banner cities={cities} />
      <PopularSections />
      <ReviewSections />
      <HomeSection cities={cities} />
      <HomePartnersSection />
      <BlogSection />
    </>
  );
}
export default HomeHotel;

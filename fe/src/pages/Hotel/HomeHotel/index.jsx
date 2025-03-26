import Banner from "./Banner";
import ReviewSections from "./ReviewSections";
import PopularSections from "./PopularSections";
import HomeSection from "./HomeSection";
import HomePartnersSection from "./HomePartnersSection";
import BlogSection from "./BlogSection";
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

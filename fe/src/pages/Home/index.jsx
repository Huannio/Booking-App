import Banner from './components/Banner';
import PopularSection from './components/PopularSections';
import ReviewSection from './components/ReviewSection';
import HomeSection from './components/HomeSection';
import HomePartnersSection from './components/HomePartnersSection';
import BlogSection from './components/BlogSection';

function Home() {
  return (
    <>
      <Banner />
      <PopularSection />
      <ReviewSection />
      <HomeSection />
      <HomePartnersSection />
      <BlogSection />
    </>
  );
}
export default Home;

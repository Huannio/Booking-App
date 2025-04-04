import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import classNames from "classnames/bind";

import styles from "./Hotel.module.scss";
import { handleGetHotelBySlugApi } from "~/api";
import BreadCrumbs from "./components/BreadCrumbs";
import Navigation from "./components/Navigation";
import Tabs from "~/components/Tabs";
import Features from "./components/Features";
import Rooms from "./components/Rooms";
import Intro from "./components/Intro";
import Rules from "./components/Rules";
import Ques from "./components/Ques";
import Map from "./components/Map";
import Sidebar from "./components/Sidebar";
import Carousel from "./components/Carousel";

const cx = classNames.bind(styles);

const tabList = [
  {
    id: "features",
    name: "Đặc điểm",
  },
  {
    id: "rooms",
    name: "Phòng & Giá",
  },
  {
    id: "intro",
    name: "Giới thiệu",
  },
  {
    id: "rules",
    name: "Quy định",
  },
  {
    id: "map",
    name: "Bản đồ và lịch trình",
  },
];

function Hotel() {
  const [data, setData] = useState([]);

  const { slug } = useParams();

  useEffect(() => {
    const getData = async () => {
      const data = await handleGetHotelBySlugApi(slug);
      setData(data.data);
    };
    getData();
  }, [slug]);

  return (
    <>
      <BreadCrumbs slug={slug} title={data.title} />
      <Navigation
        title={data.title}
        default_price={data.default_price}
        score_reviews={data.score_reviews}
        num_reviews={data.num_reviews}
        address={data.address}
      />

      <Carousel imagesString={data.images} thumbnail={data.thumbnail} />

      <Sidebar
        infoHeader="Thông tin du thuyền"
        year={data?.cruise?.year}
        cabin={data?.cruise?.cabin}
        shell={data?.cruise?.shell}
        trip={data?.cruise?.trip}
        admin={data?.cruise?.admin}
        mobile={true}
      />

      <div
        className={cx(
          "ShipDetail-shipDetail",
          "container flex flex-col gap-40"
        )}
      >
        <div className={cx("ShipDetail-tabs")}>
          <div>
            <Tabs list={tabList} />
          </div>
        </div>

        <div className="flex gap-32 w-full">
          <div className="flex flex-col gap-80 flex-grow">
            <Features
              id={tabList[0].id}
              features={data.features}
              shortDescProducts={data.short_desc_products}
            />

            <Rooms id={tabList[1].id} rooms={data.rooms} />

            <Intro
              id={tabList[2].id}
              longDescProducts={data.long_desc_products}
            />

            <Rules id={tabList[3].id} />

            <Ques />

            <Map
              id={tabList[4].id}
              title={data?.title}
              address={data?.address}
              schedule={data?.schedule}
              schedule_link={data?.cruise?.schedule_link}
              map_iframe_link={data?.map_iframe_link}
            />
          </div>

          <Sidebar
            infoHeader="Thông tin du thuyền"
            year={data?.hotel?.year}
            cabin={data?.hotel?.cabin}
            shell={data?.hotel?.shell}
            trip={data?.hotel?.trip}
            admin={data?.hotel?.admin}
          />
        </div>
      </div>
    </>
  );
}

export default Hotel;

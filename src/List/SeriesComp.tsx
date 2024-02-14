import React from "react";
import { Link } from "react-router-dom";
import TvSlide from "../main/TvSlide";
import TvKoreaList from "./TvKoreaList";
import TvTrendingWeekList from "./TvTrendingWeekList";
import TvTrendingDayList from "./TvTrendingDayList";
import TVAniList from "./TVAniList";

const SeriesComp = () => {
  return (
    <>
      {/* 헤더 사이즈만큼 아래로  */}
      <TvSlide />
      <div
        style={{
          zIndex: 20,
          paddingTop: `20px`,
          paddingBottom: `20px`,
          height: `80px`,
          marginBottom: `100px`,
        }}
      ></div>
      <div className="container">
        <TvTrendingDayList />
        <TvTrendingWeekList />
        <TvKoreaList />
        <TVAniList />
      </div>
    </>
  );
};
export default SeriesComp;

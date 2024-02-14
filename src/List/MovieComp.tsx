import React from "react";
import { Link } from "react-router-dom";
import MovieSlide from "../main/MovieSlide";
import MovieAniList from "./MovieAniList";
import MovieKoreaList from "./MovieKoreaList";
import MovieTrendingWeekList from "./MovieTrendingWeekList";
import MovieTrendingDayList from "./MovieTrendingDayList";

const MovieComp = () => {
  return (
    <>
      {/* 헤더 사이즈만큼 아래로  */}
      <MovieSlide />
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
        <MovieTrendingDayList />
        <MovieTrendingWeekList />
        <MovieKoreaList />
        <MovieAniList />
      </div>
    </>
  );
};
export default MovieComp;

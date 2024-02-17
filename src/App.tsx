import React from 'react';
import MainSlide from './main/MainSlide';
import TVAniList from './List/TVAniList';
import MainHeader from './main/MainHeader';
import MainFooter from './main/MainFooter';
import MypageCon from './mypage/MypageCon';
import MypageProfile from './mypage/MypageProfile';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './landing/Landing';
import LandingBanner from './landing/LandingBanner';
import SeriesComp from './List/SeriesComp';
import MovieComp from './List/MovieComp';
import TopButton from './main/TopButton';
import SearchList from './List/SearchList';
import MovieTrendingWeekList from './List/MovieTrendingWeekList';
import TvTrendingWeekList from './List/TvTrendingWeekList';


function App() {  
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <div>
              <MainHeader />
              <MainSlide />
              <MovieTrendingWeekList />
              <TvTrendingWeekList />
              <TVAniList />
              <TopButton />
              <MainFooter />
            </div>
          }/>
          <Route path="/myPage" element={
            <div>
                <MainHeader />
                <MypageProfile />
                <MypageCon />
                <TopButton />
                <MainFooter />
            </div>
          } />
          <Route path="/SeriesComp" element={
            <div>
              <MainHeader />
              <SeriesComp />
              <TopButton />
              <MainFooter />
            </div>
          } />
          <Route path="/MovieComp" element={
            <div>
              <MainHeader />
              <MovieComp />
              <TopButton />
              <MainFooter />
            </div>
          } />
          <Route path="/:search" element={
            <div>       
              <MainHeader />
              <SearchList />
            </div>
          } />        
          <Route path="/landing" element={
            <Landing />
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
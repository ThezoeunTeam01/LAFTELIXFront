import React from 'react';
import MainSlide from './main/MainSlide';
import TVAniList from './List/TVAniList';
import MainHeader from './main/MainHeader';
import MainFooter from './main/MainFooter';
//import MypageCon from './mypage/MypageCon';
import MypageProfile from './mypage/MypageProfile';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './landing/Landing';
import LandingBanner from './landing/LandingBanner';
import SeriesComp from './List/SeriesComp';
import MovieComp from './List/MovieComp';

function App() {  
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <div>
              <MainHeader />
              <MainSlide />
              <TVAniList />
              <LandingBanner />
              <MainFooter />
            </div>
          }/>
          <Route path="/myPage" element={
          <div>
              <MainHeader />
              <MypageProfile />
              {/* <MypageCon /> */}
              <MainFooter />
          </div>
          } />
          <Route path="/SeriesComp" element={
            <div>
              <MainHeader />
              <SeriesComp />
            </div>
          } />
          <Route path="/MovieComp" element={
            <div>
              <MainHeader />
              <MovieComp />
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
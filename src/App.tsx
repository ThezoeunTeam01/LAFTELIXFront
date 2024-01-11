import React from 'react';
import MainSlide from './main/MainSlide';
import MovieListNowPlaying from './List/MovieListNowPlaying';
import MainHeader from './main/MainHeader';
import MovieListUpcoming from './List/MovieListUpcoming';
import MovieListTopRated from './List/MovieListTopRated';
import MainFooter from './main/MainFooter';
import MypageCon from './mypage/MypageCon';
import MypageProfile from './mypage/MypageProfile';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {  
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <div>
              <MainHeader />
              <MainSlide />
              <MovieListNowPlaying />
              <MovieListUpcoming />
              <MovieListTopRated />
              <MainFooter />
            </div>
          }/>
          <Route path="/myPage" element={
          <div>
              <MainHeader />
              <MypageProfile />
              <MypageCon />
              <MainFooter />
          </div>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
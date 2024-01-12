import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import axios from "axios";
import { call } from "../service/ApiService";
import SelectMovie from "../List/SelectMovie";

interface IMovie {
  id: number;
  backdrop_path: string;
  title: string;
  poster_path: string;
}

interface LikeMovies {
  movieId: number;
}

function MypageCon() {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [likeMovieList, setLikeMovieList] = useState<LikeMovies[]>([]);

  const userId = localStorage.getItem("userId");

  const token = localStorage.getItem("ACCESS_TOKEN");

  const fetchData = async () => {

    if(token === null) {
      alert("로그인이 필요한 페이지입니다.");
      window.location.href="/";
      return;      
    }

    try {
      const movieListResponse = await call("/like/likeRead", "POST", { userId: userId });
      const movieList = movieListResponse.data;
      
      // 상태 업데이트
      setLikeMovieList(movieList);
      
      // 좋아요 영화 가져오기
      const moviePromises = movieList.map((movie:LikeMovies) =>
        axios.get(
          `https://api.themoviedb.org/3/movie/${movie.movieId}?api_key=9c8709e24862b7b00803591402286323&language=ko-KR`
        )
      );
      
      // axios 호출 결과 처리
      const movieResponses = await Promise.all(moviePromises);
      const movies = movieResponses.map(response => response.data);
      setMovies(movies);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);
  // 5개씩 묶어서 새로운 배열 생성
  const groupedMovies = [];
  for (let i = 0; i < movies.length; i += 5) {
    groupedMovies.push(movies.slice(i, i + 5));
  }

  const [showModal, setShowModal] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

  const openModal = (movieId: number) => {
    setSelectedMovieId(movieId);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedMovieId(null);
    setShowModal(false);
  };

  return (
    <Container>
      <Tabs
        defaultActiveKey="like"
        id="uncontrolled-tab-example"
        className="mb-5"
      >
        <Tab eventKey="like" title="찜 리스트">
          <div className="grid-container">
            {groupedMovies.map((group, index) => (
              <div key={index} className="grid-row">
                {group.map((movie: IMovie) => (
                  <div
                    key={movie.id}
                    className="grid-item mb30 hoverAnimation"
                    onClick={() => openModal(movie.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="grid-image"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Tab>

      </Tabs>
      {selectedMovieId && (
        <SelectMovie
          showModal={showModal}
          setShowModal={setShowModal}
          movieId={selectedMovieId}
          closeModal={closeModal}
        />
      )}
    </Container>
  );
}

export default MypageCon;
import React, { useState, useEffect, FC, Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Carousel, CarouselItem, Col, Container, Row } from "react-bootstrap";
// sass 파일
import '../style/custom.scss';

interface IMovie {
  id: number;
  backdrop_path: string;
  title: string;
  likeStatus?: boolean;
  poster_path:string;
}

interface ILikedMovie {
  userId: string;
  movieId: number;
}

const MovieListSimilar: FC = () => {

  const [movies, setMovies] = useState<IMovie[]>([]);

  const [likedMovies, setLikedMovies] = useState<ILikedMovie[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=9c8709e24862b7b00803591402286323`
        );
        const moviesWithLikeStatus = response.data.results.map(
          (movie: IMovie) => ({
            ...movie,
            likeStatus: likedMovies.some(
              (likedMovie: ILikedMovie) => likedMovie.movieId === movie.id
            ),
          })
        );
        setMovies(moviesWithLikeStatus);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [likedMovies]);


  // 3개씩 묶어서 새로운 배열 생성
  const groupedMovies = [];
  for (let i = 0; i < movies.length; i += 5) {
    groupedMovies.push(movies.slice(i, i + 5));
  }

  // arrow 버튼 커스텀
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number, e: any) => {
    setIndex(selectedIndex);
  };

  const handlePrev = () => {
    setIndex(index - 1);
  };

  const handleNext = () => {
    setIndex(index + 1);
  };
  return (
    <Container>
      {/* <h2 className="fs-3 mt-3 mb-3 text-light fw-bold">임시로 리스트 추가</h2> */}
      <div className="position-relative pt20">
      <Carousel className="w-100 my-custom-carousel"
      activeIndex={index}
      onSelect={handleSelect}
      interval={null}
      // prevIcon={<span aria-hidden="true" className="carousel-control-prev-icon" />}
      // nextIcon={<span aria-hidden="true" className="carousel-control-next-icon" />}
      nextIcon={null} // 기존 next 화살표 숨김
      prevIcon={null} // 기존 prev 화살표 숨김
      >{groupedMovies.map((group, index) => (
        <CarouselItem key={index} className="pt20">
            <Row>
              {group.map((movie: IMovie) => (
                <Col
                  key={movie.id}
                  className="hoverAnimation"
                  style={{width:`calc(100%/5)`}}
                >                  
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        width: "auto",
                        height: "auto",
                        borderRadius: "10px",
                        cursor:"pointer"
                      }}
                    />
                </Col>
              ))}
            </Row>
          </CarouselItem>
        ))}
      </Carousel>
      </div>

    </Container>
  );
};

export default MovieListSimilar;
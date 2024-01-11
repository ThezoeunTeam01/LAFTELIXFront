import React, { useState, useEffect, FC } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Carousel, CarouselItem, Col, Container, Row } from "react-bootstrap";
// sass 파일
import '../style/custom.scss';
import SelectMovie from "./SelectMovie";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

<style>
{`
  .my-custom-carousel .carousel-indicators {
    display: none important;
  }
`}
</style>

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

const MovieListUpcoming: FC = () => {

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

  const [movies, setMovies] = useState<IMovie[]>([]);
  const [userId, setUserId] = useState<string | null>(
    localStorage.getItem("userId")
  );
  const [likedMovies, setLikedMovies] = useState<ILikedMovie[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=9c8709e24862b7b00803591402286323`
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

  const handleLikeButtonClick = async (movieId: number) => {
    try {
      let newLikedMovies: ILikedMovie[];

      const isLiked = likedMovies.some(
        (likedMovie: ILikedMovie) => likedMovie.movieId === movieId
      );

      if (isLiked) {
        const response = await axios.post("/likeDelete", {
          userId: userId,
          movieId: movieId,
        });
        console.log("Like successfully deleted:", response.data);

        newLikedMovies = likedMovies.filter(
          (likedMovie: ILikedMovie) => likedMovie.movieId !== movieId
        );
      } else {
        const response = await axios.post("/likeCreate", {
          userId: userId,
          movieId: movieId,
        });
        console.log("Like successfully created:", response.data);

        newLikedMovies = [
          ...likedMovies,
          { userId: userId!, movieId: movieId },
        ];
      }

      setLikedMovies(newLikedMovies);
    } catch (error) {
      console.error("Error handling like:", error);
    }
  };

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

    <Container style={{paddingTop:`40px`, paddingBottom: `40px`}}>
      <h2 className="fs-3 mt-3 mb-3 text-light fw-bold">현재 상영작</h2>
      <div className="position-relative pt20">
      <Carousel className="w-100 my-custom-carousel"
      activeIndex={index}
      onSelect={handleSelect}
      interval={null}
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
                    <div onClick={() => {
                      openModal(movie.id)}
                    }
                    style={{cursor:`pointer`}}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        width: "auto",
                        height: "auto",
                        borderRadius: "10px"
                      }}
                    />
                    </div>                 
                </Col>
              ))}
            </Row>
          </CarouselItem>
        ))}
      </Carousel>
        <div className="position-absolute" style={{ textAlign: 'center', top:`50%`, 
        width: `100%`,
        display: `flex`,
        justifyContent: `space-between`,
        transform: `translateY(-50%)`,
        zIndex: 10
      }}>
          {/* arrow 버튼 커스텀 */}
          <Button onClick={handlePrev} disabled={index === 0} className="arrowBtnLeft">
          <FontAwesomeIcon icon={faChevronLeft} />
          </Button>
          <Button onClick={handleNext} disabled={index === groupedMovies.length - 1} className="arrowBtnRight">
            <FontAwesomeIcon icon={faChevronRight} />
          </Button>
        </div>
      </div>
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
};

export default MovieListUpcoming;
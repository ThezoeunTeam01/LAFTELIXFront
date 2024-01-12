import React, { useState, useEffect, FC } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel, CarouselItem, CarouselCaption, Container} from "react-bootstrap";
// sass 파일
import '../style/custom.scss';

interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  logo_path?: string; // 추가
  title: string;
  likeStatus?: boolean;
  overview: string;
}

interface ILikedMovie {
  userId: string;
  movieId: number;
}

const MainSlide: FC = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [userId, setUserId] = useState<string | null>(
    localStorage.getItem("userId")
  );
  const [likedMovies, setLikedMovies] = useState<ILikedMovie[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=9c8709e24862b7b00803591402286323&region=KR&language=ko-KR`
        );
        const moviesWithLogo = await Promise.all(
          response.data.results.map(async (movie: IMovie) => {
            const logoResponse = await axios.get(
              `https://api.themoviedb.org/3/movie/${movie.id}/images?api_key=9c8709e24862b7b00803591402286323&include_image_language=kr,en`
            );
            const logoPath = logoResponse.data.logos?.[0]?.file_path || "";
            return {
              ...movie,
              logo_path: logoPath,
              likeStatus: likedMovies.some(
                (likedMovie: ILikedMovie) => likedMovie.movieId === movie.id
              ),
            };
          })
        );
        setMovies(moviesWithLogo);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [likedMovies]);

  return (
    // interval={null} - 슬라이드 멈추고 싶으면 추가
    <Carousel fade className="" interval={null}>
      {movies.map((movie: IMovie) => (
        <CarouselItem key={movie.id}>
          <div className="vw-100 vh-100">
            <div className="w-100 h-100 position-absolute top-0 start-0 dimBg"></div>
            {/* <div className=""> */}
              <img
                src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                alt={movie.title}
                className="vw-100 vh-100"
                style={{objectFit: `cover`}}
              />
            {/* </div> */}
          </div>
          
            <Carousel.Caption>
            <Container>
              <div className="d-flex flex-column justify-content-end" style={{width:`45%`, marginBottom:`100px`}}>
                <div className="d-flex flex-column gap-5">
                  <div className="" style={{width: `100%` ,height: `300px`, display: `flex`, alignItems: `flex-end`}}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.logo_path}`}
                      alt={`${movie.title} logo`}
                      className="mw-100 mh-100" style={{objectFit: `contain`}}
                    />
                  </div>
                  <div className="fs-6" 
                    style={{ width:`80%`, overflow: 'hidden', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 3, lineHeight: 2 }}              
                    > {movie.overview}
                  </div>
                </div>
              </div>
              </Container>
            </Carousel.Caption>
        </CarouselItem>
      ))}
    </Carousel>
  );
};

export default MainSlide;

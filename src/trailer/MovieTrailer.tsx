import React, { useEffect, useState } from "react";
import axios from "axios";

interface MovieTrailer {
  key: string;
}

interface MovieTrailerProps {
  modalContentId: number;
}

const MovieTrailer: React.FC<MovieTrailerProps> = ({ modalContentId }) => {
  const [trailer, setTrailer] = useState<MovieTrailer | null>(null);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${modalContentId}/videos?api_key=9c8709e24862b7b00803591402286323`
        );

        const trailer = response.data.results.find(
          (video: { type: string }) => video.type === "Trailer"
        );

        setTrailer(trailer);
      } catch (error) {
        console.error("Error fetching trailer:", error);
      }
    };

    fetchTrailer();
  }, [modalContentId]);


  return (
    <div className="trailerMovieBox">
      {trailer ? (
        // 자동재생 , 음소거 설정 , 하단 컨트롤바 제거
        <iframe
          width="100vw"
          height="100vh"
          src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&controls=0&frameborder=0&showinfo=0&modestbranding=0&rel=0&allowfullscreen`} 
          title="YouTube video player"
          frameBorder="0"
          allowFullScreen
          className="block trailerMovieIframe"
        ></iframe>
      ) : (
        // 만약 동영상 없을 경우
        <div className="position-absolute top-50 start-50 translate-middle">
          <p className="text-white text-center">아직 트레일러 영상이 준비되지 않은 콘텐츠 입니다.<br /> 빠른 시일 내에 준비하도록 하겠습니다. <br /><br /> 감사합니다.</p>
        </div>
      )}
    </div>
  );
};

export default MovieTrailer;
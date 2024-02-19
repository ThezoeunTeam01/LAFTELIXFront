import React, { useState, useEffect, FC } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Carousel,
  CarouselItem,
  CarouselCaption,
  Container,
} from "react-bootstrap";
// sass 파일
import "../style/custom.scss";
import SelectContents from "../List/SelectContents";

interface Content {
  id: number;
  backdrop_path: string;
  poster_path: string;
  logo_path?: string; // 추가
  title: string;
  name: string;
  likeStatus?: boolean;
  overview: string;
  media_type: string;
}

const MainSlide: FC = () => {
  //슬라이드 변경 사항
  // 모두 = all 시리즈 = tv 영화 = movie
  const SlideType = "all";
  // 상세 검색 목록 추가(&language=ko는 생략)
  // TV discover 자료 https://developer.themoviedb.org/reference/discover-tv
  // Movie discover 자료 https://developer.themoviedb.org/reference/discover-movie
  const discover = "&with_watch_providers=8";

  const [contents, setContents] = useState<Content[]>([]);
  const [userId, setUserId] = useState<string | null>(
    localStorage.getItem("userId")
  );
  //모달 설정
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<string | "">("");
  const openModal = (contentId: number, contentType: string) => {
    setSelectedId(contentId);
    setSelectedType(contentType);
    setShowModal(true);
  };
  const resetModal = () => {
    setSelectedId(null);
    setSelectedType("");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/${SlideType}/week?api_key=9c8709e24862b7b00803591402286323${discover}&language=ko`
        );
        const contentsWithLogo = await Promise.all(
          response.data.results.map(async (content: Content) => {
            const logoResponse = await axios.get(
              `https://api.themoviedb.org/3/${content.media_type}/${content.id}/images?api_key=9c8709e24862b7b00803591402286323&include_image_language=kr,en`
            );
            const logoPath = logoResponse.data.logos?.[0]?.file_path || "";
            return { ...content, logo_path: logoPath };
          })
        );
        setContents(contentsWithLogo);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    // interval={null} - 슬라이드 멈추고 싶으면 추가
    <Carousel fade className="" interval={null}>
      {contents.map((content: Content) => (
        <CarouselItem key={content.id} style={{ cursor: `pointer` }}>
          <div className="vw-100 vh-100">
            <div className="w-100 h-100 position-absolute top-0 start-0 dimBg"></div>
            <img
              src={`https://image.tmdb.org/t/p/w1280/${content.backdrop_path}`}
              alt={content.title}
              className="vw-100 vh-100"
              style={{ objectFit: `cover` }}
            />
          </div>

          <Carousel.Caption>
            <Container
              onClick={() => {
                openModal(content.id, content.media_type);
              }}
            >
              <div
                className="d-flex flex-column justify-content-end"
                style={{ width: `45%`, marginBottom: `100px` }}
              >
                <div className="d-flex flex-column gap-5">
                  <div className="mainSlideLogoBox">
                    {content.logo_path === "" ? (
                      <h2 className="fs-3 text-white fw-bold mb-4">
                        {content.name}
                        {content.title}
                      </h2>
                    ) : (
                      <img
                        src={`https://image.tmdb.org/t/p/w500${content.logo_path}`}
                        alt={`${content.title} logo`}
                        className="mw-100 mh-100"
                        style={{ objectFit: `contain` }}
                      />
                    )}
                  </div>
                  <div className="fs-6 text-start mainCaptionBox">
                    {" "}
                    {content.overview}
                  </div>
                </div>
              </div>
            </Container>
          </Carousel.Caption>
        </CarouselItem>
      ))}
      {selectedId && (
        <SelectContents
          showModal={showModal}
          resetModal={resetModal}
          contentType={selectedType}
          contentId={selectedId}
        />
      )}
    </Carousel>
  );
};

export default MainSlide;
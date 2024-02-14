import React, { useState, useEffect, FC } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Carousel,
  CarouselItem,
  Col,
  Container,
  Row,
} from "react-bootstrap";
// sass 파일
import "../style/custom.scss";
import SelectContents from "./SelectContents";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface content {
  id: number;
  backdrop_path: string;
  title: string;
  likeStatus?: boolean;
  poster_path: string;
}

const TvTrendingDayList: FC = () => {
  //컨텐츠별 변경 사항 시작 - 여기 부분만 수정하면 됩니다.

  // TV or movie에 따른 변경 부분 (movie/tv)
  const contentType = "tv";

  // 상세 검색 목록 추가(&language=ko는 생략)
  // TV discover 자료 https://developer.themoviedb.org/reference/discover-tv
  // Movie discover 자료 https://developer.themoviedb.org/reference/discover-movie
  const discover =
    "with_origin_country=JP&with_genres=16&with_watch_providers=8";

  // 상단 타이틀 제목 변경
  const mainTitle = "오늘의 트렌드 TV 시리즈";

  //컨텐츠별 변경 사항 끝

  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const openModal = (contentId: number) => {
    setSelectedId(contentId);
    setShowModal(true);
  };
  const resetModal = () => {
    setSelectedId(null);
  };
  const [contents, setContents] = useState<content[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/${contentType}/day?api_key=9c8709e24862b7b00803591402286323&${discover}&language=ko-KR`
        );
        const content = response.data.results.map((content: content) => ({
          ...content,
        }));
        setContents(content);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // 5개씩 묶어서 새로운 배열 생성
  const grouped = [];
  for (let i = 0; i < contents.length; i += 5) {
    grouped.push(contents.slice(i, i + 5));
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
    <Container style={{ paddingTop: `40px`, paddingBottom: `40px` }}>
      <h2 className="fs-3 mt-3 mb-3 text-light fw-bold">{mainTitle}</h2>
      <div className="position-relative pt20">
        <Carousel
          className="w-100 my-custom-carousel"
          activeIndex={index}
          onSelect={handleSelect}
          interval={null}
          nextIcon={null} // 기존 next 화살표 숨김
          prevIcon={null} // 기존 prev 화살표 숨김
        >
          {grouped.map((group, index) => (
            <CarouselItem key={index} className="pt20">
              <Row>
                {group.map((content: content) => (
                  <Col
                    key={content.id}
                    className="hoverAnimation"
                    style={{ width: `calc(100%/5)` }}
                  >
                    <div
                      onClick={() => {
                        openModal(content.id);
                      }}
                      style={{ cursor: `pointer` }}
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w500${content.poster_path}`}
                        alt={content.title}
                        style={{
                          maxWidth: "100%",
                          maxHeight: "100%",
                          width: "100%",
                          height: "100%",
                          borderRadius: "10px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  </Col>
                ))}
              </Row>
            </CarouselItem>
          ))}
        </Carousel>
        <div
          className="position-absolute"
          style={{
            textAlign: "center",
            top: `50%`,
            width: `100%`,
            display: `flex`,
            justifyContent: `space-between`,
            transform: `translateY(-50%)`,
            zIndex: 10,
          }}
        >
          {/* arrow 버튼 커스텀 */}
          <Button
            onClick={handlePrev}
            disabled={index === 0}
            className="arrowBtnLeft"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </Button>
          <Button
            onClick={handleNext}
            disabled={index === grouped.length - 1}
            className="arrowBtnRight"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </Button>
        </div>
      </div>
      {selectedId && (
        <SelectContents
          showModal={showModal}
          resetModal={resetModal}
          contentType={contentType}
          contentId={selectedId}
        />
      )}
    </Container>
  );
};

export default TvTrendingDayList;

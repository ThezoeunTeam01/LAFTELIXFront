import React, { useState, useEffect, FC } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Carousel, CarouselItem, Col, Container, Row, } from "react-bootstrap";
// sass 파일
import "../style/custom.scss";
import { faChevronLeft, faChevronRight, } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SelectContents from "./SelectContents";
import internal from "stream";

interface Content {
  id: number;
  backdrop_path: string;
  title: string;
  likeStatus?: boolean;
  poster_path: string;
}
interface SelectContentsProps {
  contentType: string;
  contentId: number;
  setModalContentType: React.Dispatch<React.SetStateAction<string>>;
  setModalContentId: React.Dispatch<React.SetStateAction<number>>;
  // closeModal: () => void;
  // setModalControll: React.Dispatch<React.SetStateAction<boolean>>;
}

function ContentListSimilar({
  contentId,
  contentType,
  setModalContentId,
  setModalContentType,
}: SelectContentsProps) {
  //모달 관련
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  const openModal = (contentId: number) => {
    setModalContentId(contentId);
    setModalContentType(contentType);
  };

  const [contents, setContents] = useState<Content[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/${contentType}/${contentId}/similar?api_key=9c8709e24862b7b00803591402286323&language=ko-KR&with_watch_providers=8`
        );
        const contentsWithLikeStatus = response.data.results.map(
          (content: Content) => ({
            ...content,
          })
        );
        setContents(contentsWithLikeStatus);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [contentId, contentType]);

  // 3개씩 묶어서 새로운 배열 생성
  const groupedContents = [];
  for (let i = 0; i < contents.length; i += 5) {
    groupedContents.push(contents.slice(i, i + 5));
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
      {/* <h2 className="fs-3 mt-3 mb-3 text-light fw-bold">상영 예정작</h2> */}
      <div className="position-relative pt20">
        <Carousel
          className="w-100 my-custom-carousel"
          activeIndex={index}
          onSelect={handleSelect}
          interval={null}
          nextIcon={null} // 기존 next 화살표 숨김
          prevIcon={null} // 기존 prev 화살표 숨김
        >
          {groupedContents.map((group, index) => (
            <CarouselItem key={index} className="pt20">
              <Row>
                {group.map((content: Content) => (
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
                        className="posterImg"
                      />
                    </div>
                  </Col>
                ))}
              </Row>
            </CarouselItem>
          ))}
        </Carousel>
        <div className="position-absolute slideArrowBox">
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
            disabled={index === groupedContents.length - 1}
            className="arrowBtnRight"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default ContentListSimilar;

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
import { useParams } from "react-router-dom";

interface content {
  id: number;
  backdrop_path: string;
  title: string;
  likeStatus?: boolean;
  poster_path: string;
  media_type: string;
}

const SearchList: FC = () => {

  const {search} = useParams();

  //컨텐츠별 변경 사항 끝

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
  };
  const [contents, setContents] = useState<content[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/multi?query=${search}&api_key=9c8709e24862b7b00803591402286323&include_adult=false&language=ko-KR&page=1`
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
  }, [contents]);

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
    <div className="mt80">
    <Container style={{ paddingTop: `40px`, paddingBottom: `40px` }}>
      <h2 className="text-white mb-3">검색어 : {search}</h2>
      <div className="position-relative pt20 grid-container">
        {grouped.map((group, index) => (
            <div key={index} className="grid-row">
            {group.map((content: content) => (
              <div key={content.id} className="grid-item mb30 hoverAnimation">
                <div
                  onClick={() => {
                    openModal(content.id, content.media_type);
                  }}
                  style={{ cursor: `pointer` }}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${content.poster_path}`}
                    alt={content.title}
                    className="grid-image"
                  />
                </div>
              </div>
            ))}
          </div>
        ))}

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
          contentType={selectedType}
          contentId={selectedId}
        />
      )}
    </Container>
    </div>
  );
};

export default SearchList;

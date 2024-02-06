import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import axios from "axios";
import { call } from "../service/ApiService";
import SelectContents from "../List/SelectContents";

interface Content {
  id: number;
  backdrop_path: string;
  title: string;
  poster_path: string;
  type: string;
}

interface LikeContents {
  contentId: number;
  contentType: string;
}

function MypageCon() {
  const [contents, setContents] = useState<Content[]>([]);
  const [likeContentList, setLikeContentList] = useState<LikeContents[]>([]);
  const resetModal = () => {
    setSelectedId(null);
  };

  const userId = localStorage.getItem("userId");

  const token = localStorage.getItem("ACCESS_TOKEN");

  const fetchData = async () => {
    if (token === null) {
      alert("로그인이 필요한 페이지입니다.");
      window.location.href = "/";
      return;
    }

    try {
      const contentListResponse = await call("/like/likeRead", "POST", {
        userId: userId,
      });
      const contentList = contentListResponse.data;

      // 상태 업데이트
      setLikeContentList(contentList);

      // 좋아요 영화 가져오기
      const contentPromises = contentList.map((content: LikeContents) =>
        axios
          .get(
            `https://api.themoviedb.org/3/${content.contentType}/${content.contentId}?api_key=9c8709e24862b7b00803591402286323&language=ko-KR`
          )
          .then((response) => ({
            ...response.data, // 기존의 데이터를 펼쳐 넣고
            type: content.contentType, // 'Type' 대신 'type' 필드를 추가합니다. 인터페이스와 일치시킵니다.
          }))
      );
      // axios 호출 결과 처리
      const contentResponses = await Promise.all(contentPromises);
      setContents(contentResponses); // 응답 객체를 바로 사용합니다.
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  // 5개씩 묶어서 새로운 배열 생성
  const groupedContents = [];
  for (let i = 0; i < contents.length; i += 5) {
    groupedContents.push(contents.slice(i, i + 5));
  }

  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<string | "">("");

  const openModal = (ContentId: number, ContentType: string) => {
    setSelectedId(ContentId);
    setSelectedType(ContentType);
    setShowModal(true);
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
            {groupedContents.map((group, index) => (
              <div key={index} className="grid-row">
                {group.map((content: Content) => (
                  <div
                    key={content.id}
                    className="grid-item mb30 hoverAnimation"
                    onClick={() => openModal(content.id, content.type)}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w500${content.poster_path}`}
                      alt={content.title}
                      className="grid-image"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Tab>
      </Tabs>
      {selectedId && (
        <SelectContents
          showModal={showModal}
          resetModal={resetModal}
          contentType={selectedType}
          contentId={selectedId}
        />
      )}
    </Container>
  );
}

export default MypageCon;

import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { call } from "../service/ApiService";
import Reply from "../reply/Reply";
import ShowReply from "../reply/ShowReply";
import { ListGroup, Overlay, Tooltip } from "react-bootstrap";

import { Button, Container, Modal } from "react-bootstrap";
import { faHeart, faPlay, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

// sass 파일
import "../style/custom.scss";
import MovieListSimilar from "./MovieListSimilar";

// 로딩바 추가
import loadingBar from "../image/loadingBar.svg";

interface SelectContents {
  contentId: number;
  contentType: string;
  backdrop_path: string;
  title: string;
  overview: string;
  likeStatus?: boolean;
  poster_path: string;
}

interface ReplyInfos {
  rno: number;
  username: string;
  contentId: number;
  contentType: string;
  reply: string;
  img: string;
}

type ReplyInfo = {
  rno: number;
  username: string;
  contentId: number|null;
  contentType: string;
  reply: string;
  img: string;
};

interface SelectContentsProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  contentId: number;
  contentType: string;
  closeModal: () => void; // 새로운 함수 추가
}
interface LikeButton {
  isLiked: boolean;
}

function SelectContents({
  showModal,
  setShowModal,
  contentId,
  contentType, // 매개변수 이름 변경
  closeModal,
}: SelectContentsProps) {
  // 찜버튼 로그인 이벤트
  const [show, setShow] = useState(false);
  const target = useRef(null);
  // 토큰값 설정
  const accessToken = localStorage.getItem("ACCESS_TOKEN");

  // 찜한 영화 목록을 저장하는 상태
  const [contents, setContents] = useState<SelectContents | null>(null);
  const [isLiked, setIsLiked] = useState<LikeButton | false | true>(false);

  // API 정보 불러올 때까지 로딩바 처리하기
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // API 호출 전에 로딩 상태를 true로 설정
        setLoading(true);
        // 로그인시 토큰값으로 진행 검증
        if (accessToken != null) {
          const likeMoviesPromise = call("/like/likeReadButton", "POST", {
            userId: userId,
            contentId: contentId,
            contentType: contentType,
          });
          const likeMovies = await likeMoviesPromise;
          console.log("likeMovies:", likeMovies);
          // 리턴 받은 값이 없다면 id 값은 0입니다.
          if (likeMovies.id !== 0) {
            console.log(likeMovies.id);
            setIsLiked(true);
            //무비 아이디에 좋아요 표시될 경우 하트 이모티콘 색상 추가
            setHeartColor(true);
          }else{
            setIsLiked(false);
            setHeartColor(false);
          }
        }
        const response = await axios.get(
          `https://api.themoviedb.org/3/${contentType}/${contentId}?api_key=9c8709e24862b7b00803591402286323&language=ko-KR`
        );
        setContents(response.data);
        // API 호출 후에 데이터 설정 및 로딩 상태를 false로 설정
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [contentId]);
  // 사용자 찜 목록을 가져오는 함수

  // 컴포넌트가 마운트될 때 찜 목록을 가져오는 effect

  const userId = localStorage.getItem("userId");

  // 재생하기 버튼 색상 처리
  const [isPlayBtn, setisPlayBtn] = useState(false);
  const handlePlayBtnClick2 = () => {
    setisPlayBtn(!isPlayBtn);
  };

  // 하트 이모티콘 버튼 색상처리
  const [heartColor, setHeartColor] = useState(false);
  const handleLikeButtonClick = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (accessToken === null) {
      //토큰 값으로 진행 설정
      setShow(!show);
      // 토큰값 비어있을 때 하트 이모티콘 색상 없음
      setHeartColor(false);
    } else {
      try {
        if (isLiked) {
          const response = call("/like/likeDelete", "POST", {
            userId: userId,
            contentId: contentId,
            contentType: contentType,
          });
          setIsLiked(false);
          // 하트 이모티콘 클릭 시 하트 이모티콘 색상 없음
          setHeartColor(false);
          console.log("Like successfully deleted:", response);
        } else {
          const response = call("/like/likeCreate", "POST", {
            userId: userId,
            contentId: contentId,
            contentType: contentType,
          });
          setIsLiked(true);
          // 하트 이모티콘 클릭 시 하트 이모티콘 색상 추가
          setHeartColor(true);
          console.log("Like successfully created:", response);
        }
      } catch (error) {
        console.error("Error handling like:", error);
      }
    }
  };

  // 댓글 작업
  const username = localStorage.getItem("username") || "";
  const img = localStorage.getItem("img") || "";

  const [replyInfos, setReplyInfos] = useState<ReplyInfos[]>([]);

  const fetchData = async () => {
    // ID만 들어감 타입도 넣어줘야함
    const response = await call(`/reply?contentType=${contentType}&contentId=${contentId}`, "GET");
    setReplyInfos(response);
  };
  useEffect(() => {
    fetchData();
  }, []);

  // 댓글 등록
  const replySubmit = async (replyInfo: ReplyInfo) => {
    const response = await call("/reply/register", "POST", replyInfo);

    console.log("REGIS" + response.data);

    setReplyInfos(response.data);
  };

  const updateReplyInfos = async (replyInfo: ReplyInfo) => {
    console.log("re" + replyInfo.img);
    //const response = await call("/reply", "PUT", replyInfo);
    const response = await call("/reply/update", "PUT", replyInfo);

    console.log("PUT" + response.data);

    setReplyInfos(response);
  };

  const deleteReplyInfos = async (rno: number) => {
    const response = await call("/reply", "DELETE", { rno: rno });

    console.log(response);

    setReplyInfos(response);
  };

  // 모달 닫기 버튼 추가
  const closeModal1 = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Modal
        show={showModal}
        onHide={closeModal}
        size="xl"
        dialogClassName="modal-90w"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="bgColorBk borderTrans pd30 position-relative">
          <Button
            onClick={closeModal1}
            className="backTrans borderTrans position-absolute top-50 end-0 translate-middle-y"
          >
            <FontAwesomeIcon
              icon={faXmark}
              className="fs-4 btnAnimation closeBtn"
            />
          </Button>
        </Modal.Header>
        <Modal.Body className="bgColorBk" style={{ padding: `0px` }}>
          {loading ? (
            // API 불러오는 동안 노출될 로딩바
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ minHeight: `500px` }}
            >
              <img src={loadingBar} alt="My SVG" />
            </div>
          ) : (
            <div>
              {contents && (
                <div className="d-flex">
                  <div
                    className="h-100"
                    style={{
                      backgroundImage: `url('https://image.tmdb.org/t/p/w1280${contents.backdrop_path}')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      width: `calc(100% - 10px)`,
                    }}
                  >
                    {/* dim 레이어 - 검정막 */}
                    <Row
                      className="h-100 dimBg"
                      style={{ zIndex: 3, marginLeft: `0` }}
                    >
                      <Col
                        className="d-flex justify-content-start align-content-center"
                        style={{
                          marginLeft: `30px`,
                          marginTop: `30px`,
                          marginBottom: `30px`,
                        }}
                      >
                        {/* 영화 설명 */}
                        <div className="d-flex align-items-center">
                          <div>
                            <h2 className="fs-3 text-white fw-bold mb-4">
                              {contents.title}
                            </h2>
                            <h3
                              className="fs-6 text-white mb-4"
                              style={{ lineHeight: 1.5 }}
                            >
                              {contents.overview}
                            </h3>
                            <div className="d-flex">
                              <button
                                onClick={handlePlayBtnClick2}
                                ref={target}
                                className="btn fw-bold btnAnimation rounded-2"
                                style={{
                                  backgroundColor: `transparent`,
                                  border: `0px solid transparent`,
                                  padding: 0,
                                  marginRight: `30px`,
                                }}
                              >
                                <div
                                  className="rounded-2"
                                  style={{
                                    backgroundColor: isPlayBtn ? "red" : "#fff",
                                    padding: `15px 60px`,
                                    textAlign: `center`,
                                    color: isPlayBtn ? `white` : `black`,
                                  }}
                                >
                                  <FontAwesomeIcon
                                    icon={faPlay}
                                    style={{
                                      fontSize: "20px",
                                      cursor: "pointer",
                                    }}
                                  />
                                  &nbsp;재생하기
                                </div>
                              </button>
                              <Overlay
                                target={target.current}
                                show={show}
                                placement="right"
                              >
                                {(props) => (
                                  <Tooltip id="overlay-example" {...props}>
                                    먼저 로그인 해주세요.
                                  </Tooltip>
                                )}
                              </Overlay>

                              {/* 찜버튼 */}
                              <button
                                onClick={handleLikeButtonClick}
                                ref={target}
                                className="d-flex flex-column align-content-between justify-content-between"
                                style={{
                                  backgroundColor: `transparent`,
                                  border: `0px solid transparent`,
                                  padding: 0,
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={faHeart}
                                  className="fa-solid"
                                  style={{
                                    color: heartColor ? "red" : "#a3a3a3",
                                    fontSize: "30px",
                                    cursor: "pointer",
                                  }}
                                />
                                <span
                                  className="text-white"
                                  style={{ fontSize: `11px` }}
                                >
                                  좋아요
                                </span>
                              </button>
                              <Overlay
                                target={target.current}
                                show={show}
                                placement="right"
                              >
                                {(props) => (
                                  <Tooltip id="overlay-example" {...props}>
                                    먼저 로그인 해주세요.
                                  </Tooltip>
                                )}
                              </Overlay>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col
                        className="d-flex justify-content-end align-content-center"
                        style={{
                          marginRight: `30px`,
                          marginTop: `30px`,
                          marginBottom: `30px`,
                        }}
                      >
                        {/* 영화 포스터 img */}
                        <img
                          className="rounded"
                          src={`https://image.tmdb.org/t/p/w300${contents.poster_path}`}
                          alt={contents.title}
                          style={{ height: "100%" }}
                        />
                      </Col>
                    </Row>
                  </div>
                </div>
              )}{" "}
              {/* 무비맵 end */}
            </div>
          )}

          <Tabs
            defaultActiveKey="like"
            id="uncontrolled-tab-example"
            className="mb-3 mt-3 pr30 pl30"
          >
            <Tab eventKey="like" title="리뷰 댓글">
              {/* 리플 영역 */}
              <Reply
                username={username}
                contentId={contentId}
                contentType={contentType}
                img={img}
                replySubmit={replySubmit}
              />
              <ListGroup>
                {replyInfos &&
                  replyInfos.map((replyInfo) => (
                    <ShowReply
                      updateReplyInfos={updateReplyInfos}
                      deleteReplyInfos={deleteReplyInfos}
                      replyInfo={replyInfo}
                      key={replyInfo.rno}
                    />
                  ))}
              </ListGroup>
            </Tab>
            <Tab eventKey="home" title="비슷한 콘텐츠">
              <div className="pd30">
                {/* <MovieListSimilar /> */}
              </div>
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default SelectContents;
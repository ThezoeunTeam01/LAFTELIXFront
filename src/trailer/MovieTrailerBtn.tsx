import React, { useState } from "react";
import MovieTrailer from "./MovieTrailer";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo, faXmark } from "@fortawesome/free-solid-svg-icons";


// 타입 설정
interface MovieTrailerBtnProps {
  modalContentId: number;
  showModal1: boolean;
}

const MovieTrailerBtn: React.FC<MovieTrailerBtnProps> = ({ modalContentId, showModal1 }) => {
  const [showTrailer, setShowTrailer] = useState(false);

  const handleOpenTrailer = () => {
    setShowTrailer(true);
  };

  const handleCloseTrailer = () => {
    setShowTrailer(false);
  };

  // 재생하기 버튼 색상 처리
  const [isPlayBtn, setisPlayBtn] = useState(false);
  const handlePlayBtnClick2 = () => {
    setisPlayBtn(!isPlayBtn);
  };
  const [modalControll1, setModalControll1] = useState(showModal1);
  const closeModal1 = () => {
    setModalControll1(false);
  };

  return (
    <div>
      <button onClick={handleOpenTrailer} className="btn fw-bold btnAnimation rounded-2 trailerOpenBtn">                                
        <div className="rounded-2 trailerOpenBtnIconBox">
          <FontAwesomeIcon
            icon={faVideo}
            style={{ fontSize: "20px", cursor: "pointer",}}
          />
          &nbsp;&nbsp;트레일러
        </div>
      </button>
        {/* 트레일러 fullscreen 처리 */}
      <Modal show={showTrailer} fullscreen={true} onHide={handleCloseTrailer} >
        <Modal.Body className="position-relative p-0">
          <MovieTrailer modalContentId={modalContentId} />
          <Button onClick={handleCloseTrailer} className="position-absolute top-0 end-0 fs-4 backTrans borderTrans">
            <FontAwesomeIcon icon={faXmark} className="fs-4 btnAnimation closeBtn" />
          </Button>
        </Modal.Body>
      </Modal>
      {/* <button onClick={handleCloseTrailer}>Close Trailer</button> */}
    </div>
  );
};

export default MovieTrailerBtn;
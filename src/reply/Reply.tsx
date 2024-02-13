import React, { useEffect, useState } from "react";
import { Alert, Button, Form, Image } from "react-bootstrap";
// sass 파일
import '../style/custom.scss';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

import { ReactComponent as StarIcon } from '../image/star-fill.svg';
import styles from "../style/StarRating.module.css";

interface ReplyProps {
  username:string;
  contentType:string;
  contentId:number;
  img:string;
  replySubmit: (replyInfo:ReplyInfo) => void;
}

interface ReplyInfo {
  rno:number;
  username:string;
  contentId:number|null;
  contentType:string;
  reply:string;
  starRating:number;
  img:string;
}

function Reply({username, contentType, contentId, img, replySubmit}:ReplyProps) {
  const accessToken = localStorage.getItem("ACCESS_TOKEN"); // 토큰값 설정
  const [show, setShow] = useState(false); // 경고창 세팅

  const [replyInfo, setReplyInfo] = useState<ReplyInfo>({
    rno:0,
    username:"",
    contentType:"",
    contentId:null,
    reply:"",
    starRating:0,
    img:""
  });


  const inputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
      setReplyInfo({
        rno:0,
        username:username,
        contentType:contentType,
        contentId:contentId,
        img:img,
        reply:e.target.value,
        starRating:0
      })
  }

  // 별 5개를 생성하는 더미값
  const ARRAY = [0, 1, 2, 3, 4];

  // 별점 값을 저장하는 useState(초기값은 모두 false로 시작하여 클릭시 true로 바뀌도록 설정)
  const [starClicked, setStarClicked] = useState([false, false, false, false, false]);

  // 별점 위에서 마우스를 움직였을 때, 표기되는 별점 값을 저장하는 useState
  const [starHovered, setStarHovered] = useState(-1);

  // 별을 클릭했을 때, 그 값을 받아서 setStarClicked로 넘겨주는 설정. 클릭했을 때의 el값을 index로 받아서 처리.
  const handleStarClick = (index: number) => {
    console.log(index);
    setStarClicked((prevStarClicked) => {
      // 같은 별을 한 번 더 클릭하여 초기화하는 동작을 구분하기 위해 starClicked, prevStarClicked, newStarClicked 로 구분
      console.log(...prevStarClicked);
      const newStarClicked = [...prevStarClicked];
      
      // 같은 별점 칸을 한 번 더 클릭하면 해당 별점 값이 초기화되도록 설정
      if (newStarClicked[index]) {
        newStarClicked.fill(false);
      } else {
        for (let i = 0; i < 5; i++) {
          newStarClicked[i] = i <= index ? true : false;
        }
      }

      // 업데이트된 starRating 값을 가지고 replySubmit을 호출
      // const score = newStarClicked.filter(Boolean).length;
      // replySubmit({
      //   ...replyInfo,
      //   starRating: score,
      // });

      return newStarClicked;
    });
  };

  // 별점 위로 마우스를 움직였을 때, 값을 표시해주는(별에 불이 들어오는) 기능 설정
  const handleStarHover = (index: number) => {
    setStarHovered(index);
  };

  // 별점 밖으로 마우스를 움직였을 때, setStarHovered값을 초기화하는 기능 설정
  const handleMouseLeave = () => {
    setStarHovered(-1);
  };

  // 별점을 클릭했을 때, 변화를 감지하고 현재 클릭된 별점의 개수를 계산하여 콘솔에 출력하는 기능 설정
  useEffect(() => {
    sendReview();
  }, [starClicked]);

  
  const sendReview = () => {
    let score = starClicked.filter(Boolean).length;
    console.log("별점 :", score);
  };

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (accessToken == null) {
      // 토큰 값이 있는지 없는지에 따라서 댓글 처리
      setShow(true);
    } else {
      e.preventDefault();
      if (replyInfo.reply !== null) {
        replySubmit(replyInfo);
        setReplyInfo({
          rno: 0,
          contentType:"",
          username: "",
          contentId: null,
          img: "",
          reply: "",
          starRating:0
        });
      }
    }
  };

  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // 폼이 실제로 제출되지 않도록 기본 이벤트를 방지합니다.
      onClick(e as unknown as React.MouseEvent<HTMLButtonElement>); // onClick 함수를 호출합니다.
    }
  }
  return(
    <Form className="pd30 border-bottom border-2 border-dark">
      <h4 className="text-white fs-5 mb30 fw-bold">리뷰 작성하기</h4>
      <Row className="mb-2">
        <Col className={styles.Wrap}>
          <h1 className={styles.RatingText}>내 별점</h1>
          <div className="d-flex flex-column align-items-center">
            <span className="text-white fs-3">5.0</span>
            <div className={styles.Stars}>
              {ARRAY.map((el, idx) => {
                return (
                  <StarIcon
                    key={idx}
                    // size="30"
                    onMouseOver={() => handleStarHover(el)}
                    onClick={() => handleStarClick(el)}
                    onMouseLeave={handleMouseLeave}
                    className={
                      (starHovered !== -1 && starHovered >= el) || starClicked[el]
                        ? styles.redStar
                        : ""
                    }
                  />
                );
              })}
            </div>
          </div>
        </Col>

        <Col className={styles.Wrap}>
          <h1 className={styles.RatingText}>평균 별점</h1>
          <div className="d-flex flex-column align-items-center">
            <span className="text-white fs-3">5.0</span>
            <div className={styles.Stars}>
              {ARRAY.map((el, idx) => {
                return (
                  <StarIcon
                    key={idx}
                    // size="30"
                    onMouseOver={() => handleStarHover(el)}
                    onClick={() => handleStarClick(el)}
                    onMouseLeave={handleMouseLeave}
                    className={
                      (starHovered !== -1 && starHovered >= el) || starClicked[el]
                        ? styles.redStar
                        : ""
                    }
                  />
                );
              })}
            </div>
          </div>
        </Col>

        <Col>
        </Col>
      </Row>

        <Row>
        <Col className="">
          <Form.Group controlId="username" className="position-relative ">
            <Form.Control type="text" maxLength={200} placeholder="작품에 대한 평가를 남겨주세요!" value={replyInfo.reply} onChange={inputChange} onKeyDown={onEnter} className="replyInput" style={{padding: `20px`}}/>
            <Button type="button" value="등록" onClick={onClick} className="w-2 position-absolute top-50 translate-middle-y" style={{right: `10px`}}>
              <FontAwesomeIcon icon={faPenToSquare} />
            </Button>
          </Form.Group>
        </Col>
      </Row>
      <div>
        <Alert
          show={show}
          variant="danger"
          onClose={() => setShow(false)}
          dismissible
        >
          <Alert.Heading>
            <div className="fs-6">로그인 이후 댓글을 작성할 수 있습니다.</div>
          </Alert.Heading>
        </Alert>
      </div>
    </Form>
  );
}

export default Reply;
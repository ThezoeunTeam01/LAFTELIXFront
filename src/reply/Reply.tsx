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
import AverageRating from "./AverageRating";
import { call } from "../service/ApiService";

interface ReplyProps {
  id:string | null;
  username:string;
  contentType:string;
  contentId:number;
  img:string;
  replySubmit: (replyInfo:ReplyInfo) => void;
  ratingSubmit: (starInfo:StarInfo) => Promise<any>;
  setStarClicked: React.Dispatch<React.SetStateAction<boolean[]>>;
  starScore: number;
  setStarScore: React.Dispatch<React.SetStateAction<number>>;
  showModal: boolean;
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

interface StarInfo {
  rno:number;
  id:string | null;
  contentType:string;
  contentId:number;
  score:number;
  username:string;
}

function Reply({username, contentType, contentId, img, replySubmit, ratingSubmit, showModal}:ReplyProps) {
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

  const id = localStorage.getItem('userId');

  // 별 5개를 생성하는 더미값
  const ARRAY = [0, 1, 2, 3, 4];

  // 별점 값을 저장하는 useState(초기값은 모두 false로 시작하여 클릭시 true로 바뀌도록 설정)
  const [starClicked, setStarClicked] = useState([false, false, false, false, false]);

  // 별점 위에서 마우스를 움직였을 때, 표기되는 별점 값을 저장하는 useState
  const [starHovered, setStarHovered] = useState(-1);

  // 별점 클릭 결과를 저장할 state를 추가
  const [clickedStarScore, setClickedStarScore] = useState(0);

  // 별점 값을 상태로 관리
  const [starScore, setStarScore] = useState(0);


  // 별을 클릭했을 때, 그 값을 받아서 setStarClicked로 넘겨주는 설정. 클릭했을 때의 el값을 index로 받아서 처리.
  const handleStarClick = (index: number) => {
    if(accessToken!==null){
      console.log("StarRating-handleStarClick 컴포넌트 렌더링됨");
      setStarClicked((prevStarClicked) => {
        const newStarClicked = [...prevStarClicked];
    
        // 클릭한 별 이전까지만 true로 설정
        for (let i = 0; i <= index; i++) {
          newStarClicked[i] = true;
        }

        // 클릭한 별 이후의 별은 false로 설정
        for (let i = index + 1; i < 5; i++) {
          newStarClicked[i] = false;
        }
    
        // 클릭한 별의 점수 정보를 서버로 전송하여 등록 또는 업데이트
        const score = newStarClicked.filter(Boolean).length;
        console.log("StarRating-score 호출됨")
        const updatedStarInfo = {
          rno:0,
          id,
          contentType,
          contentId,
          score,
          username,
        };
    
        // 동일한 별점이 한 번 더 클릭되었을 때 삭제를 동작
        if (score === clickedStarScore) {
          // 별점 삭제 API 호출
          deleteRating(updatedStarInfo);
          
          // 별점을 삭제한 후 해당 별점을 초기화
          setStarScore(0); // 별점을 삭제하면 starScore도 0으로 설정
          setClickedStarScore(0); // 클릭한 별점 점수도 0으로 초기화
          return Array(5).fill(false);
        } else {
          // 등록 또는 업데이트 API 호출
          ratingSubmit(updatedStarInfo).then((response) => {
            // 서버로부터 응답을 받고 clickedStarScore 업데이트
            // setClickedStarScore(index + 1);
            setClickedStarScore(response.score);
          });      
    
          // 별점 값을 변경
          setStarScore(newStarClicked.filter(Boolean).length); // setStarScore 함수를 사용하여 별점 값을 변경
    
          return newStarClicked;
        }
      });
    } else{
      alert("로그인후 가능");
    }
  };  

  // Delete API 호출 함수
  const deleteRating = async (starInfo: {
      contentType: string; contentId: number; score: number; // 삭제할 별의 점수 정보
      username: string;
    }) => {
    try {
        // 별점 삭제 API 호출
        const response = await call("/star_rating/delete_rating", "DELETE", starInfo);
        console.log("별점 삭제 성공:", response);

        // 별점을 삭제한 후 해당 별점을 초기화
        setStarClicked(Array(5).fill(false));
        setStarScore(0); // 별점을 삭제하면 starScore도 0으로 설정
    } catch (error) {
        console.error("별점 삭제 중 오류 발생:", error);
    }
  };

  // 별점 위로 마우스를 움직였을 때, 값을 표시해주는(별에 불이 들어오는) 기능 설정
  const handleStarHover = (index: number) => {
    setStarHovered(index);
    setStarScore(index + 1); // 별점 값을 변경
  };

  // 별점 밖으로 마우스를 움직였을 때, setStarHovered값을 초기화하는 기능 설정
  const handleMouseLeave = () => {
    setStarHovered(-1);
    fetchRating(); // 마우스가 별점 밖으로 움직였을 때 별점 정보를 데이터베이스에서 가져옴
  };

  const fetchRating = async () => {
    // 별점 클릭 이후에만 fetchRating 함수 실행
    // if (!isStarClicked) return;
    console.log("Reply-fetchRating 실행");

    const response = await call(`/star_rating/retrieve_rating?id=${id}&contentType=${contentType}&contentId=${contentId}&username=${username}`, "GET");
    console.log("Reply-response", response);
    
    // response에서 별점 정보를 가져와서 화면에 표시
    const score = response.score;
    console.log("Reply-response-score", score);
    const newStarClicked = [false, false, false, false, false];
    for (let i = 0; i < score; i++) {
      newStarClicked[i] = true;
    }
    
    setStarClicked(newStarClicked);
    setStarScore(score);
  };

  // 별점을 클릭했을 때, 변화를 감지하고 현재 클릭된 별점의 개수를 계산하여 콘솔에 출력하는 기능 설정
  useEffect(() => {
    if (showModal) {
      fetchRating();
    }
    sendReview();
  }, [showModal]);
  
  const sendReview = () => {
    console.log("StarRating-sendReview 호출됨");
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
            <span className="text-white fs-3">{starScore || "0"}.0</span>
            <div className={styles.Stars}>
              {ARRAY.map((el, index) => {
                return (
                  <StarIcon
                    key={index}
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
            <div className={styles.Stars}>
              <AverageRating 
                contentType={contentType}
                contentId={contentId}
                starClicked={handleStarClick}
              />
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
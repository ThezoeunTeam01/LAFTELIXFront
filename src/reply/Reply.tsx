import React, { useState } from "react";
import { Alert, Button, Form, Image } from "react-bootstrap";
// sass 파일
import '../style/custom.scss';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

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
    img:""
  });


  const inputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
      setReplyInfo({
        rno:0,
        username:username,
        contentType:contentType,
        contentId:contentId,
        img:img,
        reply:e.target.value
      })
  }

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
      <Row>
        <Col xs={10} className="">
          <Form.Group controlId="username">
            <Form.Control type="text" maxLength={200} placeholder="reply" value={replyInfo.reply} onChange={inputChange} onKeyDown={onEnter} className="replyInput" />
          </Form.Group>
        </Col>
        <Col className="">
        <Form.Group controlId="submit">
          <Button type="button" value="등록" onClick={onClick} className="w-100">
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
            <div className="fs-6">로그인 이후 댓글을 작성 할 수 있습니다.</div>
          </Alert.Heading>
        </Alert>
      </div>
    </Form>
  );
}

export default Reply;
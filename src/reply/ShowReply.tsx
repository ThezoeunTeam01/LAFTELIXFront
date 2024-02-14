import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Form, FormText, Image, ListGroupItem } from "react-bootstrap";
import { call } from "../service/ApiService";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { faEllipsisVertical, faPencil, faTrashCan, faHeart, faThumbsUp, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ReplyInfo = {
  rno:number;
  contentType:string;
  username:string;
  contentId:number|null;
  reply:string;
  img:string;
}

type ShowReplyProps = {
  replyInfo:ReplyInfo;
  updateReplyInfos:(replyInfo:ReplyInfo) => void;
  deleteReplyInfos:(rno:number) => void;
}

function ShowReply({replyInfo, updateReplyInfos, deleteReplyInfos}:ShowReplyProps) {

  // 댓글 수정
  const [updateContent,setUpdateContent] = useState(replyInfo);

  // reaonly 관리
  const [isReadOnly, setIsReadOnly] = useState(true);

  const [button, setButton] = useState("수정");

  const changeInput = (e:React.ChangeEvent<HTMLInputElement>) => {
    setUpdateContent({...updateContent, reply:e.target.value});
  }

  //수정 버튼
  const updateButton = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if(button === "수정"){
      setButton("저장");
      setIsReadOnly(!isReadOnly);
    }else {
      console.log(updateContent);
      setButton("수정");
      setIsReadOnly(!isReadOnly);
      updateReplyInfos(updateContent);
    }
    
  }

  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // 폼이 실제로 제출되지 않도록 기본 이벤트를 방지합니다.
      updateButton(e as unknown as React.MouseEvent<HTMLButtonElement>); // onClick 함수를 호출합니다.
    }
  }
  // 삭제 버튼
  const deleteButton = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    deleteReplyInfos(replyInfo.rno);
  }

  // 댓글 좋아요
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("ACCESS_TOKEN");
  const [replyLikeColor, setReplyLikeColor] = useState(false);
  const replyLikeButton = async (e:React.MouseEvent<HTMLButtonElement>) => {
    if(token !== null){
      if(replyLikeColor === false) {
        console.log(replyInfo.rno);
        const response = await call("/reply/likeCreate","POST",{contentType: replyInfo.contentType,
                                                                contentId: replyInfo.contentId,
                                                                rno:replyInfo.rno,
                                                                username:username});
        console.log(response);
      }else {
        await call("/reply/likeDelete","DELETE",{contentType: replyInfo.contentType,
                                                contentId: replyInfo.contentId,
                                                rno:replyInfo.rno,
                                                username:username});
      }
      setReplyLikeColor(!replyLikeColor);
    } else {   
      alert("로그인 해주세요");
    }
  }
  const [likeCount, setLikeCount] = useState(0);
  useEffect(() => {
    const likeStatus = async () => {
      const response = await call(`/reply/likeList?contentType=${replyInfo.contentType}&contentId=${replyInfo.contentId}&rno=${replyInfo.rno}&username=${username}`,"GET");
      if(response.status === 0) {
        console.log("1번이냐");
        setReplyLikeColor(false);
      }else {
        console.log("2번이냐");
        setReplyLikeColor(true);
      }
    }
    likeStatus();

    const likeCount = async () => {
      const response = await call(`/reply/likeCount?contentType=${replyInfo.contentType}&contentId=${replyInfo.contentId}&rno=${replyInfo.rno}`,"GET");
      setLikeCount(response.count);
    }
    likeCount();
  },[replyLikeColor])


  return(
      <Form className="pd30 border-bottom border-dark">        
        <Row className="align-items-center mb-2"> 
          {/* 여기에 별점 표시 추가 */}

          {/* 별점 누르면 하위 컴포넌트 사라지는 이슈 있음 - 수정 요청 필요함. */}
          <Col className="">
            <Form.Group controlId="content">
              <Form.Label>
                <div className="d-flex gap-2 text-white align-items-center">
                   <FontAwesomeIcon icon={faStar} /> <FontAwesomeIcon icon={faStar} /> <FontAwesomeIcon icon={faStar} /> <FontAwesomeIcon icon={faStar} /> <FontAwesomeIcon icon={faStar} />
                  <span className="text-white fs-6">5.0</span>
                </div>
              </Form.Label>
            </Form.Group>
          </Col>
          <Col className="d-flex gap-2 justify-content-end align-items-center">
            <Form.Group controlId="content">
              <Form.Label>
                <div className="d-flex gap-2 align-items-center">
                  <span className="text-white fw-bold">{replyInfo.username}</span>
                  <Image src={`/image/${replyInfo.img}`} alt="img" className="rounded float-start" style={{width:`25px`, height:`25px`}}/>
                </div>
              </Form.Label>
            </Form.Group>
          </Col>
        </Row>  
        <Row>          
          <Col xs={10}>
            <Form.Group controlId="content">
              <Form.Control type="text"  maxLength={200} placeholder="reply" value={updateContent.reply} onChange={changeInput} readOnly={isReadOnly} onKeyDown={onEnter} className="replyInput" />
            </Form.Group>
          </Col>
          <Col className="d-flex col gap-2 justify-content-end">
            <Form.Group controlId="submit">
              <Button type="button" value={button} onClick={updateButton}>
                <FontAwesomeIcon icon={faPencil}/>
              </Button>
            </Form.Group>
            <Form.Group controlId="submit">
              <Button type="button" value="삭제" onClick={deleteButton} className="btn btn-secondary">
                <FontAwesomeIcon icon={faTrashCan} />
              </Button>
            </Form.Group>            
          </Col>
        </Row>
        <Row>
          <Col className="d-flex col gap-2 justify-content-start align-items-center">
          {/* 댓글 좋아요 버튼 */}
          <Form.Group controlId="submit">
            <span onClick={replyLikeButton} style={{ cursor: `pointer` }}>
              <FontAwesomeIcon icon={faThumbsUp} color={replyLikeColor ? "white":"gray"}/>
            </span>
          </Form.Group>
          <Form.Group controlId="content">
            <FormText className="text-white">
              {likeCount}
            </FormText>
          </Form.Group>
          </Col>
        </Row>
    </Form>
  );
}

export default ShowReply;
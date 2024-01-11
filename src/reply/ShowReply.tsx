import React, { ChangeEvent, useState } from "react";
import { Button, Form, Image, ListGroupItem } from "react-bootstrap";
import { call } from "../service/ApiService";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { faEllipsisVertical, faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ReplyInfo = {
  rno:number;
  username:string;
  movieId:number|null;
  content:string;
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
    setUpdateContent({...updateContent, content:e.target.value});
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

  return(
      <Form className="pd30 border-bottom border-dark">        
        <Row> 
          <Col className="">
            <Form.Group controlId="content">
              <Form.Label>
                <div className="d-flex gap-2">
                  <Image src={`/image/${replyInfo.img}`} alt="img" className="rounded float-start" style={{width:`30px`, height:`30px`}}/>
                  <p className="text-white fw-bold">{replyInfo.username}</p>
                </div>
              </Form.Label>
            </Form.Group>
          </Col>
        </Row>  
        <Row>          
          <Col xs={10}>
            <Form.Group controlId="content">
              <Form.Control type="text"  maxLength={200} placeholder="reply" value={updateContent.content} onChange={changeInput} readOnly={isReadOnly} onKeyDown={onEnter} className="replyInput" />
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
    </Form>
  );
}

export default ShowReply;
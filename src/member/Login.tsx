import React, { useEffect, useRef, useState } from "react";
import { Button, Container, Form, Modal, Overlay, Tooltip } from "react-bootstrap";
import { signin } from "../service/ApiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import SocialKaKao from "./SocialKakao";


type LoginProps = {
  show: boolean;
  onHide: () => void;
};

// 헤더 버튼에 연결하기 위해 수정
function Login({ show, onHide }: LoginProps) {
  const [modalShow, setModalShow] = useState<boolean>(false);
  //
  const [loginShow, setLoginShow] = useState(false);
  const target = useRef(null);

  const showModal = () => setModalShow(true);
  const closeModal = () => {
    // closeModal 함수 구현
    setModalShow(false);
    onHide(); // onHide 함수 호출
  };

// function Login( show, onHide) {

//   const [show, setShow] = useState<boolean>(false);

//   const showModal = () => setShow(true);
//   const closeModal = () => setShow(false);

  const [loginInfo, setLoginInfo] = useState({
    username:"",
    password:""
  });

  const change = (e:React.ChangeEvent<HTMLInputElement>) => {
    setLoginInfo({
      ...loginInfo,
      [e.target.name]:e.target.value
    });
    
  };

  const login = async () => {
    const response = await signin(loginInfo);
    if(response === "login_fail") {
      ;
    }
  }

  return(
    // <div
    //   className="modal show" show={show} onHide={onHide}
    //   style={{ display: 'block', position: 'initial'}}
    // >
    <div className={`modal ${show ? 'show' : ''}`} style={{ display: 'block', position: 'initial'}}>
      {/* <Button onClick={showModal} style={{ marginTop: '10px' }} >로그인 모달 모달</Button> */}
      <Container className="position-relative">

      {/* Vertically centered */}
      <Modal className="text-light" show={show} aria-labelledby="contained-modal-title-vcenter" centered>
      
        <Modal.Body className="bgColorBk pd20">
        <Button onClick={closeModal} className="backTrans borderTrans position-absolute end-0" style={{top:`10px`}}><FontAwesomeIcon icon={faXmark} className="fs-4" /></Button>
          <Modal.Title className="text-left pt40 fs-3">로그인</Modal.Title>
          <Form className="pt40 pb40">
            <Form.Group className="mb30" controlId="username">
              <Form.Label>아이디</Form.Label>
              <Form.Control type="text" name="username" placeholder="아이디 입력" value={loginInfo.username} onChange={change} className="customInput"/>
            </Form.Group>

            <Form.Group className="mb30" controlId="password">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control type="password" name="password" value={loginInfo.password} placeholder="비밀번호 입력" onChange={change} className="customInput"/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="submit">
              <Button ref={target} as="input" type="button" value="Login" style={{width:`100%`}} onClick={login} className="submitBtn fs-5 font-bold" />
              <Overlay target={target.current} show={loginShow} placement="right">
              {(props) => (
                <Tooltip id="overlay-example" {...props}>
                  아이디와 비밀번호를 확인해 주세요.
                </Tooltip>
              )}
            </Overlay>

            <SocialKaKao />
          </Form.Group>
          </Form>

        </Modal.Body>
 
      </Modal>
      </Container>
    </div>
  );
}

export default Login;
import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, Modal, Nav, Overlay, Row, Tooltip } from "react-bootstrap";
import { call, signin } from "../service/ApiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faXmark } from "@fortawesome/free-solid-svg-icons";
import SocialKaKao from "./SocialKakao";
import Register from "./Register";
// import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom" 


type Props = {
  email:string;
  regidentNumber:number;
  gender:string;
}

type LoginProps = {
  show: boolean;
  setLoginModalShow: React.Dispatch<React.SetStateAction<boolean>>;
  onHide: () => void;
};

// 헤더 버튼에 연결하기 위해 수정
function Login({ show, onHide, setLoginModalShow }: LoginProps) {

  const [propsInfo, setPropsInfo] = useState<Props>({
    email:"",
    regidentNumber:0,
    gender:""
  });

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


  // 로그인 실패시 실패 문구 출력
  const [falseLogin, setFalseLogin] = useState(false);

  const login = async () => {
    const response = await signin(loginInfo);
    if(response === "login_fail") {
      setFalseLogin(true);
    }
  }


    // input type password <-> text 으로 변경 설정
    const [passwordType, setPasswordType]=useState('password');
    // input type password eyes 버튼 클릭 변경 설정
    const [eyeIcon, setEyeIcon]=useState(<FontAwesomeIcon icon={faEyeSlash} />);
  
    const eyeIconOn = <FontAwesomeIcon icon={faEye} />;
    const eyesIconOff = <FontAwesomeIcon icon={faEyeSlash} />; 
  
    // eye 아이콘 클릭 시, 타입 변경 및 아이콘 변경
    const clickPasswordToggle=()=>{    
      if(passwordType==='password'){
        setEyeIcon(eyeIconOn);      
        setPasswordType('text');
      }
      else{
        setEyeIcon(eyesIconOff);     
        setPasswordType('password');
      }
    }

    const [registerModalShow, setRegisterModalShow] = useState(false);
    const handleRegisterClick = () => setRegisterModalShow(true);

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
          <Form className="pt40 pb20">
            <Form.Group className="mb30" controlId="username">
              <Form.Label>아이디</Form.Label>
              <Form.Control type="text" name="username" placeholder="아이디 입력" value={loginInfo.username} onChange={change} className="customInput"/>
            </Form.Group>

            <Form.Group className="mb30" controlId="password">
              <Form.Label>비밀번호</Form.Label>
              <div className="position-relative">
                <Form.Control type={passwordType} name="password" value={loginInfo.password} placeholder="비밀번호 입력" onChange={change} className="customInput"/>
                <span onClick={clickPasswordToggle} className="position-absolute position-absolute top-50 end-0 translate-middle cursor-pointer">
                  {eyeIcon}
                </span>
              </div>
            </Form.Group>

            <Form.Group className="mt-3 mb-3" controlId="submit">
              <Button ref={target} as="input" type="button" value="Login" style={{width:`100%`}} onClick={login} className="submitBtn fs-5 font-bold" />
              <Overlay target={target.current} show={falseLogin} placement="right">
              {(props) => (
                <Tooltip id="overlay-example" {...props}>
                  아이디와 비밀번호를 확인해 주세요.
                </Tooltip>
              )}
            </Overlay>

            <SocialKaKao/>

            <Row className="mt-5">
              <Col sm={8}>
                <span className="text-white-50">
                  아직 회원이 아니라면? 
                </span>
              </Col>
              <Col sm={4}>
                <Nav.Link onClick={handleRegisterClick} className="text-white text-end">
                  회원가입
                </Nav.Link>
              </Col>
            </Row>
            
          </Form.Group>
          </Form>

        </Modal.Body>
 
      </Modal>
      </Container>
            {/* 회원가입 모달 */}
            <div className="postion-absolute" style={{top:`80px`}}>
        <Register show={registerModalShow} onHide={() => setRegisterModalShow(false)} setLoginModalShow={setLoginShow} propsInfo={propsInfo} />         
      </div>
    </div>
  );
}

export default Login;
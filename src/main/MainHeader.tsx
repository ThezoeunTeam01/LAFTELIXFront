import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import mainLogo from '../image/logo.png';
import { Button, Form, Image, NavDropdown, Overlay } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
//import { showModal, closeModal } from '../member/Login'; // Login.tsx에서 함수들을 불러옴

import Login from '../member/Login'; // Login.js 파일을 import
import Register from '../member/Register'; // Register.js 파일을 import
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCaretDown } from "@fortawesome/free-solid-svg-icons";


function MainHeader() {
  const [show, setShow] = useState(false);
  const target = useRef(null);

  // 스크롤링 시 네비게이션 바 색상 변경 
  const [scrolling, setScrolling] = useState(false);

  // 로그인 페이지, 회원가입 페이지 불러오기 시작 --
  const [loginModalShow, setLoginModalShow] = useState(false);
  const [registerModalShow, setRegisterModalShow] = useState(false);

  const handleLoginClick = () => setLoginModalShow(true);
  const handleRegisterClick = () => setRegisterModalShow(true);
  // 로그인 페이지, 회원가입 페이지 불러오기 끝--

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolling(scrollTop > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };

  }, []);

  const toggleIcon = show ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  );

  const token = localStorage.getItem("ACCESS_TOKEN");
  const username = localStorage.getItem("username");
  const img = localStorage.getItem("img");
  
  const handleLogOut = (e:React.MouseEvent<HTMLElement>) => {
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    localStorage.removeItem("img");
    window.location.href="/";
  }

  let headerLogin = null;

  if(token != null) {
    headerLogin = (
    <div className="d-flex">
      {/* <FontAwesomeIcon icon={faBell} /> */}
      <div className="d-flex">
        <Navbar bg="" data-bs-theme="dark">
        <NavDropdown 
            title={<div className="d-flex align-items-center gap-2 position-absolute" 
            style={{top:`5px`}}>
            <Image src={`/image/${img}`} alt="img" className="rounded" style={{ width: '30px', height: '30px' }} />
            <span><FontAwesomeIcon icon={faCaretDown} style={{color:`#fff`}}/></span></div>} 
            id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">
            <div className="d-flex align-items-center gap-4">
              <Image src={`/image/${img}`} alt="img" className="rounded" style={{width:`40px`, height:`40px`}} />
              <div>
                <span className="fs-5 fw-bold">{username} 님</span>
                <div>환영합니다</div>
              </div>
            </div>
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="/mypage">마이페이지</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.3" onClick={handleLogOut}>로그아웃</NavDropdown.Item>
        </NavDropdown>
        </Navbar>
        
      </div>
      {/* <Nav.Link href="/mypage" className="text-white">마이페이지</Nav.Link> */}
      
    </div>
    )
  }else{
    headerLogin = (
    <div className="d-flex">
      <Nav.Link onClick={handleLoginClick} className="text-white">
        로그인
      </Nav.Link>
      <Nav.Link onClick={handleRegisterClick} className="text-white">
        회원가입
      </Nav.Link>
    </div>
    )
  }

  return (
    <Navbar fixed="top" style={{zIndex:20, paddingTop:`20px`, paddingBottom:`20px`, height:`80px`,
    background: scrolling ? 'linear-gradient(to bottom, black, black)' : 'linear-gradient(to bottom, black, rgba(0, 0, 0, 0.4))' }}>
      <div className="position-absolute" style={{ width: "100%", height:`80px`}}>
      <Container className="position-relative">
        <div className="d-flex align-items-center" style={{ width: "100%", height:`80px`}}>
        <Navbar.Brand href="/">
          <img src={mainLogo} style={{ width: "100px" }} />
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/" className="text-white">홈</Nav.Link>
          {/* <Nav.Link href="/mypage" className="text-white">마이페이지</Nav.Link> */}
        </Nav>
        <Nav className="d-flex justify-content-end text-white">
          <Button variant="black" ref={target} onClick={() => setShow(!show)} className="text-white">
            {toggleIcon}
          </Button>
          <Overlay target={target.current} show={show} placement="left">
            {({
              placement,
              arrowProps,
              show,
              popper,
              hasDoneInitialMeasure,
              ...props
            }) => (
              <Form
                className="d-flex position-fixed"
                {...props}
                style={{
                  position: "fixed",
                  padding: "auto auto",
                  borderRadius: 3,
                  ...props.style,
                  zIndex:1000,
                  top:"20px",
                  right:"26%",
                  transform: "none !important"
                }}
              >
                <Form.Control
                  type="search"
                  placeholder=""
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="light">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </Button>
              </Form>
            )}
          </Overlay>
          {headerLogin}
          
        </Nav>
        </div>
      </Container>
      </div>
      {/* 로그인 모달 */}
      <div className="postion-absolute" style={{top:`80px`}}>
        <Login show={loginModalShow} onHide={() => setLoginModalShow(false)} />
      </div>
      {/* 회원가입 모달 */}
      <div className="postion-absolute" style={{top:`80px`}}>
        <Register show={registerModalShow} onHide={() => setRegisterModalShow(false)} />         
      </div>
    </Navbar>
  );
}

export default MainHeader;

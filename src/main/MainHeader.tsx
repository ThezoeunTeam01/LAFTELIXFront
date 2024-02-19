import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import mainLogo from '../image/logo.png';
import { Button, Form, Image, Modal, NavDropdown, Overlay } from "react-bootstrap";
import React, { useEffect, useRef, useState } from "react";
//import { showModal, closeModal } from '../member/Login'; // Login.tsx에서 함수들을 불러옴

import Login from '../member/Login'; // Login.js 파일을 import
import Register from '../member/Register'; // Register.js 파일을 import

//
import MypageProfile from '../mypage/MypageProfile';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom" 
import { NavLink } from 'react-router-dom';
import { call } from "../service/ApiService";

type Props = {
  email:string;
  regidentNumber:number;
  gender:string;
}

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
  

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    setScrolling(scrollTop > 0);
  };

  // 컴포넌트가 마운트될 때 이벤트 리스너 추가
  window.addEventListener('scroll', handleScroll);

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
  
  const [imageUrl, setImageUrl] = useState<string>('');

  // useEffect 사용해서 컴포넌트가 처음 마운트될 때만 실행되도록 처리
  useEffect(() => {
    // 로컬 스토리지에서 이미지 URL을 가져와서 업데이트
    const interval = setInterval(() => {
      const storedImageUrl = localStorage.getItem('img');
      setImageUrl(storedImageUrl || '');
    }); 
    // 컴포넌트가 언마운트될 때 interval을 클리어  
    return () => clearInterval(interval); 
  }, []); 

  
  const handleLogOut = (e:React.MouseEvent<HTMLElement>) => {
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    localStorage.removeItem("img");
    window.location.href="/";
  }

  // 인가 코드
  const [registerContinueModal,setRegisterContinueModal] = useState(false);
  const code = new URL(window.location.href).searchParams.get("code");

  const [propsInfo,setPropsInfo] = useState({
    email:"",
    regidentNumber:0,
    gender:""
  });

  useEffect(() => {
   const fetchData = async () => {
        
       if(code!==null) {
        const response = await call(`/member/socialLogin?code=${code}`,"GET");
       if(response.status==="not-exist"&& code!=null) {
         setRegisterContinueModal(true);
         console.log(response.regidentNumber);
         console.log(response.gender);
         console.log(response.email);
         setPropsInfo({
          email: response.email,
          regidentNumber: response.regidentNumber,
          gender: response.gender
        });


       } else {
          localStorage.setItem("ACCESS_TOKEN", response.token);
          localStorage.setItem("userId", response.id);
          localStorage.setItem("username",response.username);
          localStorage.setItem("img",response.img);
          window.location.href="/";
       }
       }
   }
   fetchData();
  },[]);

  const ContinueConfirm = (e:React.MouseEvent<HTMLButtonElement>) => {
    setRegisterContinueModal(false);
    setRegisterModalShow(true);
  }

  const ContinueCalcel = (e:React.MouseEvent<HTMLButtonElement>) => {
    setRegisterContinueModal(false);
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
            <Image src={`/image/${imageUrl}`} alt="img" className="rounded" style={{ width: '30px', height: '30px' }} />
            <span><FontAwesomeIcon icon={faCaretDown} style={{color:`#fff`}}/></span></div>} 
            id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">
            <div className="d-flex align-items-center gap-4">
              <Image src={`/image/${imageUrl}`} alt="img" className="rounded" style={{width:`40px`, height:`40px`}} />
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

  // 검색 기능 구현

  const navigate = useNavigate();

  const SearchChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    navigate(`/${e.target.value}`);
  }

  return (
    <Navbar fixed="top" style={{zIndex:20, paddingTop:`20px`, paddingBottom:`20px`, height:`80px`,
    background: scrolling ? 'linear-gradient(to bottom, black, black)' : 'linear-gradient(to bottom, black, rgba(0, 0, 0, 0.03))' }}>
      <div className="position-absolute" style={{ width: "100%", height:`80px`}}>
      <Container className="position-relative">
        <div className="d-flex align-items-center" style={{ width: "100%", height:`80px`}}>
        <Navbar.Brand href="/">
          <img src={mainLogo} style={{ width: "100px" }} />
        </Navbar.Brand>
        <Nav className="me-auto align-items-center">
          <NavLink to='/' className="text-white text-decoration-none">홈</NavLink>
          <NavLink to='/SeriesComp' className='nav-link' style={({isActive}) => (isActive ? { textDecoration: 'none', color: 'red', fontWeight: 'bold'}:{textDecoration: 'none', color: 'white'})}>
          시리즈
          </NavLink>          
          <NavLink to='/MovieComp' className='nav-link' style={({isActive}) => (isActive ? { textDecoration: 'none', color: 'red', fontWeight: 'bold'}:{textDecoration: 'none', color: 'white'})}>
            영화
          </NavLink>
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
                  type="text"
                  placeholder=""
                  className="me-2"
                  aria-label="Search"
                  onChange={SearchChange}
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
        <Login show={loginModalShow} setLoginModalShow={setLoginModalShow} onHide={() => setLoginModalShow(false)} />
      </div>
      {/* 회원가입 모달 */}
      <div className="postion-absolute" style={{top:`80px`}}>
        <Register show={registerModalShow} onHide={() => setRegisterModalShow(false)} setLoginModalShow={setLoginModalShow} propsInfo={propsInfo} />         
      </div>
      <div className="postion-absolute" style={{top:`80px`}}>
        <Modal show={registerContinueModal} centered>
          <Modal.Body>
            <Modal.Title className="text-center mb40 fs-3">회원이 아닙니다.회원가입을 진행하시겠습니까?</Modal.Title>
            <Button onClick={ContinueCalcel}>취소</Button>
            <Button onClick={ContinueConfirm}>확인</Button>
          </Modal.Body>
        </Modal>
      </div>
    </Navbar>
  );
}

export default MainHeader;
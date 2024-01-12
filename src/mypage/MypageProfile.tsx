import React, { useEffect, useState } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, ButtonGroup, Container, Form, Image, Modal, Stack, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { call } from "../service/ApiService";
// style 파일
import styles from "../style/Profile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faXmark } from "@fortawesome/free-solid-svg-icons";

type UserInfo = {
  id:string|null;
  username:string;
  password:string;
  gender:string;
  regidentNumber:number|string;
  email:string;
  sns?:string;
  img?:string;
};

function MypageProfile() {

  // 로그아웃 처리
  const handleLogOut = (e:React.MouseEvent<HTMLElement>) => {
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    localStorage.removeItem("img");
    window.location.href="/";
  }

  // 로컬스토리지에서 유저 정보 받아오기
  const username = localStorage.getItem("username");
  const img = localStorage.getItem("img");

  const [show1, setShow1] = useState<boolean>(false);
  const [show2, setShow2] = useState<boolean>(false);
  
  // 유저 값 초기화
  const [userInfo, setUserInfo] = useState<UserInfo>({
    id:"",
    username:"",
    password:"",
    gender:"",
    regidentNumber:"",
    email:"",
    img:""
  });

  useEffect(() => {
  }, [userInfo]);   // userInfo가 업데이트될 때만 useEffect 실행

  // username 글 제한
  const [count, setCount] = useState(0);

  //인풋 값 저장
  const inputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]:e.target.value
    });
    setCount(e.target.value.length);
  };

  // const [imageInfo, setImageInfo] = useState<UserInfo>({
   
  // });

  // img값 저장
  const selectImage = (value:string) => {
    setUpdateUser({
      ...updateUser,
      img:value,
    });
    // setUserInfo({
    //   ...userInfo,
    //   img:value
    // });
  };

  // 성별 값 구분
  const radios = [
    { name: '남성', value: 'M' },
    { name: '여성', value: 'W' }
  ];

  // 연령대 구분
  const rnum = [
    { name: '10대', value: '10'},
    { name: '20대', value: '20'},
    { name: '30대', value: '30'},
    { name: '40대', value: '40'},
    { name: '50대', value: '50'},
    { name: '60대 이상', value: '60'}
  ];

  const userId = localStorage.getItem("userId");
  const [updateUser, setUpdateUser] = useState<UserInfo>({
    id:userId,
    username:"",
    password:"",
    gender:"",
    regidentNumber:"",
    email:"",
    sns:"",
    img:""
  });

  const updateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateUser({
      ...updateUser,
      [e.target.name]: e.target.value
    });
  };

  const formSubmit1 = async (e:React.MouseEvent<HTMLButtonElement>) => {
    try{
      await call("/member","PUT",updateUser);
      
      if(updateUser.img) localStorage.setItem("img",updateUser.img);

      localStorage.setItem("username",updateUser.username);

      await call("/reply/updateImg","PUT",{username:updateUser.username, img:updateUser.img});

      // 모달을 닫음
      closeModal1();
    }catch(error) {
      console.error("오류 발생",error);
    }
  }

  const formSubmit2 = async (e:React.MouseEvent<HTMLButtonElement>) => {
    
    closeModal2();
   
  };

  const showModal1 = () => setShow1(true);
  const closeModal1 = async () => {
    const response = await call(`/member?id=${userId}`, "GET");
    setUpdateUser({
      ...response,
      id: response.id
    });
    setShow1(false);
  };

  const showModal2 = () => setShow2(true);
  const closeModal2 = () => setShow2(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await call(`/member?id=${userId}`, "GET");
        // 기존에 불러온 정보에 대한 id값도 설정
        setUpdateUser({
          ...response,
          id: response.id
        });


      } catch (error) {
        console.error('데이터를 불러오는 중 오류 발생:', error);
      }
    };
    fetchData();
  },[userId]);

  const deleteProfile = async () => {
    try {
      // 서버 측 API 엔드포인트에 DELETE 요청을 보냅니다.
      // 예시: "/api/profile/:userId"
      await call(`/member?id=${userId}`, "DELETE");
      // 삭제가 성공하면 로컬 스토리지에서도 관련된 정보를 제거합니다.
      localStorage.removeItem("userId");
      localStorage.removeItem("username");
      localStorage.removeItem("img");
      localStorage.removeItem("ACCESS_TOKEN");
      window.location.href="/";
    } catch (error) {
      console.error("프로필 삭제 실패", error);
    }
  };


  // 프로필 모달 닫기 버튼 추가
  const closeProfileModal = () => {
    setShow2(false);
  };


  return (
    <div className="mt80">
    <Container className="ptb80 ">
      <Row className="w-100 d-flex">
        <Col xs lg="2">
          <Image className="w-100" src={`/image/${img}`} rounded />
        </Col>
        <Col md="auto" className="d-flex row gap-2 align-items-center">
            <div className="p-2 text-white fs-4">
              <p>{username}</p>
            </div>
            <div className="d-flex col gap-2 align-items-center">
              <Button variant="secondary" onClick={handleLogOut}>로그아웃</Button>{" "}
              <Button variant="primary" onClick={showModal1}>회원정보 수정</Button>{" "}
              <Modal className="bgColorBk text-light" show={show1}>
                <Modal.Body className="bgColorBk">
                  <Button  onClick={closeModal1}className="backTrans borderTrans position-absolute top-0 end-0"><FontAwesomeIcon icon={faXmark} className="fs-4" /></Button>
                  <Modal.Title className="text-center mb40 fs-3">프로필 편집</Modal.Title>
                    <div className={styles.Profile_Contents}>
                        {/* 프로필 이미지  */}
                        <div className="position-relative">
                          <div className={styles.Profile_image}>
                            <img src={`/image/${updateUser.img}`} alt="profile" />
                          </div>
                          <Button className={styles.Profile_edit_icon} aria-label="프로필 이미지 변경" onClick={showModal2} variant="secondary">
                            <FontAwesomeIcon icon={faPencil} style={{color:`#fff`}} />
                          </Button>
                        </div>
                      </div>

                      <Form>
                        <Form.Group className="mb-3" controlId="username">
                          <Form.Label>아이디</Form.Label>
                          <Form.Control type="text"  maxLength={20} name="username" placeholder="username" value={updateUser.username} onChange={updateInputChange} className="customInput"/>
                          <span>{count}</span>
                            /20자
                        </Form.Group>
                        
                        <Form.Group className="mb-3" controlId="password">
                          <Form.Label>비밀번호</Form.Label>
                          <Form.Control type="password" name="password" placeholder="password" readOnly onChange={inputChange} className="customInput" />
                        </Form.Group>
                        
                        <Form.Group className="mb-3" controlId="gender">
                          <Form.Label>성별</Form.Label><br />
                          <ButtonGroup className="mb-2">
                            {radios.map((radio, idx) => (
                              <ToggleButton
                                key={idx}
                                id={`radio-${idx}`}
                                type="radio"
                                variant="secondary"
                                name="gender"
                                value={radio.value}
                                checked={updateUser.gender === radio.value}
                                onChange={updateInputChange}
                              >
                                {radio.name}
                              </ToggleButton>
                            ))}
                          </ButtonGroup>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="regidentNumber">
                          <Form.Label>연령대</Form.Label><br />
                          <ButtonGroup className="mb-2">
                            {rnum.map((renum, idx2) => (
                              <ToggleButton
                                key={idx2}
                                id={`renum-${idx2}`}
                                type="radio"
                                variant="secondary"
                                name="regidentNumber"
                                value={renum.value}
                                checked={String(updateUser.regidentNumber) === renum.value}
                                onChange={updateInputChange}
                              >
                                {renum.name}
                              </ToggleButton>
                            ))}
                          </ButtonGroup>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="email">
                          <Form.Label>이메일</Form.Label>
                          <Form.Control type="email" name="email" placeholder="email" value={updateUser.email} onChange={updateInputChange} className="customInput"/>
                        </Form.Group>
                      </Form>
                        <div className="btnFlexBox mt-4">
                          <Button variant="dark" className="flexBtn" value="Submit" onClick={deleteProfile}>회원탈퇴</Button>
                          <Button className="submitBtn flexBtn" value="Submit" onClick={formSubmit1}>저장</Button> {/* DB에 편집(수정)된 값 저장 */}
                        </div>
                    </Modal.Body> 
                          
                    {/* 프로필 수정 모달 */}
                    <Modal className="dimBg text-light" show={show2}
                        dialogClassName="modal-90w"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered>
                      <Modal.Header className="bgColorBk position-relative">
                        <Button onClick={closeProfileModal} className="backTrans borderTrans position-absolute top-50 end-0 translate-middle-y"><FontAwesomeIcon icon={faXmark} className="fs-4" /></Button>
                        <Modal.Title>이미지 선택</Modal.Title>
                      </Modal.Header>
                      <Modal.Body className="bgColorBk">
                        <Form>
                          <Form.Group className="mb-3" controlId="img">
                            <Form.Label>이미지</Form.Label>
                            <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
                            <ToggleButton id="tbg-radio-1" value={1} variant="dark" className="pd10">
                                <Image src="/image/1.png" fluid onClick={() => selectImage('1.png')}/>
                              </ToggleButton>
                              <ToggleButton id="tbg-radio-2" value={2} variant="dark" className="pd10">
                                <Image src="/image/2.png" fluid onClick={() => selectImage('2.png')}/>
                              </ToggleButton>
                              <ToggleButton id="tbg-radio-3" value={3} variant="dark" className="pd10">
                                <Image src="/image/3.png" fluid onClick={() => selectImage('3.png')}/>
                              </ToggleButton>                                    
                            </ToggleButtonGroup>
                          </Form.Group>
                        </Form>
                        <div className="btnFlexBox mt-4">
                          <Button variant="secondary" className="{styles.Profile_delete} flexBtn" onClick={closeModal2}>취소</Button>
                          {/* 이미지 값 변경 후 프로필 변경 창으로 리다이렉트 */}
                          <Button className="submitBtn flexBtn" value="Submit" onClick={formSubmit2}>수정</Button>  
                        </div>
                      </Modal.Body>
                    </Modal>
                </Modal>
            </div>
        </Col>
      </Row>
    </Container>
    </div>
  );
}

export default MypageProfile;
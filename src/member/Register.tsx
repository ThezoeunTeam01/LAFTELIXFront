import React, { useState } from "react";
import { Button, ButtonGroup, Col, Form, Image, Modal, Row, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { call } from "../service/ApiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

type UserInfo = {
  username:string;
  password:string;
  passwordCheck:string;
  gender:string;
  regidentNumber:number|string;
  email:string;
  img?:string;
};

type RegisterProps = {
  show: boolean;
  onHide: () => void;
};

// 헤더 버튼에 연결하기 위해 수정
function Register({ show, onHide }: RegisterProps) {
  // modalShow를 showModalState로 변경
  const [showModalState, setShowModalState] = useState<boolean>(false);

  const showModal = () => setShowModalState(true);
  const closeModal = () => {
    // closeModal 함수 구현
    setShowModalState(false);
    onHide(); // onHide 함수 호출
  };

  // 유저 값 초기화
  const [userInfo, setUserInfo] = useState<UserInfo>({
    username:"",
    password:"",
    passwordCheck:"",
    gender:"M",
    regidentNumber:"",
    email:"",
    img:"1.png"
  });

  // username 글 제한
  const [count, setCount] = useState(0);

  //인풋 값 저장
  const inputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]:e.target.value
    });
    if(e.target.name==="username") setCount(e.target.value.length);
  }

  // 성별 값 구분
  const radios = [
    { name: '남성', value: 'M' },
    { name: '여성', value: 'W' }
  ];

  // 성별 값 저장
  const selectGender = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]:e.target.value
    });
    console.log(userInfo);
  };

  // 연령대 구분
  const rnum = [
    { name: '10대', value: '10'},
    { name: '20대', value: '20'},
    { name: '30대', value: '30'},
    { name: '40대', value: '40'},
    { name: '50대', value: '50'},
    { name: '60대 이상', value: '60'}
  ];

  // 연령 값 저장
  const selectRegidentNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]:e.target.value
    });
    console.log(userInfo);
  };

  // img값 저장
  const selectImage = (value:string) => {
    setUserInfo({
      ...userInfo,
      img:value
    });
  }

  const formSubmit = async (e:React.MouseEvent<HTMLButtonElement>) => {

    await call("/member/register","POST",userInfo);
    setUserInfo({
      username:"",
      password:"",
      passwordCheck:"",
      gender:"M",
      regidentNumber:"",
      email:"",
      img:""
    });
    closeModal();
  }

  return (

    <div className={`modal ${show ? 'show' : ''}`} style={{ display: 'block', position: 'initial'}}>
      <Modal className="bgColorBk text-light" show={show}>
        <Modal.Body className="bgColorBk">
          <Button onClick={closeModal} className="backTrans borderTrans position-absolute top-0 end-0"><FontAwesomeIcon icon={faXmark} className="fs-4" /></Button>
          <Modal.Title className="text-center mb40 fs-3">회원가입</Modal.Title>
          <Form>
            <Form.Group className="mb30" controlId="username">
              <Form.Label>아이디</Form.Label>
              <Form.Control type="text"  maxLength={20} name="username" placeholder="아이디 입력" value={userInfo.username} onChange={inputChange} className="customInput" />
              <span>{count}</span>
                /20자
            </Form.Group>
            
            <Form.Group className="mb30" controlId="password">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control type="password" name="password" placeholder="비밀번호 입력" value={userInfo.password} onChange={inputChange} className="customInput" />
            </Form.Group>

            <Form.Group className="mb30" controlId="passwordCheck">
              <Form.Label>비밀번호 확인</Form.Label>
              <Form.Control type="password" name="passwordCheck" placeholder="비밀번호 확인" value={userInfo.passwordCheck} onChange={inputChange} className="customInput" />
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
                    checked={userInfo.gender === radio.value}
                    onChange={selectGender}
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
                    checked={userInfo.regidentNumber === renum.value}
                    onChange={selectRegidentNumber}
                  >
                    {renum.name}
                  </ToggleButton>
                ))}
              </ButtonGroup>
            </Form.Group>

            <Form.Group className="mb30" controlId="email">
              <Form.Label>이메일</Form.Label>
              <Form.Control type="email" name="email" placeholder="email" value={userInfo.email} onChange={inputChange} className="customInput" />
            </Form.Group>

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

            <Form.Group className="mb-3 mt-4" controlId="submit">
              <Button as="input" type="button" value="회원가입" style={{width:`100%`}} onClick={formSubmit} className="submitBtn fs-5 font-bold" />
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Register;
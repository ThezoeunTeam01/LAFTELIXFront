import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Form, Image, Modal, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
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

// 헤더 버튼에 연결하기 위해 수정.
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
    regidentNumber:"10",
    email:"",
    img:"1.png"
  });

  // username 글 제한
  const [count, setCount] = useState(0);

  // 비밀번호 제한과 일치 여부에 따른 메세지 값 저장
  const [pwlimitCheckMessage, setPwlimitCheckMessage] = useState<string | null>(null);

  // 비밀번호 일치 여부를 나타내는 상태값 추가
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);

  // 비밀번호 일치 / 불일치 시 출력되는 메세지 값 저장
  const [passwordCheckMessage, setPasswordCheckMessage] = useState<string | null>(null);

  // 비밀번호 확인 버튼이 클릭되었는지를 나타내는 상태값 추가
  const [buttonClicked, setButtonClicked] = useState<boolean>(false);

  // 아이디 길이 여부
  const [idLength, setIdLength] = useState<string | null>(null);

  //인풋 값 저장
  const inputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]:e.target.value
    });
    // 비밀번호가 변경될 때마다 일치 여부 업데이트
    if (e.target.name === "password" || e.target.name === "passwordCheck") {
      setPasswordsMatch(userInfo.password === e.target.value);
      console.log(passwordsMatch);
    }

    // 다른 로직 추가 가능 (예: 아이디 길이 체크)
    if(e.target.name==="username") {
      setCount(e.target.value.length);
      if(e.target.value.length<8) {
        setIdLength("8자 이상 입력해주세요");
      }else{
        setIdLength("");
      }
    }
  };

  const passwordLimit = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*_\-+=])(?=.*[0-9]).{6,20}$/;
  // password 영어 대소문자, 숫자, 특수문자만 사용하도록 제한
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentPassword = e.target.value;
    setUserInfo({
      ...userInfo,
      password: currentPassword, // password 필드만 업데이트
    });
    
    if (!passwordLimit.test(currentPassword)) {
      setPwlimitCheckMessage("숫자, 영어 대소문자, 특수문자를 조합하여 6자리 이상 입력해주세요!");
    } else {
      setPwlimitCheckMessage("사용가능한 비밀번호 입니다.");
    }
  };

  // 비밀번호 확인 버튼 클릭 시 메세지 출력 및 불일치 시 초기화 동작
  const passwordConfirm = (e:React.MouseEvent<HTMLButtonElement>) => {
    if(passwordsMatch) {
      // 비밀번호 일치 시 메세지 출력
      setPasswordCheckMessage("비밀번호가 일치합니다.");
    } else {
      // 비밀번호 불일치 시 예외 처리 및 메세지 출력
      console.error("비밀번호가 일치하지 않습니다.");
      setPasswordCheckMessage("비밀번호가 일치하지 않습니다!");
      setUserInfo({
        ...userInfo,
        passwordCheck: ""
      });
    }
    // 버튼 클릭 상태 업데이트
    setButtonClicked(true);
  };

   // useEffect를 사용하여 버튼이 클릭된 경우 메시지 초기화 및 비밀번호 확인 값이 변경된 경우 메시지 숨김
   useEffect(() => {
    if (buttonClicked) {
      // 버튼 클릭 시 메시지 출력
      setPasswordCheckMessage(passwordsMatch ? "비밀번호가 일치합니다." : "비밀번호가 일치하지 않습니다!");
    } else {
      // 버튼 클릭되지 않은 경우 메시지 숨김
      setPasswordCheckMessage(null);
    }
  }, [passwordsMatch, buttonClicked, userInfo.passwordCheck]);

  // img값 저장
  const selectImage = (value:string) => {
    setUserInfo({
      ...userInfo,
      img:value
    });
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

  const formSubmit = async (e:React.MouseEvent<HTMLButtonElement>) => {
    // 비밀번호 일치 여부 체크
    if (passwordsMatch&&passwordLimit.test(userInfo.password)&&userInfo.username.length>7) {
      await call("/member/register","POST",userInfo);
      // 회원가입 후 유저 값 초기화
      setUserInfo({
        username:"",
        password:"",
        passwordCheck:"",
        gender:"M",
        regidentNumber:"10",
        email:"",
        img:"1.png"
      });
      window.location.href="/";
    } else {
      // 비밀번호 불일치 시 예외 처리 혹은 메세지 표시
      console.error("비밀번호가 일치하지 않습니다.");
      
    }
  };

  return (
    // <div
    //   className="modal show" show={show2} onHide={onHide2}
    //   style={{ display: 'block', position: 'initial'}}
    // >
    //<div className="modal show" show={modalShow} onHide={closeModal} style={{ display: 'block', position: 'initial'}}>
    <div className={`modal ${show ? 'show' : ''}`} style={{ display: 'block', position: 'initial'}}>
      {/* <Button onClick={showModal}>회원가입 모달</Button> */}
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
                {<p className={passwordLimit.test(userInfo.password) ? 'text-success' : 'text-danger'}>{idLength}</p>}
            </Form.Group>
            
            <Form.Group className="mb30" controlId="password">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control type="password" name="password" placeholder="비밀번호 입력" value={userInfo.password} onChange={onChangePassword} className="customInput" />
              {/* 비밀번호 제한 일치 여부에 따른 메세지 출력 */}
              {pwlimitCheckMessage && <p className={passwordLimit.test(userInfo.password) ? 'text-success' : 'text-danger'}>{pwlimitCheckMessage}</p>}
            </Form.Group>

            <Form.Group className="mb30" controlId="passwordCheck">
              <Form.Label>비밀번호 확인</Form.Label>
              <Form.Control type="password" name="passwordCheck" placeholder="비밀번호 확인" value={userInfo.passwordCheck} onChange={inputChange} className="customInput" />
              <br />
              <Button className="btn btn-dark position-absolute top-30 end-0 translate-middle-y" onClick={passwordConfirm}>확인</Button>
              {/* 비밀번호 일치 여부에 따른 메세지 출력 */}
              {buttonClicked && (<p className={passwordsMatch ? 'text-success' : 'text-danger'}>{passwordCheckMessage}</p>)}
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
                <ToggleButton id="tbg-radio-1" value={1}>
                  <Image src="/image/1.png" fluid onClick={() => selectImage('1.png')}/>
                </ToggleButton>
                <ToggleButton id="tbg-radio-2" value={2}>
                  <Image src="/image/2.png" fluid onClick={() => selectImage('2.png')}/>
                </ToggleButton>
                <ToggleButton id="tbg-radio-3" value={3}>
                  <Image src="/image/3.png" fluid onClick={() => selectImage('3.png')}/>
                </ToggleButton>
              </ToggleButtonGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="submit">
              <Button as="input" type="button" value="회원가입" style={{width:`100%`}} onClick={formSubmit} className="submitBtn fs-5 font-bold" />
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Register;
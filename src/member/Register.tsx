import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Col, Form, Image, Modal, Row, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { call } from "../service/ApiService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faUserCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { calculateNewValue } from "@testing-library/user-event/dist/utils";
import mainLogo from '../image/logo.png';

type UserInfo = {
  username:string;
  password:string;
  passwordCheck:string;
  gender:string;
  regidentNumber:number|string;
  email:string;
  img?:string;
};

type Props = {
  email:string;
  regidentNumber:number;
  gender:string;
}

type RegisterProps = {
  show: boolean;
  onHide: () => void;
  setLoginModalShow: React.Dispatch<React.SetStateAction<boolean>>;
  propsInfo: Props;
};

// 헤더 버튼에 연결하기 위해 수정.
function Register({ show, onHide, setLoginModalShow, propsInfo }: RegisterProps) {

  // modalShow를 showModalState로 변경
  const [showModalState, setShowModalState] = useState<boolean>(false);

  const showModal = () => setShowModalState(true);
  const closeModal = () => {
    // closeModal 함수 구현
    setShowModalState(false);
    onHide(); // onHide 함수 호출
    setUserInfo({
      username:"",
    password:"",
    passwordCheck:"",
    gender:"M",
    regidentNumber:"10",
    email:"",
    img:"1.png"
    });
    setIdLength("");
    setPwlimitCheckMessage("");
    setPasswordCheckMessage("");
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

  useEffect(() => {
    console.log("프롭스정보");
    console.log(propsInfo.email);
    setUserInfo(prevUserInfo => ({
      ...prevUserInfo,
      gender: propsInfo.gender,
      regidentNumber: propsInfo.regidentNumber,
      email: propsInfo.email
    }));
  }, [propsInfo]);

  // username 글 제한
  const [count, setCount] = useState(0);

  // 비밀번호 제한과 일치 여부에 따른 메세지 값 저장
  const [pwlimitCheckMessage, setPwlimitCheckMessage] = useState<string | null>(null);

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
  const [pwColor,setPwColor] = useState('red');
  const [pwCheckColor,setPwCheckColor] = useState('red');
  const passwordLimit = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*_\-+=])(?=.*[0-9]).{6,20}$/;
  // password 영어 대소문자, 숫자, 특수문자만 사용하도록 제한
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentPassword = e.target.value;
    setUserInfo({
      ...userInfo,
      password: currentPassword, // password 필드만 업데이트
    });
    
    if (!passwordLimit.test(currentPassword)) {
      setPwColor('red');
      setPwlimitCheckMessage("숫자, 영어 대소문자, 특수문자를 조합하여 6자리 이상 입력해주세요!");
    } else {
      setPwColor('green');
      setPwlimitCheckMessage("사용가능한 비밀번호 입니다.");
    }
  };

  // 비밀번호 확인 버튼 클릭 시 메세지 출력 및 불일치 시 초기화 동작
  const passwordConfirm = (e:React.MouseEvent<HTMLButtonElement>) => {
    if(userInfo.password.length>0&&userInfo.password===userInfo.passwordCheck) {
      // 비밀번호 일치 시 메세지 출력
      setPwCheckColor('green');
      setPasswordCheckMessage("비밀번호가 일치합니다.");
    } else {
      // 비밀번호 불일치 시 예외 처리 및 메세지 출력
      setPwCheckColor('red');
      setPasswordCheckMessage("비밀번호가 일치하지 않습니다.");
      setUserInfo({
        ...userInfo,
        passwordCheck: ""
      });
    }
    // 버튼 클릭 상태 업데이트
    setButtonClicked(true);
  };

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

  // 회원가입 성공시 모달
  const [registSuccessModal,setRegistSuccessModal] = useState(false);

  const login = (e:React.MouseEvent<HTMLButtonElement>) => {
    setLoginModalShow(true);
    closeModal();
    setRegistSuccessModal(false);
  }
  const main = (e:React.MouseEvent<HTMLButtonElement>) => {
    window.location.href="/";
  }

  const formSubmit = async (e:React.MouseEvent<HTMLButtonElement>) => {
    // 유효성 검사 통과시 회원가입
    if (buttonClicked&&userInfo.username.length>7) {
      await call("/member/register","POST",userInfo);

      setUserInfo({
        username:"",
        password:"",
        passwordCheck:"",
        gender:"M",
        regidentNumber:"10",
        email:"",
        img:"1.png"
      });
      setRegistSuccessModal(true);
    } else {
      console.error("정보를 다시 입력하세요.");      
    }
  };

  // 중복 확인 버튼
  const [doubleCheckMessage, setDoubleCheckMessage] = useState("");
  const [doubleCheckMessageColor, setDoubleCheckMessageColor] = useState('');
  
  const doubleCheck = async(e:React.MouseEvent<HTMLButtonElement>) => {
    const response = await call(`/member/doubleCheck?username=${userInfo.username}`,"GET");
    if(response.status==="possible"&&userInfo.username.length>7){
      setDoubleCheckMessageColor('green');
      setDoubleCheckMessage("사용 가능한 아이디입니다.");
    }else if(response.status==="impossible"&&userInfo.username.length>7){
      setDoubleCheckMessageColor('red');
      setDoubleCheckMessage("중복 되었습니다.");
    }
  }


 // 각 인풋의 타입을 관리하는 상태
 const [passwordType1, setPasswordType1] = useState('password');
 const [passwordType2, setPasswordType2] = useState('password');

 // 각 인풋에 대한 아이콘 상태
 const [eyeIcon1, setEyeIcon1] = useState(<FontAwesomeIcon icon={faEyeSlash} />);
 const [eyeIcon2, setEyeIcon2] = useState(<FontAwesomeIcon icon={faEyeSlash} />);

 const eyeIconOn = <FontAwesomeIcon icon={faEye} />;
 const eyesIconOff = <FontAwesomeIcon icon={faEyeSlash} />;

 // 각 인풋의 아이콘이 클릭될 때 타입 변경 및 아이콘 변경
 const clickPasswordToggle1 = () => {
   if (passwordType1 === 'password') {
     setEyeIcon1(eyeIconOn);
     setPasswordType1('text');
   } else {
     setEyeIcon1(eyesIconOff);
     setPasswordType1('password');
   }
 };

 const clickPasswordToggle2 = () => {
   if (passwordType2 === 'password') {
     setEyeIcon2(eyeIconOn);
     setPasswordType2('text');
   } else {
     setEyeIcon2(eyesIconOff);
     setPasswordType2('password');
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
              <Row>
                <Col sm={9} style={{paddingRight:`0px`}}>
                <div className="position-relative">
                  <Form.Control type="text"  maxLength={20} name="username" placeholder="아이디 입력" value={userInfo.username} onChange={inputChange} className="customInput" />
                  <span className="position-absolute top-50 end-0 translate-middle">{count}/20자</span>
                </div>
                </Col>
                <Col sm={3}> 
                  <Button onClick={doubleCheck} className="w-100 h-100" variant="primary">중복 확인</Button>
                </Col>
              </Row>
              <p style={{color: doubleCheckMessageColor}}>{doubleCheckMessage}</p>
              <p style={{color: 'red'}}>{idLength}</p>
            </Form.Group>

     

            <Form.Group className="mb30" controlId="password">
              <Form.Label>비밀번호</Form.Label>
              <div className="position-relative">
              <Form.Control type={passwordType1} name="password" placeholder="비밀번호 입력" value={userInfo.password} onChange={onChangePassword} className="customInput" />
              <span onClick={clickPasswordToggle1} className="position-absolute position-absolute top-50 end-0 translate-middle" style={{cursor:`pointer`}}>
                {eyeIcon1}
              </span>
              </div>
              {/* 비밀번호 제한 일치 여부에 따른 메세지 출력 */}
              {pwlimitCheckMessage && <p style={{color:pwColor}}>{pwlimitCheckMessage}</p>}
            </Form.Group>

            <Form.Group className="mb30" controlId="passwordCheck">
              <Form.Label>비밀번호 확인</Form.Label>
              <Row>
                <Col sm={9} style={{paddingRight:`0px`}}>
                  <div className="position-relative">
                  <Form.Control type={passwordType2} name="passwordCheck" placeholder="비밀번호 확인" value={userInfo.passwordCheck} onChange={inputChange} className="customInput" />  
                  <span onClick={clickPasswordToggle2} className="position-absolute position-absolute top-50 end-0 translate-middle" style={{cursor:`pointer`}}>
                    {eyeIcon2}
                  </span>
                  </div>                
                </Col>
                <Col sm={3}>
                  <Button className="w-100 h-100" onClick={passwordConfirm} variant="primary" >확인</Button>
                </Col>
              </Row>
              {/* 비밀번호 일치 여부에 따른 메세지 출력 */}
              {buttonClicked && (<p style={{color:pwCheckColor}}>{passwordCheckMessage}</p>)}
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
              <ToggleButtonGroup type="radio" name="options" defaultValue={1} className="gap-3">
                <ToggleButton id="tbg-radio-1" value={1} variant="secondary">
                  <Image src="/image/1.png" fluid onClick={() => selectImage('1.png')}/>
                </ToggleButton>
                <ToggleButton id="tbg-radio-2" value={2} variant="secondary">
                  <Image src="/image/2.png" fluid onClick={() => selectImage('2.png')}/>
                </ToggleButton>
                <ToggleButton id="tbg-radio-3" value={3} variant="secondary">
                  <Image src="/image/3.png" fluid onClick={() => selectImage('3.png')}/>
                </ToggleButton>
              </ToggleButtonGroup>
            </Form.Group>

            <Form.Group className="mb-3 mt-5" controlId="submit">
              <Button as="input" type="button" value="회원가입" style={{width:`100%`}} onClick={formSubmit} className="submitBtn fs-5 font-bold" />
            </Form.Group>
          </Form>
        </Modal.Body>
      {/* 회원가입 성공시 모달 */}
      </Modal>
      <Modal show={registSuccessModal} centered size="lg" fullscreen={true}>
        <Modal.Body className="position-relative bgColorBk">
          <img src={mainLogo} style={{ width: "100px" }} />
          <div className="position-absolute top-50 start-50 translate-middle d-flex flex-column align-items-center justify-content-center">
            <FontAwesomeIcon icon={faUserCheck} className="text-white" style={{ fontSize:`50px`, marginBottom: `25px`}}/>                  
            <Modal.Title className="text-center fs-2 text-white mb-4">회원가입이 완료되었습니다!</Modal.Title>
            <p className="text-white-50 text-center">
              국내 최대 OTT 정보 공유 커뮤니티 '라프텔릭스'에서<br /> 
              새로운 콘텐츠 정보를 공유하고, 인생작을 만나 보세요!
            </p>
            <div className="d-flex align-items-center justify-content-center gap-4 w-100 mt-4">
              <Button onClick={login} className="w-50 submitBtn">로그인</Button>
              <Button onClick={main} className="w-50 submitReverseBtn">메인화면으로</Button>
            </div> 
          </div>                     
        </Modal.Body>
      </Modal>
    </div>
    
  );
}

export default Register;
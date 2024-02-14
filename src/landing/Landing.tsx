import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom" 
import { Container } from "react-bootstrap";
import { faAnglesDown, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// 로고
import mainLogo from "../image/logo.png";
import linkedLogo from "../image/landing/linked_logo.svg";
// 랜딩 이미지
import landing01 from "../image/landing/landing01.png";
import landing02 from "../image/landing/landing02.png";
import landing02_2 from "../image/landing/landing02_2.png";
import landing03 from "../image/landing/landing03.png";
import landing03_2 from "../image/landing/landing03_2.png";
// 브랜드 로고
import logoIcon1 from "../image/landing/logoicon1.png";
import logoIcon2 from "../image/landing/logoicon2.png";
import logoIcon3 from "../image/landing/logoicon3.png";
import logoIcon4 from "../image/landing/logoicon4.png";
import logoIcon5 from "../image/landing/logoicon5.png";
import logoIcon6 from "../image/landing/logoicon6.png";
import logoIcon7 from "../image/landing/logoicon7.png";
import logoIcon8 from "../image/landing/logoicon8.png";


// scss, css 
import '../style/custom.scss';
// AOS Animation
import AOS from 'aos';
import 'aos/dist/aos.css';

const Landing = () => {

  // AOS 애니메이팅 사용
  useEffect(() => {
    AOS.init({
      duration: 1000, // 애니메이션 지속 시간 (1초)
    });
  }, []);

  // 화살표 바운스 애니메이션
  const [isBouncing, setIsBouncing] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsBouncing((prev) => !prev);
    }, 600);

    return () => clearInterval(interval);
  }, []);

  return (        
  <>       
    <section className="scrollContentBoxMain">
      <Container>
        <div data-aos="fade-up" className="d-flex flex-row align-items-center justify-content-center">
          <img src={mainLogo} style={{ width: '300px' }} alt="laftelix_logo"  />
          <FontAwesomeIcon icon={faXmark} style={{ color: '#fff', fontSize: '30px' }} />
          <img src={linkedLogo} style={{ width: '300px' }} alt="linked_logo" />
        </div>
        <p data-aos="fade-up" className="text-white landingMainText">
          국내 최대 소통 커뮤니티 '라프텔릭스'와 고객 평점 1위 구독 플랫폼 '링키드'의 만남으로
          구독 정보부터 구독 할인까지 한 번에!!!
        </p>
      </Container>
      <div className="position-absolute start-50 text-center" style={{ bottom: '30px' }}>
        <p className="text-white ">Scroll</p>
        <FontAwesomeIcon
          icon={faAnglesDown}
          style={{
            color: '#fff',
            fontSize: '30px',
            transform: isBouncing ? 'translateY(0)' : 'translateY(-8px)',
            transition: 'transform 0.3s',
          }}
        />
      </div>
    </section>

    <section className="scrollContentBox">
      <Container className="d-flex flex-row align-items-center justify-content-around">
        <div className="text-white">
          <h3 data-aos="fade-up" className="landingContTitle"> 
            이봐, 나의 동료가 되지 않겠는가?
          </h3>
          <p data-aos="fade-up" className="landingContText">
            파티장이 되어 파티원을 모집해보세요. <br />
            국내 최대 커뮤니티 '라프텔릭스'에서 구성원을 찾으면 파티가 더 쉽게 구성될 수 있습니다.
          </p>
        </div>
        <div>
          <img src={landing02} alt="landing01" style={{ width: "300px" }} data-aos="fade-up" />
        </div>
      </Container>
    </section>    

    <section className="scrollContentBox">
      <Container className="d-flex flex-row align-items-center justify-content-around">
        <div className="d-flex flex-column" data-aos="fade-up">
          <div data-aos="fade-up" className="d-flex landingLogos">
            <img src={logoIcon1} alt="landing01" />
            <img src={logoIcon2} alt="landing01" />
            <img src={logoIcon3} alt="landing01" />
          </div>          
          <div data-aos="fade-up" className="d-flex landingLogos">
            <img src={logoIcon4} alt="landing01" />
            <img src={logoIcon5} alt="landing01" />
            <img src={logoIcon6} alt="landing01" />
          </div>
          <div data-aos="fade-up" className="d-flex landingLogos">          
            <img src={logoIcon7} alt="landing01" />
            <img src={logoIcon8} alt="landing01" />
          </div>
        </div>
        <div className="text-white">
          <h3 data-aos="fade-up" className="landingContTitle"> 
            보고싶은 OTT는 여러 개인데 , <br /> 구독 사이트마다 가입해서 사용하시기 <br />
            부담스러우셨죠? 
          </h3>
          <p data-aos="fade-up" className="landingContText">
            1-3인으로 이뤄진 파티를 구성해서 구독료를 '확' 낮추세요!! <br />
            넷플릭스 구독료 19,000원 기준 2인이 파티를 구성할 경우 1인 9,000원으로 구독이
            가능합니다!
          </p>
        </div>
      </Container>
    </section>

    <section className="scrollContentBox">
      <Container className="d-flex flex-row align-items-center justify-content-around">
        <div>
          <img src={landing01} alt="landing02" style={{ width: "300px" }} data-aos="fade-up" />
        </div>
        <div className="text-white">
          <h3 data-aos="fade-up" className="landingContTitle"> 
            자동 결산으로 간편하게 사용하세요!
          </h3>
          <p data-aos="fade-up" className="landingContText" style={{paddingBottom:`30px`}}>
            매달 결제일 신경 쓸 필요 없이<br />
            결제 정보 저장으로 손 쉽고 간편하게 자동 결산!!
          </p>
          <img src={landing02_2} alt="landing02" style={{ width: "300px", boxShadow: `rgba(76, 75, 208, 0.25) 0px 10px 15px 0px` }} data-aos="fade-up" />
        </div>
      </Container>
    </section>

    <section className="scrollContentBox">
      <Container className="d-flex flex-row align-items-center justify-content-around">
        <div className="text-white">
          <h3 data-aos="fade-up" className="landingContTitle"> 
            보안 문제가 걱정이라면?
          </h3>
          <p data-aos="fade-up" className="landingContText">
            닉네임 사용으로 개인 정보 노출 걱정 없이 파티를 맺고,<br />
            파티원이 나갈 때는 보증금 위약금 정책을 통해<br />
            기존 파티원들의 불편함은 최소화하고, 파티 유지력을 상승시킬 수 있어요!
          </p>
        </div>
        <div className="position-relative">
          <div className="position-relative">
            <img src={landing03} alt="landing03" style={{ width: "300px" }}  data-aos="fade-up" />
            <img src={landing03_2} alt="landing03" style={{ width: "300px", zIndex: `3`, right:`-100px`  }} className="position-absolute bottom-0"  data-aos="fade-up" />
          </div>
        </div>
      </Container>
    </section>

    {/* 열린 창에서 이동 */}
    <section className="d-flex align-items-center justify-content-center mt-4 mb-4" data-aos="fade-left">
      <button type="button" className="btn LinkedGoBtn">            
        <Link to='https://linkid.pw/makeParty' target="_self" style={{color:`white`, textDecoration: 'none'}}> 링키드로 이동하기 </Link>
      </button>    
    </section>

  </>
  );
};
export default Landing;
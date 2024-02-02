import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom" 
import { Container } from "react-bootstrap";
import { faAnglesDown, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// 로고 추가
import mainLogo from "../image/logo.png";
import linkedLogo from "../image/landing/linked_logo.svg";
//랜딩 이미지들
import landing01 from "../image/landing/landing01.png";
import landing02 from "../image/landing/landing02.png";
import landing03 from "../image/landing/landing03.png";

import '../style/custom.scss';

// 랜딩 페이지
const Landing = () => {


      const [scrollPosition, setScrollPosition] = useState(0);

      const updateScroll = () => {
          setScrollPosition(window.scrollY || document.documentElement.scrollTop);
      };

      useEffect(() => {
          window.addEventListener("scroll", updateScroll);
      }, []);

      return (        
        <>   
        

          <div style={{
            maxWidth: '100vw',
            width: '100%',
            height: '100vh',
            padding: '0 20px',
            display: 'flex',
            flexDirection: 'column',
            WebkitBoxPack: 'center',
            justifyContent: 'center',
            WebkitBoxAlign: 'center',
            alignItems: 'center',
            borderBottom: '10px solid silver'
          }}>
            <Container>   
              <div className="d-flex align-items-center justify-content-center">
                <img src={mainLogo} style={{ width: "300px" }} />
                <FontAwesomeIcon icon={faXmark} style={{color:`#fff`, fontSize: `30px`}}/>
                <img src={linkedLogo} alt="linked_Logo"  style={{ width: "300px" }} />                  
              </div>
                <p className="text-white" style={{
                  marginTop: `24px`,
                  fontSize: `18px`,
                  fontWeight: `500`,
                  lineHeight: `27px`,
                  textAlign: `center`
                }}>
                  국내최대 소통 커뮤니티 '라프텔릭스'와 고객 평점 1위 구독 플랫폼 '링키드'의 만남으로
                  구독 정보부터 구독 할인까지 한 번에!!!
                  {/* 국내최대 소통 커뮤니티 '<span style={{color:`red`}}>라프텔릭스</span>'와 고객 평점 1위 구독 플랫폼 '<span style={{color:`#1D2E92`}}>링키드</span>'로
                  구독 정보부터 구독 할인까지 한 번에!!! */}
                </p>
              </Container>
              <FontAwesomeIcon icon={faAnglesDown} style={{color:`#fff`, fontSize: `30px`}} />
          </div>

          <div>
            <div className={scrollPosition > 100 ? "scroll-text" : "scrolled-text"}>스크롤되면 색이 변합니다!</div>
          </div>   

          <div style={{
            maxWidth: '100vw',
            width: '100%',
            height: '800px',
            padding: '0 20px',
            display: 'flex',
            flexDirection: 'column',
            WebkitBoxPack: 'center',
            justifyContent: 'center',
            WebkitBoxAlign: 'center',
            alignItems: 'center',
            borderBottom: '10px solid silver'
          }}>
            <Container className="d-flex align-items-center justify-content-around">
              <div className="text-white" style={{}}>
                <h3 style={ {fontSize: `44px`,
                  fontWeight: `bold`,
                  lineHeight: `66px`,
                  textAlign: `left`,              
                  }}> 
                  이봐, 나의 동료가 되지 않겠는가?
                </h3>
                <p style={{
                  marginTop: `24px`,
                  fontSize: `18px`,
                  fontWeight: `500`,
                  lineHeight: `27px`,
                  textAlign: `left`
                }}>
                  파티장이 되어 파티원을 모집해보세요. <br />
                  국내최대 커뮤니티 라프텔릭스에서 구성원을 찾으면 파티가 더 쉽게 구성될 수 있습니다.
                </p>
              </div>
              <div>
                <img src={landing01} alt="landing01" style={{ width: "300px" }} />
              </div>
            </Container>
          </div>

          <div style={{
            maxWidth: '100vw',
            width: '100%',
            height: '800px',
            padding: '0 20px',
            display: 'flex',
            flexDirection: 'column',
            WebkitBoxPack: 'center',
            justifyContent: 'center',
            WebkitBoxAlign: 'center',
            alignItems: 'center',
            borderBottom: '10px solid silver'
          }}>
            <Container className="d-flex align-items-center justify-content-around">
              <div className="text-white" style={{}}>
                <h3 style={ {fontSize: `44px`,
                  fontWeight: `bold`,
                  lineHeight: `66px`,
                  textAlign: `left`,              
                  }}> 
                  자동 결산으로 간편하게 사용하세요!
                </h3>
                <p style={{
                  marginTop: `24px`,
                  fontSize: `18px`,
                  fontWeight: `500`,
                  lineHeight: `27px`,
                  textAlign: `left`
                }}>
                매달 결제일 신경 쓸 필요 없이<br />
                결제 정보 저장으로 손 쉽고 간편하게 자동 결산!!
                </p>
              </div>
              <div>
                <img src={landing02} alt="landing02" style={{ width: "300px" }} />
              </div>
            </Container>
          </div>

          <div style={{
            maxWidth: '100vw',
            width: '100%',
            height: '800px',
            padding: '0 20px',
            display: 'flex',
            flexDirection: 'column',
            WebkitBoxPack: 'center',
            justifyContent: 'center',
            WebkitBoxAlign: 'center',
            alignItems: 'center',
          }}>
            <Container className="d-flex align-items-center justify-content-around">
              <div className="text-white" style={{}}>
                <h3 style={ {fontSize: `44px`,
                  fontWeight: `bold`,
                  lineHeight: `66px`,
                  textAlign: `left`,              
                  }}> 
                  보안 문제가 걱정이라면?
                </h3>
                <p style={{
                  marginTop: `24px`,
                  fontSize: `18px`,
                  fontWeight: `500`,
                  lineHeight: `27px`,
                  textAlign: `left`
                }}>
                닉네임 사용으로 개인 정보 노출 걱정 없이 파티를 맺고,<br />
                파티원이 나갈 때는 보증금 위약금 정책을 통해<br />
                기존 파티원들의 불편함은 최소화하고, 파티 유지력을 상승시킬 수 있어요!
                </p>
              </div>
              <div>
                <img src={landing03} alt="landing03" style={{ width: "300px" }} />
              </div>
            </Container>
          </div>

          {/* 열린 창에서 */}
          <div className="d-flex align-items-center justify-content-center">
            <button type="button" className="btn" style={{
              marginTop: '90px',
              cursor: 'pointer',
              background: 'linear-gradient(to right, rgb(99, 98, 239), rgb(133, 118, 255))',
              zIndex: 4,
              boxShadow: 'rgba(76, 75, 208, 0.25) 0px 10px 15px 0px',
              height: '70px',
              borderRadius: '15px',
              minWidth: '270px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 1,
              fontSize: '21px',
              fontWeight: 'bold',
              lineHeight: '31.5px',
              textAlign: 'center',
              color: 'rgb(255, 255, 255)'
            }}>            
              <Link to='https://linkid.pw/makeParty' target="_self" style={{color:`white`}}> 링키드로 이동하기 </Link>
            </button>    
          </div>
          
        </>
      );
        
}; 
export default Landing;

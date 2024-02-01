import React from "react";
import { Link } from "react-router-dom" 
// 로고 추가
import mainLogo from '../image/logo.png';
import linkedLogo from "../image/landing/linked_logo.svg";


// 랜딩 페이지
const Landing = () => {
      return (       
        <>
          <div>
              <div className="d-flex">
                <img src={linkedLogo} alt="linked_Logo" />
                <img src={mainLogo} style={{ width: "100px" }} />
              </div>
          </div>
          <div className="text-white" style={{ height: `100vh`, width:`100vw`, border: `1px solid red` }}>
            <h3 style={ {fontSize: `44px`,
              fontWeight: `bold`,
              lineHeight: `66px`,
              textAlign: `left`,
              }}> 
              {/* color: `rgb(34, 34, 34)` */}
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

          <div className="text-white">
            <h3>아직도 모든 구독료를 내고 사용하시나요?</h3>
            <p>
              라프텔릭스와 링키드 제휴 서비스로 <br />
              원하시는 서비스의 파티원을 찾아 파티를 맺고 구독료는 ‘확’ 낮추세요!
            </p>
          </div>

          <div className="text-white">
            <h3>자동 결산으로 간편하게 사용하세요!</h3>
            <p>매달 결제일 신경 쓸 필요 없이<br />
              결제 정보 저장으로 손 쉽고 간편하게 자동 결산!!
            </p>
          </div>

          <div className="text-white">
            <h3>보안 문제가 걱정이라면?</h3>
            <p>닉네임 사용으로 개인 정보 노출 걱정 없이 파티를 맺고,<br />
              파티원이 나갈 때는 보증금 위약금 정책을 통해<br />
              기존 파티원들의 불편함은 최소화하고, 파티 유지력을 상승시킬 수 있어요!
            </p>
          </div>

          {/* 새창으로 열림. */}
          <button type="button" className="btn">            
            <Link to='https://linkid.pw/makeParty' target="_self"> 링키드로 이동하기 </Link>
          </button>    
        </> 
      );
        
}; 
export default Landing;

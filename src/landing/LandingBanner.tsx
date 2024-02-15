import React from "react";
import { Carousel, CarouselItem } from "react-bootstrap";
import { Link } from "react-router-dom" 
// 랜딩 배너 이미지
import Banner1 from "../image/landing/netflix_bi_sq.png";
import Banner2 from "../image/landing/tving_bi_sq.png";
import Banner3 from "../image/landing/wavve_bi_sq.png";
// sass 파일
import "../style/custom.scss";



// 랜딩 페이지는 새창으로 열림.
const LandingBanner = () => {
      return (       
        <>
        {/* // interval={null} - 슬라이드 멈추고 싶으면 추가 */}
        <Carousel>
          <CarouselItem className="text-center">
            {/* 배너 불러오기 테스트  새창으로 열림*/}
            <button type="button" className="btn banner">            
              <Link to='/Landing' target="_blank" style={{textDecoration: `none`}}>
                <div className="d-flex align-items-center justify-content-center pr-2 pl-2" >
                  <div className="d-flex align-items-center" style={{width:`150px`, height: `80px` }}>
                    <img src={Banner1} className="" style={{width:`100%` , height:`100%`, objectFit: `contain`}} />
                  </div>
                  <div className="text-black" style={{ fontSize:`18px`, fontWeight: `bold`}}>
                    파티에 가입하면 넷플릭스 월 구독료 <del>17,000원</del>을 만 원도 안 되는 &#8594; '9,000원' 으로 구독할 수 있다고?
                  </div>
                </div>
              </Link>
            </button>
            </CarouselItem>
            <CarouselItem className="text-center">
              <button type="button" className="btn banner">            
                <Link to='/Landing' target="_blank" style={{textDecoration: `none`}}>
                <div className="d-flex align-items-center justify-content-center pr-2 pl-2" >
                  <div className="d-flex align-items-center" style={{width:`150px`, height: `80px` }}>
                    <img src={Banner2} className="" style={{width:`100%` , height:`100%`, objectFit: `contain`}} />
                  </div>
                  <div className="text-black" style={{ fontSize:`18px`, fontWeight: `bold`}}>
                    최신 화제작 '내 남편과 결혼해 줘'를 반 값으로 즐기고 싶다면?
                  </div>
                </div>
              </Link>
              </button>   
            </CarouselItem> 
            <CarouselItem className="text-center">
            <button type="button" className="btn banner">            
              <Link to='/Landing' target="_blank" style={{textDecoration: `none`}}>
                <div className="d-flex align-items-center justify-content-center pr-2 pl-2" >
                  <div className="d-flex align-items-center" style={{width:`150px`, height: `80px` }}>
                    <img src={Banner3} className="" style={{width:`100%` , height:`100%`, objectFit: `contain`}} />
                  </div>
                  <div className="text-black" style={{ fontSize:`18px`, fontWeight: `bold`}}>
                    아직도 OTT 구독료를 '독박' 쓰고 있다면? 
                  </div>
                </div>
              </Link>
            </button>
            </CarouselItem> 
        </Carousel>
        </> 
      );
        
}; 
export default LandingBanner;

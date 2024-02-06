import React from "react";
import { Carousel, CarouselItem } from "react-bootstrap";
import { Link } from "react-router-dom" 


// 랜딩 페이지는 새창으로 열림.
const LandingBanner = () => {
      return (       
        <>
        <Carousel interval={null}>
          <CarouselItem className="text-center">
            {/* 배너 불러오기 테스트  새창으로 열림*/}
            <button type="button" className="btn" style={{width:`100%` , height:`150px`, border:`1px solid red`}}>            
              <Link to='./Landing' target="_blank">
                <img
                  src={``}
                  alt={``}
                  className="mw-100 mh-100" style={{objectFit: `contain`}}
                />
                <p className="text-white">
                  배너 멘트
                </p>
              </Link>
            </button>
            </CarouselItem>
            <CarouselItem className="text-center">
              <button type="button" className="btn">            
                <Link to='./Landing' target="_blank">
                  <img
                  src={``}
                  alt={``}
                  className="mw-100 mh-100" style={{objectFit: `contain`}}
                  />
                  배너
                </Link>
              </button>      
            </CarouselItem> 
            <CarouselItem className="text-center">
              <button type="button" className="btn">            
                <Link to='./Landing' target="_blank">
                  <img
                  src={``}
                  alt={``}
                  className="mw-100 mh-100" style={{objectFit: `contain`}}
                  />
                  배너
                </Link>
              </button>      
            </CarouselItem>
        </Carousel>
        </> 
      );
        
}; 
export default LandingBanner;

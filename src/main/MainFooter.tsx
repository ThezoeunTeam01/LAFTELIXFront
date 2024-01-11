import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";


const MainFooter=() => {

  return(
    <footer className="border-top border-4 mt-4 border-dark">
      <Container style={{padding:`40px 0`}}>
        <div style={{display: `flex`, color:`#a3a3a3` }}>
          <div style={{marginRight:`30px`}}>고객센터</div>
          <div style={{marginRight:`30px`}}>이용약관</div>
          <div style={{marginRight:`30px`}}>개인정보처리방침</div>
          <div style={{marginRight:`30px`}}>법적고지</div>
        </div>

        <div className="d-flex mt-4" style={{color:`#6e6e6e`}}>
          <div className="" style={{marginRight:`30px`}}>
            <span>대표:</span>
            <span>홍길동씨</span>
          </div>
          <div style={{marginRight:`30px`}}>
            <span>이메일:</span>
            <span>Laftelix@Laftelix.com</span>
          </div>
          <div style={{marginRight:`30px`}}>
            <span>전화번호:</span>
            <span>02-123-4567</span>
          </div>
        </div>

        <div className="mt-2" style={{color:`#6e6e6e`}}>
          Copyright 2024. LAFTELIX inc. all rights reserved.
        </div>
      
      </Container>
    </footer>
  );
}
export default MainFooter;
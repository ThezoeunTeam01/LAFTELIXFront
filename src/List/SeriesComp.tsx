import React from "react";
import { Link } from "react-router-dom" 

const SeriesComp=() => {

return(
  <>
    {/* 헤더 사이즈만큼 아래로  */}
    <div style={{zIndex:20, paddingTop:`20px`, paddingBottom:`20px`, height:`80px`, marginBottom: `100px`}}></div>
      <div className="container">
        <div className="text-white">
          여기에 시리즈 리스트 추가
        </div>
    </div>
  </>
);


}
export default SeriesComp;
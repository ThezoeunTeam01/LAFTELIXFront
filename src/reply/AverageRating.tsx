import React, { useEffect, useState } from "react";
import { call } from "../service/ApiService";
import { ReactComponent as StarAverageIcon } from '../image/star-fill.svg';

interface AverageRatingProps {
  contentType:string;
  contentId:number;
  starClicked:(index:number) => void;
}

interface StarEntity {
  id: string | null;
  contentId: number;
  contentType: string;
  username: string;
  score: number;
}

function AverageRating({contentType, contentId, starClicked}:AverageRatingProps) {
  console.log('contentType:', contentType);
  console.log('contentId:', contentId);
  const [averageScore, setAverageScore] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams({ contentType, contentId: contentId.toString() });
        const response: StarEntity[] = await call(`/star_rating/get_ratings?${params}`, 'GET');
        console.log("StarRatings:", response);

        const totalScore = response.reduce((total, starEntity) => total + starEntity.score, 0);
        const averageScore = response.length > 0 ? totalScore / response.length : 0.0;
        setAverageScore(averageScore);
      } catch (error) {
        console.error(error); // 에러 출력
      }
    };

    fetchData();
}, [starClicked]);


  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <span className="text-white fs-3">{averageScore.toFixed(1)}</span>
      <div>
        {[1, 2, 3, 4, 5].map((index) => (
          <StarAverageIcon key={index} style={{ color: index <= Math.round(averageScore) ? 'red' : 'grey' }}/>
        ))}
      </div>
    </div>
  );
}

export default AverageRating;

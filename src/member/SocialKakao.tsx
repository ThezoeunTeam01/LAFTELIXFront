import { Button } from "react-bootstrap";


function SocialKaKao () {
  const Rest_api_key='01074d8866978b72ce430120a459bdf7'
  
  const redirect_uri = 'http://localhost:3001'

  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`
  
  const kakaoLogin = () => {
    window.location.href= kakaoURL
  }
  return(
    <>
      <Button onClick={kakaoLogin} className="kakaoBtn mt-3">
        <span className="fs-5 font-bold">카카오 로그인</span>
      </Button>
    </>
  );
}
export default SocialKaKao;
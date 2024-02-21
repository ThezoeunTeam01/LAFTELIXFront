let backendHost;

const hostname = window && window.location && window.location.hostname;

if (hostname === "localhost") {
  backendHost = "http://localhost:8081";
}else{
  // 로컬 호스트가 아닌 경우 - 실제 서버로..
  //backendHost = "http://todo-aws-backend.ap-northeast-2.elasticbea.com"; // 백엔트 호스트 aws 백엔드와 연결
  backendHost = "https://api.laftelixx.p-e.kr"; // 백엔트 호스트 aws 백엔드와 연결
} 

export const API_BASE_URL = `${backendHost}`;
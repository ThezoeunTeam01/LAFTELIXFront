import { API_BASE_URL } from "../api-config";
import Login from "../member/Login";

interface RequestOption {
  headers: Headers;
  url: string;
  method: string;
  body?: string;
}

interface MemberDTO {
  userName:string;
  password:string;
  gender:string;
  regidentNumber:number;
  email:string;
  sns?:string;
  img?:string;

}
interface LoginDTO{
  username:string;
  password:string;
}

export async function call(api: string, method: string, request?: object): Promise<any> {
  let headers = new Headers({
    "Content-Type": "application/json",
  });

  // 로컬 스토리지에서 ACCESS_TOKEN 가져오기
  const accessToken = localStorage.getItem("ACCESS_TOKEN");
  if(accessToken) {
    headers.append("Authorization","Bearer "+accessToken);
  }

  let options: RequestOption = { // 헤더 옵션
    headers: headers,
    url: API_BASE_URL + api,
    method: method,
  };
  if(request) {
    options.body = JSON.stringify(request);
  }

  try {
    const response = await fetch(options.url, options);
    if(response.ok) {
      return await response.json();
    } else {
      throw Error(response.statusText);
    }
  } catch(error) {
    console.log("http error");
    console.log(error);
  }
}

export async function signin(LoginDTO: LoginDTO): Promise<any> {
  try {
    const response = await call("/member/signin","POST", LoginDTO);
    if(response.token){
      localStorage.setItem("ACCESS_TOKEN", response.token);
      localStorage.setItem("userId", response.id);
      localStorage.setItem("username",response.username);
      localStorage.setItem("img",response.img);
      window.location.href="/";
    }else{
      return "login_fail";
      
    } 
  } catch (error) {
    console.log(error);
  }
}
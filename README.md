
# 주의 사항

프로젝트 깃허브 레퍼지토리에는 node module이 업로드 되어 있지 않기 때문에 
git clone 진행 후 node module 설치를 위해 반드시 npm install 실행할 것!

# 추가 설치된 npm install - 반드시 설치하세요 미설치 시 오류남!!!!

- 폰트어썸 - svg 아이콘 

npm install --save @fortawesome/fontawesome-svg-core
npm install --save @fortawesome/free-solid-svg-icons
npm install --save @fortawesome/react-fontawesome

- 리액트 부트스트랩

사용 상세 : (https://react-bootstrap.netlify.app/)

npm install react-bootstrap bootstrap

- AOS 애니메이션

- 기본 설치
npm install aos --save

- 타입스크립트로 사용하기 위해 추가 설치
npm i --save-dev @types/aos 

# 설치된 인스톨 리스트 확인 명령어

npm list


# 작업자 A가 install 했던 내역은 다른 작업자들이 pull받은 후 npm install하면 전부 자동 적용됩니다.

# 깃 config 설정 - 사용자 설정

-현재 저장소 사용자 정보 확인하기 

git config user.name
git config user.email


-전역(Git 전역 설정) 사용자 정보 확인

git config --global user.name
git config --global user.email


-전역(Git 전역 설정) 사용자 정보 설정 하기

git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"


-현재 저장소 사용자 설정 하기

git config user.name "Your Name"
git config user.email "your.email@example.com"


-설정 완료 후 사용자 정보 확인 방법

git config --list


# git bash 터미널 사용하기 

- 수정사항이 있는지 확인하기

git status

- 수정 파일 전체 스테이징에 올리기

git add .


- 스테이징에 올린 모든 파일 스테이징 영역에서 제거

git restore --staged .

- 스테이징에 올린 특정 파일만 스테이징 영역에서 제거

git restore --staged 파일명.확장자


- 특정 파일만 스테이징에 올리기 

git add 파일명

- 커밋 ( 메세지는 작성하지 않아도 됨 )

git commit -m "커밋 메시지”

- 메세지 없이 커밋하는 방법 - 불편하니까 그냥 커밋 메세지 작성해서 올리도록 하자.

git commit 

후 에디터 실행되면, esc 키 누르고 :wq 입력하고 enter키 누르면 빠져나옴


- 커밋한 파일 저장소에 푸시하기

git push origin main


- 레퍼지토리에서 소스 pull 받아오기

git pull origin main 


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


# aiml-front

>_git subtree for [aiml-mono](https://github.com/YYoooonn/aiml-mono)_ \
>*front repository **`WIP`***

[**LABit : A Collaborative Lab in Space** - explore the cosmos of creativity](http://ec2-15-165-90-147.ap-northeast-2.compute.amazonaws.com/) \
온라인으로 동료들과 함께 3D 작업하고, 작업물들을 아카이빙 해보세요!

![Screenshot 2025-03-16 at 2 43 07 AM](https://github.com/user-attachments/assets/f8bdd1c3-c507-404a-beb5-d8704dc444d0)


## _about_

<img src="https://img.shields.io/badge/nextjs-000000?style=for-the-badge&logo=nextdotjs&logoColor=white"><img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"><img src="https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white"><img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white">
<img src="https://img.shields.io/badge/threejs-000000?style=for-the-badge&logo=threedotjs&logoColor=white">
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white">
<img src="https://img.shields.io/badge/socketio-010101?style=for-the-badge&logo=socketdotio&logoColor=white">

<img src="https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white"><img src="https://img.shields.io/badge/githubactions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white"><img src="https://img.shields.io/badge/amazonec2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white">

<p align="center">
  
  <img src="https://github.com/user-attachments/assets/efae7a32-2ade-4a54-b2e3-f629f2634c74">

</p>

#### [**ideation**](https://velog.io/@yyoooonn/PRJT-LABit-%EA%B8%B0%ED%9A%8D)

`front` 윤종욱
`back` 안준영
`design` 박성원


#### _flow_

<center>
  
![Screenshot 2025-03-16 at 2 25 00 AM](https://github.com/user-attachments/assets/87d364f0-85af-4402-98a0-10bf5a0e2e38)

</center>


### *architecture*

#### frontend system architecture

<center>
  
![Screenshot 2025-03-16 at 2 41 34 AM](https://github.com/user-attachments/assets/c763412b-9e64-4f70-8a9d-84f5476a7a5d)

</center>

## _how?_

**ENV `development`** 

````bash
# at /aiml-front directory

# 1. install required packages
pnpm i

# 2. run as dev
pnpm dev

# result
> front@0.1.0 dev ~/aiml-front
> nodemon

[nodemon] 3.1.7
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): server.ts
[nodemon] watching extensions: json,js,ts
[nodemon] starting `ts-node --project tsconfig.server.json server.ts`

````
_and you will be able to access through `localhost:${port number}`_


#### ENV `production`

`.env` 파일 설정

`docker-compose.yml`에서 사용하는 credential한 값을 .env파일에 넣어준다.

```markdown
# /.env
# HOSTNAME -> ex) localhost
NEXT_PUBLIC_HOSTNAME: XXXXXXXXXX
# API endpoint url
BACKEND_API_BASE: XXXXXXXXXX
```
현재는 `FRONTEND` 의 hostname 과 `BACKEND`의 api endpoint 두개 설정


````bash
# 1. build with docker-compose
docker-compose build

# 2. run with docker-compose
docker-compose up
# or run as detached
docker-compose up -d
````
_and you will be able to access through `localhost`_

`docker-compose.yml`내에 nginx가 포트 포워딩을 해주기에 포트번호 없이 접근 가능

## _deploy_

`aws ec2`에 free-tier instance를 사용하여 테스트 서버로 활용, `nginx`를 사용하여 포트 포워딩

free-tier의 성능 한계로 인해 빌드 과정에서 너무 오래 걸리고 빌드 도중에 멈추는 일이 빈번하게 발생하여\
직접 image를 빌드하고, 서버에서 `docker-hub`를 통하여 pull 받는 방식으로 변경

````bash
# manual deployment process

# on your computer
# 1. build image using docker-compose
docker-compose build

# 2. push to repository
docker push {repo name}/aimlfront
docker push {repo name}/aimlfrontnginx


# on ec2 instance
# 3. pull docker image from hub
docker pull {repo name}/aimlfront
docker pull {repo name}/aimlfrontnginx

# 4. run docker images with detached
docker-compose up -d
````

현재 github action를 사용하여 `main` 브랜치에 push를 트리거로 받으면 자동으로 docker file 들이 build, push 자동화 설정

*ec2 서버 작업인 3,4번 작업만 진행*

<center>

![Screenshot 2025-03-16 at 2 30 02 AM](https://github.com/user-attachments/assets/f396a76d-ca0f-47b8-91eb-0c5417bbdf9e)

</center>

_추후 CD 까지 구현 예정_

## *features*



### *3d*

웹 상에서 3차원 공간을 렌더링 해주는 `threejs`, `react-three/fiber` 라이브러리 사용

`react-three/drei` 를 활용하여 손쉬운 컨트롤 작용 구현

```typescript
import { Canvas } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";

// canvas 예시
export function DefaultCanvas(){

    return(
        <Canvas>
            <CameraControls />
            <mesh>
                <geometry />
                <material />
            </mesh>
            {...}
        </Canvas>
    )
}

```

---
### *edit on web*

`canvas` 상에서 3d 물체들을 생성하여 렌더링 해주는 것이기에 일반적인 element 들이 존재할 수 없다.

전역 상태 관리는 `zustand`를 사용하여 외부와 `canvas` 내부가 정보를 전달 할 수 있도록 설정.

![Screenshot 2025-03-16 at 2 28 49 AM](https://github.com/user-attachments/assets/9057e3f2-e069-4c3a-b9b9-81776ec77dbd)

### implementation

```typescript
// @/hook/useEditor.ts

import {create} from "zustand"

export const useEditor = create<EditorProps & EditorAction>()((set, get) => ({

    // 전역 상태 변수, canvas 외부에서 설정 할 canvas 내부 값
    camera: {position: [x,y,z], ...},
    background: {color: "#000000", ...},

    // 전역 상태 변경 함수, dispatch action 발생
    setCamera: (cam) => {
        set({ cam: cam });
    },
    setBackground: (bg) => {
        set({ background: bg });
    },
    ...
}))
```

`useEditor`는 zustand를 사용한 hook, `canvas`의 정보를 저장하고 외부에서 수정 가능한 `dispatch` 함수 생성

```typescript
// WorkspaceCanvas.tsx

import { Canvas } from "@react-three/fiber";
import { useEditor } from "";

export function WorkspaceCanvas({ objts }: { objts?: ObjectInfo[] }) {

  const {camera background, ...} = useEditor();

  return(
    <Canvas>
      <color attach="background" args={[background.color]}>
      ...
    </Canvas>
  )
}
```

`canvas` 내부에서 값을 변경하는 경우는 거의 없음. 대부분은 렌더링을 위한 환경(도형 선택 제외)이다. 외부에서 전역 변수 변경 시, 이를 전달받아서 canvas 내부 값들 변경

```typescript
// editor.tsx

function BackgroundEditor() {
  const { background, setBackground } = useEditor();

  const [color, setColor] = useState(background.color);
  // hexcolor이기에 수정시 바로 바뀌는 것을 원치 않을 것, 버튼 클릭 시 변경되도록 상태 추가
  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    setBackground({ color: color });
  };

  return (
    <EditorBlock text={"Background"}>
      <TextSelector
        text="color"
        val={color}
        setVal={setColor}
        preset={background.color}
      />
      <SubmitButton handler={handleSubmit} />
    </EditorBlock>
  );
}
```

전역 변수를 변경할 실제 `editor`, 전역 변수 변경해주는 component.

![Screenshot 2025-03-16 at 2 05 39 AM](https://github.com/user-attachments/assets/9f122839-226e-4f70-a53e-eadbea1a7f58)



---

### real-time

> `socket.io`

real-time을 구현하기 위해 `websocket` 통신 사용, `front server`상에서 websocket을 활용하여 실시간 정보 통신을 가능하게

### implementation

````typescript
// ./server.ts

import { Server } from "socket.io";
import { ChatSocket } from "./server/chat";

app.prepare().then(() => {
  
  ...
  // socket.io 활용한 websocket server 생성
  const io = new Server(httpServer, {
    path: "/socket.io/",
    cors: {
      origin: [`http://${hostname}`, `http://${hostname}:${port}`],
      methods: ["GET", "POST"],
    },
  });

  // 채팅을 위한 namespace
  ChatSocket(io, "chat");

  // 프로젝트 정보를 위한 namespace
  ProjectSocket(io, "project");

  ...

````
#### `node`에서 `socket server` 생성


````typescript
// ./server/chat.ts

export const ChatSocket = (io: Server, name: string) => {
  const namespace = io.of("chat");

  // NAMESPACE
  namespace.on("connection", (socket) => {
    const req = socket.request;
    const {
      headers: { referer },
    } = req;

    // 각 url 주소에서 room을 달리 한다.
    // parse info from uri
    const roomId = referer
      ? referer.split("/")[referer.split("/").length - 1].replace(/\?.+/, "") : "default";

    ...

````
#### `namespace` 생성

각 namespace는 각기 다른 용도 : 채팅, 접속자 정보, 프로젝트 정보 등등

![Screenshot 2025-03-16 at 2 03 57 AM](https://github.com/user-attachments/assets/3a7a73bd-187c-40c8-a838-50d8ac4387ba)


### _folder structure_

```
aiml-front
├── docker : dockerfile
│   ├── next.Dockerfile
│   ├── nginx.Dockerfile 
│   └── conf.d : configuration for nginx
│       └── default.conf
├── server : websocket server 
│   ├── chat.ts
│   ├── project.ts
│   └── ...
├── src : nextjs source
│   ├── @types : global types
│   ├── app
│   │   ├── (header) : pages with same layout scoped, static pages
│   │   │   ├── about
│   │   │   ├── contact
│   │   │   └── documentation
│   │   ├── _actions : user actions - api call, navigate, ...
│   │   │   ├── actions.d.ts
│   │   │   ├── auth.ts
│   │   │   ├── object.ts
│   │   │   ├── project.ts
│   │   │   ├── user.ts
│   │   │   └── ...
│   │   ├── api : RESTful API
│   │   │   ├── auth : authentication requests
│   │   │   │   └── route.ts
│   │   │   ├── projects : requests for projects
│   │   │   │   ├── [id]
│   │   │   │   │   ├── [entity]
│   │   │   │   │   │   ├── [entityId]
│   │   │   │   │   │   │   └── route.ts
│   │   │   │   │   │   └── route.ts
│   │   │   │   │   └── route.ts
│   │   │   │   └── route.ts
│   │   │   ├── users : requests for users
│   │   │   │   └── [id]
│   │   │   │       ├── [entity]
│   │   │   │       │   └── route.ts
│   │   │   │       └── route.ts
│   │   │   └── objects : requests for objects
│   │   │       ├── [id]
│   │   │       │   └── route.ts
│   │   │       └── route.ts
│   │   ├── archive
│   │   ├── login
│   │   ├── register
│   │   ├── user : user profile, workspaces
│   │   │   ├── edit
│   │   │   └── [id] : user profile
│   │   ├── workspace : workspace - editing
│   │   ├── layout.tsx
│   │   └── page.tsx 
│   ├── assets
│   ├── components : 웹 뷰 구성 요소
│   │   ├── header
│   │   ├── footer
│   │   ├── aisle
│   │   └── ...
│   ├── hook : hook 저장
│   │   ├── useModals.ts
│   │   ├── useChat.ts
│   │   ├── useUserInfo.ts
│   │   └── ...
│   ├── sockets
│   │   ├── chat.ts : 채팅 관련 웹소켓
│   │   ├── project.ts : 프로젝트 관련 웹소켓
│   │   └── ... 
│   ├── store : 전역 상태 관리 zustand
│   │   ├── useObjectStore.ts : 3차원 오브젝트 전역 상태
│   │   └── useModalStore.ts : modal 전역 상태
│   ├── styles
│   ├── utils
│   └── middleware.ts
├── server.ts : front server + init websocket
├── docker-compose.yml : docker-compose set-ups
├── package.json
├── tsconfig.json
├── tsconfig.server.json
├── .env
├── .dockerignore
├── .gitignore
└── next-env.d.ts
```

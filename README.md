# aiml-front

> _git subtree for [aiml-mono](https://github.com/YYoooonn/aiml-mono)_ \
> \*front repository **`WIP`\***

[**A Collaborative Workspace for 3D** - edit and archive 3D projects](http://ec2-3-39-43-240.ap-northeast-2.compute.amazonaws.com/) \
온라인으로 동료들과 함께 3D 작업하고, 작업물들을 아카이빙 해보세요!

![mainworkspace](https://github.com/user-attachments/assets/320d4223-1960-4a94-a89d-ee400cd14bcf)

## _about_

<img src="https://img.shields.io/badge/nextjs-000000?style=for-the-badge&logo=nextdotjs&logoColor=white"><img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"><img src="https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white"><img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white">
<img src="https://img.shields.io/badge/threejs-000000?style=for-the-badge&logo=threedotjs&logoColor=white">
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white">
<img src="https://img.shields.io/badge/socketio-010101?style=for-the-badge&logo=socketdotio&logoColor=white">

<img src="https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white"><img src="https://img.shields.io/badge/githubactions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white"><img src="https://img.shields.io/badge/amazonec2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white">


<img src="https://github.com/user-attachments/assets/efae7a32-2ade-4a54-b2e3-f629f2634c74">

### _preview_

| landing                                                                                  | archive                                                                                     | workspace                                                                                  |
| ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| ![landing0603](https://github.com/user-attachments/assets/6c3ade8f-6501-4ca3-98af-6ba138482432) | ![archive0603](https://github.com/user-attachments/assets/af89ce32-cd7d-4305-9ca6-18275ae4d160) | ![workspace0603](https://github.com/user-attachments/assets/d69a874e-9041-4d7e-b85a-3de18a67f07a) |


#### [**PRJT) aiml project 기획**](https://velog.io/@yyoooonn/PRJT-LABit-%EA%B8%B0%ED%9A%8D)

#### _flow_

![Screenshot 2025-06-05 at 11 08 46 PM](https://github.com/user-attachments/assets/386293c4-a801-43e8-b833-c7a19a94dd1c)


### _architecture_

#### frontend system architecture

<center>
  <img width="984" alt="Screenshot 2025-06-03 at 11 35 53 AM" src="https://github.com/user-attachments/assets/29043ada-bf7a-4b85-a7ad-85955df07518" />
</center>

## _how?_

**ENV `development`**

```bash
# at root

# 1. install required packages
pnpm i

# 2. run as dev
pnpm dev

> aiml-front@0.0.0 dev ~/aiml-front
> pnpm --filter web --filter socket-server dev

Scope: 2 of 6 workspace projects
apps/socket-server dev$ tsx watch src/index.ts
│ ✅ Socket.IO server is running on http://localhost:3001
└─ Running...
apps/web dev$ next dev
│   ▲ Next.js 14.2.25
│   - Local:        http://localhost:3000
│   - Environments: .env
│  ✓ Starting...
│  ✓ Ready in 1652ms
└─ Running...
```

_and you will be able to access through `localhost:3000`_

#### ENV `production`

```bash
# 1. build with docker-compose
docker-compose build

# 2. run with docker-compose
docker-compose up
# or run as detached
docker-compose up -d
```

_and you will be able to access through `localhost`_

`docker-compose.yml`내에 nginx가 포트 포워딩을 해주기에 포트번호 없이 접근 가능

## _deploy_

`aws ec2`에 free-tier instance를 사용하여 테스트 서버로 활용, `nginx`를 사용하여 포트 포워딩

free-tier의 성능 한계로 인해 빌드 과정에서 너무 오래 걸리고 빌드 도중에 멈추는 일이 빈번하게 발생하여\
직접 image를 빌드하고, 서버에서 `docker-hub`를 통하여 pull 받는 방식으로 변경

```bash
# CI : github actions - ./.github/workflows/docker-build-push.yml

# manual deployment
# on ec2 instance
# 1. copy necessary files
# .env, nginx/nginx.prod.conf, docker-compose.yml

# 2. pull docker image from hub
docker compose pull

# 3. run docker images with detached
docker compose up -d
```

현재 github action를 사용하여 `dev`에서 빌드 테스트, `main` 브랜치에서 docker build, push 자동화

<center>

![Screenshot 2025-03-16 at 2 30 02 AM](https://github.com/user-attachments/assets/f396a76d-ca0f-47b8-91eb-0c5417bbdf9e)

</center>

_추후 CD 까지 구현 예정_

## _features_

### _3d_

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

### _edit on web_

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

`canvas` 내부에서 값을 변경하는 경우는 거의 없음. \
대부분은 렌더링을 위한 환경(도형 선택 제외)이다. \
외부에서 전역 변수 변경 시, 이를 전달받아서 canvas 내부 값들 변경

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

```typescript
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

```

#### `node`에서 `socket server` 생성

```typescript
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

```

#### `namespace` 생성

각 namespace는 각기 다른 용도 : 채팅, 접속자 정보, 프로젝트 정보 등등

![Screenshot 2025-03-16 at 2 03 57 AM](https://github.com/user-attachments/assets/3a7a73bd-187c-40c8-a838-50d8ac4387ba)

---

### _backend for frontend_

`CORS`, 데이터 처리를 위한 backend for frontend 구현

`Nextjs` 의 `api router`를 활용하여 중간 서버 구현

필요한 데이터만 client에 제공하는 형태로 가능하도록 구조 생성

---

### _folder structure_

```bash
aiml-front
├── apps
│   ├── web # nextjs
│   │   ├── public
│   │   ├── src
│   │   │   ├── @types
│   │   │   ├── app
│   │   │   │   ├── (auth) # for auth required pages
│   │   │   │   ├── (header) # header pages : doc, about, etc.
│   │   │   │   ├── actions # server actions
│   │   │   │   ├── api # api router
│   │   │   │   └── ...(pages)
│   │   │   ├── assets
│   │   │   ├── components
│   │   │   ├── constants
│   │   │   ├── hook
│   │   │   ├── lib
│   │   │   ├── services # client fetch actions
│   │   │   ├── socket
│   │   │   ├── store # zustand stores, global states
│   │   │   ├── styles
│   │   │   └── utils
│   │   ├── package.json
│   │   └── ...
│   └── socket-server
│       ├── src
│       │   ├── server
│       │   │   ├── utils
│       │   │   ├── chat.ts # chat socket
│       │   │   └── project.ts # project socket
│       │   └── index.ts
│       └── package.json
├── packages
│   ├── eslint-config
│   ├── typescript-config
│   └── ui
│       ├── src
│       │   ├── components
│       │   ├── layout
│       │   ├── styles
│       │   └── index.ts
│       └── package.json
├── docker # for docker build
│   ├── web.Dockerfile
│   ├── socket.Dockerfile
│   └── nginx.Dockerfile
├── nginx # nginx configuration
│   └── nginx.prod.conf
├── docker-compose.yml
├── package.json
├── pnpm-lock.yaml
└── pnpm-workspace.yaml
```

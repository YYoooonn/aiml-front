import { headers } from "./header";

type DObj = { [key: string]: unknown | Data | Data[] };
type Data = string | DObj;

type ResHandler = (res: Response) => Promise<{
  success: boolean;
  data?: Data;
  error?: string;
}>;

type ReqHandler = (
  req: any,
  auth: boolean,
) => Promise<{
  headers: HeadersInit;
  body?: string;
}>;

export const responseHandler: ResHandler = async (res) => {
  if (res.ok) {
    const data = await parser(res);
    if (!data) {
      return { success: true };
    } else {
      if (typeof data === "object") {
        // TODO 'xxxxId'를 'id'로 변경 => 백엔드에서 id로 바꿔달라고 요청?
        handleIdFields(data);
      }
      return { success: true, data: data };
    }
  } else {
    const message = (await parser(res)) as string;
    return { success: false, error: message ? message : `code ${res.status}` };
  }
};

export const requestHandler: ReqHandler = async (req, _auth = true) => {
  const m = req.method;
  const h = headers(req, m);
  if (m === "GET" || m === "DELETE") {
    return {
      headers: h,
      method: m,
    };
  }
  const body = await req.json();
  // XXX DO SOMETHING
  return {
    headers: h,
    method: m,
    body: JSON.stringify(body),
  };
};

// remap key with data xxxId to id
function handleIdFields(obj: DObj) {
  Object.entries(obj).forEach(([key, val]) => {
    // 만약 val이 객체나 배열이면 재귀적으로 처리
    if (val && typeof val === "object") {
      if (Array.isArray(val)) {
        // 배열일 경우 각 항목에 대해 처리
        val.forEach((item) => {
          if (item && typeof item === "object") {
            handleIdFields(item); // 배열 안의 객체도 재귀적으로 처리
          }
        });
      } else {
        // 객체일 경우 재귀적으로 처리
        handleIdFields(val as DObj);
      }
    }
    if (key.endsWith("Id")) {
      obj.id = val;
      delete obj[key]; // 'Id' 키 삭제
    }
  });
}

type TParser = (res: Response) => Promise<string | Data>;

const parser: TParser = async (res) => {
  const t = res.headers.get("Content-Type");
  if (t && t.includes("application/json")) {
    const p = await res.json();
    return p;
  }
  const p = await res.text();
  return p;
};

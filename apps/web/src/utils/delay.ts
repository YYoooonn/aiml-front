/**
 * async / await promise delay function
 * @param {number} delay miliseconds 단위의 딜레이 시간
 * @returns {Promise<void>} 비동기 함수. 반환 없음
 */
export default function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

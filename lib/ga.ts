import { analytics } from "./firebase";
import { logEvent } from "firebase/analytics";

/**
 * 구글 애널리틱스 이벤트 전송 함수
 * @param eventName 이벤트 이름
 * @param params 이벤트 파라미터 (선택)
 */
export function sendGAEvent(eventName: string, params?: Record<string, unknown>) {
  if (analytics) {
    logEvent(analytics, eventName, params);
  }
}

import { GOOGLE_CLIENT_ID, REDIRECT_URI } from "@/lib/constants";

export const useGoogleLogin = () => {
  const state = "google";
  const CLIENT_ID = GOOGLE_CLIENT_ID;
  const SCOPE = "profile email";
  const RESPONSE_TYPE = "code"; // code를 통해 서버에서 토큰 확인 가능.

  const googleLogin = () => {
    const oauth2Url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI!)}&response_type=${RESPONSE_TYPE}&scope=${encodeURIComponent(SCOPE)}&include_granted_scopes=true&state=${state}`;
    window.location.href = oauth2Url;
  };

  return { googleLogin };
};

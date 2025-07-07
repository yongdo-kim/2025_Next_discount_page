export const authApi = {
  async loginWithGoogle() {
    // 실제 구현에서는 외부 API 호출 또는 firebase 등 사용
    // 예시용 mock 데이터
    return {
      id: 1,
      email: "demo@gmail.com",
      name: "데모유저",
      picture: "https://dummyimage.com/100x100",
      provider: "google",
    };
  },
  async logout() {
    return;
  },
};

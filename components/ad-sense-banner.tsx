import { useEffect } from "react";

export default function AdSenseBanner() {
  useEffect(() => {
    try {
      // @ts-expect-error: 구글 애드센스 타입 없음 (window.adsbygoogle)
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-2398130378795170"
      data-ad-slot="2394925518"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}

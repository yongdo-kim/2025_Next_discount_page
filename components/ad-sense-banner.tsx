import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";
declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function AdSenseBanner() {
  useEffect(() => {
    if (window.adsbygoogle && process.env.NODE_ENV === "production") {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        Sentry.captureException(e);
      }
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block", height: "100px"}}
      data-ad-client="ca-pub-2398130378795170"
      data-ad-slot="2394925518"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}

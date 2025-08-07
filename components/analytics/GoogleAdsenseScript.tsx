import Script from "next/script";

export default function GoogleAdsenseScript() {
  return (
    <>
      <meta
        name="google-site-verification"
        content="n27T5OoBWUN8J3TDTK8w8fBs5ZkZFPZ2Co5B_lefBeU"
      />
      <Script
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2398130378795170"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
    </>
  );
}
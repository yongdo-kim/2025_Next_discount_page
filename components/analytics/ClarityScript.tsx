import Script from "next/script";
import { ENV } from "@/lib/constants";

export default function ClarityScript() {
  if (ENV !== "production") return null;
  
  return (
    <Script id="clarity-analytics" strategy="afterInteractive">
      {`
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "sa0b71ttyt");
      `}
    </Script>
  );
}